import { useState } from 'react';
import { adminApi } from '../lib/api';
import { useRouter } from '../lib/router';
import { slugify } from '../lib/blocks';

export function PageNew() {
  const { navigate } = useRouter();
  const [title, setTitle] = useState('');
  const [id, setId] = useState('');
  const [idTouched, setIdTouched] = useState(false);
  const [section, setSection] = useState<'Square' | 'Circle' | 'Triangle' | 'Home'>('Triangle');
  const [eyebrow, setEyebrow] = useState('');
  const [lede, setLede] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const page = await adminApi.createPage({ id, section, title, eyebrow, lede });
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
          <span className="field-label">Section</span>
          <select className="field-input" value={section} onChange={(e) => setSection(e.target.value as any)}>
            <option value="Triangle">Triangle</option>
            <option value="Square">Square</option>
            <option value="Circle">Circle</option>
            <option value="Home">Home</option>
          </select>
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
