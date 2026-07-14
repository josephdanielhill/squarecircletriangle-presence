#!/usr/bin/env node
// One-time migration: converts public/docs-content.jsx's hardcoded PAGES
// array into the CMS block-content model and seeds it into Postgres.
//
// Rather than hand-transcribing ~1900 lines of bespoke JSX into block JSON
// by hand (error-prone, easy to silently drop content), this parses the
// real file with @babel/parser and mechanically converts each page's
// body() JSX into blocks matching worker/blocks.ts's schema. Unrecognized
// JSX shapes fall back to a best-effort paragraph and print a WARNING so
// they can be reviewed by hand -- see the printed warnings after running.
//
// Usage:
//   node scripts/migrate-content.mjs            # dry run: prints/writes JSON, no DB writes
//   NEON_DATABASE_URL=... node scripts/migrate-content.mjs --write   # also upserts into Postgres
//
// Safe to re-run: upserts on page id.

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { parse } from '@babel/parser';
import _traverse from '@babel/traverse';
import * as t from '@babel/types';

const traverse = _traverse.default || _traverse;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SOURCE_FILE = path.join(__dirname, '..', 'public', 'docs-content.jsx');
const OUTPUT_FILE = path.join(__dirname, 'migrated-pages.json');

const warnings = [];
function warn(pageId, message) {
  warnings.push(`[${pageId}] ${message}`);
}

let currentPageId = '(unknown)';

// ---------- generic AST helpers ----------

function isElement(node, tagName) {
  return t.isJSXElement(node) && t.isJSXIdentifier(node.openingElement.name, { name: tagName });
}

function className(node) {
  if (!t.isJSXElement(node)) return '';
  const attr = node.openingElement.attributes.find(
    (a) => t.isJSXAttribute(a) && t.isJSXIdentifier(a.name, { name: 'className' })
  );
  if (!attr || !attr.value) return '';
  if (t.isStringLiteral(attr.value)) return attr.value.value;
  return '';
}

function getAttrString(node, name) {
  if (!t.isJSXElement(node)) return undefined;
  const attr = node.openingElement.attributes.find(
    (a) => t.isJSXAttribute(a) && t.isJSXIdentifier(a.name, { name })
  );
  if (!attr || !attr.value) return undefined;
  if (t.isStringLiteral(attr.value)) return attr.value.value;
  if (t.isJSXExpressionContainer(attr.value) && t.isStringLiteral(attr.value.expression)) {
    return attr.value.expression.value;
  }
  return undefined;
}

// Reads a property (e.g. `background`) out of a `style={{ ... }}` JSX attribute.
function getStyleProp(node, propName) {
  if (!t.isJSXElement(node)) return undefined;
  const attr = node.openingElement.attributes.find(
    (a) => t.isJSXAttribute(a) && t.isJSXIdentifier(a.name, { name: 'style' })
  );
  if (!attr || !t.isJSXExpressionContainer(attr.value) || !t.isObjectExpression(attr.value.expression)) return undefined;
  const prop = attr.value.expression.properties.find(
    (p) => t.isObjectProperty(p) && (t.isIdentifier(p.key, { name: propName }) || t.isStringLiteral(p.key, { value: propName }))
  );
  if (!prop) return undefined;
  if (t.isStringLiteral(prop.value)) return prop.value.value;
  return undefined;
}

function elementChildren(node) {
  if (!t.isJSXElement(node) && !t.isJSXFragment(node)) return [];
  return node.children;
}

// Non-whitespace-only element/expression children (drops pure-whitespace JSXText).
function significantChildren(node) {
  return elementChildren(node).filter((c) => {
    if (t.isJSXText(c)) return c.value.trim().length > 0;
    if (t.isJSXExpressionContainer(c) && t.isJSXEmptyExpression(c.expression)) return false;
    return true;
  });
}

function normalizeText(raw) {
  if (!/\n/.test(raw)) return raw;
  return raw.split('\n').map((s) => s.trim()).filter((s) => s.length > 0).join(' ');
}

