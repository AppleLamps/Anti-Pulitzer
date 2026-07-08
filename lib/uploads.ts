import { getBlobReadWriteToken, hasBlobStorage } from "@/lib/env";

export { getBlobReadWriteToken, hasBlobStorage };

export const MAX_FILES = 5;
export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

export const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/heic",
  "image/heif",
  "application/pdf",
  "text/plain",
] as const;

/**
 * Confirms a URL points at Blob storage before it is persisted. Attachment
 * URLs arrive from the client (which uploads directly to Blob), so the server
 * must not trust arbitrary URLs.
 */
export function isValidBlobUrl(url: string): boolean {
  try {
    const { protocol, hostname } = new URL(url);
    return (
      protocol === "https:" && hostname.endsWith(".blob.vercel-storage.com")
    );
  } catch {
    return false;
  }
}

export function isImageUrl(url: string): boolean {
  return /\.(jpe?g|png|gif|webp|heic|heif)(\?|$)/i.test(url);
}
