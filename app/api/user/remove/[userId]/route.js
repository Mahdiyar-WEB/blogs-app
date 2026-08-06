import createError from "http-errors";
import { StatusCodes as HttpStatus } from "http-status-codes";
import connectDB from "lib/db";
import { UserModel } from "lib/models/User";
import { withErrorHandler, ok } from "lib/apiHandler";
import { deleteUploadedFile } from "lib/upload";

export const DELETE = withErrorHandler(async (req, { params }) => {
  await connectDB();
  const { userId } = await params;

  const user = await UserModel.findByIdAndDelete(userId);
  if (!user) {
    throw createError.NotFound("کاربر مورد نظر یافت نشد");
  }

  if (user.avatar) {
    await deleteUploadedFile(user.avatar);
  }

  return ok({ message: "کاربر با موفقیت حذف شد" }, HttpStatus.OK);
});
