import createHttpError from "http-errors";
import { StatusCodes as HttpStatus } from "http-status-codes";
import connectDB from "lib/db";
import { PostModel } from "lib/models/Post";
import { getUserFromRequest } from "lib/auth";
import { withErrorHandler, ok } from "lib/apiHandler";
import { copyObject } from "lib/utils";
import { transformPost } from "lib/transformPost";

export const GET = withErrorHandler(async (req, { params }) => {
  await connectDB();
  const user = await getUserFromRequest(req);
  const { slug } = await params;

  const post = await PostModel.findOne({ slug }).populate([
    {
      path: "author",
      model: "User",
      select: { name: 1, biography: 1, avatar: 1 },
    },
    { path: "category", model: "Category", select: { title: 1, slug: 1 } },
    {
      path: "related",
      model: "Post",
      select: {
        title: 1,
        slug: 1,
        briefText: 1,
        coverImage: 1,
        coverImageBlurDataURL: 1,
        author: 1,
      },
      populate: [
        {
          path: "author",
          model: "User",
          select: { name: 1, biography: 1, avatar: 1 },
        },
        { path: "category", model: "Category", select: { title: 1, slug: 1 } },
      ],
    },
  ]);

  if (!post) throw createHttpError.NotFound("پستی با این مشخصات یافت نشد");

  const transformedPost = copyObject(post);
  await transformPost(transformedPost, user);

  return ok({ post: transformedPost }, HttpStatus.OK);
});
