import { NextResponse } from "next/server";
import middlewareAuth from "utils/middlewareAuth";

export async function proxy(request) {
  const pathName = request.nextUrl.pathname;
  const user = await middlewareAuth(request);
  if (pathName === "/login" && user) {
    return NextResponse.redirect(new URL("/", request.url));
  } else if (pathName === "/profile" && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/profile/:path*", "/login"],
};
