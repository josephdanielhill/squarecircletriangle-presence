import { useState } from 'react';
import type { Block, BlockType } from '../lib/blocks';
import { BLOCK_TYPE_LABELS, BLOCK_TYPES, createBlock } from '../lib/blocks';
import { BlockFields } from './BlockFields';

export function BlockEditor({ blocks, onChange }: { blocks: Block[]; onChange: (blocks: Block[]) => void }) {
  const [addType, setAddType] = useState<BlockType>('paragraph');

  const move = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= blocks.length) return;
    const copy = blocks.slice();
    [copy[index], copy[target]] = [copy[target], copy[index]];
    onChange(copy);
  };

  const remove = (index: number) => {
    onChange(blocks.filter((_, i) => i !== index));
  };

  const update = (index: number, next: Block) => {
    const copy = blocks.slice();
    copy[index] = next;
    onChange(copy);
  };

  return (
    <div className="block-editor">
      {blocks.length === 0 && <p className="field-hint">No blocks yet. Add one below to get started.</p>}
      {blocks.map((block, i) => (
        <div className="block-card" key={block.id}>
          <div className="block-card-head">
            <span className="block-type-tag">{BLOCK_TYPE_LABELS[block.type]}</span>
            <div className="block-card-actions">
              <button type="button" disabled={i === 0} onClick={() => move(i, -1)} title="Move up">↑</button>
              <button type="button" disabled={i === blocks.length - 1} onClick={() => move(i, 1)} title="Move down">↓</button>
              <button type="button" className="btn-icon-remove" onClick={() => remove(i)} title="Delete block">✕</button>
            </div>
          </div>
          <BlockFields block={block} onChange={(next) => update(i, next)} />
        </div>
      ))}

      <div className="add-block-row">
        <select className="field-input" value={addType} onChange={(e) => setAddType(e.target.value as BlockType)}>
          {BLOCK_TYPES.map((t) => <option key={t} value={t}>{BLOCK_TYPE_LABELS[t]}</option>)}
        </select>
        <button type="button" className="btn-secondary" onClick={() => onChange([...blocks, createBlock(addType)])}>
          + Add block
        </button>
      </div>
    </div>
  );
}
