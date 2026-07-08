import { redirect } from "next/navigation";

import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  isAdminAuthenticated,
  isAdminConfigured,
} from "@/lib/admin-auth";

export default async function AdminLoginPage() {
  if (!isAdminConfigured()) {
    return (
      <div className="content-container py-14 md:py-20">
        <PageHeader
          kicker="Admin"
          title="Sign in"
          standfirst="Admin access is not configured. Set ADMIN_PASSWORD in the environment."
          folio="Administration"
        />
      </div>
    );
  }

  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }

  return (
    <div className="content-container py-14 md:py-20">
      <PageHeader
        kicker="Admin"
        title="Sign in"
        standfirst="Restricted access for panel review and archive publication."
        folio="Administration"
      />

      <div className="mt-12">
        <AdminLoginForm />
      </div>
    </div>
  );
}
