import { useEffect, useState } from 'react';
import { adminApi, type TemplateListItem } from '../lib/api';

export function TemplateList() {
  const [templates, setTemplates] = useState<TemplateListItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const refresh = () => adminApi.listTemplates().then(setTemplates).catch((e) => setError(e.message));

  useEffect(() => { refresh(); }, []);

  const remove = async (t: TemplateListItem) => {
    if (!confirm(`Delete template "${t.name}"? This cannot be undone.`)) return;
    await adminApi.deleteTemplate(t.id);
    refresh();
  };

  if (error && !templates) return <p className="error-text">{error}</p>;
  if (!templates) return <p className="field-hint">Loading…</p>;

  return (
    <div>
      <div className="page-header-row">
        <h1>Templates</h1>
      </div>
      <p className="field-hint">
        Save a page's content as a template from its editor, then reuse it to start a new page or refresh an existing one.
      </p>

      {error && <p className="error-text">{error}</p>}

      <table className="admin-table" style={{ marginTop: 16 }}>
        <thead><tr><th>Name</th><th>Blocks</th><th>Created</th><th></th></tr></thead>
        <tbody>
          {templates.map((t) => (
            <tr key={t.id}>
              <td>{t.name}</td>
              <td>{t.blockCount}</td>
              <td>{new Date(t.createdAt).toLocaleDateString()}</td>
              <td><button className="btn-link" onClick={() => remove(t)}>Delete</button></td>
            </tr>
          ))}
          {templates.length === 0 && (
            <tr><td colSpan={4} className="field-hint">No templates yet — save one from a page's editor.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
