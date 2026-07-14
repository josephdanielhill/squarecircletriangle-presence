import { Hono } from 'hono';
import { getDb } from '../db';
import { validateBlocks } from '../blocks';
import type { Env, GuestTokenRow, PageRow } from '../types';

export const guestRoutes = new Hono<{ Bindings: Env }>();

async function resolveToken(sql: ReturnType<typeof getDb>, token: string) {
  const rows = (await sql(`SELECT * FROM guest_tokens WHERE token = $1`, [token])) as GuestTokenRow[];
  if (rows.length === 0) return { error: 'Not found', status: 404 as const };
  const gt = rows[0];
  if (gt.revoked_at) return { error: 'This link has been revoked', status: 410 as const };
  if (gt.expires_at && new Date(gt.expires_at).getTime() < Date.now()) {
    return { error: 'This link has expired', status: 410 as const };
  }
  return { guestToken: gt };
}

guestRoutes.get('/:token', async (c) => {
  const sql = getDb(c.env);
  const resolved = await resolveToken(sql, c.req.param('token'));
  if ('error' in resolved) return c.json({ error: resolved.error }, resolved.status);

  const pages = (await sql(`SELECT id, title, section, blocks FROM pages WHERE id = $1`, [
    resolved.guestToken.page_id,
  ])) as PageRow[];
  if (pages.length === 0) return c.json({ error: 'Page no longer exists' }, 404);
  const page = pages[0];

  const drafts = await sql(
    `SELECT blocks FROM page_drafts WHERE page_id = $1 AND status = 'pending'`,
    [page.id]
  );
  const blocks = drafts.length > 0 ? (drafts[0] as { blocks: unknown }).blocks : page.blocks;

  await sql(`UPDATE guest_tokens SET last_used_at = now() WHERE id = $1`, [resolved.guestToken.id]);

  return c.json({
    page: { id: page.id, title: page.title, section: page.section, blocks },
    hasPendingDraft: drafts.length > 0,
  });
});

guestRoutes.post('/:token/draft', async (c) => {
  const sql = getDb(c.env);
  const resolved = await resolveToken(sql, c.req.param('token'));
  if ('error' in resolved) return c.json({ error: resolved.error }, resolved.status);

  const body = await c.req.json().catch(() => null);
  if (!body) return c.json({ error: 'Invalid JSON body' }, 400);

  const result = validateBlocks(body.blocks);
  if (!result.ok) return c.json({ error: result.error }, 400);

  await sql(
    `INSERT INTO page_drafts (page_id, blocks, guest_token_id, submitted_by, status, submitted_at)
     VALUES ($1, $2::jsonb, $3, $4, 'pending', now())
     ON CONFLICT (page_id) WHERE status = 'pending'
     DO UPDATE SET blocks = EXCLUDED.blocks, submitted_at = now()`,
    [
      resolved.guestToken.page_id,
      JSON.stringify(result.blocks),
      resolved.guestToken.id,
      resolved.guestToken.label ?? 'guest',
    ]
  );
  await sql(`UPDATE guest_tokens SET last_used_at = now() WHERE id = $1`, [resolved.guestToken.id]);

  return c.json({ ok: true, status: 'pending' });
});
