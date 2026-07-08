import { desc, eq } from "drizzle-orm";

import { db, schema } from "@/lib/db";
import type { Nomination } from "@/drizzle/schema";

export async function getPendingNominations(): Promise<Nomination[]> {
  if (!db) {
    return [];
  }

  return db
    .select()
    .from(schema.nominations)
    .where(eq(schema.nominations.status, "pending"))
    .orderBy(desc(schema.nominations.createdAt));
}

export async function getNominationById(
  id: string,
): Promise<Nomination | null> {
  if (!db) {
    return null;
  }

  const rows = await db
    .select()
    .from(schema.nominations)
    .where(eq(schema.nominations.id, id))
    .limit(1);

  return rows[0] ?? null;
}
