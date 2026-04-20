import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  adminSessionCookieName,
  verifySessionToken,
} from "../../../../lib/server/adminAuth";
import {
  readPortfolioContent,
  writePortfolioContent,
} from "../../../../lib/server/portfolioStore";

export const dynamic = "force-dynamic";

async function isAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(adminSessionCookieName)?.value;
  return verifySessionToken(token);
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const content = await readPortfolioContent();
  return NextResponse.json(content);
}

export async function PUT(request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const content = await writePortfolioContent(body);
  return NextResponse.json(content);
}
