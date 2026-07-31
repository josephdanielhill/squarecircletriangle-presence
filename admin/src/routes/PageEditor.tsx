import { useEffect, useState } from 'react';
import { adminApi, type PageDetail, type PageListItem, type TemplateListItem } from '../lib/api';
import { useRouter, Link } from '../lib/router';
import { BlockEditor } from '../components/BlockEditor';
import { BlockRenderer } from '../components/BlockRenderer';
import { GuestLinksPanel } from './GuestLinksPanel';
import { PageSettingsPanel } from './PageSettingsPanel';
import type { Block } from '../lib/blocks';

export function PageEditor({ pageId }: { pageId: string }) {
  const { navigate } = useRouter();
  const [page, setPage] = useState<PageDetail | null>(null);
  const [pages, setPages] = useState<PageListItem[]>([]);
  const [templates, setTemplates] = useState<TemplateListItem[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [saving, setSaving] = useState<'draft' | 'publish' | null>(null);
  const [duplicating, setDuplicating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [tab, setTab] = useState<'content' | 'settings' | 'guests'>('content');
  const [showPreview, setShowPreview] = useState(true);

  useEffect(() => {
    setPage(null);
    adminApi.getPage(pageId).then((p) => { setPage(p); setBlocks(p.blocks || []); }).catch((e) => setError(e.message));
    adminApi.listPages().then(setPages).catch(() => {});
    adminApi.listTemplates().then(setTemplates).catch(() => {});
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
    setDeleting(true);
    setError(null);
    try {
      await adminApi.deletePage(pageId);
      navigate('/admin/pages');
    } catch (e: any) {
      setError(e.message || 'Failed to delete page');
      setDeleting(false);
    }
  };

  const duplicate = async () => {
    if (!page) return;
    if (JSON.stringify(blocks) !== JSON.stringify(page.blocks)) {
      if (!confirm("You have unsaved changes that won't be included in the duplicate — duplicate the last-saved version anyway?")) return;
    }
    const title = prompt('Title for the duplicate:', `${page.title} (copy)`);
    if (!title || !title.trim()) return;
    setDuplicating(true);
    setError(null);
    try {
      const created = await adminApi.duplicatePage(pageId, { title: title.trim() });
      navigate(`/admin/pages/${created.id}/edit`);
    } catch (e: any) {
      setError(e.message || 'Failed to duplicate page');
      setDuplicating(false);
    }
  };

  const applyTemplate = async () => {
    const t = templates.find((x) => x.id === selectedTemplateId);
    if (!t) return;
    if (!confirm(`Replace this page's content with "${t.name}"? This won't be saved until you click Save draft or Publish.`)) return;
    setError(null);
    try {
      const detail = await adminApi.getTemplate(t.id);
      setBlocks(detail.blocks);
      setNotice(`Applied template "${t.name}". Save draft or Publish to keep it.`);
    } catch (e: any) {
      setError(e.message || 'Failed to apply template');
    }
  };

  const saveAsTemplate = async () => {
    const name = prompt('Save current content as a template named:', `${page?.title ?? ''} layout`);
    if (!name || !name.trim()) return;
    setError(null);
    try {
      const created = await adminApi.createTemplate({ name: name.trim(), blocks });
      setTemplates((prev) => [{ ...created }, ...prev]);
      setNotice(`Saved as template "${created.name}".`);
    } catch (e: any) {
      setError(e.message || 'Failed to save template');
    }
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
          <button className="btn-secondary" onClick={duplicate} disabled={duplicating}>
            {duplicating ? 'Duplicating…' : 'Duplicate page'}
          </button>
          <button className="btn-secondary" onClick={() => save('draft')} disabled={!!saving}>
            {saving === 'draft' ? 'Saving…' : 'Save draft'}
          </button>
          <button className="btn-primary" onClick={() => save('published')} disabled={!!saving}>
            {saving === 'publish' ? 'Publishing…' : 'Publish'}
          </button>
        </div>
      </div>

      {error && <p className="error-text">{error}</p>}
      {notice && <p className="field-hint">{notice}</p>}

      <div className="tab-row">
        <button className={'tab' + (tab === 'content' ? ' active' : '')} onClick={() => setTab('content')}>Content</button>
        <button className={'tab' + (tab === 'settings' ? ' active' : '')} onClick={() => setTab('settings')}>Settings</button>
        <button className={'tab' + (tab === 'guests' ? ' active' : '')} onClick={() => setTab('guests')}>Guest links</button>
      </div>

      {tab === 'content' && (
        <div className={'editor-split' + (showPreview ? '' : ' no-preview')}>
          <div className="editor-col">
            <div className="preview-head">
              <span>Content</span>
              {!showPreview && <button className="btn-link" onClick={() => setShowPreview(true)}>Show preview</button>}
            </div>
            <div className="template-toolbar">
              <select className="field-input" value={selectedTemplateId} onChange={(e) => setSelectedTemplateId(e.target.value)}>
                <option value="">Apply a template…</option>
                {templates.map((t) => (
                  <option key={t.id} value={t.id}>{t.name} ({t.blockCount} blocks)</option>
                ))}
              </select>
              <button className="btn-secondary" disabled={!selectedTemplateId} onClick={applyTemplate}>Apply</button>
              <button className="btn-link" onClick={saveAsTemplate}>Save current content as template…</button>
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
                <BlockRenderer blocks={blocks} pages={pages} pageId={pageId} />
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'settings' && (
        <PageSettingsPanel page={page} pages={pages} onSaved={setPage} />
      )}

      {tab === 'guests' && (
        <GuestLinksPanel pageId={pageId} />
      )}

      <div className="danger-zone">
        <button className="btn-danger" disabled={deleting} onClick={remove}>
          {deleting ? 'Deleting…' : 'Delete page'}
        </button>
      </div>
    </div>
  );
}
