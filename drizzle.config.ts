import { defineConfig } from "drizzle-kit";

import { getDatabaseUrl } from "@/lib/env";

const databaseUrl = getDatabaseUrl();

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL (or POSTGRES_URL) must be set to run Drizzle commands.",
  );
}

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
});
