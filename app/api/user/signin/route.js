import createError from "http-errors";
import bcrypt from "bcryptjs";
import { StatusCodes as HttpStatus } from "http-status-codes";
import { NextResponse } from "next/server";
import connectDB from "lib/db";
import { UserModel } from "lib/models/User";
import { validateSigninSchema } from "lib/validators/auth.schema";
import { setAuthCookies } from "lib/auth";
import { withErrorHandler } from "lib/apiHandler";

export const POST = withErrorHandler(async (req) => {
  await connectDB();
  const body = await req.json();
  await validateSigninSchema(body);
  const { email, password } = body;

  const user = await UserModel.findOne({ email: email.toLowerCase() });
  if (!user) throw createError.BadRequest("کاربری با این ایمیل وجود ندارد");

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) throw createError.BadRequest("ایمیل یا رمز عبور اشتباه است");

  const response = NextResponse.json(
    {
      statusCode: HttpStatus.OK,
      data: {
        message: "ورود با موفقیت انجام شد",
        user,
      },
    },
    { status: HttpStatus.OK },
  );

  setAuthCookies(response, user);
  return response;
});