// Flattens a node's descendant text into a single plain string (used for
// headings, badges, arrow labels -- places we know are plain text).
function flattenText(node) {
  if (t.isJSXText(node)) return normalizeText(node.value);
  if (t.isStringLiteral(node)) return node.value;
  if (t.isJSXExpressionContainer(node)) {
    if (t.isStringLiteral(node.expression)) return node.expression.value;
    if (t.isJSXEmptyExpression(node.expression)) return '';
    return '';
  }
  if (t.isJSXElement(node) || t.isJSXFragment(node)) {
    return elementChildren(node).map(flattenText).join('').replace(/\s+/g, ' ').trim();
  }
  return '';
}

// Converts a run of JSX children into RichText spans (bold/italic/code/link).
function richTextFromChildren(children) {
  const spans = [];
  const push = (span) => {
    if (span.text !== '') spans.push(span);
  };

  for (const child of children) {
    if (t.isJSXText(child)) {
      push({ text: normalizeText(child.value) });
    } else if (t.isJSXExpressionContainer(child)) {
      if (t.isStringLiteral(child.expression)) push({ text: child.expression.value });
      // other expressions (e.g. {' '}) with non-string values are ignored
    } else if (isElement(child, 'strong')) {
      push({ text: flattenText(child), bold: true });
    } else if (isElement(child, 'em')) {
      push({ text: flattenText(child), italic: true });
    } else if (isElement(child, 'code')) {
      push({ text: flattenText(child), code: true });
    } else if (isElement(child, 'a')) {
      const href = getAttrString(child, 'href') || '';
      push({ text: flattenText(child), link: { href } });
    } else if (isElement(child, 'A')) {
      // local <A page="x" /> helper component -> internal hash link
      const page = getAttrString(child, 'page');
      const href = getAttrString(child, 'href') || (page ? '#/' + page : '#/');
      push({ text: flattenText(child), link: { href } });
    } else {
      warn(currentPageId, `richTextFromChildren: unhandled inline node type, using flattened text`);
      push({ text: flattenText(child) });
    }
  }

  return spans.length > 0 ? spans : [{ text: '' }];
}

const newId = () => crypto.randomUUID();
const slugify = (s) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// ---------- block converters ----------

function convertCardGridCard(cardEl) {
  const kids = significantChildren(cardEl);
  const href = getAttrString(cardEl, 'href');

  const iconDiv = kids.find((k) => isElement(k, 'div') && className(k).includes('card-icon'));
  let icon;
  if (iconDiv) {
    const hasGRef = elementChildren(iconDiv).some(
      (c) => t.isJSXExpressionContainer(c) && t.isMemberExpression(c.expression) && t.isIdentifier(c.expression.object, { name: 'G' })
    );
    if (hasGRef) {
      const expr = elementChildren(iconDiv).find((c) => t.isJSXExpressionContainer(c)).expression;
      icon = expr.property.name;
    } else if (elementChildren(iconDiv).some((c) => isElement(c, 'svg'))) {
      icon = 'triangle'; // only raw inline <svg> shape used in this corpus is the triangle glyph
    }
  }

  // Title may be a bare <h4>, or wrapped with a sibling badge <span> inside a <div>.
  let title = '';
  let badge;
  const bareH4 = kids.find((k) => isElement(k, 'h4'));
  if (bareH4) {
    title = flattenText(bareH4);
  } else {
    const wrapper = kids.find((k) => isElement(k, 'div') && !className(k).includes('card-icon'));
    if (wrapper) {
      const h4 = significantChildren(wrapper).find((k) => isElement(k, 'h4'));
      const span = significantChildren(wrapper).find((k) => isElement(k, 'span'));
      if (h4) title = flattenText(h4);
      if (span) badge = flattenText(span);
    }
  }

  const pEl = kids.find((k) => isElement(k, 'p'));
  const body = pEl ? richTextFromChildren(significantChildren(pEl).length ? pEl.children : []) : [{ text: '' }];

  const arrowSpan = kids.find((k) => isElement(k, 'span') && className(k).includes('arrow'));
  const arrowLabel = arrowSpan ? flattenText(arrowSpan) : undefined;

  const card = { title, body };
  if (href) card.href = href;
  if (icon) card.icon = icon;
  if (badge) card.badge = badge;
  if (arrowLabel) card.arrowLabel = arrowLabel;
  return card;
}

