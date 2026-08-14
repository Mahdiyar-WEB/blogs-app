import { StatusCodes as HttpStatus } from "http-status-codes";
import { NextResponse } from "next/server";
import { clearAuthCookies } from "lib/auth";
import { withErrorHandler } from "lib/apiHandler";

export const POST = withErrorHandler(async () => {
  const response = NextResponse.json(
    { statusCode: HttpStatus.OK, auth: false },
    { status: HttpStatus.OK },
  );
  clearAuthCookies(response);
  return response;
});
