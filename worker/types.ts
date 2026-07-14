export interface Env {
  ASSETS: Fetcher;
  NEON_DATABASE_URL: string;
  NEON_AUTH_JWKS_URL: string;
  NEON_AUTH_ISSUER: string;
  ADMIN_EMAIL: string;
}

export type Section = 'Home' | 'Square' | 'Circle' | 'Triangle';

export interface PageRow {
  id: string;
  section: Section;
  title: string;
  eyebrow: string | null;
  lede: string | null;
  lede_quote: boolean;
  section_top: boolean;
  icon: string | null;
  sort_order: number;
  blocks: unknown[];
  status: 'draft' | 'published';
  updated_label: string | null;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

export interface GuestTokenRow {
  id: string;
  token: string;
  page_id: string;
  label: string | null;
  created_at: string;
  created_by: string | null;
  expires_at: string | null;
  revoked_at: string | null;
  last_used_at: string | null;
}

export interface PageDraftRow {
  id: string;
  page_id: string;
  blocks: unknown[];
  guest_token_id: string | null;
  submitted_by: string | null;
  status: 'in_progress' | 'pending' | 'approved' | 'rejected';
  submitted_at: string;
  reviewed_at: string | null;
  reviewed_by: string | null;
  review_note: string | null;
}