function convertButtonRowDiv(divEl) {
  const buttons = significantChildren(divEl).filter((k) => isElement(k, 'a')).map((a) => {
    const href = getAttrString(a, 'href') || '';
    const external = getAttrString(a, 'target') === '_blank';
    const spans = significantChildren(a).filter((c) => isElement(c, 'span'));
    const label = spans.length > 0 ? flattenText(spans[0]) : flattenText(a);
    const background = getStyleProp(a, 'background');
    const style = background === 'var(--accent-bg)' ? 'primary' : 'secondary';
    const btn = { label, href, style };
    if (external) btn.external = true;
    return btn;
  });
  return { id: newId(), type: 'button_row', buttons };
}

function convertProfileCardDiv(outerDiv) {
  const panel = significantChildren(outerDiv).find((k) => isElement(k, 'div'));
  const panelKids = panel ? significantChildren(panel).filter((k) => isElement(k, 'div')) : [];
  const avatarDiv = panelKids[0];
  const infoDiv = panelKids[1];
  const avatarInitials = avatarDiv ? flattenText(avatarDiv) : '';
  let name = '';
  let role = '';
  let bio = [{ text: '' }];
  if (infoDiv) {
    const infoKids = significantChildren(infoDiv);
    const h4 = infoKids.find((k) => isElement(k, 'h4'));
    const roleDiv = infoKids.find((k) => isElement(k, 'div'));
    const p = infoKids.find((k) => isElement(k, 'p'));
    if (h4) name = flattenText(h4);
    if (roleDiv) role = flattenText(roleDiv);
    if (p) bio = richTextFromChildren(p.children);
  }
  return { id: newId(), type: 'profile_card', avatarInitials, name, role, bio };
}

function looksLikeProfileCardDiv(divEl) {
  const panel = significantChildren(divEl).find((k) => isElement(k, 'div'));
  if (!panel) return false;
  const panelKids = significantChildren(panel).filter((k) => isElement(k, 'div'));
  if (panelKids.length < 2) return false;
  return getStyleProp(panelKids[0], 'borderRadius') === '50%';
}

function looksLikeButtonRowDiv(divEl) {
  const kids = significantChildren(divEl).filter((k) => isElement(k, 'a'));
  if (kids.length === 0) return false;
  return kids.every((a) => a.openingElement.attributes.some((attr) => t.isJSXAttribute(attr) && t.isJSXIdentifier(attr.name, { name: 'onMouseOver' })));
}

