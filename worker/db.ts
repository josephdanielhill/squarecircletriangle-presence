import { neon } from '@neondatabase/serverless';
import type { Env } from './types';

/**
 * Workers can't hold a persistent TCP connection, so we use Neon's
 * serverless HTTP driver: each call is a single fetch to Neon's SQL-over-HTTP
 * endpoint. `sql` is a tagged-template query function.
 */
export function getDb(env: Env) {
  return neon(env.NEON_DATABASE_URL);
}

export type Sql = ReturnType<typeof getDb>;
