import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

import { getBlobReadWriteToken } from "@/lib/env";
import { ALLOWED_MIME_TYPES, MAX_FILE_SIZE_BYTES } from "@/lib/uploads";

/**
 * Issues short-lived client upload tokens so the browser can send attachments
 * directly to Blob storage. This keeps files off the nomination Server Action,
 * which is capped at Vercel's 4.5 MB request body limit.
 */
export async function POST(request: Request): Promise<NextResponse> {
  const token = getBlobReadWriteToken();
  if (!token) {
    return NextResponse.json(
      { error: "File uploads are not configured yet." },
      { status: 501 },
    );
  }

  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      token,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: [...ALLOWED_MIME_TYPES],
        addRandomSuffix: true,
        maximumSizeInBytes: MAX_FILE_SIZE_BYTES,
      }),
      onUploadCompleted: async () => {
        // The client receives the blob URL directly and submits it with the
        // nomination, so no post-upload persistence is needed here.
        // (This callback also does not fire on localhost.)
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 400 },
    );
  }
}
