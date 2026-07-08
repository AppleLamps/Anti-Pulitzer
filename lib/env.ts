/**
 * Reads integration env vars. Vercel marketplace integrations may inject
 * standard names (DATABASE_URL) or project-prefixed names (AntiPulitzer_*).
 */

/** Pooled URLs first — preferred for serverless. */
const DATABASE_URL_KEYS = [
  "DATABASE_URL",
  "POSTGRES_URL",
  "POSTGRES_PRISMA_URL",
  "AntiPulitzer_DATABASE_URL",
  "AntiPulitzer_POSTGRES_URL",
  "AntiPulitzer_POSTGRES_PRISMA_URL",
  "DATABASE_URL_UNPOOLED",
  "POSTGRES_URL_NON_POOLING",
  "POSTGRES_URL_NO_SSL",
  "AntiPulitzer_DATABASE_URL_UNPOOLED",
  "AntiPulitzer_POSTGRES_URL_NON_POOLING",
  "AntiPulitzer_POSTGRES_URL_NO_SSL",
] as const;

const REDIS_REST_URL_KEYS = [
  "UPSTASH_REDIS_REST_URL",
  "AntiPulitzer_KV_REST_API_URL",
] as const;

const REDIS_REST_TOKEN_KEYS = [
  "UPSTASH_REDIS_REST_TOKEN",
  "AntiPulitzer_KV_REST_API_TOKEN",
] as const;

const BLOB_TOKEN_KEYS = ["BLOB_READ_WRITE_TOKEN"] as const;

function firstEnvValue(keys: readonly string[]): string | undefined {
  for (const key of keys) {
    const value = process.env[key];
    if (value) {
      return value;
    }
  }

  return undefined;
}

function buildPostgresUrl(parts: {
  host?: string;
  user?: string;
  password?: string;
  database?: string;
  ssl?: boolean;
}): string | undefined {
  const { host, user, password, database } = parts;
  if (!host || !user || !password || !database) {
    return undefined;
  }

  const encodedUser = encodeURIComponent(user);
  const encodedPassword = encodeURIComponent(password);
  const sslQuery = parts.ssl === false ? "" : "?sslmode=require";

  return `postgresql://${encodedUser}:${encodedPassword}@${host}/${database}${sslQuery}`;
}

function getDatabaseUrlFromComponents(): string | undefined {
  const componentSets: Array<{
    host?: string;
    user?: string;
    password?: string;
    database?: string;
    ssl?: boolean;
  }> = [
    {
      host: process.env.PGHOST,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
    },
    {
      host: process.env.PGHOST_UNPOOLED,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
    },
    {
      host: process.env.POSTGRES_HOST,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
    },
    {
      host: process.env.AntiPulitzer_PGHOST,
      user: process.env.AntiPulitzer_PGUSER,
      password: process.env.AntiPulitzer_PGPASSWORD,
      database: process.env.AntiPulitzer_PGDATABASE,
    },
    {
      host: process.env.AntiPulitzer_PGHOST_UNPOOLED,
      user: process.env.AntiPulitzer_PGUSER,
      password: process.env.AntiPulitzer_PGPASSWORD,
      database: process.env.AntiPulitzer_PGDATABASE,
    },
    {
      host: process.env.AntiPulitzer_POSTGRES_HOST,
      user: process.env.AntiPulitzer_POSTGRES_USER,
      password: process.env.AntiPulitzer_POSTGRES_PASSWORD,
      database: process.env.AntiPulitzer_POSTGRES_DATABASE,
      ssl: false,
    },
  ];

  for (const parts of componentSets) {
    const url = buildPostgresUrl(parts);
    if (url) {
      return url;
    }
  }

  return undefined;
}

export function getDatabaseUrl(): string | undefined {
  return firstEnvValue(DATABASE_URL_KEYS) ?? getDatabaseUrlFromComponents();
}

export function getRedisRestConfig(): { url: string; token: string } | null {
  const url = firstEnvValue(REDIS_REST_URL_KEYS);
  const token = firstEnvValue(REDIS_REST_TOKEN_KEYS);

  if (!url || !token) {
    return null;
  }

  return { url, token };
}

export function getBlobReadWriteToken(): string | undefined {
  return firstEnvValue(BLOB_TOKEN_KEYS);
}

export function getBlobStoreId(): string | undefined {
  return process.env.BLOB_STORE_ID;
}

export function hasDatabase(): boolean {
  return Boolean(getDatabaseUrl());
}

export function hasRedis(): boolean {
  return getRedisRestConfig() !== null;
}

export function hasBlobStorage(): boolean {
  return Boolean(getBlobReadWriteToken());
}

export function hasAdminPassword(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}
