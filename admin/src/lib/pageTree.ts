import type { PageListItem } from './api';

const SECTION_ORDER = ['Home', 'Square', 'Circle', 'Triangle'] as const;

// All descendants of excludeId (inclusive) -- a page can't become its own
// ancestor, so these are unusable as a parent when editing excludeId.
function descendantsOf(pages: PageListItem[], excludeId: string): Set<string> {
  const blocked = new Set([excludeId]);
  let grew = true;
  while (grew) {
    grew = false;
    for (const p of pages) {
      if (p.parentId && blocked.has(p.parentId) && !blocked.has(p.id)) {
        blocked.add(p.id);
        grew = true;
      }
    }
  }
  return blocked;
}

export interface PageTreeRow {
  page: PageListItem;
  depth: number;
}

// Depth-first ordering of a section's pages, children directly under their
// parent, for rendering nested lists/tables.
export function flattenSection(pages: PageListItem[], section: string): PageTreeRow[] {
  const inSection = pages.filter((p) => p.section === section);
  const out: PageTreeRow[] = [];
  const walk = (parentId: string | null, depth: number) => {
    inSection
      .filter((p) => (p.parentId ?? null) === parentId)
      .forEach((p) => {
        out.push({ page: p, depth });
        walk(p.id, depth + 1);
      });
  };
  walk(null, 0);
  return out;
}

export interface ParentOption {
  value: string; // 'section:Home' | a page id
  label: string;
}

// Flat, indented option list for a single "parent" picker: one entry per
// section (top-level) plus one entry per eligible page, nested underneath.
export function buildParentOptions(pages: PageListItem[], excludeId?: string): ParentOption[] {
  const blocked = excludeId ? descendantsOf(pages, excludeId) : new Set<string>();
  const options: ParentOption[] = [];
  for (const section of SECTION_ORDER) {
    options.push({ value: `section:${section}`, label: `${section} (top level)` });
    flattenSection(pages, section).forEach(({ page, depth }) => {
      if (blocked.has(page.id)) return;
      options.push({ value: page.id, label: `${'— '.repeat(depth + 1)}${page.title}` });
    });
  }
  return options;
}

export function parentValueFor(page: { section: string; parentId: string | null }): string {
  return page.parentId ?? `section:${page.section}`;
}

export function parseParentValue(value: string): { section?: string; parentId: string | null } {
  if (value.startsWith('section:')) {
    return { section: value.slice('section:'.length), parentId: null };
  }
  return { parentId: value };
}
