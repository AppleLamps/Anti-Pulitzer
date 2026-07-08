"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import {
  markNominationSpam,
  publishNomination,
  rejectNomination,
} from "@/app/actions/admin";
import { GroundsTag } from "@/components/ui/GroundsTag";
import type { Nomination } from "@/drizzle/schema";
import { isImageUrl } from "@/lib/uploads";

type NominationReviewListProps = {
  nominations: Nomination[];
};

function formatTimestamp(value: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}

function NominationCard({ nomination }: { nomination: Nomination }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [reasoning, setReasoning] = useState("");
  const [isPending, startTransition] = useTransition();

  function runAction(action: () => Promise<{ ok: boolean; error?: string }>) {
    setError(null);
    startTransition(async () => {
      const result = await action();
      if (!result.ok) {
        setError(result.error ?? "Action failed.");
        return;
      }

      router.refresh();
    });
  }

  return (
    <article className="border border-border/70 bg-card/20 p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-heading text-xl text-foreground">
            {nomination.outlet}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {nomination.workTitle ?? nomination.workUrl}
          </p>
        </div>
        <p className="dateline">{formatTimestamp(nomination.createdAt)}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {nomination.groundsClaimed.map((ground) => (
          <GroundsTag key={ground}>{ground}</GroundsTag>
        ))}
      </div>

      <div className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
        <p>
          <span className="kicker text-gold/70">Source</span>
          <br />
          <a
            href={nomination.workUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="break-all text-gold hover:text-foreground"
          >
            {nomination.workUrl}
          </a>
        </p>

        {nomination.evidenceUrls.length > 0 ? (
          <div>
            <p className="kicker text-gold/70">Evidence links</p>
            <ul className="mt-2 space-y-1">
              {nomination.evidenceUrls.map((url) => (
                <li key={url}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all text-gold hover:text-foreground"
                  >
                    {url}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {nomination.attachmentUrls.length > 0 ? (
          <div>
            <p className="kicker text-gold/70">Uploaded files</p>
            <ul className="mt-3 space-y-4">
              {nomination.attachmentUrls.map((url) => (
                <li key={url}>
                  {isImageUrl(url) ? (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={url}
                        alt="Uploaded evidence"
                        className="max-h-56 max-w-full border border-border/70 object-contain"
                      />
                    </a>
                  ) : (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-all text-gold hover:text-foreground"
                    >
                      {url}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div>
          <p className="kicker text-gold/70">Narrative</p>
          <p className="mt-2 whitespace-pre-wrap text-foreground/90">
            {nomination.narrative}
          </p>
        </div>

        {nomination.submitterEmail ? (
          <p>
            <span className="kicker text-gold/70">Contact</span>
            <br />
            {nomination.submitterEmail}
          </p>
        ) : null}
      </div>

      <div className="mt-6 space-y-3 border-t border-border/70 pt-6">
        <label htmlFor={`reasoning-${nomination.id}`} className="kicker">
          Published reasoning
        </label>
        <textarea
          id={`reasoning-${nomination.id}`}
          value={reasoning}
          onChange={(event) => setReasoning(event.target.value)}
          rows={5}
          className="w-full resize-y border border-border bg-background px-3 py-2.5 text-sm leading-relaxed text-foreground outline-none focus:border-gold/60"
          placeholder="Write the public record that will accompany this entry in the archive."
        />

        {error ? (
          <p className="border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            disabled={isPending}
            onClick={() =>
              runAction(() =>
                publishNomination({
                  nominationId: nomination.id,
                  reasoning,
                }),
              )
            }
            className="inline-flex items-center gap-2 border border-gold bg-gold/10 px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-gold transition-colors hover:bg-gold hover:text-primary-foreground disabled:opacity-50"
          >
            Publish to archive
          </button>
          <button
            type="button"
            disabled={isPending}
            onClick={() => runAction(() => rejectNomination(nomination.id))}
            className="inline-flex items-center gap-2 border border-border px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
          >
            Reject
          </button>
          <button
            type="button"
            disabled={isPending}
            onClick={() => runAction(() => markNominationSpam(nomination.id))}
            className="inline-flex items-center gap-2 border border-destructive/40 px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-50"
          >
            Mark spam
          </button>
        </div>
      </div>
    </article>
  );
}

export function NominationReviewList({
  nominations,
}: NominationReviewListProps) {
  if (nominations.length === 0) {
    return (
      <div className="border border-border/70 py-16 text-center">
        <p className="font-heading text-2xl text-foreground">No pending nominations</p>
        <p className="mt-3 text-sm text-muted-foreground">
          New submissions will appear here for review.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {nominations.map((nomination) => (
        <NominationCard key={nomination.id} nomination={nomination} />
      ))}
    </div>
  );
}
