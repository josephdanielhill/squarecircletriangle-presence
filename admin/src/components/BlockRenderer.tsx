// ESM/Vite twin of public/block-renderer.jsx, used for the editor's live
// preview. Kept in sync by hand -- see the note in worker/blocks.ts.
import * as React from 'react';
import type {
  Block, RichText, CardGridBlock as CardGridBlockT, ChangelogTableBlock as ChangelogTableBlockT,
  TableBlock as TableBlockT, ButtonRowBlock as ButtonRowBlockT, ProfileCardBlock as ProfileCardBlockT,
} from '../lib/blocks';

const GLYPHS: Record<string, JSX.Element> = {
  square: (
    <svg viewBox="0 0 16 16">
      <rect className="fill" x="1.6" y="1.6" width="12.8" height="12.8" />
      <rect className="stroke" x="1.6" y="1.6" width="12.8" height="12.8" />
    </svg>
  ),
  circle: (
    <svg viewBox="0 0 16 16">
      <circle className="fill" cx="8" cy="8" r="6.4" />
      <circle className="stroke" cx="8" cy="8" r="6.4" />
    </svg>
  ),
  triangle: (
    <svg viewBox="0 0 16 16">
      <polygon className="fill" points="8,1.4 14.6,14.4 1.4,14.4" />
      <polygon className="stroke" points="8,1.4 14.6,14.4 1.4,14.4" />
    </svg>
  ),
};

function RichTextView({ spans }: { spans: RichText | undefined }) {
  if (!spans || spans.length === 0) return null;
  return (
    <>
      {spans.map((s, i) => {
        let node: React.ReactNode = s.text;
        if (s.code) node = <code key="code">{node}</code>;
        if (s.bold) node = <strong key="b">{node}</strong>;
        if (s.italic) node = <em key="i">{node}</em>;
        if (s.link?.href) {
          const external = /^https?:\/\//.test(s.link.href);
          node = (
            <a key="a" className="inline" href={s.link.href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>
              {node}
            </a>
          );
        }
        return <span key={i}>{node}</span>;
      })}
    </>
  );
}

function CardGridView({ block }: { block: CardGridBlockT }) {
  return (
    <div className="card-grid">
      {block.cards.map((card, i) => {
        const Tag = card.href ? 'a' : 'div';
        const tagProps = card.href ? { href: card.href } : {};
        return (
          <Tag key={i} className="card" {...tagProps}>
            {card.icon && GLYPHS[card.icon] && <div className="card-icon">{GLYPHS[card.icon]}</div>}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: card.badge ? 6 : undefined }}>
              <h4 style={card.badge ? { margin: 0 } : undefined}>{card.title}</h4>
              {card.badge && <span className="card-badge">{card.badge}</span>}
            </div>
            <p><RichTextView spans={card.body} /></p>
            {card.arrowLabel && <span className="arrow">{card.arrowLabel}</span>}
          </Tag>
        );
      })}
    </div>
  );
}

function ChangelogTableView({ block }: { block: ChangelogTableBlockT }) {
  return (
    <div className="tbl">
      <table>
        <thead><tr><th style={{ width: 130 }}>Date</th><th>Changes &amp; Milestones</th></tr></thead>
        <tbody>
          {block.entries.map((entry, i) => (
            <tr key={i}>
              <td>{entry.date}</td>
              <td>
                <strong>{entry.title}</strong>
                <ul>{entry.items.map((item, j) => <li key={j}>{item}</li>)}</ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TableView({ block }: { block: TableBlockT }) {
  return (
    <div className="tbl">
      <table>
        <thead><tr>{block.columns.map((col, i) => <th key={i} style={col.width ? { width: col.width } : undefined}>{col.label}</th>)}</tr></thead>
        <tbody>
          {block.rows.map((row, i) => (
            <tr key={i}>{row.map((cell, j) => <td key={j}><RichTextView spans={cell} /></td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ButtonRowView({ block }: { block: ButtonRowBlockT }) {
  return (
    <div className="button-row">
      {block.buttons.map((btn, i) => (
        <a key={i} className={'btn btn-' + (btn.style || 'secondary')} href={btn.href}
           target={btn.external ? '_blank' : undefined} rel={btn.external ? 'noopener noreferrer' : undefined}>
          <span>{btn.label}</span>
          {btn.external && <span style={{ fontSize: 12 }}>↗</span>}
        </a>
      ))}
    </div>
  );
}

function ProfileCardView({ block }: { block: ProfileCardBlockT }) {
  return (
    <div className="profile-card">
      <div className="profile-card-avatar">{block.avatarInitials}</div>
      <div>
        <h4 className="profile-card-name">{block.name}</h4>
        <div className="profile-card-role">{block.role}</div>
        <p className="profile-card-bio"><RichTextView spans={block.bio} /></p>
      </div>
    </div>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case 'heading': {
      const Tag = block.level === 3 ? 'h3' : 'h2';
      return <Tag id={block.anchorId}>{block.text}</Tag>;
    }
    case 'paragraph':
      return <p><RichTextView spans={block.text} /></p>;
    case 'list': {
      const ListTag = block.style === 'number' ? 'ol' : 'ul';
      return <ListTag>{block.items.map((item, i) => <li key={i}><RichTextView spans={item} /></li>)}</ListTag>;
    }
    case 'card_grid': return <CardGridView block={block} />;
    case 'callout':
      return (
        <div className={'callout ' + block.variant}>
          <span className="ico">{block.variant === 'warn' ? '!' : '→'}</span>
          <span><RichTextView spans={block.text} /></span>
        </div>
      );
    case 'definition_list':
      return (
        <div className="dl">
          {block.items.map((item, i) => (
            <React.Fragment key={i}>
              <span className="term">{item.term}</span>
              <span className="desc"><RichTextView spans={item.desc} /></span>
            </React.Fragment>
          ))}
        </div>
      );
    case 'changelog_table': return <ChangelogTableView block={block} />;
    case 'table': return <TableView block={block} />;
    case 'button_row': return <ButtonRowView block={block} />;
    case 'profile_card': return <ProfileCardView block={block} />;
    case 'image':
      return (
        <figure className="block-image">
          <img src={block.src} alt={block.alt} />
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );
    case 'divider': return <hr className="divider" />;
    default: return null;
  }
}

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  if (!blocks || blocks.length === 0) return null;
  return <>{blocks.map((block) => <BlockView key={block.id} block={block} />)}</>;
}
