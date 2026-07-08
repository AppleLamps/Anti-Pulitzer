import {
  index,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

/** Matches the four criteria tags in lib/site.ts. */
export const groundsEnum = pgEnum("grounds", [
  "Accuracy",
  "Fairness",
  "Disclosure",
  "Proportionality",
]);

export const nominationStatusEnum = pgEnum("nomination_status", [
  "pending",
  "accepted",
  "rejected",
  "spam",
]);

/** Private intake. Never exposed on public routes. */
export const nominations = pgTable(
  "nominations",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    status: nominationStatusEnum("status").default("pending").notNull(),
    outlet: text("outlet").notNull(),
    workUrl: text("work_url").notNull(),
    workTitle: text("work_title"),
    groundsClaimed: groundsEnum("grounds_claimed").array().notNull(),
    evidenceUrls: text("evidence_urls").array().default([]).notNull(),
    attachmentUrls: text("attachment_urls").array().default([]).notNull(),
    narrative: text("narrative").notNull(),
    submitterEmail: text("submitter_email"),
    ipHash: text("ip_hash"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    reviewedAt: timestamp("reviewed_at", { withTimezone: true }),
    reviewedBy: text("reviewed_by"),
  },
  (table) => [
    index("nominations_status_idx").on(table.status),
    index("nominations_created_at_idx").on(table.createdAt),
  ],
);

/** Published recipients shown on /archive. */
export const winners = pgTable(
  "winners",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    entryNo: text("entry_no").notNull().unique(),
    slug: text("slug").notNull().unique(),
    outlet: text("outlet").notNull(),
    workTitle: text("work_title").notNull(),
    announcedAt: timestamp("announced_at", { withTimezone: true }).notNull(),
    grounds: groundsEnum("grounds").array().notNull(),
    reasoning: text("reasoning"),
    sourceUrls: text("source_urls").array().default([]).notNull(),
    publishedAt: timestamp("published_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("winners_announced_at_idx").on(table.announcedAt),
    index("winners_published_at_idx").on(table.publishedAt),
  ],
);

export type Nomination = typeof nominations.$inferSelect;
export type NewNomination = typeof nominations.$inferInsert;
export type Winner = typeof winners.$inferSelect;
export type NewWinner = typeof winners.$inferInsert;
export type GroundsValue = (typeof groundsEnum.enumValues)[number];
