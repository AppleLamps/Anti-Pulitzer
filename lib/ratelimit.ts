import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import { getRedisRestConfig } from "@/lib/env";

const redisConfig = getRedisRestConfig();

const redis = redisConfig
  ? new Redis({
      url: redisConfig.url,
      token: redisConfig.token,
    })
  : null;

/** Limits public nomination submissions: 3 per hour per identifier. */
export const nominationRatelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, "1 h"),
      prefix: "anti-pulitzer:nominate",
      analytics: true,
    })
  : null;

export type RateLimitResult =
  | { ok: true }
  | { ok: false; retryAfterSeconds: number };

export async function checkNominationRateLimit(
  identifier: string,
): Promise<RateLimitResult> {
  if (!nominationRatelimit) {
    return { ok: true };
  }

  const { success, reset } = await nominationRatelimit.limit(identifier);
  if (success) {
    return { ok: true };
  }

  const retryAfterSeconds = Math.max(
    1,
    Math.ceil((reset - Date.now()) / 1000),
  );
  return { ok: false, retryAfterSeconds };
}
