import { getAccessToken } from './auth';
import type { Block } from './blocks';

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function adminFetch(path: string, init: RequestInit = {}): Promise<any> {
  const token = await getAccessToken();
  const res = await fetch('/api/admin' + path, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init.headers || {}),
    },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(body.error || `Request failed (${res.status})`, res.status);
  }
  if (res.status === 204) return null;
  return res.json();
}

export interface PageListItem {
  id: string;
  section: 'Home' | 'Square' | 'Circle' | 'Triangle';
  title: string;
  status: 'draft' | 'published';
  sectionTop: boolean;
  sortOrder: number;
  updatedAt: string;
}

export interface PageDetail {
  id: string;
  section: 'Home' | 'Square' | 'Circle' | 'Triangle';
  title: string;
  eyebrow: string | null;
  lede: string | null;
  lede_quote: boolean;
  section_top: boolean;
  icon: string | null;
  sort_order: number;
  blocks: Block[];
  status: 'draft' | 'published';
  updated_label: string | null;
}

export interface GuestTokenItem {
  id: string;
  token?: string;
  label: string | null;
  createdAt: string;
  expiresAt: string | null;
  revokedAt?: string | null;
  lastUsedAt?: string | null;
  editUrl?: string;
}

export interface DraftListItem {
  id: string;
  pageId: string;
  pageTitle: string;
  section: string;
  submittedBy: string | null;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

export interface DraftDetail extends DraftListItem {
  blocks: Block[];
  publishedBlocks: Block[];
}

export const adminApi = {
  me: () => adminFetch('/me'),
  listPages: (): Promise<PageListItem[]> => adminFetch('/pages'),
  getPage: (id: string): Promise<PageDetail> => adminFetch(`/pages/${encodeURIComponent(id)}`),
  createPage: (body: {
    id: string;
    section: string;
    title: string;
    eyebrow?: string;
    lede?: string;
    ledeQuote?: boolean;
    sectionTop?: boolean;
    icon?: string;
  }) => adminFetch('/pages', { method: 'POST', body: JSON.stringify(body) }),
  updatePage: (id: string, body: Partial<{
    section: string; title: string; eyebrow: string; lede: string; ledeQuote: boolean;
    sectionTop: boolean; icon: string; sortOrder: number; blocks: Block[]; status: 'draft' | 'published';
    updatedLabel: string;
  }>) => adminFetch(`/pages/${encodeURIComponent(id)}`, { method: 'PUT', body: JSON.stringify(body) }),
  deletePage: (id: string) => adminFetch(`/pages/${encodeURIComponent(id)}`, { method: 'DELETE' }),

  listGuestTokens: (pageId: string): Promise<GuestTokenItem[]> => adminFetch(`/pages/${encodeURIComponent(pageId)}/guest-tokens`),
  createGuestToken: (pageId: string, body: { label?: string; expiresAt?: string }): Promise<GuestTokenItem> =>
    adminFetch(`/pages/${encodeURIComponent(pageId)}/guest-tokens`, { method: 'POST', body: JSON.stringify(body) }),
  revokeGuestToken: (tokenId: string) => adminFetch(`/guest-tokens/${encodeURIComponent(tokenId)}`, { method: 'DELETE' }),

  listDrafts: (): Promise<DraftListItem[]> => adminFetch('/drafts'),
  getDraft: (id: string): Promise<DraftDetail> => adminFetch(`/drafts/${encodeURIComponent(id)}`),
  approveDraft: (id: string) => adminFetch(`/drafts/${encodeURIComponent(id)}/approve`, { method: 'POST' }),
  rejectDraft: (id: string, note?: string) =>
    adminFetch(`/drafts/${encodeURIComponent(id)}/reject`, { method: 'POST', body: JSON.stringify({ note }) }),
};

export const guestApi = {
  get: async (token: string) => {
    const res = await fetch(`/api/guest/${encodeURIComponent(token)}`);
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new ApiError(body.error || `Request failed (${res.status})`, res.status);
    }
    return res.json();
  },
  submitDraft: async (token: string, blocks: Block[]) => {
    const res = await fetch(`/api/guest/${encodeURIComponent(token)}/draft`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ blocks }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new ApiError(body.error || `Request failed (${res.status})`, res.status);
    }
    return res.json();
  },
  // Saves a private, unsubmitted snapshot -- does not enter the admin's
  // review queue (that only ever shows submitted drafts).
  saveProgress: async (token: string, blocks: Block[]) => {
    const res = await fetch(`/api/guest/${encodeURIComponent(token)}/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ blocks }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new ApiError(body.error || `Request failed (${res.status})`, res.status);
    }
    return res.json();
  },
};
