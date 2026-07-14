import { useEffect, useState } from 'react';
import { adminApi, type DraftDetail } from '../lib/api';
import { useRouter, Link } from '../lib/router';
import { BlockRenderer } from '../components/BlockRenderer';

export function DraftReview({ draftId }: { draftId: string }) {
  const { navigate } = useRouter();
  const [draft, setDraft] = useState<DraftDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState('');

  useEffect(() => {
    adminApi.getDraft(draftId).then(setDraft).catch((e) => setError(e.message));
  }, [draftId]);

  const approve = async () => {
    setBusy(true);
    try {
      await adminApi.approveDraft(draftId);
      navigate('/admin/drafts');
    } catch (e: any) {
      setError(e.message);
      setBusy(false);
    }
  };

  const reject = async () => {
    setBusy(true);
    try {
      await adminApi.rejectDraft(draftId, note || undefined);
      navigate('/admin/drafts');
    } catch (e: any) {
      setError(e.message);
      setBusy(false);
    }
  };

  if (error && !draft) return <p className="error-text">{error}</p>;
  if (!draft) return <p className="field-hint">Loading…</p>;

  return (
    <div>
      <Link to="/admin/drafts" className="back-link">← Pending review</Link>
      <h1>Review edit: {draft.pageTitle}</h1>
      <p className="field-hint">Submitted by {draft.submittedBy || 'guest'} on {new Date(draft.submittedAt).toLocaleString()}</p>

      <div className="editor-split">
        <div className="editor-col">
          <div className="preview-head"><span>Currently published</span></div>
          <div className="prose preview-prose diff-old">
            <BlockRenderer blocks={draft.publishedBlocks} />
          </div>
        </div>
        <div className="preview-col">
          <div className="preview-head"><span>Proposed edit</span></div>
          <div className="prose preview-prose diff-new">
            <BlockRenderer blocks={draft.blocks} />
          </div>
        </div>
      </div>

      {error && <p className="error-text">{error}</p>}

      <div className="form-card" style={{ marginTop: 20 }}>
        <label className="field">
          <span className="field-label">Rejection note (optional)</span>
          <textarea className="field-textarea" rows={2} value={note} onChange={(e) => setNote(e.target.value)} />
        </label>
        <div className="page-header-actions">
          <button className="btn-danger" onClick={reject} disabled={busy}>Reject</button>
          <button className="btn-primary" onClick={approve} disabled={busy}>Approve &amp; publish</button>
        </div>
      </div>
    </div>
  );
}
