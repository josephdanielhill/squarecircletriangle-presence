import { useEffect, useState } from 'react';
import { adminApi, type GuestTokenItem } from '../lib/api';

export function GuestLinksPanel({ pageId }: { pageId: string }) {
  const [tokens, setTokens] = useState<GuestTokenItem[] | null>(null);
  const [label, setLabel] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [newLink, setNewLink] = useState<string | null>(null);

  const refresh = () => adminApi.listGuestTokens(pageId).then(setTokens).catch((e) => setError(e.message));

  useEffect(() => { refresh(); }, [pageId]);

  const create = async () => {
    setError(null);
    try {
      const result = await adminApi.createGuestToken(pageId, { label: label || undefined });
      setNewLink(new URL(result.editUrl!, window.location.origin).toString());
      setLabel('');
      refresh();
    } catch (e: any) {
      setError(e.message || 'Failed to create guest link');
    }
  };

  const revoke = async (id: string) => {
    if (!confirm('Revoke this guest link? It will stop working immediately.')) return;
    await adminApi.revokeGuestToken(id);
    refresh();
  };

  return (
    <div>
      <p className="field-hint">
        Anyone with a guest link can edit this page's content only. Their edits are saved as a draft for you to review
        under Drafts before they go live.
      </p>

      <div className="form-inline">
        <input className="field-input" type="text" placeholder="Label (e.g. Sponsor: Acme Co)"
               value={label} onChange={(e) => setLabel(e.target.value)} />
        <button className="btn-primary" onClick={create}>Generate guest link</button>
      </div>

      {newLink && (
        <div className="callout-box">
          <p>New guest link created — copy and share it now:</p>
          <code className="copy-box" onClick={() => navigator.clipboard.writeText(newLink)}>{newLink}</code>
          <p className="field-hint">Click to copy.</p>
        </div>
      )}

      {error && <p className="error-text">{error}</p>}

      <table className="admin-table" style={{ marginTop: 16 }}>
        <thead><tr><th>Label</th><th>Created</th><th>Last used</th><th>Status</th><th></th></tr></thead>
        <tbody>
          {(tokens || []).map((t) => (
            <tr key={t.id}>
              <td>{t.label || '—'}</td>
              <td>{new Date(t.createdAt).toLocaleDateString()}</td>
              <td>{t.lastUsedAt ? new Date(t.lastUsedAt).toLocaleDateString() : 'Never'}</td>
              <td>{t.revokedAt ? 'Revoked' : t.expiresAt && new Date(t.expiresAt) < new Date() ? 'Expired' : 'Active'}</td>
              <td>{!t.revokedAt && <button className="btn-link" onClick={() => revoke(t.id)}>Revoke</button>}</td>
            </tr>
          ))}
          {tokens && tokens.length === 0 && <tr><td colSpan={5} className="field-hint">No guest links yet.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
