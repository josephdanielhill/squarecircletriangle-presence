-- ──────────────────────────────────────────────────────────────
-- Migration: normalise changelog entry dates to ISO 8601
-- Run in Neon's SQL Editor
-- ──────────────────────────────────────────────────────────────

-- Helper: converts date strings like "15th August 2026" to "2026-08-15"
CREATE OR REPLACE FUNCTION sct_normalise_date(raw TEXT)
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  clean TEXT;
  parsed DATE;
BEGIN
  IF raw IS NULL OR raw = '' THEN
    RETURN raw;
  END IF;

  -- Already ISO (YYYY-MM-DD, YYYY-MM, YYYY)
  IF raw ~ '^\d{4}-\d{2}-\d{2}$' OR raw ~ '^\d{4}-\d{2}$' OR raw ~ '^\d{4}$' THEN
    RETURN raw;
  END IF;

  -- DD.MM.YYYY or D.M.YYYY
  IF raw ~ '^\d{1,2}\.\d{1,2}\.\d{4}$' THEN
    parsed := to_date(raw, 'DD.MM.YYYY');
    RETURN to_char(parsed, 'YYYY-MM-DD');
  END IF;

  -- Strip ordinal suffixes: 15th→15, 1st→1, 2nd→2, 3rd→3
  clean := regexp_replace(raw, '([0-9]+)(st|nd|rd|th)', '\1', 'gi');

  -- Remove stray commas (e.g. "August 15, 2026")
  clean := regexp_replace(clean, ',', '', 'g');

  -- Try "15 August 2026" / "15 Aug 2026"
  BEGIN
    parsed := to_date(clean, 'DD Month YYYY');
    RETURN to_char(parsed, 'YYYY-MM-DD');
  EXCEPTION WHEN OTHERS THEN
    BEGIN
      parsed := to_date(clean, 'DD Mon YYYY');
      RETURN to_char(parsed, 'YYYY-MM-DD');
    EXCEPTION WHEN OTHERS THEN
      BEGIN
        -- Try "August 15 2026" / "Aug 15 2026"
        parsed := to_date(clean, 'Month DD YYYY');
        RETURN to_char(parsed, 'YYYY-MM-DD');
      EXCEPTION WHEN OTHERS THEN
        BEGIN
          parsed := to_date(clean, 'Mon DD YYYY');
          RETURN to_char(parsed, 'YYYY-MM-DD');
        EXCEPTION WHEN OTHERS THEN
          RAISE WARNING 'Could not parse changelog date: %', raw;
          RETURN raw;
        END;
      END;
    END;
  END;
END;
$$;

-- ── pages ─────────────────────────────────────────────────────
UPDATE pages
SET blocks = (
  SELECT jsonb_agg(
    CASE
      WHEN block->>'type' = 'changelog_table' THEN
        jsonb_set(block, '{entries}', (
          SELECT jsonb_agg(
            CASE
              WHEN entry->>'date' IS DISTINCT FROM sct_normalise_date(entry->>'date')
              THEN jsonb_set(entry, '{date}', to_jsonb(sct_normalise_date(entry->>'date')))
              ELSE entry
            END
          )
          FROM jsonb_array_elements(block->'entries') AS entry
        ))
      ELSE block
    END
  )
  FROM jsonb_array_elements(pages.blocks) AS block
)
WHERE blocks::text LIKE '%changelog_table%';

-- ── page_drafts ───────────────────────────────────────────────
UPDATE page_drafts
SET blocks = (
  SELECT jsonb_agg(
    CASE
      WHEN block->>'type' = 'changelog_table' THEN
        jsonb_set(block, '{entries}', (
          SELECT jsonb_agg(
            CASE
              WHEN entry->>'date' IS DISTINCT FROM sct_normalise_date(entry->>'date')
              THEN jsonb_set(entry, '{date}', to_jsonb(sct_normalise_date(entry->>'date')))
              ELSE entry
            END
          )
          FROM jsonb_array_elements(block->'entries') AS entry
        ))
      ELSE block
    END
  )
  FROM jsonb_array_elements(page_drafts.blocks) AS block
)
WHERE blocks::text LIKE '%changelog_table%';

-- ── page_templates ────────────────────────────────────────────
UPDATE page_templates
SET blocks = (
  SELECT jsonb_agg(
    CASE
      WHEN block->>'type' = 'changelog_table' THEN
        jsonb_set(block, '{entries}', (
          SELECT jsonb_agg(
            CASE
              WHEN entry->>'date' IS DISTINCT FROM sct_normalise_date(entry->>'date')
              THEN jsonb_set(entry, '{date}', to_jsonb(sct_normalise_date(entry->>'date')))
              ELSE entry
            END
          )
          FROM jsonb_array_elements(block->'entries') AS entry
        ))
      ELSE block
    END
  )
  FROM jsonb_array_elements(page_templates.blocks) AS block
)
WHERE blocks::text LIKE '%changelog_table%';

-- ── cleanup ───────────────────────────────────────────────────
DROP FUNCTION IF EXISTS sct_normalise_date;

-- Done! Run this to verify:
-- SELECT id, blocks FROM pages WHERE blocks::text LIKE '%changelog_table%';
-- (All dates should now be YYYY-MM-DD format)