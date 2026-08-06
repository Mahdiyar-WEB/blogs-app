import createError from "http-errors";
import { StatusCodes as HttpStatus } from "http-status-codes";
import connectDB from "lib/db";
import { UserModel } from "lib/models/User";
import { withErrorHandler, ok } from "lib/apiHandler";
import { copyObject, deleteInvalidPropertyInObject } from "lib/utils";
import {
  saveUploadedFile,
  deleteUploadedFile,
  AVATAR_IMAGE_MAX_SIZE,
} from "lib/upload";

export const PATCH = withErrorHandler(async (req, { params }) => {
  await connectDB();

  const { userId } = await params;

  const user = await UserModel.findById(userId);

  if (!user) {
    throw createError.NotFound("کاربر پیدا نشد");
  }

  const contentType = req.headers.get("content-type") || "";

  let rest = {};
  let removeAvatar = false;
  let avatarFile = null;

  if (contentType.includes("multipart/form-data")) {
    const formData = await req.formData();

    for (const [key, value] of formData.entries()) {
      if (key === "avatar" && value instanceof File && value.size > 0) {
        avatarFile = value;
        continue;
      }

      if (key === "removeAvatar") {
        removeAvatar = value === "true";
        continue;
      }

      // File خالی یا فایل‌های ناشناخته وارد data نشوند.
      if (!(value instanceof File)) {
        rest[key] = value;
      }
    }
  } else {
    const body = await req.json();
    const { removeAvatar: removeFlag, ...others } = body;

    removeAvatar = removeFlag === true || removeFlag === "true";

    rest = others;
  }

  const data = copyObject(rest);

  const blackListFields = [
    "_id",
    "id",
    "__v",
    "password",
    "otp",
    "role",
    "refreshToken",
    "isVerifiedPhoneNumber",
    "createdAt",
    "updatedAt",

    // این فیلدها فقط باید توسط منطق سرور مدیریت شوند.
    "avatar",
    "avatarUrl",
    "avatarBlurDataURL",
    "removeAvatar",
  ];

  deleteInvalidPropertyInObject(data, blackListFields);

  const oldAvatar = user.avatar;
  let uploadedAvatar = null;

  try {
    if (avatarFile) {
      uploadedAvatar = await saveUploadedFile(avatarFile, "avatar", {
        maxSize: AVATAR_IMAGE_MAX_SIZE,
      });

      user.avatar = uploadedAvatar.fileAddress;
      user.avatarBlurDataURL = uploadedAvatar.blurDataURL;
    } else if (removeAvatar) {
      user.avatar = null;
      user.avatarBlurDataURL = null;
    }

    for (const [key, value] of Object.entries(data)) {
      user.set(key, value);
    }

    await user.save();
  } catch (error) {
    // اگر آپلود انجام شد ولی ذخیره دیتابیس شکست خورد،
    // فایل جدید orphan باقی نماند.
    if (uploadedAvatar?.fileAddress) {
      await deleteUploadedFile(uploadedAvatar.fileAddress);
    }

    throw error;
  }

  const avatarChanged = Boolean(avatarFile) || removeAvatar;

  // شکست پاک‌سازی فایل قبلی نباید آپدیت موفق دیتابیس را rollback کند.
  if (avatarChanged && oldAvatar && oldAvatar !== user.avatar) {
    await deleteUploadedFile(oldAvatar);
  }

  return ok(
    {
      message: "اطلاعات کاربر با موفقیت آپدیت شد",
      user: user.toJSON(),
    },
    HttpStatus.OK,
  );
});
