import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/drizzle/schema";
import { getDatabaseUrl } from "@/lib/env";

const databaseUrl = getDatabaseUrl();

if (!databaseUrl) {
  console.warn(
    "DATABASE_URL is not set. Database features will be unavailable.",
  );
}

const sql = databaseUrl ? neon(databaseUrl) : null;

export const db = sql ? drizzle(sql, { schema }) : null;

export { schema };
