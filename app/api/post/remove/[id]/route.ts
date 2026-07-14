import createHttpError from "http-errors";
import mongoose from "mongoose";
import { StatusCodes as HttpStatus } from "http-status-codes";
import connectDB from "lib/db";
import { PostModel } from "lib/models/Post";
import { requireUser } from "lib/auth";
import { withErrorHandler, ok } from "lib/apiHandler";
import { deleteUploadedFile } from "lib/upload";

export const DELETE = withErrorHandler<{ id: string }>(async (req, { params }) => {
  await connectDB();
  await requireUser(req);
  const { id } = await params;

  if (!mongoose.isValidObjectId(id))
    throw createHttpError.BadRequest("شناسه پست نامعتبر است");

  const existing = await PostModel.findById(id);
  if (!existing) throw createHttpError.BadRequest("پست با این مشخصات یافت نشد");

  const post = await PostModel.findByIdAndDelete(id);
  if (!post?._id) throw createHttpError.InternalServerError(" پست حذف نشد");

  if (post.coverImage) await deleteUploadedFile(post.coverImage);

  return ok({ message: "پست با موفقیت حذف شد" }, HttpStatus.OK);
});
