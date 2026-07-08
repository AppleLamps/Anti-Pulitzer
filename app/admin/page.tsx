import Link from "next/link";
import { redirect } from "next/navigation";

import { logoutAdmin } from "@/app/actions/admin";
import { NominationReviewList } from "@/components/admin/NominationReviewList";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  isAdminAuthenticated,
  isAdminConfigured,
} from "@/lib/admin-auth";
import { getPendingNominations } from "@/lib/data/nominations";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!isAdminConfigured()) {
    return (
      <div className="content-container py-14 md:py-20">
        <PageHeader
          kicker="Admin"
          title="Panel review"
          standfirst="Admin access is not configured. Set ADMIN_PASSWORD in the environment."
          folio="Administration"
        />
      </div>
    );
  }

  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const nominations = await getPendingNominations();

  return (
    <div className="content-container py-14 md:py-20">
      <PageHeader
        kicker="Admin"
        title="Panel review"
        standfirst="Review pending nominations, publish recipients to the archive, or dismiss submissions."
        folio="Administration"
      />

      <div className="mt-8 flex items-center justify-between gap-4 border-b border-border/70 pb-6">
        <p className="dateline">
          {nominations.length} pending{" "}
          {nominations.length === 1 ? "submission" : "submissions"}
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="/archive"
            className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-gold hover:text-foreground"
          >
            View archive
          </Link>
          <form action={logoutAdmin}>
            <button
              type="submit"
              className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>

      <div className="mt-10">
        <NominationReviewList nominations={nominations} />
      </div>
    </div>
  );
}
