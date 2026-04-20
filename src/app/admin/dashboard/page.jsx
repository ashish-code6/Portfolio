import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  adminSessionCookieName,
  verifySessionToken,
} from "../../../lib/server/adminAuth";
import AdminEditor from "../components/AdminEditor";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(adminSessionCookieName)?.value;

  if (!verifySessionToken(token)) {
    redirect("/admin/login");
  }

  return <AdminEditor />;
}
