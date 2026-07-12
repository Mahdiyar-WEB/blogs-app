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

  const likedPost = await PostModel.findOne({ _id: postId, likes: user._id });

  const updatePostQuery = likedPost
    ? { $pull: { likes: user._id } }
    : { $push: { likes: user._id } };

  const updateUserQuery = likedPost
    ? { $pull: { likedPosts: post._id } }
    : { $push: { likedPosts: post._id } };

  const postUpdate = await PostModel.updateOne({ _id: postId }, updatePostQuery);
  const userUpdate = await UserModel.updateOne({ _id: user._id }, updateUserQuery);

  if (postUpdate.modifiedCount === 0 || userUpdate.modifiedCount === 0)
    throw createHttpError.BadRequest("عملیات ناموفق بود.");

  const message = !likedPost ? "مرسی بابت لایک تون" : "لایک شما برداشته شد";

  return ok({ message }, HttpStatus.OK);
});
