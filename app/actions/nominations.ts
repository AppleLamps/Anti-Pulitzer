"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";

import { criteriaItems } from "@/lib/site";
import { db, schema } from "@/lib/db";
import { checkNominationRateLimit } from "@/lib/ratelimit";
import {
  getAttachmentFiles,
  uploadNominationAttachments,
} from "@/lib/uploads";
import type { GroundsValue } from "@/drizzle/schema";

const validGrounds = new Set(
  criteriaItems.map((item) => item.tag as GroundsValue),
);

export type SubmitNominationResult =
  | { ok: true }
  | { ok: false; error: string };

function normalizeUrls(urls: string[] | undefined): string[] {
  if (!urls?.length) {
    return [];
  }

  return [...new Set(urls.map((url) => url.trim()).filter(Boolean))].slice(
    0,
    10,
  );
}

function hashIp(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function readString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export async function submitNomination(
  formData: FormData,
): Promise<SubmitNominationResult> {
  try {
    if (!db) {
      return { ok: false, error: "Nominations are not configured yet." };
    }

    const website = readString(formData, "website");
    if (website) {
      return { ok: true };
    }

    const outlet = readString(formData, "outlet").trim();
    const workUrl = readString(formData, "workUrl").trim();
    const narrative = readString(formData, "narrative").trim();
    const workTitle = readString(formData, "workTitle").trim() || undefined;
    const submitterEmail =
      readString(formData, "submitterEmail").trim() || undefined;
    const evidenceRaw = readString(formData, "evidenceUrls");
    const evidenceUrls = evidenceRaw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const groundsClaimed = formData
      .getAll("groundsClaimed")
      .filter((value): value is string => typeof value === "string")
      .filter((ground): ground is GroundsValue =>
        validGrounds.has(ground as GroundsValue),
      );

    if (!outlet || !workUrl || !narrative) {
      return {
        ok: false,
        error: "Outlet, work URL, and narrative are required.",
      };
    }

    if (narrative.length < 100) {
      return {
        ok: false,
        error: "Please provide at least 100 characters of supporting detail.",
      };
    }

    if (groundsClaimed.length === 0) {
      return {
        ok: false,
        error: "Select at least one ground from the published criteria.",
      };
    }

    const headerStore = await headers();
    const forwardedFor = headerStore.get("x-forwarded-for");
    const realIp = headerStore.get("x-real-ip");
    const ip = forwardedFor?.split(",")[0]?.trim() ?? realIp ?? "anonymous";
    const rateLimitKey = submitterEmail ?? ip;

    const rateLimit = await checkNominationRateLimit(rateLimitKey);
    if (!rateLimit.ok) {
      return {
        ok: false,
        error: `Too many submissions. Try again in ${rateLimit.retryAfterSeconds} seconds.`,
      };
    }

    const attachmentFiles = getAttachmentFiles(formData);
    let attachmentUrls: string[] = [];

    if (attachmentFiles.length > 0) {
      const uploadResult = await uploadNominationAttachments(attachmentFiles);
      if (!uploadResult.ok) {
        return { ok: false, error: uploadResult.error };
      }
      attachmentUrls = uploadResult.urls;
    }

    await db.insert(schema.nominations).values({
      outlet,
      workUrl,
      workTitle,
      groundsClaimed,
      evidenceUrls: normalizeUrls(evidenceUrls),
      attachmentUrls,
      narrative,
      submitterEmail,
      ipHash: hashIp(ip),
    });

    return { ok: true };
  } catch (error) {
    console.error("submitNomination failed:", error);
    return {
      ok: false,
      error:
        "Submission failed due to a server error. Please try again with fewer or smaller attachments.",
    };
  }
}
