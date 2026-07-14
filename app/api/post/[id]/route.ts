import createHttpError from "http-errors";
import mongoose from "mongoose";
import { StatusCodes as HttpStatus } from "http-status-codes";
import connectDB from "lib/db";
import { PostModel } from "lib/models/Post";
import { getUserFromRequest } from "lib/auth";
import { withErrorHandler, ok } from "lib/apiHandler";
import { copyObject } from "lib/utils";
import { transformPost } from "lib/transformPost";
import type { LeanPost } from "types/api";

export const GET = withErrorHandler<{ id: string }>(async (req, { params }) => {
  await connectDB();
  const user = await getUserFromRequest(req);
  const { id } = await params;

  if (!mongoose.isValidObjectId(id))
    throw createHttpError.BadRequest("شناسه پست نامعتبر است");

  const existing = await PostModel.findById(id);
  if (!existing) throw createHttpError.BadRequest("پست با این مشخصات یافت نشد");

  const post = await PostModel.findOne({ slug: existing.slug }).populate([
    { path: "author", model: "User", select: { name: 1, biography: 1, avatar: 1 } },
    { path: "category", model: "Category", select: { title: 1, slug: 1 } },
    {
      path: "related",
      model: "Post",
      select: { title: 1, slug: 1, briefText: 1, coverImage: 1, author: 1 },
      populate: [
        { path: "author", model: "User", select: { name: 1, biography: 1, avatar: 1 } },
        { path: "category", model: "Category", select: { title: 1, slug: 1 } },
      ],
    },
  ]);

  const transformedPost = copyObject(post) as LeanPost;
  const result = await transformPost(transformedPost, user);

  return ok({ post: result }, HttpStatus.OK);
});
