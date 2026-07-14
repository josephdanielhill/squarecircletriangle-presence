/* eslint-disable */
// block-renderer.jsx: renders the structured block content model used by the
// CMS. This is the CDN/Babel (global-script) rendering of the block schema;
// admin/src/components/BlockRenderer.tsx is the ESM/Vite equivalent used for
// the editor's live preview. The two are kept in sync by hand -- see
// worker/blocks.ts for the canonical shape both must match.

function RichTextView({ spans }) {
  if (!spans || spans.length === 0) return null;
  return (
    <>
      {spans.map((s, i) => {
        let node = s.text;
        if (s.code) node = <code key="code">{node}</code>;
        if (s.bold) node = <strong key="b">{node}</strong>;
        if (s.italic) node = <em key="i">{node}</em>;
        if (s.link && s.link.href) {
          const external = /^https?:\/\//.test(s.link.href);
          node = (
            <a
              key="a"
              className="inline"
              href={s.link.href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
            >
              {node}
            </a>
          );
        }
        return <React.Fragment key={i}>{node}</React.Fragment>;
      })}
    </>
  );
}

function CardGridBlock({ block }) {
  const G = window.SCT_GLYPHS;
  return (
    <div className="card-grid">
      {block.cards.map((card, i) => {
        const Tag = card.href ? 'a' : 'div';
        const tagProps = card.href ? { href: card.href } : {};
        return (
          <Tag key={i} className="card" {...tagProps}>
            {card.icon && G[card.icon] && (
              <div className="card-icon">{G[card.icon]}</div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: card.badge ? '6px' : undefined }}>
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

function ChangelogTableBlock({ block }) {
  return (
    <div className="tbl">
      <table>
        <thead>
          <tr>
            <th style={{ width: '130px' }}>Date</th>
            <th>Changes &amp; Milestones</th>
          </tr>
        </thead>
        <tbody>
          {block.entries.map((entry, i) => (
            <tr key={i}>
              <td>{entry.date}</td>
              <td>
                <strong>{entry.title}</strong>
                <ul>
                  {entry.items.map((item, j) => <li key={j}>{item}</li>)}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TableBlock({ block }) {
  return (
    <div className="tbl">
      <table>
        <thead>
          <tr>
            {block.columns.map((col, i) => (
              <th key={i} style={col.width ? { width: col.width } : undefined}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => <td key={j}><RichTextView spans={cell} /></td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ButtonRowBlock({ block }) {
  return (
    <div className="button-row">
      {block.buttons.map((btn, i) => (
        <a
          key={i}
          className={'btn btn-' + (btn.style || 'secondary')}
          href={btn.href}
          target={btn.external ? '_blank' : undefined}
          rel={btn.external ? 'noopener noreferrer' : undefined}
        >
          <span>{btn.label}</span>
          {btn.external && <span style={{ fontSize: '12px' }}>↗</span>}
        </a>
      ))}
    </div>
  );
}

function ProfileCardBlock({ block }) {
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

function BlockView({ block }) {
  switch (block.type) {
    case 'heading': {
      const Tag = block.level === 3 ? 'h3' : 'h2';
      return <Tag id={block.anchorId}>{block.text}</Tag>;
    }
    case 'paragraph':
      return <p><RichTextView spans={block.text} /></p>;
    case 'list': {
      const ListTag = block.style === 'number' ? 'ol' : 'ul';
      return (
        <ListTag>
          {block.items.map((item, i) => <li key={i}><RichTextView spans={item} /></li>)}
        </ListTag>
      );
    }
    case 'card_grid':
      return <CardGridBlock block={block} />;
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
    case 'changelog_table':
      return <ChangelogTableBlock block={block} />;
    case 'table':
      return <TableBlock block={block} />;
    case 'button_row':
      return <ButtonRowBlock block={block} />;
    case 'profile_card':
      return <ProfileCardBlock block={block} />;
    case 'image':
      return (
        <figure className="block-image">
          <img src={block.src} alt={block.alt} />
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );
    case 'divider':
      return <hr className="divider" />;
    default:
      return null;
  }
}

window.SCT_BlockRenderer = function BlockRenderer({ blocks }) {
  if (!blocks || blocks.length === 0) return null;
  return (
    <>
      {blocks.map((block) => <BlockView key={block.id} block={block} />)}
    </>
  );
};
