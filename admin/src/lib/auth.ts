import { createInternalNeonAuth } from '@neondatabase/auth';
import { BetterAuthReactAdapter, type BetterAuthReactAdapterInstance } from '@neondatabase/auth/react/adapters';

// VITE_NEON_AUTH_URL is the Neon Auth project's auth service URL (from the
// Neon console). This is a separate value from the worker's
// NEON_AUTH_JWKS_URL/NEON_AUTH_ISSUER secrets -- this one is baked into the
// client bundle at build time (must be prefixed VITE_ to be exposed), those
// are server-side verification config. Set it in admin/.env (gitignored) or
// your CI build environment before `npm run build`. See admin/.env.example.
const AUTH_URL = import.meta.env.VITE_NEON_AUTH_URL as string | undefined;

if (!AUTH_URL) {
  // eslint-disable-next-line no-console
  console.error('VITE_NEON_AUTH_URL is not set -- admin login will not work. See admin/.env.example.');
}

// createInternalNeonAuth (despite the name, a documented public export)
// returns { adapter, getJWTToken } -- the wrapped shape that exposes both
// the Better Auth React client (signIn/signUp/useSession/signOut) and a way
// to get the session JWT to attach as a Bearer token on API calls. The
// plain createAuthClient() only returns the adapter's own API without
// getJWTToken.
const neonAuth = createInternalNeonAuth<BetterAuthReactAdapterInstance>(AUTH_URL || '', {
  adapter: BetterAuthReactAdapter(),
});

export const auth = neonAuth.adapter;

export async function getAccessToken(): Promise<string | null> {
  return neonAuth.getJWTToken();
}
