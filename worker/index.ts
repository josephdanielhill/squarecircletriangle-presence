import { Hono } from 'hono';
import { publicRoutes } from './routes/public';
import { adminRoutes } from './routes/admin';
import { guestRoutes } from './routes/guest';
import type { Env } from './types';

const app = new Hono<{ Bindings: Env }>();

// Surface the real error message in the response body (in addition to
// logging it) instead of Hono's generic "Internal Server Error" text -- this
// is a small, low-risk diagnostic aid while the CMS is being wired up
// against a real Neon/Neon Auth project for the first time.
app.onError((err, c) => {
  console.error('Unhandled error:', err);
  return c.json({ error: err.message || 'Internal error', name: err.name }, 500);
});

app.route('/api', publicRoutes);
app.route('/api/admin', adminRoutes);
app.route('/api/guest', guestRoutes);

// The built admin/guest-editor SPAs live at public/admin/index.html and
// public/edit/index.html. Cloudflare's static [assets] binding only serves
// exact file paths, so dynamic sub-paths like /admin/pages/abc/edit or
// /edit/<token> need the Worker to explicitly serve the SPA shell and let
// client-side routing take over from there.
app.get('/admin', (c) => serveShell(c.env, 'admin', c.req.raw.url));
app.get('/admin/*', (c) => serveShell(c.env, 'admin', c.req.raw.url));
app.get('/edit/*', (c) => serveShell(c.env, 'edit', c.req.raw.url));

async function serveShell(env: Env, bundle: 'admin' | 'edit', requestUrl: string) {
  const shellUrl = new URL(`/${bundle}/index.html`, requestUrl);
  return env.ASSETS.fetch(new Request(shellUrl, { method: 'GET' }));
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/api/') || url.pathname === '/admin' || url.pathname.startsWith('/admin/') || url.pathname.startsWith('/edit/')) {
      return app.fetch(request, env, ctx);
    }
    // Everything else: static marketing site assets.
    return env.ASSETS.fetch(request);
  },
};
