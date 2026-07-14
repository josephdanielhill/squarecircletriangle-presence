import { useEffect, useState } from 'react';
import { guestApi } from './lib/api';
import { BlockEditor } from './components/BlockEditor';
import { BlockRenderer } from './components/BlockRenderer';
import type { Block } from './lib/blocks';

// Deliberately does not import AdminApp, any admin/* route, or lib/auth.ts
// (Neon Auth) -- this bundle has no path to any admin capability, only the
// generic block-editing components shared with the admin app.

function getTokenFromPath(): string {
  // location.pathname is like /edit/<token>
  const parts = window.location.pathname.split('/').filter(Boolean);
  return parts[1] || '';
}

export function GuestEditApp() {
  const token = getTokenFromPath();
  const [pageTitle, setPageTitle] = useState<string | null>(null);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'invalid' | 'submitted'>('loading');
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  useEffect(() => {
    if (!token) { setStatus('invalid'); setError('No edit link token provided.'); return; }
    guestApi.get(token)
      .then((res) => {
        setPageTitle(res.page.title);
        setBlocks(res.page.blocks || []);
        setStatus('ready');
      })
      .catch((e) => {
        setStatus('invalid');
        setError(e.message || 'This link is no longer valid.');
      });
  }, [token]);

  const submit = async () => {
    setSaving(true);
    setError(null);
    try {
      await guestApi.submitDraft(token, blocks);
      setStatus('submitted');
    } catch (e: any) {
      setError(e.message || 'Failed to submit your edit.');
    } finally {
      setSaving(false);
    }
  };

  if (status === 'loading') {
    return <div className="guest-shell"><p className="field-hint">Loading…</p></div>;
  }

  if (status === 'invalid') {
    return (
      <div className="guest-shell">
        <div className="login-card">
          <h1>Link not available</h1>
          <p>{error || 'This link is no longer valid.'}</p>
        </div>
      </div>
    );
  }

  if (status === 'submitted') {
    return (
      <div className="guest-shell">
        <div className="login-card">
          <h1>Thanks!</h1>
          <p>Your edit was submitted and is pending review. The page will update once it's approved.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="guest-shell">
      <header className="guest-topbar">
        <div>
          <div className="field-hint">Editing</div>
          <h1>{pageTitle}</h1>
        </div>
        <button className="btn-primary" onClick={submit} disabled={saving}>
          {saving ? 'Submitting…' : 'Submit for review'}
        </button>
      </header>
      <p className="field-hint">
        Your changes are submitted for review and won't go live until approved.
        You can keep editing and resubmit at any time before it's reviewed.
      </p>
      {error && <p className="error-text">{error}</p>}
      <div className={'editor-split' + (showPreview ? '' : ' no-preview')}>
        <div className="editor-col">
          <div className="preview-head">
            <span>Content</span>
            {!showPreview && <button className="btn-link" onClick={() => setShowPreview(true)}>Show preview</button>}
          </div>
          <BlockEditor blocks={blocks} onChange={setBlocks} />
        </div>
        {showPreview && (
          <div className="preview-col">
            <div className="preview-head">
              <span>Preview</span>
              <button className="btn-link" onClick={() => setShowPreview(false)}>Hide</button>
            </div>
            <div className="prose preview-prose">
              <h1 className="page-title">{pageTitle}</h1>
              <BlockRenderer blocks={blocks} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