function convertNode(node) {
  if (t.isJSXText(node) || (t.isJSXExpressionContainer(node) && t.isJSXEmptyExpression(node.expression))) {
    return null; // whitespace, already filtered mostly, defensive no-op
  }

  if (isElement(node, 'h2') || isElement(node, 'h3')) {
    const anchorId = getAttrString(node, 'id');
    const block = { id: newId(), type: 'heading', level: isElement(node, 'h3') ? 3 : 2, text: flattenText(node) };
    if (anchorId) block.anchorId = anchorId;
    return block;
  }

  if (isElement(node, 'p')) {
    return { id: newId(), type: 'paragraph', text: richTextFromChildren(node.children) };
  }

  if (isElement(node, 'ul') || isElement(node, 'ol')) {
    const items = significantChildren(node).filter((k) => isElement(k, 'li')).map((li) => richTextFromChildren(li.children));
    return { id: newId(), type: 'list', style: isElement(node, 'ol') ? 'number' : 'bullet', items };
  }

  if (isElement(node, 'div')) {
    const cls = className(node);

    if (cls.includes('card-grid')) {
      const cards = significantChildren(node).filter((k) => isElement(k, 'a') || isElement(k, 'div')).map(convertCardGridCard);
      return { id: newId(), type: 'card_grid', cards };
    }

    if (cls.includes('callout')) {
      const variant = cls.includes('warn') ? 'warn' : 'tip';
      const spans = significantChildren(node).filter((k) => isElement(k, 'span'));
      const messageSpan = spans.find((s) => !className(s).includes('ico')) || spans[spans.length - 1];
      return { id: newId(), type: 'callout', variant, text: messageSpan ? richTextFromChildren(messageSpan.children) : [{ text: '' }] };
    }

    if (cls === 'dl') {
      const spans = significantChildren(node).filter((k) => isElement(k, 'span'));
      const items = [];
      for (let i = 0; i < spans.length; i += 2) {
        const termSpan = spans[i];
        const descSpan = spans[i + 1];
        if (!termSpan || !descSpan) { warn(currentPageId, 'dl: odd number of term/desc spans'); break; }
        items.push({ term: flattenText(termSpan), desc: richTextFromChildren(descSpan.children) });
      }
      return { id: newId(), type: 'definition_list', items };
    }

    if (cls === 'tbl') {
      const table = significantChildren(node).find((k) => isElement(k, 'table'));
      const tbody = table ? significantChildren(table).find((k) => isElement(k, 'tbody')) : null;
      const rows = tbody ? significantChildren(tbody).filter((k) => isElement(k, 'tr')) : [];
      const entries = rows.map((tr) => {
        const tds = significantChildren(tr).filter((k) => isElement(k, 'td'));
        const date = tds[0] ? flattenText(tds[0]) : '';
        const cell = tds[1];
        const cellKids = cell ? significantChildren(cell) : [];
        const strongEl = cellKids.find((k) => isElement(k, 'strong'));
        const ulEl = cellKids.find((k) => isElement(k, 'ul'));
        const title = strongEl ? flattenText(strongEl) : '';
        const items = ulEl ? significantChildren(ulEl).filter((k) => isElement(k, 'li')).map(flattenText) : [];
        return { date, title, items };
      });
      return { id: newId(), type: 'changelog_table', entries };
    }

    if (looksLikeProfileCardDiv(node)) {
      return convertProfileCardDiv(node);
    }

    if (looksLikeButtonRowDiv(node)) {
      return convertButtonRowDiv(node);
    }

    warn(currentPageId, `unrecognized <div className="${cls}">, falling back to flattened paragraph`);
    const text = flattenText(node);
    return text ? { id: newId(), type: 'paragraph', text: [{ text }] } : null;
  }

  warn(currentPageId, `unrecognized top-level node <${node.openingElement?.name?.name || node.type}>, falling back to flattened paragraph`);
  const text = flattenText(node);
  return text ? { id: newId(), type: 'paragraph', text: [{ text }] } : null;
}

function convertBody(fragmentOrElement) {
  const children = significantChildren(fragmentOrElement);
  const blocks = [];
  for (const child of children) {
    const block = convertNode(child);
    if (block) blocks.push(block);
  }
  return blocks;
}

// ---------- page-level extraction ----------

function objLit(node, key) {
  if (!t.isObjectExpression(node)) return undefined;
  const prop = node.properties.find((p) => t.isObjectProperty(p) && t.isIdentifier(p.key, { name: key }));
  if (!prop) return undefined;
  const v = prop.value;
  if (t.isStringLiteral(v)) return v.value;
  if (t.isBooleanLiteral(v)) return v.value;
  if (t.isNullLiteral(v)) return null;
  return undefined;
}

