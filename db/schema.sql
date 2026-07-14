-- CMS schema for squarecircletriangle-presence
-- Apply once to the Neon project (ideally on a branch first):
--   psql "$NEON_DATABASE_URL" -f db/schema.sql
--
-- Neon Auth manages its own user table automatically once enabled on the
-- project (commonly exposed as `neon_auth.users_sync`). We never create or
-- migrate that ourselves -- the Worker just verifies JWTs against Neon
-- Auth's JWKS endpoint and checks the `email` claim against the single
-- admin address. No local `admins` table is needed.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS pages (
  id            text PRIMARY KEY,              -- slug, e.g. 'triangle-deckcrm'
  section       text NOT NULL CHECK (section IN ('Home','Square','Circle','Triangle')),
  title         text NOT NULL,
  eyebrow       text,
  lede          text,
  lede_quote    boolean NOT NULL DEFAULT false,
  section_top   boolean NOT NULL DEFAULT false, -- section overview/landing page
  icon          text,                           -- 'square'|'circle'|'triangle', only for section_top
  sort_order    integer NOT NULL DEFAULT 0,
  blocks        jsonb NOT NULL DEFAULT '[]',    -- published content, see worker/blocks.ts for the shape
  status        text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  updated_label text,                            -- free text, e.g. "May 2026 by JH"
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now(),
  created_by    text                             -- Neon Auth JWT `sub`, null for migrated/seeded rows
);

CREATE TABLE IF NOT EXISTS guest_tokens (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  token         text UNIQUE NOT NULL,            -- opaque random, 32 bytes base64url
  page_id       text NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  label         text,                            -- admin note, e.g. "Sponsor: Acme Co"
  created_at    timestamptz NOT NULL DEFAULT now(),
  created_by    text,
  expires_at    timestamptz,
  revoked_at    timestamptz,
  last_used_at  timestamptz
);
CREATE INDEX IF NOT EXISTS guest_tokens_token_idx ON guest_tokens(token) WHERE revoked_at IS NULL;
CREATE INDEX IF NOT EXISTS guest_tokens_page_id_idx ON guest_tokens(page_id);

CREATE TABLE IF NOT EXISTS page_drafts (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id         text NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  blocks          jsonb NOT NULL,                -- proposed full block array
  guest_token_id  uuid REFERENCES guest_tokens(id),
  submitted_by    text,                          -- guest_tokens.label or 'guest'
  -- 'in_progress': a private, unsubmitted save -- never shown in the admin
  -- drafts queue (that only lists 'pending'). Lets a guest save their
  -- work without it entering review until they explicitly submit.
  status          text NOT NULL DEFAULT 'pending' CHECK (status IN ('in_progress','pending','approved','rejected')),
  submitted_at    timestamptz NOT NULL DEFAULT now(),
  reviewed_at     timestamptz,
  reviewed_by     text,
  review_note     text
);
-- at most one pending draft per page (a second guest submission upserts the pending row)
CREATE UNIQUE INDEX IF NOT EXISTS page_drafts_one_pending_per_page
  ON page_drafts(page_id) WHERE status = 'pending';
-- at most one in-progress (unsubmitted) save per page, same idea
CREATE UNIQUE INDEX IF NOT EXISTS page_drafts_one_in_progress_per_page
  ON page_drafts(page_id) WHERE status = 'in_progress';
