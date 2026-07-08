/**
 * Reads integration env vars. Vercel marketplace integrations may use
 * project-prefixed names (e.g. AntiPulitzer_KV_*) or the standard Upstash names.
 */
export function getDatabaseUrl(): string | undefined {
  return (
    process.env.DATABASE_URL ??
    process.env.POSTGRES_URL ??
    process.env.POSTGRES_PRISMA_URL
  );
}

export function getRedisRestConfig(): { url: string; token: string } | null {
  const url =
    process.env.UPSTASH_REDIS_REST_URL ??
    process.env.AntiPulitzer_KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ??
    process.env.AntiPulitzer_KV_REST_API_TOKEN;

  if (!url || !token) {
    return null;
  }

  return { url, token };
}

export function hasDatabase(): boolean {
  return Boolean(getDatabaseUrl());
}

export function hasRedis(): boolean {
  return getRedisRestConfig() !== null;
}
