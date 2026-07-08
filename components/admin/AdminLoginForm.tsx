"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { loginAdmin } from "@/app/actions/admin";

export function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("password") ?? "");

    startTransition(async () => {
      const result = await loginAdmin(password);
      if (!result.ok) {
        setError(result.error);
        return;
      }

      router.push("/admin");
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-6">
      <div className="space-y-2">
        <label htmlFor="password" className="kicker">
          Admin password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-gold/60"
        />
      </div>

      {error ? (
        <p className="border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center gap-2 border border-gold bg-gold/10 px-5 py-2.5 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-gold transition-colors hover:bg-gold hover:text-primary-foreground disabled:opacity-50"
      >
        {isPending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
