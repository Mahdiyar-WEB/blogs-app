import { NextResponse } from "next/server";
import { clearAuthCookies } from "lib/auth";
import { resetDemoData } from "seed/resetDemoData";


export async function POST(request) {
  const expectedSecret = process.env.DEMO_RESET_SECRET;
  const receivedSecret = request.headers.get("x-demo-reset-secret");

  if (!expectedSecret || receivedSecret !== expectedSecret) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const result = await resetDemoData();

  const response = NextResponse.json(result, {
    headers: { "Cache-Control": "no-store" },
  });

  if (result.success) {
    clearAuthCookies(response);
  }

  return response;
}