function extractPage(pageObjExpr) {
  const id = objLit(pageObjExpr, 'id');
  currentPageId = id || '(unknown)';

  const bodyProp = pageObjExpr.properties.find((p) => t.isObjectProperty(p) && t.isIdentifier(p.key, { name: 'body' }));
  let blocks = [];
  if (bodyProp && t.isArrowFunctionExpression(bodyProp.value)) {
    const arrowBody = bodyProp.value.body;
    if (t.isJSXFragment(arrowBody) || t.isJSXElement(arrowBody)) {
      blocks = convertBody(arrowBody);
    } else {
      warn(id, 'body() is not a simple JSX-returning arrow; skipped');
    }
  }

  const updated = objLit(pageObjExpr, 'updated');

  return {
    id,
    section: objLit(pageObjExpr, 'section'),
    title: objLit(pageObjExpr, 'title'),
    eyebrow: objLit(pageObjExpr, 'eyebrow') ?? null,
    lede: objLit(pageObjExpr, 'lede') ?? null,
    ledeQuote: !!objLit(pageObjExpr, 'ledeQuote'),
    sectionTop: !!objLit(pageObjExpr, 'sectionTop'),
    icon: objLit(pageObjExpr, 'icon') ?? null,
    updatedLabel: updated && updated.length > 0 ? updated : null,
    blocks,
  };
}

// ---------- main ----------

function main() {
  const code = readFileSync(SOURCE_FILE, 'utf8');
  const ast = parse(code, { sourceType: 'module', plugins: ['jsx'] });

  let pagesArrayExpr = null;
  traverse(ast, {
    VariableDeclarator(nodePath) {
      if (t.isIdentifier(nodePath.node.id, { name: 'PAGES' }) && t.isArrayExpression(nodePath.node.init)) {
        pagesArrayExpr = nodePath.node.init;
      }
    },
  });

  if (!pagesArrayExpr) {
    console.error('Could not find `const PAGES = [...]` in ' + SOURCE_FILE);
    process.exit(1);
  }

  const pages = pagesArrayExpr.elements
    .filter((el) => t.isObjectExpression(el))
    .map((el, i) => {
      try {
        return extractPage(el);
      } catch (e) {
        warn(`(page index ${i})`, `failed to convert: ${e.message}`);
        return null;
      }
    })
    .filter(Boolean);

  writeFileSync(OUTPUT_FILE, JSON.stringify(pages, null, 2));
  console.log(`Converted ${pages.length} pages -> ${path.relative(process.cwd(), OUTPUT_FILE)}`);

  if (warnings.length > 0) {
    console.log(`\n${warnings.length} warning(s) -- review these pages/blocks by hand:`);
    for (const w of warnings) console.log('  ' + w);
  } else {
    console.log('No warnings.');
  }

  const shouldWrite = process.argv.includes('--write');
  if (!shouldWrite) {
    console.log('\nDry run only (pass --write with NEON_DATABASE_URL set to seed Postgres).');
    return;
  }

  if (!process.env.NEON_DATABASE_URL) {
    console.error('\n--write requires NEON_DATABASE_URL to be set.');
    process.exit(1);
  }

  seedDatabase(pages).catch((e) => {
    console.error('Database seed failed:', e);
    process.exit(1);
  });
}

async function seedDatabase(pages) {
  const { Client } = await import('pg');
  const client = new Client({ connectionString: process.env.NEON_DATABASE_URL });
  await client.connect();
  try {
    let sortOrder = {};
    for (const p of pages) {
      sortOrder[p.section] = (sortOrder[p.section] || 0) + 1;
      await client.query(
        `INSERT INTO pages (id, section, title, eyebrow, lede, lede_quote, section_top, icon, sort_order, blocks, status, updated_label)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10::jsonb,'published',$11)
         ON CONFLICT (id) DO UPDATE SET
           section = $2, title = $3, eyebrow = $4, lede = $5, lede_quote = $6,
           section_top = $7, icon = $8, sort_order = $9, blocks = $10::jsonb,
           updated_label = $11, updated_at = now()`,
        [
          p.id, p.section, p.title, p.eyebrow, p.lede, p.ledeQuote, p.sectionTop, p.icon,
          sortOrder[p.section], JSON.stringify(p.blocks), p.updatedLabel,
        ]
      );
      console.log(`  seeded ${p.id}`);
    }
    console.log(`\nSeeded ${pages.length} pages into Postgres.`);
  } finally {
    await client.end();
  }
}

main();
