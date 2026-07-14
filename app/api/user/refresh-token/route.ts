import { StatusCodes as HttpStatus } from "http-status-codes";
import { NextResponse } from "next/server";
import createError from "http-errors";
import connectDB from "lib/db";
import { UserModel } from "lib/models/User";
import { getUserIdFromRefreshToken, setAuthCookies } from "lib/auth";
import { withErrorHandler } from "lib/apiHandler";

export const GET = withErrorHandler(async (req) => {
  await connectDB();
  const userId = getUserIdFromRefreshToken(req);
  const user = await UserModel.findById(userId);
  if (!user) throw createError.Unauthorized("حساب کاربری یافت نشد");

  const response = NextResponse.json(
    {
      statusCode: HttpStatus.OK,
      data: { user },
    },
    { status: HttpStatus.OK },
  );

  setAuthCookies(response, user);
  return response;
});
