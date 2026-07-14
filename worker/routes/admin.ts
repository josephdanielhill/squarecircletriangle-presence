import { Hono } from 'hono';
import { getDb } from '../db';
import { requireAdmin, AuthError } from '../auth';
import { validateBlocks } from '../blocks';
import { randomToken } from '../util';
import type { Env, PageRow, GuestTokenRow, PageDraftRow } from '../types';

export const adminRoutes = new Hono<{ Bindings: Env; Variables: { adminEmail: string; adminSub: string } }>();

const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const SECTIONS = ['Home', 'Square', 'Circle', 'Triangle'];

adminRoutes.use('*', async (c, next) => {
  try {
    const payload = await requireAdmin(c.req.raw, c.env);
    c.set('adminEmail', String(payload.email));
    c.set('adminSub', String(payload.sub ?? ''));
  } catch (e) {
    if (e instanceof AuthError) return c.json({ error: e.message }, e.status as 401 | 403);
    throw e;
  }
  await next();
});

adminRoutes.get('/me', (c) => c.json({ email: c.get('adminEmail') }));

adminRoutes.get('/pages', async (c) => {
  const sql = getDb(c.env);
  const rows = await sql(
    `SELECT id, section, title, status, section_top AS "sectionTop", sort_order AS "sortOrder", updated_at AS "updatedAt"
     FROM pages ORDER BY section, sort_order, title`
  );
  return c.json(rows);
});

adminRoutes.post('/pages', async (c) => {
  const body = await c.req.json().catch(() => null);
  if (!body || typeof body.id !== 'string' || !SLUG_RE.test(body.id)) {
    return c.json({ error: 'id must be a lowercase-hyphen slug' }, 400);
  }
  if (typeof body.title !== 'string' || !body.title.trim()) {
    return c.json({ error: 'title is required' }, 400);
  }
  if (!SECTIONS.includes(body.section)) {
    return c.json({ error: `section must be one of ${SECTIONS.join(', ')}` }, 400);
  }

  const sql = getDb(c.env);
  const existing = await sql(`SELECT id FROM pages WHERE id = $1`, [body.id]);
  if (existing.length > 0) return c.json({ error: 'A page with this id already exists' }, 409);

  const rows = (await sql(
    `INSERT INTO pages (id, section, title, eyebrow, lede, lede_quote, section_top, icon, sort_order, status, created_by)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,'draft',$10)
     RETURNING id, section, title, status`,
    [
      body.id,
      body.section,
      body.title,
      body.eyebrow ?? null,
      body.lede ?? null,
      !!body.ledeQuote,
      !!body.sectionTop,
      body.icon ?? null,
      body.sortOrder ?? 0,
      c.get('adminSub') || null,
    ]
  )) as PageRow[];

  return c.json(rows[0], 201);
});

adminRoutes.get('/pages/:id', async (c) => {
  const sql = getDb(c.env);
  const rows = (await sql(`SELECT * FROM pages WHERE id = $1`, [c.req.param('id')])) as PageRow[];
  if (rows.length === 0) return c.json({ error: 'Not found' }, 404);
  return c.json(rows[0]);
});

adminRoutes.put('/pages/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json().catch(() => null);
  if (!body) return c.json({ error: 'Invalid JSON body' }, 400);

  const sql = getDb(c.env);
  const existing = (await sql(`SELECT id FROM pages WHERE id = $1`, [id])) as { id: string }[];
  if (existing.length === 0) return c.json({ error: 'Not found' }, 404);

  if (body.section !== undefined && !SECTIONS.includes(body.section)) {
    return c.json({ error: `section must be one of ${SECTIONS.join(', ')}` }, 400);
  }
  if (body.status !== undefined && body.status !== 'draft' && body.status !== 'published') {
    return c.json({ error: 'status must be draft or published' }, 400);
  }

  let blocks: unknown = undefined;
  if (body.blocks !== undefined) {
    const result = validateBlocks(body.blocks);
    if (!result.ok) return c.json({ error: result.error }, 400);
    blocks = JSON.stringify(result.blocks);
  }

  const rows = (await sql(
    `UPDATE pages SET
       section = COALESCE($2, section),
       title = COALESCE($3, title),
       eyebrow = COALESCE($4, eyebrow),
       lede = COALESCE($5, lede),
       lede_quote = COALESCE($6, lede_quote),
       section_top = COALESCE($7, section_top),
       icon = COALESCE($8, icon),
       sort_order = COALESCE($9, sort_order),
       blocks = COALESCE($10::jsonb, blocks),
       status = COALESCE($11, status),
       updated_label = COALESCE($12, updated_label),
       updated_at = now()
     WHERE id = $1
     RETURNING *`,
    [
      id,
      body.section ?? null,
      body.title ?? null,
      body.eyebrow ?? null,
      body.lede ?? null,
      body.ledeQuote ?? null,
      body.sectionTop ?? null,
      body.icon ?? null,
      body.sortOrder ?? null,
      blocks ?? null,
      body.status ?? null,
      body.updatedLabel ?? null,
    ]
  )) as PageRow[];

  return c.json(rows[0]);
});

