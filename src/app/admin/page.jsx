import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  adminSessionCookieName,
  verifySessionToken,
} from "../../lib/server/adminAuth";

export const dynamic = "force-dynamic";

export default async function AdminIndexPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(adminSessionCookieName)?.value;

  if (verifySessionToken(token)) {
    redirect("/admin/dashboard");
  }

  redirect("/admin/login");
}
