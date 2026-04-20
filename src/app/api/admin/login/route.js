import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  adminSessionCookieName,
  createSessionToken,
  getAdminCredentials,
} from "../../../../lib/server/adminAuth";

export const dynamic = "force-dynamic";

export async function POST(request) {
  const body = await request.json();
  const { username, password } = body;
  const adminCredentials = getAdminCredentials();

  if (
    username !== adminCredentials.username ||
    password !== adminCredentials.password
  ) {
    return NextResponse.json(
      { message: "Invalid username or password." },
      { status: 401 }
    );
  }

  const cookieStore = await cookies();
  cookieStore.set(adminSessionCookieName, createSessionToken(username), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return NextResponse.json({ ok: true });
}
