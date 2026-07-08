"use client";

import { upload } from "@vercel/blob/client";
import Link from "next/link";
import { useState, useTransition } from "react";

import { submitNomination } from "@/app/actions/nominations";
import { AttachmentPicker } from "@/components/nominate/AttachmentPicker";
import { GroundsTag } from "@/components/ui/GroundsTag";
import { criteriaItems, nominateContent } from "@/lib/site";
import { cn } from "@/lib/utils";

const inputClassName =
  "w-full border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-gold/60";

const labelClassName = "kicker text-gold/80";

export function NominationForm() {
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedGrounds, setSelectedGrounds] = useState<string[]>([]);

  function toggleGround(tag: string) {
    setSelectedGrounds((current) =>
      current.includes(tag)
        ? current.filter((value) => value !== tag)
        : [...current, tag],
    );
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);

    // Files upload directly to Blob from the browser, bypassing the Server
    // Action body limit. Only the resulting URLs are sent to the action.
    formData.delete("attachments");

    for (const ground of selectedGrounds) {
      formData.append("groundsClaimed", ground);
    }

    startTransition(async () => {
      try {
        for (const file of selectedFiles) {
          const blob = await upload(`nominations/${file.name}`, file, {
            access: "public",
            handleUploadUrl: "/api/nominations/upload",
            ...(file.type ? { contentType: file.type } : {}),
          });
          formData.append("attachmentUrls", blob.url);
        }

        const result = await submitNomination(formData);

        if (!result.ok) {
          setError(result.error);
          return;
        }

        setSubmitted(true);
      } catch {
        setError(
          "Submission failed. If you attached files, try fewer or smaller attachments and submit again.",
        );
      }
    });
  }

  if (submitted) {
    return (
      <div className="border border-gold/25 bg-card/25 p-8 md:p-10">
        <p className="kicker">{nominateContent.label}</p>
        <div className="masthead-rule mt-4" />
        <h2 className="mt-6 font-heading text-3xl text-foreground">
          {nominateContent.successHeading}
        </h2>
        <p className="mt-4 max-w-prose text-base leading-relaxed text-muted-foreground">
          {nominateContent.successBody}
        </p>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
          {nominateContent.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-gold transition-colors hover:text-foreground"
            >
              {link.label} <span aria-hidden="true">&rarr;</span>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-10">
      <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
        {nominateContent.evidenceNote}
      </p>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="outlet" className={labelClassName}>
            {nominateContent.fields.outlet}
          </label>
          <input
            id="outlet"
            name="outlet"
            required
            className={inputClassName}
            placeholder="Publication or broadcaster"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="workTitle" className={labelClassName}>
            {nominateContent.fields.workTitle}
          </label>
          <input
            id="workTitle"
            name="workTitle"
            className={inputClassName}
            placeholder="Headline, if known"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="workUrl" className={labelClassName}>
          {nominateContent.fields.workUrl}
        </label>
        <input
          id="workUrl"
          name="workUrl"
          type="url"
          required
          className={inputClassName}
          placeholder="https://"
        />
      </div>

      <fieldset className="space-y-4">
        <legend className={labelClassName}>{nominateContent.groundsLabel}</legend>
        <p className="text-sm text-muted-foreground">{nominateContent.groundsHelp}</p>
        <div className="flex flex-wrap gap-2">
          {criteriaItems.map((item) => {
            const selected = selectedGrounds.includes(item.tag);
            return (
              <button
                key={item.tag}
                type="button"
                onClick={() => toggleGround(item.tag)}
                aria-pressed={selected}
                className={cn(
                  "transition-colors",
                  selected ? "opacity-100" : "opacity-55 hover:opacity-80",
                )}
              >
                <GroundsTag
                  className={cn(
                    selected && "border-gold bg-gold/10 text-gold",
                  )}
                >
                  {item.tag}
                </GroundsTag>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="space-y-2">
        <label htmlFor="evidenceUrls" className={labelClassName}>
          {nominateContent.fields.evidenceUrls}
        </label>
        <textarea
          id="evidenceUrls"
          name="evidenceUrls"
          rows={3}
          className={cn(inputClassName, "resize-y")}
          placeholder="https://&#10;https://"
        />
      </div>

      <div className="space-y-2">
        <p className={labelClassName}>{nominateContent.fields.attachments}</p>
        <AttachmentPicker
          files={selectedFiles}
          onChange={(files) => {
            setSelectedFiles(files);
            setError(null);
          }}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="narrative" className={labelClassName}>
          {nominateContent.fields.narrative}
        </label>
        <textarea
          id="narrative"
          name="narrative"
          required
          minLength={100}
          rows={8}
          className={cn(inputClassName, "resize-y leading-relaxed")}
          placeholder="Describe the failure, cite the evidence, and explain the public harm."
        />
        <p className="text-xs text-muted-foreground">
          {nominateContent.narrativeHelp}
        </p>
      </div>

      <div className="space-y-2">
        <label htmlFor="submitterEmail" className={labelClassName}>
          {nominateContent.fields.submitterEmail}
        </label>
        <input
          id="submitterEmail"
          name="submitterEmail"
          type="email"
          className={inputClassName}
          placeholder="you@example.com"
        />
      </div>

      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {error ? (
        <p className="border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending || selectedGrounds.length === 0}
        className="inline-flex items-center gap-2 border border-gold bg-gold/10 px-5 py-2.5 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-gold transition-colors hover:bg-gold hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "Submitting..." : nominateContent.submit}
        <span aria-hidden="true">&rarr;</span>
      </button>
    </form>
  );
}
