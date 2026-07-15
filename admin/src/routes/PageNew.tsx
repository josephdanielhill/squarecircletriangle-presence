import { useEffect, useState } from 'react';
import { adminApi } from '../lib/api';
import { useRouter } from '../lib/router';
import { slugify } from '../lib/blocks';
import { buildParentOptions, parseParentValue } from '../lib/pageTree';
import type { PageListItem } from '../lib/api';

export function PageNew() {
  const { navigate } = useRouter();
  const [pages, setPages] = useState<PageListItem[]>([]);
  const [title, setTitle] = useState('');
  const [id, setId] = useState('');
  const [idTouched, setIdTouched] = useState(false);
  const [parentValue, setParentValue] = useState('section:Triangle');
  const [eyebrow, setEyebrow] = useState('');
  const [lede, setLede] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => { adminApi.listPages().then(setPages).catch(() => {}); }, []);

  const parentOptions = buildParentOptions(pages);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const { section, parentId } = parseParentValue(parentValue);
      const page = await adminApi.createPage({ id, section, parentId, title, eyebrow, lede });
      navigate(`/admin/pages/${page.id}/edit`);
    } catch (err: any) {
      setError(err.message || 'Failed to create page');
      setBusy(false);
    }
  };

  return (
    <div>
      <h1>New page</h1>
      <form className="form-card" onSubmit={submit}>
        <label className="field">
          <span className="field-label">Parent</span>
          <select className="field-input" value={parentValue} onChange={(e) => setParentValue(e.target.value)}>
            {parentOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <span className="field-hint">Choose a section for a top-level page, or an existing page to nest under it.</span>
        </label>
        <label className="field">
          <span className="field-label">Title</span>
          <input className="field-input" type="text" required value={title}
                 onChange={(e) => {
                   setTitle(e.target.value);
                   if (!idTouched) setId(slugify(e.target.value));
                 }} />
        </label>
        <label className="field">
          <span className="field-label">URL slug</span>
          <input className="field-input" type="text" required value={id}
                 pattern="[a-z0-9]+(-[a-z0-9]+)*"
                 onChange={(e) => { setId(e.target.value); setIdTouched(true); }} />
          <span className="field-hint">Page will live at #/{id || '…'}</span>
        </label>
        <label className="field">
          <span className="field-label">Eyebrow (optional)</span>
          <input className="field-input" type="text" value={eyebrow} onChange={(e) => setEyebrow(e.target.value)} />
        </label>
        <label className="field">
          <span className="field-label">Lede (optional)</span>
          <textarea className="field-textarea" rows={2} value={lede} onChange={(e) => setLede(e.target.value)} />
        </label>
        {error && <p className="error-text">{error}</p>}
        <p className="field-hint">The page is created as a draft. Add content and publish it from the editor.</p>
        <button type="submit" className="btn-primary" disabled={busy}>{busy ? 'Creating…' : 'Create page'}</button>
      </form>
    </div>
  );
}
