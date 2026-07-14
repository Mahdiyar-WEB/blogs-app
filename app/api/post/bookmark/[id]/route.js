import createHttpError from "http-errors";
import mongoose from "mongoose";
import { StatusCodes as HttpStatus } from "http-status-codes";
import connectDB from "lib/db";
import { PostModel } from "lib/models/Post";
import { UserModel } from "lib/models/User";
import { requireUser } from "lib/auth";
import { withErrorHandler, ok } from "lib/apiHandler";

export const POST = withErrorHandler(async (req, { params }) => {
  await connectDB();
  const user = await requireUser(req);
  const { id: postId } = await params;

  if (!mongoose.isValidObjectId(postId))
    throw createHttpError.BadRequest("شناسه پست نامعتبر است");
  const post = await PostModel.findById(postId);
  if (!post) throw createHttpError.BadRequest("پست با این مشخصات یافت نشد");

  const bookmarkedPost = await PostModel.findOne({ _id: postId, bookmarks: user._id });

  const updatePostQuery = bookmarkedPost
    ? { $pull: { bookmarks: user._id } }
    : { $push: { bookmarks: user._id } };

  const updateUserQuery = bookmarkedPost
    ? { $pull: { bookmarkedPosts: post._id } }
    : { $push: { bookmarkedPosts: post._id } };

  const postUpdate = await PostModel.updateOne({ _id: postId }, updatePostQuery);
  const userUpdate = await UserModel.updateOne({ _id: user._id }, updateUserQuery);

  if (postUpdate.modifiedCount === 0 || userUpdate.modifiedCount === 0)
    throw createHttpError.BadRequest("عملیات ناموفق بود.");

  const message = !bookmarkedPost ? "پست بوکمارک شد" : "پست از بوکمارک برداشته شد";

  return ok({ message }, HttpStatus.OK);
});
