"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

import {
  clearAdminSession,
  isAdminAuthenticated,
  setAdminSession,
  verifyAdminPassword,
} from "@/lib/admin-auth";
import { getNominationById } from "@/lib/data/nominations";
import { nextEntryNo, uniqueSlug } from "@/lib/data/publish";
import { db, schema } from "@/lib/db";

type ActionResult = { ok: true } | { ok: false; error: string };

async function requireAdmin(): Promise<ActionResult | null> {
  if (!(await isAdminAuthenticated())) {
    return { ok: false, error: "Unauthorized." };
  }
  return null;
}

export async function loginAdmin(password: string): Promise<ActionResult> {
  if (!(await verifyAdminPassword(password))) {
    return { ok: false, error: "Invalid password." };
  }

  await setAdminSession();
  return { ok: true };
}

export async function logoutAdmin(): Promise<void> {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function rejectNomination(id: string): Promise<ActionResult> {
  const authError = await requireAdmin();
  if (authError) {
    return authError;
  }

  if (!db) {
    return { ok: false, error: "Database is not configured." };
  }

  await db
    .update(schema.nominations)
    .set({
      status: "rejected",
      reviewedAt: new Date(),
      reviewedBy: "admin",
    })
    .where(eq(schema.nominations.id, id));

  revalidatePath("/admin");
  return { ok: true };
}

export async function markNominationSpam(id: string): Promise<ActionResult> {
  const authError = await requireAdmin();
  if (authError) {
    return authError;
  }

  if (!db) {
    return { ok: false, error: "Database is not configured." };
  }

  await db
    .update(schema.nominations)
    .set({
      status: "spam",
      reviewedAt: new Date(),
      reviewedBy: "admin",
    })
    .where(eq(schema.nominations.id, id));

  revalidatePath("/admin");
  return { ok: true };
}

export async function publishNomination(input: {
  nominationId: string;
  reasoning: string;
}): Promise<ActionResult> {
  const authError = await requireAdmin();
  if (authError) {
    return authError;
  }

  if (!db) {
    return { ok: false, error: "Database is not configured." };
  }

  const reasoning = input.reasoning.trim();
  if (reasoning.length < 50) {
    return {
      ok: false,
      error: "Published reasoning must be at least 50 characters.",
    };
  }

  const nomination = await getNominationById(input.nominationId);
  if (!nomination) {
    return { ok: false, error: "Nomination not found." };
  }

  if (nomination.status !== "pending") {
    return { ok: false, error: "This nomination has already been reviewed." };
  }

  const workTitle =
    nomination.workTitle?.trim() ||
    nomination.workUrl.replace(/^https?:\/\//, "").slice(0, 120);

  const entryNo = await nextEntryNo();
  const slug = await uniqueSlug(
    `${nomination.outlet}-${workTitle}-${entryNo}`,
  );

  const sourceUrls = [
    nomination.workUrl,
    ...nomination.evidenceUrls,
    ...nomination.attachmentUrls,
  ].filter(Boolean);

  const announcedAt = new Date();

  await db.insert(schema.winners).values({
    entryNo,
    slug,
    outlet: nomination.outlet,
    workTitle,
    announcedAt,
    grounds: nomination.groundsClaimed,
    reasoning,
    sourceUrls,
  });

  await db
    .update(schema.nominations)
    .set({
      status: "accepted",
      reviewedAt: new Date(),
      reviewedBy: "admin",
    })
    .where(eq(schema.nominations.id, nomination.id));

  revalidatePath("/admin");
  revalidatePath("/archive");
  return { ok: true };
}
