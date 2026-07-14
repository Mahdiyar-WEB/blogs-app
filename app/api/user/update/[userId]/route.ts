import createError from "http-errors";
import { StatusCodes as HttpStatus } from "http-status-codes";
import connectDB from "lib/db";
import { UserModel } from "lib/models/User";
import { requireUser } from "lib/auth";
import { withErrorHandler, ok } from "lib/apiHandler";
import { copyObject, deleteInvalidPropertyInObject } from "lib/utils";
import { saveUploadedFile, deleteUploadedFile, AVATAR_IMAGE_MAX_SIZE } from "lib/upload";

export const PATCH = withErrorHandler<{ userId: string }>(async (req, { params }) => {
  await connectDB();
  await requireUser(req);
  const { userId } = await params;

  const user = await UserModel.findById(userId);
  if (!user) throw createError.NotFound("کاربر پیدا نشد");

  const contentType = req.headers.get("content-type") || "";
  let rest: Record<string, unknown> = {};
  let removeAvatar = false;
  let uploadedFile: File | null = null;

  if (contentType.includes("multipart/form-data")) {
    const formData = await req.formData();
    for (const [key, value] of formData.entries()) {
      if (key === "avatar" && value instanceof File && value.size > 0) {
        uploadedFile = value;
      } else if (key === "removeAvatar") {
        removeAvatar = value === "true" || (value as unknown) === true;
      } else {
        rest[key] = value;
      }
    }
  } else {
    const body = (await req.json()) as Record<string, unknown>;
    const { removeAvatar: removeFlag, ...others } = body;
    removeAvatar = removeFlag === true || removeFlag === "true";
    rest = others;
  }

  const data = copyObject(rest);

  const blackListFields = [
    "password",
    "otp",
    "role",
    "refreshToken",
    "isVerifiedPhoneNumber",
    "createdAt",
    "updatedAt",
  ];

  deleteInvalidPropertyInObject(data, blackListFields);

  let avatar = user.avatar;

  if (removeAvatar) {
    if (user.avatar) await deleteUploadedFile(user.avatar);
    avatar = null;
  } else if (uploadedFile) {
    const saved = await saveUploadedFile(uploadedFile, "avatar", {
      maxSize: AVATAR_IMAGE_MAX_SIZE,
    });
    if (saved) {
      if (user.avatar) await deleteUploadedFile(user.avatar);
      avatar = saved.fileAddress;
    }
  }

  const updateResult = await UserModel.updateOne(
    { _id: userId },
    { $set: { ...data, avatar } },
  );

  if (!updateResult.modifiedCount)
    throw createError.InternalServerError("آپدیت انجام نشد");

  return ok({ message: "اطلاعات کاربر با موفقیت آپدیت شد" }, HttpStatus.OK);
});
