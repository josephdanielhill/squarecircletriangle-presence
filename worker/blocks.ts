// Shared block-content schema. Mirrors public/block-renderer.jsx (global-script
// renderer for the CDN/Babel public site) and admin/src/components/BlockRenderer.tsx
// (ESM renderer used for the editor's live preview) -- the shape is duplicated in
// three places on purpose (see plan section 7), but must be kept in sync.

export const BLOCK_TYPES = [
  'heading',
  'paragraph',
  'list',
  'card_grid',
  'callout',
  'definition_list',
  'changelog_table',
  'table',
  'button_row',
  'profile_card',
  'image',
  'embed',
  'divider',
] as const;

export type BlockType = (typeof BLOCK_TYPES)[number];

export interface RichSpan {
  text: string;
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
  link?: { href: string };
}
export type RichText = RichSpan[];

export interface Block {
  id: string;
  type: BlockType;
  [key: string]: unknown;
}

/**
 * Lightweight structural validation for block arrays coming from the admin
 * or guest editors before they're written to Postgres. Not a full schema
 * validator -- just enough to reject obviously malformed payloads (wrong
 * types, unknown block types, missing required fields) so bad client state
 * can't corrupt a page's content.
 */
export function validateBlocks(input: unknown): { ok: true; blocks: Block[] } | { ok: false; error: string } {
  if (!Array.isArray(input)) return { ok: false, error: 'blocks must be an array' };

  for (const [i, raw] of input.entries()) {
    if (typeof raw !== 'object' || raw === null) {
      return { ok: false, error: `block ${i} must be an object` };
    }
    const b = raw as Record<string, unknown>;
    if (typeof b.id !== 'string' || !b.id) {
      return { ok: false, error: `block ${i} missing string id` };
    }
    if (typeof b.type !== 'string' || !(BLOCK_TYPES as readonly string[]).includes(b.type)) {
      return { ok: false, error: `block ${i} has unknown type: ${String(b.type)}` };
    }

    const err = validateBlockFields(b.type as BlockType, b, i);
    if (err) return { ok: false, error: err };
  }

  return { ok: true, blocks: input as Block[] };
}

function isRichText(v: unknown): v is RichText {
  return (
    Array.isArray(v) &&
    v.every(
      (s) =>
        typeof s === 'object' &&
        s !== null &&
        typeof (s as Record<string, unknown>).text === 'string'
    )
  );
}

function validateBlockFields(type: BlockType, b: Record<string, unknown>, i: number): string | null {
  switch (type) {
    case 'heading':
      if (b.level !== 2 && b.level !== 3) return `block ${i} (heading) needs level 2 or 3`;
      if (typeof b.text !== 'string') return `block ${i} (heading) needs string text`;
      return null;
    case 'paragraph':
      if (!isRichText(b.text)) return `block ${i} (paragraph) needs rich text array`;
      return null;
    case 'list':
      if (b.style !== 'bullet' && b.style !== 'number') return `block ${i} (list) needs style bullet|number`;
      if (!Array.isArray(b.items) || !b.items.every(isRichText)) return `block ${i} (list) needs items[] of rich text`;
      return null;
    case 'card_grid':
      if (!Array.isArray(b.cards)) return `block ${i} (card_grid) needs cards[]`;
      for (const c of b.cards as unknown[]) {
        if (typeof c !== 'object' || c === null) return `block ${i} (card_grid) has a malformed card`;
        const card = c as Record<string, unknown>;
        if (typeof card.title !== 'string') return `block ${i} (card_grid) card missing title`;
        if (!isRichText(card.body)) return `block ${i} (card_grid) card missing rich text body`;
      }
      return null;
    case 'callout':
      if (b.variant !== 'tip' && b.variant !== 'warn') return `block ${i} (callout) needs variant tip|warn`;
      if (!isRichText(b.text)) return `block ${i} (callout) needs rich text`;
      return null;
    case 'definition_list':
      if (!Array.isArray(b.items)) return `block ${i} (definition_list) needs items[]`;
      for (const it of b.items as unknown[]) {
        if (typeof it !== 'object' || it === null) return `block ${i} (definition_list) has a malformed item`;
        const item = it as Record<string, unknown>;
        if (typeof item.term !== 'string') return `block ${i} (definition_list) item missing term`;
        if (!isRichText(item.desc)) return `block ${i} (definition_list) item missing rich text desc`;
      }
      return null;
    case 'changelog_table':
      if (!Array.isArray(b.entries)) return `block ${i} (changelog_table) needs entries[]`;
      for (const e of b.entries as unknown[]) {
        if (typeof e !== 'object' || e === null) return `block ${i} (changelog_table) has a malformed entry`;
        const entry = e as Record<string, unknown>;
        if (typeof entry.date !== 'string' || typeof entry.title !== 'string') {
          return `block ${i} (changelog_table) entry needs date and title`;
        }
        if (!Array.isArray(entry.items) || !entry.items.every((x) => typeof x === 'string')) {
          return `block ${i} (changelog_table) entry needs items[] of strings`;
        }
      }
      return null;
    case 'table':
      if (!Array.isArray(b.columns) || !Array.isArray(b.rows)) return `block ${i} (table) needs columns[] and rows[]`;
      return null;
    case 'button_row':
      if (!Array.isArray(b.buttons)) return `block ${i} (button_row) needs buttons[]`;
      for (const btn of b.buttons as unknown[]) {
        if (typeof btn !== 'object' || btn === null) return `block ${i} (button_row) has a malformed button`;
        const button = btn as Record<string, unknown>;
        if (typeof button.label !== 'string' || typeof button.href !== 'string') {
          return `block ${i} (button_row) button needs label and href`;
        }
        if (button.style !== 'primary' && button.style !== 'secondary') {
          return `block ${i} (button_row) button needs style primary|secondary`;
        }
      }
      return null;
    case 'profile_card':
      if (typeof b.avatarInitials !== 'string' || typeof b.name !== 'string' || typeof b.role !== 'string') {
        return `block ${i} (profile_card) needs avatarInitials, name, role`;
      }
      if (!isRichText(b.bio)) return `block ${i} (profile_card) needs rich text bio`;
      return null;
    case 'image':
      if (typeof b.src !== 'string' || typeof b.alt !== 'string') return `block ${i} (image) needs src and alt`;
      return null;
    case 'embed':
      if (typeof b.url !== 'string' || !b.url) return `block ${i} (embed) needs a url`;
      return null;
    case 'divider':
      return null;
    default:
      return `block ${i} has unhandled type`;
  }
}
