import { asc } from "drizzle-orm";

import type { Grounds } from "@/lib/site";
import { db, schema } from "@/lib/db";

export type ArchiveEntryRecord = {
  no: string;
  outlet: string;
  work: string;
  date: string;
  grounds: Grounds[];
  slug: string;
};

function formatArchiveDate(value: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(value);
}

export async function getPublishedWinners(): Promise<ArchiveEntryRecord[]> {
  if (!db) {
    return [];
  }

  const rows = await db
    .select()
    .from(schema.winners)
    .orderBy(asc(schema.winners.announcedAt), asc(schema.winners.entryNo));

  return rows.map((row) => ({
    no: row.entryNo,
    outlet: row.outlet,
    work: row.workTitle,
    date: formatArchiveDate(row.announcedAt),
    grounds: row.grounds as Grounds[],
    slug: row.slug,
  }));
}
