import { createRemoteJWKSet, jwtVerify, type JWTPayload } from 'jose';
import type { Env } from './types';

// createRemoteJWKSet caches the fetched key set in-module, so as long as the
// same Worker isolate handles multiple requests this avoids re-fetching the
// JWKS on every call. Keyed by JWKS URL in case that ever varies (it won't,
// in practice, since it's a single env var).
const jwksCache = new Map<string, ReturnType<typeof createRemoteJWKSet>>();

function getJwks(env: Env) {
  let jwks = jwksCache.get(env.NEON_AUTH_JWKS_URL);
  if (!jwks) {
    jwks = createRemoteJWKSet(new URL(env.NEON_AUTH_JWKS_URL));
    jwksCache.set(env.NEON_AUTH_JWKS_URL, jwks);
  }
  return jwks;
}

export class AuthError extends Error {
  status: number;
  constructor(message: string, status = 401) {
    super(message);
    this.status = status;
  }
}

/**
 * Verifies the Neon Auth JWT on an admin request and confirms it belongs to
 * the single admin account. Real enforcement lives here, server-side -- any
 * client-side login redirect in the admin app is UX only.
 *
 * NOTE: the exact JWKS URL / issuer / claim shape should be confirmed
 * against current Neon Auth docs when wiring up NEON_AUTH_JWKS_URL and
 * NEON_AUTH_ISSUER (see .dev.vars.example) -- this assumes a standard
 * OIDC-shaped JWT with an `email` claim, verified via EdDSA/Ed25519 keys
 * published at the project's JWKS endpoint, which is the documented pattern
 * for custom Neon Auth backends.
 */
export async function requireAdmin(request: Request, env: Env): Promise<JWTPayload> {
  const authHeader = request.headers.get('Authorization') || '';
  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  if (!match) throw new AuthError('Missing Authorization: Bearer <token> header');

  let payload: JWTPayload;
  try {
    const result = await jwtVerify(match[1], getJwks(env), {
      issuer: env.NEON_AUTH_ISSUER,
    });
    payload = result.payload;
  } catch {
    throw new AuthError('Invalid or expired session token');
  }

  const email = typeof payload.email === 'string' ? payload.email : undefined;
  if (!email || email.toLowerCase() !== env.ADMIN_EMAIL.toLowerCase()) {
    throw new AuthError('This account is not authorized to access the admin area', 403);
  }

  return payload;
}
