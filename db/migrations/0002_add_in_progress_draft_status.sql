-- Adds the 'in_progress' status to page_drafts, for guests to save
-- unsubmitted progress without it appearing in the admin review queue
-- (which only ever lists status = 'pending').
--
-- Apply once to an already-deployed database that was set up before this
-- migration existed:
--   psql "$NEON_DATABASE_URL" -f db/migrations/0002_add_in_progress_draft_status.sql
--
-- Safe to re-run. A fresh install via db/schema.sql already includes this.

ALTER TABLE page_drafts DROP CONSTRAINT IF EXISTS page_drafts_status_check;
ALTER TABLE page_drafts ADD CONSTRAINT page_drafts_status_check
  CHECK (status IN ('in_progress','pending','approved','rejected'));

CREATE UNIQUE INDEX IF NOT EXISTS page_drafts_one_in_progress_per_page
  ON page_drafts(page_id) WHERE status = 'in_progress';
