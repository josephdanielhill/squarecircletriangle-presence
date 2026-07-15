import { useEffect, useState } from 'react';
import { adminApi, type PageListItem } from '../lib/api';
import { Link } from '../lib/router';
import { flattenSection } from '../lib/pageTree';

const SECTION_ORDER = ['Home', 'Square', 'Circle', 'Triangle'];

export function PageList() {
  const [pages, setPages] = useState<PageListItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminApi.listPages().then(setPages).catch((e) => setError(e.message));
  }, []);

  if (error) return <p className="error-text">{error}</p>;
  if (!pages) return <p className="field-hint">Loading…</p>;

  const bySection = SECTION_ORDER.map((section) => ({
    section,
    rows: flattenSection(pages, section),
  })).filter((g) => g.rows.length > 0);

  return (
    <div>
      <div className="page-header-row">
        <h1>Pages</h1>
        <Link to="/admin/pages/new" className="btn-primary">+ New page</Link>
      </div>

      {bySection.map((group) => (
        <div key={group.section} className="page-list-section">
          <h2>{group.section}</h2>
          <table className="admin-table">
            <colgroup>
              <col />
              <col className="col-status" />
              <col className="col-updated" />
              <col className="col-action" />
            </colgroup>
            <thead><tr><th>Title</th><th>Status</th><th>Updated</th><th></th></tr></thead>
            <tbody>
              {group.rows.map(({ page: p, depth }) => (
                <tr key={p.id}>
                  <td style={depth ? { paddingLeft: `${1 + depth * 1.25}em` } : undefined}>
                    {depth > 0 && <span aria-hidden="true">↳ </span>}
                    {p.sectionTop ? `${p.title} (overview)` : p.title}
                  </td>
                  <td><span className={'status-badge status-' + p.status}>{p.status}</span></td>
                  <td>{new Date(p.updatedAt).toLocaleDateString()}</td>
                  <td><Link to={`/admin/pages/${p.id}/edit`}>Edit →</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
