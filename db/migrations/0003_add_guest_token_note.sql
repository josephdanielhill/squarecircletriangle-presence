-- Adds an optional guest-facing note (e.g. a welcome message) shown on the
-- guest edit page, separate from `label` which is admin-only.
--
-- Apply once to an already-deployed database:
--   psql "$NEON_DATABASE_URL" -f db/migrations/0003_add_guest_token_note.sql
--
-- Safe to re-run. A fresh install via db/schema.sql already includes this.

ALTER TABLE guest_tokens ADD COLUMN IF NOT EXISTS note text;
