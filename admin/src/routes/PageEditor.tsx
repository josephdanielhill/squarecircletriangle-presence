import { useEffect, useState } from 'react';
import { adminApi, type PageDetail } from '../lib/api';
import { useRouter, Link } from '../lib/router';
import { BlockEditor } from '../components/BlockEditor';
import { BlockRenderer } from '../components/BlockRenderer';
import { GuestLinksPanel } from './GuestLinksPanel';
import type { Block } from '../lib/blocks';

export function PageEditor({ pageId }: { pageId: string }) {
  const { navigate } = useRouter();
  const [page, setPage] = useState<PageDetail | null>(null);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState<'draft' | 'publish' | null>(null);
  const [tab, setTab] = useState<'content' | 'guests'>('content');
  const [showPreview, setShowPreview] = useState(true);

  useEffect(() => {
    setPage(null);
    adminApi.getPage(pageId).then((p) => { setPage(p); setBlocks(p.blocks || []); }).catch((e) => setError(e.message));
  }, [pageId]);

  const save = async (status: 'draft' | 'published') => {
    setSaving(status === 'draft' ? 'draft' : 'publish');
    setError(null);
    try {
      const updated = await adminApi.updatePage(pageId, { blocks, status });
      setPage(updated);
    } catch (e: any) {
      setError(e.message || 'Failed to save');
    } finally {
      setSaving(null);
    }
  };

  const remove = async () => {
    if (!confirm(`Delete "${page?.title}"? This cannot be undone.`)) return;
    await adminApi.deletePage(pageId);
    navigate('/admin/pages');
  };

  if (error && !page) return <p className="error-text">{error}</p>;
  if (!page) return <p className="field-hint">Loading…</p>;

  return (
    <div>
      <div className="page-header-row">
        <div>
          <Link to="/admin/pages" className="back-link">← All pages</Link>
          <h1>{page.title}</h1>
          <span className={'status-badge status-' + page.status}>{page.status}</span>
        </div>
        <div className="page-header-actions">
          <button className="btn-secondary" onClick={() => save('draft')} disabled={!!saving}>
            {saving === 'draft' ? 'Saving…' : 'Save draft'}
          </button>
          <button className="btn-primary" onClick={() => save('published')} disabled={!!saving}>
            {saving === 'publish' ? 'Publishing…' : 'Publish'}
          </button>
        </div>
      </div>

      {error && <p className="error-text">{error}</p>}

      <div className="tab-row">
        <button className={'tab' + (tab === 'content' ? ' active' : '')} onClick={() => setTab('content')}>Content</button>
        <button className={'tab' + (tab === 'guests' ? ' active' : '')} onClick={() => setTab('guests')}>Guest links</button>
      </div>

      {tab === 'content' ? (
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
                <h1 className="page-title">{page.title}</h1>
                <BlockRenderer blocks={blocks} />
              </div>
            </div>
          )}
        </div>
      ) : (
        <GuestLinksPanel pageId={pageId} />
      )}

      <div className="danger-zone">
        <button className="btn-danger" onClick={remove}>Delete page</button>
      </div>
    </div>
  );
}
