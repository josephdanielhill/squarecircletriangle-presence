import { useState } from 'react';
import type { RichText } from '../lib/blocks';
import { parseRichText, serializeRichText } from '../lib/blocks';

// Small shared form primitives used across BlockFields editors.

export function RichTextField({
  value, onChange, rows = 2, placeholder, blockKey,
}: { value: RichText; onChange: (v: RichText) => void; rows?: number; placeholder?: string; blockKey: string }) {
  const [text, setText] = useState(() => serializeRichText(value));
  return (
    <textarea
      key={blockKey}
      className="field-textarea"
      rows={rows}
      value={text}
      placeholder={placeholder || 'Text… supports **bold**, _italic_, `code`, [link](https://...)'}
      onChange={(e) => { setText(e.target.value); onChange(parseRichText(e.target.value)); }}
    />
  );
}

export function TextField({
  value, onChange, placeholder, label,
}: { value: string; onChange: (v: string) => void; placeholder?: string; label?: string }) {
  return (
    <label className="field">
      {label && <span className="field-label">{label}</span>}
      <input className="field-input" type="text" value={value} placeholder={placeholder}
             onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

export function ArrayEditor<T>({
  items, onChange, renderItem, newItem, addLabel,
}: {
  items: T[];
  onChange: (items: T[]) => void;
  renderItem: (item: T, index: number, update: (next: T) => void) => React.ReactNode;
  newItem: () => T;
  addLabel: string;
}) {
  return (
    <div className="array-editor">
      {items.map((item, i) => (
        <div className="array-editor-row" key={i}>
          <div className="array-editor-content">
            {renderItem(item, i, (next) => {
              const copy = items.slice();
              copy[i] = next;
              onChange(copy);
            })}
          </div>
          <button type="button" className="btn-icon-remove" title="Remove"
                  onClick={() => onChange(items.filter((_, j) => j !== i))}>✕</button>
        </div>
      ))}
      <button type="button" className="btn-add-item" onClick={() => onChange([...items, newItem()])}>
        + {addLabel}
      </button>
    </div>
  );
}
