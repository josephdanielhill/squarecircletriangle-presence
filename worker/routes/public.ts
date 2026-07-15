import { Hono } from 'hono';
import { getDb } from '../db';
import type { Env, PageRow } from '../types';

export const publicRoutes = new Hono<{ Bindings: Env }>();

const LIST_COLUMNS = `id, section, parent_id AS "parentId", title, eyebrow, lede, lede_quote AS "ledeQuote",
  section_top AS "sectionTop", icon, sort_order AS "sortOrder", updated_label AS "updatedLabel"`;

publicRoutes.get('/pages', async (c) => {
  const sql = getDb(c.env);
  const rows = await sql(
    `SELECT ${LIST_COLUMNS} FROM pages WHERE status = 'published' ORDER BY section, sort_order, title`
  );
  return c.json(rows);
});

publicRoutes.get('/pages/:id', async (c) => {
  const sql = getDb(c.env);
  const rows = (await sql(
    `SELECT id, section, parent_id AS "parentId", title, eyebrow, lede, lede_quote AS "ledeQuote",
       section_top AS "sectionTop", icon, blocks, updated_label AS "updatedLabel"
     FROM pages WHERE id = $1 AND status = 'published'`,
    [c.req.param('id')]
  )) as PageRow[];

  if (rows.length === 0) return c.json({ error: 'Not found' }, 404);
  return c.json(rows[0]);
});
