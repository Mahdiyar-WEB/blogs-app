import createError from "http-errors";
import bcrypt from "bcryptjs";
import { StatusCodes as HttpStatus } from "http-status-codes";
import { NextResponse } from "next/server";
import connectDB from "lib/db";
import { UserModel } from "lib/models/User";
import { validateSignupSchema } from "lib/validators/auth.schema";
import { setAuthCookies } from "lib/auth";
import { withErrorHandler } from "lib/apiHandler";

export const POST = withErrorHandler(async (req) => {
  await connectDB();
  const body = await req.json();
  await validateSignupSchema(body);
  const { name, email, password } = body;

  const existedUser = await UserModel.findOne({ email: email.toLowerCase() });
  if (existedUser) throw createError.BadRequest("کاربری با این ایمیل وجود دارد");

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const user = await UserModel.create({
    name,
    email: email.toLowerCase().trim(),
    password: hashedPassword,
  });

  const response = NextResponse.json(
    {
      statusCode: HttpStatus.OK,
      data: {
        message: "ثبت نام با موفقیت انجام شد",
        user,
      },
    },
    { status: HttpStatus.OK },
  );

  setAuthCookies(response, user);
  return response;
});
