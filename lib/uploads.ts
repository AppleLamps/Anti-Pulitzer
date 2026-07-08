import { put } from "@vercel/blob";

import { getBlobReadWriteToken, hasBlobStorage } from "@/lib/env";

export { getBlobReadWriteToken, hasBlobStorage };

const MAX_FILES = 5;
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/heic",
  "image/heif",
  "application/pdf",
  "text/plain",
]);

function sanitizeFilename(filename: string): string {
  return filename
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function isFile(value: FormDataEntryValue): value is File {
  return typeof value === "object" && value !== null && "arrayBuffer" in value;
}

export function getAttachmentFiles(formData: FormData): File[] {
  return formData
    .getAll("attachments")
    .filter(isFile)
    .filter((file) => file.size > 0);
}

export async function uploadNominationAttachments(
  files: File[],
): Promise<{ ok: true; urls: string[] } | { ok: false; error: string }> {
  const token = getBlobReadWriteToken();
  if (!token) {
    return {
      ok: false,
      error: "File uploads are not configured yet.",
    };
  }

  if (files.length > MAX_FILES) {
    return {
      ok: false,
      error: `You can upload up to ${MAX_FILES} files per nomination.`,
    };
  }

  const urls: string[] = [];

  for (const file of files) {
    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      return {
        ok: false,
        error: "Only images, PDF, and plain text files are allowed.",
      };
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return {
        ok: false,
        error: "Each file must be 10 MB or smaller.",
      };
    }

    const safeName = sanitizeFilename(file.name || "attachment");
    const pathname = `nominations/${Date.now()}-${crypto.randomUUID()}-${safeName}`;

    const blob = await put(pathname, file, {
      access: "public",
      addRandomSuffix: false,
      token,
      contentType: file.type,
    });

    urls.push(blob.url);
  }

  return { ok: true, urls };
}

export function isImageUrl(url: string): boolean {
  return /\.(jpe?g|png|gif|webp|heic|heif)(\?|$)/i.test(url);
}
