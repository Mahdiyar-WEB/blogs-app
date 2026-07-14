import createError from "http-errors";
import { StatusCodes as HttpStatus } from "http-status-codes";
import connectDB from "lib/db";
import { UserModel } from "lib/models/User";
import { requireUser } from "lib/auth";
import { withErrorHandler, ok } from "lib/apiHandler";

export const GET = withErrorHandler<{ userId: string }>(async (req, { params }) => {
  await connectDB();
  await requireUser(req);
  const { userId } = await params;

  if (!userId) throw createError.BadRequest("شناسه کاربر ارسال نشده است");

  const user = await UserModel.findById(userId).select("-password -otp");
  if (!user) throw createError.NotFound("کاربر مورد نظر یافت نشد");

  return ok({ user }, HttpStatus.OK);
});
