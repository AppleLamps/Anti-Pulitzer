import { asc, eq } from "drizzle-orm";

import { db, schema } from "@/lib/db";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export async function nextEntryNo(): Promise<string> {
  if (!db) {
    return "001";
  }

  const rows = await db
    .select({ entryNo: schema.winners.entryNo })
    .from(schema.winners)
    .orderBy(asc(schema.winners.entryNo));

  const next = rows.length + 1;
  return String(next).padStart(3, "0");
}

export async function uniqueSlug(base: string): Promise<string> {
  if (!db) {
    return base;
  }

  let slug = slugify(base);
  if (!slug) {
    slug = "entry";
  }

  let candidate = slug;
  let suffix = 2;

  while (true) {
    const existing = await db
      .select({ id: schema.winners.id })
      .from(schema.winners)
      .where(eq(schema.winners.slug, candidate))
      .limit(1);

    if (!existing.length) {
      return candidate;
    }

    candidate = `${slug}-${suffix}`;
    suffix += 1;
  }
}