adminRoutes.delete('/pages/:id', async (c) => {
  const sql = getDb(c.env);
  const rows = await sql(`DELETE FROM pages WHERE id = $1 RETURNING id`, [c.req.param('id')]);
  if (rows.length === 0) return c.json({ error: 'Not found' }, 404);
  return c.json({ ok: true });
});

adminRoutes.get('/pages/:id/guest-tokens', async (c) => {
  const sql = getDb(c.env);
  const rows = await sql(
    `SELECT id, label, created_at AS "createdAt", expires_at AS "expiresAt",
       revoked_at AS "revokedAt", last_used_at AS "lastUsedAt"
     FROM guest_tokens WHERE page_id = $1 ORDER BY created_at DESC`,
    [c.req.param('id')]
  );
  return c.json(rows);
});

adminRoutes.post('/pages/:id/guest-tokens', async (c) => {
  const pageId = c.req.param('id');
  const body = await c.req.json().catch(() => ({}));
  const sql = getDb(c.env);

  const page = await sql(`SELECT id FROM pages WHERE id = $1`, [pageId]);
  if (page.length === 0) return c.json({ error: 'Page not found' }, 404);

  const token = randomToken();
  const expiresAt = body.expiresAt ?? null;
  const rows = (await sql(
    `INSERT INTO guest_tokens (token, page_id, label, created_by, expires_at)
     VALUES ($1,$2,$3,$4,$5)
     RETURNING id, token, label, created_at AS "createdAt", expires_at AS "expiresAt"`,
    [token, pageId, body.label ?? null, c.get('adminSub') || null, expiresAt]
  )) as GuestTokenRow[];

  const row = rows[0];
  return c.json({ ...row, editUrl: `/edit/${row.token}` }, 201);
});

adminRoutes.delete('/guest-tokens/:tokenId', async (c) => {
  const sql = getDb(c.env);
  const rows = await sql(
    `UPDATE guest_tokens SET revoked_at = now() WHERE id = $1 AND revoked_at IS NULL RETURNING id`,
    [c.req.param('tokenId')]
  );
  if (rows.length === 0) return c.json({ error: 'Not found or already revoked' }, 404);
  return c.json({ ok: true });
});

adminRoutes.get('/drafts', async (c) => {
  const sql = getDb(c.env);
  const rows = await sql(
    `SELECT d.id, d.page_id AS "pageId", p.title AS "pageTitle", p.section, d.submitted_by AS "submittedBy",
       d.status, d.submitted_at AS "submittedAt"
     FROM page_drafts d JOIN pages p ON p.id = d.page_id
     WHERE d.status = 'pending'
     ORDER BY d.submitted_at ASC`
  );
  return c.json(rows);
});

adminRoutes.get('/drafts/:draftId', async (c) => {
  const sql = getDb(c.env);
  const rows = (await sql(
    `SELECT d.*, p.title AS "pageTitle", p.section, p.blocks AS "publishedBlocks"
     FROM page_drafts d JOIN pages p ON p.id = d.page_id
     WHERE d.id = $1`,
    [c.req.param('draftId')]
  )) as (PageDraftRow & { pageTitle: string; section: string; publishedBlocks: unknown[] })[];
  if (rows.length === 0) return c.json({ error: 'Not found' }, 404);
  return c.json(rows[0]);
});

adminRoutes.post('/drafts/:draftId/approve', async (c) => {
  const sql = getDb(c.env);
  const draftId = c.req.param('draftId');

  const drafts = (await sql(`SELECT * FROM page_drafts WHERE id = $1 AND status = 'pending'`, [
    draftId,
  ])) as PageDraftRow[];
  if (drafts.length === 0) return c.json({ error: 'Not found or already reviewed' }, 404);
  const draft = drafts[0];

  await sql(
    `UPDATE pages SET blocks = $2::jsonb, status = 'published', updated_at = now() WHERE id = $1`,
    [draft.page_id, JSON.stringify(draft.blocks)]
  );
  await sql(
    `UPDATE page_drafts SET status = 'approved', reviewed_at = now(), reviewed_by = $2 WHERE id = $1`,
    [draftId, c.get('adminEmail')]
  );

  return c.json({ ok: true });
});

adminRoutes.post('/drafts/:draftId/reject', async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const sql = getDb(c.env);
  const rows = await sql(
    `UPDATE page_drafts SET status = 'rejected', reviewed_at = now(), reviewed_by = $2, review_note = $3
     WHERE id = $1 AND status = 'pending' RETURNING id`,
    [c.req.param('draftId'), c.get('adminEmail'), body.note ?? null]
  );
  if (rows.length === 0) return c.json({ error: 'Not found or already reviewed' }, 404);
  return c.json({ ok: true });
});
