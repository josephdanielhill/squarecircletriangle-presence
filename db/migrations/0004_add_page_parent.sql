-- Adds an optional self-referential parent_id to pages, so a page can be
-- nested under another page (in addition to the top-level section), e.g.
-- Square -> Page 1 -> Page 1a.
--
-- Apply once to an already-deployed database:
--   psql "$NEON_DATABASE_URL" -f db/migrations/0004_add_page_parent.sql
--
-- Safe to re-run. A fresh install via db/schema.sql already includes this.

ALTER TABLE pages ADD COLUMN IF NOT EXISTS parent_id text REFERENCES pages(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS pages_parent_id_idx ON pages(parent_id);
