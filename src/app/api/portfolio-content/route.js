import { NextResponse } from "next/server";
import { readPortfolioContent } from "../../../lib/server/portfolioStore";

export const dynamic = "force-dynamic";

export async function GET() {
  const content = await readPortfolioContent();
  return NextResponse.json(content);
}
