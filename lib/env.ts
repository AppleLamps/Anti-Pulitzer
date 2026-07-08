/**
 * Reads integration env vars. Vercel marketplace integrations may use
 * project-prefixed names (e.g. AntiPulitzer_DATABASE_URL, AntiPulitzer_KV_*).
 */

const DATABASE_URL_KEYS = [
  "DATABASE_URL",
  "POSTGRES_URL",
  "POSTGRES_PRISMA_URL",
  "AntiPulitzer_DATABASE_URL",
  "AntiPulitzer_POSTGRES_URL",
  "AntiPulitzer_POSTGRES_PRISMA_URL",
  "DATABASE_URL_UNPOOLED",
  "AntiPulitzer_DATABASE_URL_UNPOOLED",
  "POSTGRES_URL_NON_POOLING",
  "AntiPulitzer_POSTGRES_URL_NON_POOLING",
] as const;

export function getDatabaseUrl(): string | undefined {
  for (const key of DATABASE_URL_KEYS) {
    const value = process.env[key];
    if (value) {
      return value;
    }
  }

  return undefined;
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
