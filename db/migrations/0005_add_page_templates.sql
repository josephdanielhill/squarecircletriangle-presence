-- Adds page_templates: reusable named block layouts an admin can save from
-- an existing page and apply later (to a new page, or to replace an
-- existing page's content), for quick "start from a known-good layout"
-- workflows.
--
-- Apply once to an already-deployed database:
--   psql "$NEON_DATABASE_URL" -f db/migrations/0005_add_page_templates.sql
--
-- Safe to re-run. A fresh install via db/schema.sql already includes this.

CREATE TABLE IF NOT EXISTS page_templates (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  blocks      jsonb NOT NULL,               -- saved block array, see worker/blocks.ts for the shape
  created_at  timestamptz NOT NULL DEFAULT now(),
  created_by  text                          -- Neon Auth JWT `sub`, null for migrated/seeded rows
);
