import { useEffect, useState } from 'react';
import { adminApi, type DraftListItem } from '../lib/api';
import { Link } from '../lib/router';

export function DraftQueue() {
  const [drafts, setDrafts] = useState<DraftListItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminApi.listDrafts().then(setDrafts).catch((e) => setError(e.message));
  }, []);

  if (error) return <p className="error-text">{error}</p>;
  if (!drafts) return <p className="field-hint">Loading…</p>;

  return (
    <div>
      <h1>Pending review</h1>
      {drafts.length === 0 && <p className="field-hint">No guest edits waiting for review.</p>}
      <table className="admin-table">
        <thead><tr><th>Page</th><th>Section</th><th>Submitted by</th><th>Submitted</th><th></th></tr></thead>
        <tbody>
          {drafts.map((d) => (
            <tr key={d.id}>
              <td>{d.pageTitle}</td>
              <td>{d.section}</td>
              <td>{d.submittedBy || 'guest'}</td>
              <td>{new Date(d.submittedAt).toLocaleString()}</td>
              <td><Link to={`/admin/drafts/${d.id}`}>Review →</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
