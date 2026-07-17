import createError from "http-errors";
import { StatusCodes as HttpStatus } from "http-status-codes";
import connectDB from "lib/db";
import { UserModel } from "lib/models/User";
import { requireUser } from "lib/auth";
import { withErrorHandler, ok } from "lib/apiHandler";
import { copyObject, deleteInvalidPropertyInObject } from "lib/utils";
import {
  saveUploadedFile,
  deleteUploadedFile,
  AVATAR_IMAGE_MAX_SIZE,
} from "lib/upload";

export const PATCH = withErrorHandler(async (req, { params }) => {
  await connectDB();
  await requireUser(req);

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
      } else if (key === "removeAvatar") {
        removeAvatar = value === "true" || value === true;
      } else {
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
    "password",
    "otp",
    "role",
    "refreshToken",
    "isVerifiedPhoneNumber",
    "createdAt",
    "updatedAt",
  ];

  deleteInvalidPropertyInObject(data, blackListFields);

  let nextAvatar = user.avatar;
  let nextAvatarBlurDataURL = user.avatarBlurDataURL;
  let uploadedAvatar = null;
  let shouldDeleteOldAvatar = false;

  try {
    if (avatarFile) {
      uploadedAvatar = await saveUploadedFile(avatarFile, "avatar", {
        maxSize: AVATAR_IMAGE_MAX_SIZE,
      });

      nextAvatar = uploadedAvatar.fileAddress;
      nextAvatarBlurDataURL = uploadedAvatar.blurDataURL;
      shouldDeleteOldAvatar = Boolean(user.avatar);
    } else if (removeAvatar) {
      nextAvatar = null;
      nextAvatarBlurDataURL = null;
      shouldDeleteOldAvatar = Boolean(user.avatar);
    }

    const updateResult = await UserModel.updateOne(
      { _id: userId },
      {
        $set: {
          ...data,
          avatar: nextAvatar,
          avatarBlurDataURL: nextAvatarBlurDataURL,
        },
      },
    );

    if (!updateResult.matchedCount) {
      throw createError.NotFound("کاربر پیدا نشد");
    }

    if (shouldDeleteOldAvatar && user.avatar) {
      await deleteUploadedFile(user.avatar);
    }

    return ok(
      { message: "اطلاعات کاربر با موفقیت آپدیت شد" },
      HttpStatus.OK,
    );
  } catch (error) {
    if (uploadedAvatar?.fileAddress) {
      await deleteUploadedFile(uploadedAvatar.fileAddress);
    }
    throw error;
  }
});
