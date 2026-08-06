import createHttpError from "http-errors";
import mongoose from "mongoose";
import { StatusCodes as HttpStatus } from "http-status-codes";
import connectDB from "lib/db";
import { PostModel } from "lib/models/Post";
import { requireUser } from "lib/auth";
import { withErrorHandler, ok } from "lib/apiHandler";
import { deleteUploadedFile } from "lib/upload";

export const DELETE = withErrorHandler(async (req, { params }) => {
  await connectDB();
  await requireUser(req);

  const { id } = await params;

  if (!mongoose.isValidObjectId(id)) {
    throw createHttpError.BadRequest("شناسه پست نامعتبر است");
  }

  const post = await PostModel.findByIdAndDelete(id);
  if (!post?._id) {
    throw createHttpError.BadRequest("پست با این مشخصات یافت نشد");
  }

  if (post.coverImage) {
    await deleteUploadedFile(post.coverImage);
  }

  return ok({ message: "پست با موفقیت حذف شد" }, HttpStatus.OK);
});
