import createError from "http-errors";
import { StatusCodes as HttpStatus } from "http-status-codes";
import connectDB from "lib/db";
import { UserModel } from "lib/models/User";
import { requireUser } from "lib/auth";
import { withErrorHandler, ok } from "lib/apiHandler";
import { saveUploadedFile, deleteUploadedFile, AVATAR_IMAGE_MAX_SIZE } from "lib/upload";

export const POST = withErrorHandler(async (req) => {
  await connectDB();
  const user = await requireUser(req);

  const formData = await req.formData();
  const file = formData.get("avatar");

  if (!(file instanceof File) || file.size === 0)
    throw createError.BadRequest("عکس پروفایل ارسال نشده است");

  const saved = await saveUploadedFile(file, "avatar", {
    maxSize: AVATAR_IMAGE_MAX_SIZE,
  });

  const updateResult = await UserModel.updateOne(
    { _id: user._id },
    { $set: { avatar: saved.fileAddress } },
  );

  if (!updateResult.modifiedCount)
    throw createError.BadRequest("عکس پروفایل آپلود نشد");

  if (user.avatar && user.avatar !== saved.fileAddress) {
    await deleteUploadedFile(user.avatar);
  }

  return ok({ message: "عکس پروفایل با موفقیت آپلود شد" }, HttpStatus.OK);
});
