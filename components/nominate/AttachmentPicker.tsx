"use client";

import { FileText, ImageIcon, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { nominateContent } from "@/lib/site";
import { cn } from "@/lib/utils";

const MAX_FILES = 5;

type AttachmentPickerProps = {
  files: File[];
  onChange: (files: File[]) => void;
  className?: string;
};

function fileKey(file: File): string {
  return `${file.name}-${file.size}-${file.lastModified}`;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  if (bytes < 1024 * 1024) {
    return `${Math.ceil(bytes / 1024)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isImageFile(file: File): boolean {
  if (file.type.startsWith("image/")) {
    return true;
  }

  return /\.(png|jpe?g|gif|webp|heic|heif|bmp)$/i.test(file.name);
}

function FilePreview({ file }: { file: File }) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileIdentity = fileKey(file);

  useEffect(() => {
    if (!isImageFile(file)) {
      return;
    }

    let cancelled = false;
    const reader = new FileReader();

    reader.onload = () => {
      if (!cancelled && typeof reader.result === "string") {
        setPreviewUrl(reader.result);
      }
    };

    reader.onerror = () => {
      if (!cancelled) {
        setPreviewUrl(null);
      }
    };

    reader.readAsDataURL(file);

    return () => {
      cancelled = true;
      reader.abort();
      setPreviewUrl(null);
    };
  }, [file, fileIdentity]);

  if (previewUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={previewUrl}
        alt={`Preview of ${file.name}`}
        className="size-12 shrink-0 border border-border/70 object-cover"
      />
    );
  }

  return (
    <div className="flex size-12 shrink-0 items-center justify-center border border-border/70 bg-card/40 text-gold/80">
      {file.type === "application/pdf" || file.name.endsWith(".pdf") ? (
        <FileText className="size-5" aria-hidden="true" />
      ) : (
        <ImageIcon className="size-5" aria-hidden="true" />
      )}
    </div>
  );
}

export function AttachmentPicker({
  files,
  onChange,
  className,
}: AttachmentPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function addFiles(incoming: File[]) {
    const merged = [...files];

    for (const file of incoming) {
      const key = fileKey(file);
      const exists = merged.some((existing) => fileKey(existing) === key);
      if (!exists) {
        merged.push(file);
      }
    }

    onChange(merged.slice(0, MAX_FILES));
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    addFiles(Array.from(event.target.files ?? []));
    event.target.value = "";
  }

  function removeFile(target: File) {
    const key = fileKey(target);
    onChange(files.filter((file) => fileKey(file) !== key));
  }

  const atLimit = files.length >= MAX_FILES;

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex flex-wrap items-center gap-3">
        <input
          ref={inputRef}
          id="attachments"
          name="attachments"
          type="file"
          multiple
          accept="image/*,.pdf,.txt,text/plain"
          onChange={handleFileChange}
          className="sr-only"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={atLimit}
          className="inline-flex items-center gap-2 border border-gold/40 bg-gold/10 px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-gold transition-colors hover:bg-gold hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
        >
          {files.length > 0 ? "Add more files" : "Choose files"}
        </button>
        <p className="dateline">
          {files.length} of {MAX_FILES} attached
        </p>
      </div>

      <p className="text-xs text-muted-foreground">
        {nominateContent.attachmentsHelp}
      </p>

      {files.length > 0 ? (
        <ul className="space-y-2 border border-border/70 bg-card/20 p-3">
          {files.map((file, index) => (
            <li
              key={fileKey(file)}
              className="flex items-center gap-3 border-b border-border/50 py-3 last:border-b-0 last:pb-0 first:pt-0"
            >
              <span className="index-numeral w-6 shrink-0 text-sm text-gold/50">
                {String(index + 1).padStart(2, "0")}
              </span>
              <FilePreview file={file} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-foreground">{file.name}</p>
                <p className="mt-0.5 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground">
                  {formatFileSize(file.size)}
                  {file.type ? ` · ${file.type}` : ""}
                </p>
              </div>
              <button
                type="button"
                onClick={() => removeFile(file)}
                aria-label={`Remove ${file.name}`}
                className="shrink-0 rounded-sm p-1 text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="border border-dashed border-border/70 px-4 py-6 text-center text-sm text-muted-foreground">
          No files attached yet.
        </p>
      )}
    </div>
  );
}

export { MAX_FILES as maxAttachmentFiles };
