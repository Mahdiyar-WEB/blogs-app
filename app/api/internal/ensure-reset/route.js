import { NextResponse } from "next/server";
import { clearAuthCookies } from "@/lib/auth";
import { ensureDemoReset } from "@/seed/ensureDemoReset";


export async function GET() {
  if (process.env.DEMO_MODE !== "true") {
    return NextResponse.json({ reset: false, disabled: true });
  }

  const result = await ensureDemoReset();

  const response = NextResponse.json(result, {
    headers: { "Cache-Control": "no-store" },
  });

  if (result.reset) {
    clearAuthCookies(response);
  }

  return response;
}
