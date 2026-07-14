// Mirrors worker/blocks.ts. Kept in sync by hand -- see the note there.

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

export const BLOCK_TYPE_LABELS: Record<BlockType, string> = {
  heading: 'Heading',
  paragraph: 'Paragraph',
  list: 'List',
  card_grid: 'Card grid',
  callout: 'Callout',
  definition_list: 'Definition list',
  changelog_table: 'Changelog table',
  table: 'Table',
  button_row: 'Button row',
  profile_card: 'Profile card',
  image: 'Image',
  embed: 'Embed (YouTube)',
  divider: 'Divider',
};

export interface RichSpan {
  text: string;
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
  link?: { href: string };
}
export type RichText = RichSpan[];

export interface HeadingBlock { id: string; type: 'heading'; level: 2 | 3; text: string; anchorId?: string }
export interface ParagraphBlock { id: string; type: 'paragraph'; text: RichText }
export interface ListBlock { id: string; type: 'list'; style: 'bullet' | 'number'; items: RichText[] }
export interface CardGridCard { icon?: 'square' | 'circle' | 'triangle' | null; href?: string; title: string; body: RichText; badge?: string; arrowLabel?: string }
export interface CardGridBlock { id: string; type: 'card_grid'; cards: CardGridCard[] }
export interface CalloutBlock { id: string; type: 'callout'; variant: 'tip' | 'warn'; text: RichText }
export interface DefinitionListBlock { id: string; type: 'definition_list'; items: { term: string; desc: RichText }[] }
export interface ChangelogTableBlock { id: string; type: 'changelog_table'; entries: { date: string; title: string; items: string[] }[] }
export interface TableBlock { id: string; type: 'table'; columns: { label: string; width?: string }[]; rows: RichText[][] }
export interface ButtonRowButton { label: string; href: string; style: 'primary' | 'secondary'; external?: boolean }
export interface ButtonRowBlock { id: string; type: 'button_row'; buttons: ButtonRowButton[] }
export interface ProfileCardBlock { id: string; type: 'profile_card'; avatarInitials: string; name: string; role: string; bio: RichText }
export interface ImageBlock { id: string; type: 'image'; src: string; alt: string; caption?: string }
export interface EmbedBlock { id: string; type: 'embed'; url: string; caption?: string }
export interface DividerBlock { id: string; type: 'divider' }

export type Block =
  | HeadingBlock | ParagraphBlock | ListBlock | CardGridBlock | CalloutBlock
  | DefinitionListBlock | ChangelogTableBlock | TableBlock | ButtonRowBlock
  | ProfileCardBlock | ImageBlock | EmbedBlock | DividerBlock;

/**
 * Extracts a YouTube video ID from any of the common URL shapes people
 * paste (watch, youtu.be, embed, shorts). Returns null if the URL isn't
 * recognized as a YouTube link -- mirrored in public/block-renderer.jsx and
 * admin/src/components/BlockRenderer.tsx for rendering.
 */
export function youTubeIdFromUrl(url: string): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, '');
    if (host === 'youtu.be') {
      return u.pathname.slice(1).split('/')[0] || null;
    }
    if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'music.youtube.com') {
      if (u.pathname === '/watch') return u.searchParams.get('v');
      const embedMatch = u.pathname.match(/^\/(embed|shorts)\/([^/]+)/);
      if (embedMatch) return embedMatch[2];
    }
  } catch {
    return null;
  }
  return null;
}

export function newId(): string {
  return crypto.randomUUID();
}

export function slugify(text: string): string {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function createBlock(type: BlockType): Block {
  const id = newId();
  switch (type) {
    case 'heading': return { id, type, level: 2, text: 'New heading' };
    case 'paragraph': return { id, type, text: [{ text: 'New paragraph text.' }] };
    case 'list': return { id, type, style: 'bullet', items: [[{ text: 'First item' }]] };
    case 'card_grid': return { id, type, cards: [{ title: 'Card title', body: [{ text: 'Card body.' }] }] };
    case 'callout': return { id, type, variant: 'tip', text: [{ text: 'Callout text.' }] };
    case 'definition_list': return { id, type, items: [{ term: 'Term', desc: [{ text: 'Description.' }] }] };
    case 'changelog_table': return { id, type, entries: [{ date: '', title: 'Entry title', items: ['Change description.'] }] };
    case 'table': return { id, type, columns: [{ label: 'Column' }], rows: [[[{ text: '' }]]] };
    case 'button_row': return { id, type, buttons: [{ label: 'Button', href: '', style: 'primary' }] };
    case 'profile_card': return { id, type, avatarInitials: 'AB', name: 'Name', role: 'Role', bio: [{ text: 'Bio.' }] };
    case 'image': return { id, type, src: '', alt: '' };
    case 'embed': return { id, type, url: '' };
    case 'divider': return { id, type };
  }
}

// Markdown-lite <-> RichText spans. Not a full markdown parser -- just
// **bold**, _italic_, `code`, [text](href), sequentially, non-nested.
export function parseRichText(input: string): RichText {
  const spans: RichSpan[] = [];
  const re = /\*\*(.+?)\*\*|_(.+?)_|`(.+?)`|\[(.+?)\]\((.+?)\)/;
  let rest = input;
  while (rest.length > 0) {
    const m = re.exec(rest);
    if (!m) {
      spans.push({ text: rest });
      break;
    }
    if (m.index > 0) spans.push({ text: rest.slice(0, m.index) });
    if (m[1] !== undefined) spans.push({ text: m[1], bold: true });
    else if (m[2] !== undefined) spans.push({ text: m[2], italic: true });
    else if (m[3] !== undefined) spans.push({ text: m[3], code: true });
    else if (m[4] !== undefined) spans.push({ text: m[4], link: { href: m[5] } });
    rest = rest.slice(m.index + m[0].length);
  }
  return spans.length > 0 ? spans : [{ text: '' }];
}

export function serializeRichText(spans: RichText | undefined): string {
  if (!spans) return '';
  return spans
    .map((s) => {
      let t = s.text;
      if (s.link?.href) return `[${t}](${s.link.href})`;
      if (s.bold) t = `**${t}**`;
      else if (s.italic) t = `_${t}_`;
      else if (s.code) t = `\`${t}\``;
      return t;
    })
    .join('');
}
