import type { Block, CardGridCard } from '../lib/blocks';
import { ArrayEditor, RichTextField, TextField } from './fields';

export function BlockFields({ block, onChange }: { block: Block; onChange: (b: Block) => void }) {
  switch (block.type) {
    case 'heading':
      return (
        <div className="fields-grid">
          <label className="field">
            <span className="field-label">Level</span>
            <select className="field-input" value={block.level}
                    onChange={(e) => onChange({ ...block, level: Number(e.target.value) as 2 | 3 })}>
              <option value={2}>H2</option>
              <option value={3}>H3</option>
            </select>
          </label>
          <TextField label="Text" value={block.text} onChange={(text) => onChange({ ...block, text })} />
          <TextField label="Anchor id (optional, for the on-page TOC)" value={block.anchorId || ''}
                     onChange={(anchorId) => onChange({ ...block, anchorId })} />
        </div>
      );

    case 'paragraph':
      return <RichTextField blockKey={block.id} value={block.text} rows={4} onChange={(text) => onChange({ ...block, text })} />;

    case 'list':
      return (
        <div>
          <label className="field" style={{ marginBottom: 8 }}>
            <span className="field-label">Style</span>
            <select className="field-input" value={block.style}
                    onChange={(e) => onChange({ ...block, style: e.target.value as 'bullet' | 'number' })}>
              <option value="bullet">Bullet</option>
              <option value="number">Numbered</option>
            </select>
          </label>
          <ArrayEditor
            items={block.items}
            addLabel="item"
            newItem={() => [{ text: '' }]}
            onChange={(items) => onChange({ ...block, items })}
            renderItem={(item, i, update) => (
              <RichTextField blockKey={block.id + '-' + i} value={item} onChange={update} />
            )}
          />
        </div>
      );

    case 'card_grid':
      return (
        <ArrayEditor<CardGridCard>
          items={block.cards}
          addLabel="card"
          newItem={() => ({ title: 'Card title', body: [{ text: '' }] })}
          onChange={(cards) => onChange({ ...block, cards })}
          renderItem={(card, i, update) => (
            <div className="fields-grid">
              <TextField label="Title" value={card.title} onChange={(title) => update({ ...card, title })} />
              <TextField label="Link (optional)" value={card.href || ''} onChange={(href) => update({ ...card, href })} />
              <label className="field">
                <span className="field-label">Icon (optional)</span>
                <select className="field-input" value={card.icon || ''}
                        onChange={(e) => update({ ...card, icon: (e.target.value || null) as any })}>
                  <option value="">None</option>
                  <option value="square">Square</option>
                  <option value="circle">Circle</option>
                  <option value="triangle">Triangle</option>
                </select>
              </label>
              <TextField label="Badge (optional, e.g. SUNSET)" value={card.badge || ''} onChange={(badge) => update({ ...card, badge })} />
              <TextField label="Arrow label (optional, e.g. 'Learn more →')" value={card.arrowLabel || ''} onChange={(arrowLabel) => update({ ...card, arrowLabel })} />
              <div>
                <span className="field-label">Body</span>
                <RichTextField blockKey={block.id + '-' + i} value={card.body} onChange={(body) => update({ ...card, body })} />
              </div>
            </div>
          )}
        />
      );

    case 'callout':
      return (
        <div>
          <label className="field" style={{ marginBottom: 8 }}>
            <span className="field-label">Variant</span>
            <select className="field-input" value={block.variant}
                    onChange={(e) => onChange({ ...block, variant: e.target.value as 'tip' | 'warn' })}>
              <option value="tip">Tip</option>
              <option value="warn">Warning</option>
            </select>
          </label>
          <RichTextField blockKey={block.id} value={block.text} onChange={(text) => onChange({ ...block, text })} />
        </div>
      );

    case 'definition_list':
      return (
        <ArrayEditor
          items={block.items}
          addLabel="term"
          newItem={() => ({ term: '', desc: [{ text: '' }] })}
          onChange={(items) => onChange({ ...block, items })}
          renderItem={(item, i, update) => (
            <div className="fields-grid">
              <TextField label="Term" value={item.term} onChange={(term) => update({ ...item, term })} />
              <div>
                <span className="field-label">Description</span>
                <RichTextField blockKey={block.id + '-' + i} value={item.desc} onChange={(desc) => update({ ...item, desc })} />
              </div>
            </div>
          )}
        />
      );

    case 'changelog_table':
      return (
        <ArrayEditor
          items={block.entries}
          addLabel="changelog entry"
          newItem={() => ({ date: '', title: '', items: [''] })}
          onChange={(entries) => onChange({ ...block, entries })}
          renderItem={(entry, i, update) => (
            <div className="fields-grid">
              <TextField label="Date" value={entry.date} placeholder="e.g. 03 May 2026" onChange={(date) => update({ ...entry, date })} />
              <TextField label="Title" value={entry.title} onChange={(title) => update({ ...entry, title })} />
              <div>
                <span className="field-label">Change items</span>
                <ArrayEditor
                  items={entry.items}
                  addLabel="change item"
                  newItem={() => ''}
                  onChange={(items) => update({ ...entry, items })}
                  renderItem={(text, j, updateText) => (
                    <input className="field-input" type="text" value={text} onChange={(e) => updateText(e.target.value)} />
                  )}
                />
              </div>
            </div>
          )}
        />
      );

    case 'table':
      return (
        <div>
          <div>
            <span className="field-label">Columns</span>
            <ArrayEditor
              items={block.columns}
              addLabel="column"
              newItem={() => ({ label: 'Column' })}
              onChange={(columns) => onChange({ ...block, columns })}
              renderItem={(col, i, update) => (
                <TextField value={col.label} onChange={(label) => update({ ...col, label })} />
              )}
            />
          </div>
          <div style={{ marginTop: 12 }}>
            <span className="field-label">Rows</span>
            <ArrayEditor
              items={block.rows}
              addLabel="row"
              newItem={() => block.columns.map(() => [{ text: '' }])}
              onChange={(rows) => onChange({ ...block, rows })}
              renderItem={(row, i, updateRow) => (
                <div className="fields-grid">
                  {row.map((cell, j) => (
                    <RichTextField key={j} blockKey={block.id + '-' + i + '-' + j} value={cell}
                                   onChange={(text) => { const copy = row.slice(); copy[j] = text; updateRow(copy); }} />
                  ))}
                </div>
              )}
            />
          </div>
        </div>
      );

    case 'button_row':
      return (
        <ArrayEditor
          items={block.buttons}
          addLabel="button"
          newItem={() => ({ label: 'Button', href: '', style: 'primary' as const })}
          onChange={(buttons) => onChange({ ...block, buttons })}
          renderItem={(btn, i, update) => (
            <div className="fields-grid">
              <TextField label="Label" value={btn.label} onChange={(label) => update({ ...btn, label })} />
              <TextField label="Link" value={btn.href} onChange={(href) => update({ ...btn, href })} />
              <label className="field">
                <span className="field-label">Style</span>
                <select className="field-input" value={btn.style}
                        onChange={(e) => update({ ...btn, style: e.target.value as 'primary' | 'secondary' })}>
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                </select>
              </label>
              <label className="field field-checkbox">
                <input type="checkbox" checked={!!btn.external} onChange={(e) => update({ ...btn, external: e.target.checked })} />
                <span className="field-label">Opens in new tab (external link)</span>
              </label>
            </div>
          )}
        />
      );

    case 'profile_card':
      return (
        <div className="fields-grid">
          <TextField label="Avatar initials" value={block.avatarInitials} onChange={(avatarInitials) => onChange({ ...block, avatarInitials })} />
          <TextField label="Name" value={block.name} onChange={(name) => onChange({ ...block, name })} />
          <TextField label="Role" value={block.role} onChange={(role) => onChange({ ...block, role })} />
          <div>
            <span className="field-label">Bio</span>
            <RichTextField blockKey={block.id} value={block.bio} onChange={(bio) => onChange({ ...block, bio })} />
          </div>
        </div>
      );

    case 'image':
      return (
        <div className="fields-grid">
          <TextField label="Image URL" value={block.src} placeholder="https://…" onChange={(src) => onChange({ ...block, src })} />
          <TextField label="Alt text" value={block.alt} onChange={(alt) => onChange({ ...block, alt })} />
          <TextField label="Caption (optional)" value={block.caption || ''} onChange={(caption) => onChange({ ...block, caption })} />
        </div>
      );

    case 'divider':
      return <p className="field-hint">A horizontal divider line. No fields.</p>;

    default:
      return null;
  }
}
