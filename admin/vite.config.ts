import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';

// Two independent SPA bundles -- the admin app and the scoped guest editor --
// built straight into public/, alongside the CDN/Babel marketing site.
// Each HTML entry lives at admin/<bundle>/index.html so Vite's default
// "mirror the input path into outDir" behavior naturally produces
// public/admin/index.html and public/edit/index.html. The Worker
// (worker/index.ts) serves those for any /admin/* or /edit/* request so
// client-side routing can take over from there.
export default defineConfig({
  root: __dirname,
  plugins: [react()],
  build: {
    outDir: '../public',
    emptyOutDir: false,
    rollupOptions: {
      input: {
        admin: fileURLToPath(new URL('./admin/index.html', import.meta.url)),
        edit: fileURLToPath(new URL('./edit/index.html', import.meta.url)),
      },
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:8787',
    },
  },
});
