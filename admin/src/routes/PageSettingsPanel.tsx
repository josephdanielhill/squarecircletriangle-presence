import { useState } from 'react';
import { adminApi, type PageDetail, type PageListItem } from '../lib/api';
import { buildParentOptions, parentValueFor, parseParentValue } from '../lib/pageTree';

export function PageSettingsPanel({
  page, pages, onSaved,
}: { page: PageDetail; pages: PageListItem[]; onSaved: (p: PageDetail) => void }) {
  const [parentValue, setParentValue] = useState(() => parentValueFor({ section: page.section, parentId: page.parent_id }));
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const parentOptions = buildParentOptions(pages, page.id);
  const dirty = parentValue !== parentValueFor({ section: page.section, parentId: page.parent_id });

  const save = async () => {
    setBusy(true);
    setError(null);
    try {
      const { section, parentId } = parseParentValue(parentValue);
      const updated = await adminApi.updatePage(page.id, { section, parentId });
      onSaved(updated);
    } catch (e: any) {
      setError(e.message || 'Failed to save');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="form-card">
      <label className="field">
        <span className="field-label">Parent</span>
        <select className="field-input" value={parentValue} onChange={(e) => setParentValue(e.target.value)}>
          {parentOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <span className="field-hint">Choose a section to make this a top-level page, or an existing page to nest it underneath.</span>
      </label>
      {error && <p className="error-text">{error}</p>}
      <button type="button" className="btn-primary" disabled={!dirty || busy} onClick={save}>
        {busy ? 'Saving…' : 'Save'}
      </button>
    </div>
  );
}
