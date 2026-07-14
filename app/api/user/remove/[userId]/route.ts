import createError from "http-errors";
import { StatusCodes as HttpStatus } from "http-status-codes";
import connectDB from "lib/db";
import { UserModel } from "lib/models/User";
import { withErrorHandler, ok } from "lib/apiHandler";

export const DELETE = withErrorHandler<{ userId: string }>(async (req, { params }) => {
  await connectDB();
  const { userId } = await params;

  const user = await UserModel.findById(userId);
  if (!user) throw createError.NotFound("کاربر مورد نظر یافت نشد");

  await UserModel.deleteOne({ _id: userId });

  return ok({ message: "کاربر با موفقیت حذف شد" }, HttpStatus.OK);
});
