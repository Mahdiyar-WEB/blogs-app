import { StatusCodes as HttpStatus } from "http-status-codes";
import type { FilterQuery, SortOrder } from "mongoose";
import connectDB from "lib/db";
import { PostModel } from "lib/models/Post";
import { CategoryModel } from "lib/models/Category";
import { getUserFromRequest } from "lib/auth";
import { withErrorHandler, ok } from "lib/apiHandler";
import { copyObject } from "lib/utils";
import { transformPost } from "lib/transformPost";
import type { PostDocument } from "types/models";
import type { LeanPost } from "types/api";

export const GET = withErrorHandler(async (req) => {
  await connectDB();
  const user = await getUserFromRequest(req);

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search");
  const categorySlug = searchParams.getAll("categorySlug");
  const sort = searchParams.get("sort");
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 6;

  const skip = (page - 1) * limit;

  const dbQuery: FilterQuery<PostDocument> = {};

  if (search) {
    const searchTerm = new RegExp(search, "ig");
    dbQuery.$or = [
      { title: searchTerm },
      { slug: searchTerm },
      { briefText: searchTerm },
      { text: searchTerm },
    ];
  }

  if (categorySlug.length) {
    const categories = categorySlug.flat(2);
    const categoryIds = [];

    for (const item of categories) {
      const category = await CategoryModel.findOne({ slug: item }).select("_id");
      if (category) categoryIds.push(category._id);
    }

    dbQuery.category = { $in: categoryIds };
  }

  const sortQuery: Record<string, SortOrder> = {};

  switch (sort) {
    case "latest":
      sortQuery.createdAt = -1;
      break;
    case "earliest":
      sortQuery.createdAt = 1;
      break;
    case "popular":
      sortQuery.likes = -1;
      break;
    case "time_desc":
      sortQuery.readingTime = -1;
      break;
    case "time_asc":
      sortQuery.readingTime = 1;
      break;
    default:
      sortQuery.createdAt = -1;
  }

  const [posts, totalPosts] = await Promise.all([
    PostModel.find(dbQuery, { comments: 0 })
      .populate([
        { path: "category", select: { title: 1, slug: 1 } },
        { path: "author", select: { name: 1, biography: 1, avatar: 1 } },
        {
          path: "related",
          model: "Post",
          select: {
            title: 1,
            slug: 1,
            briefText: 1,
            coverImage: 1,
            author: 1,
          },
          populate: [
            { path: "author", model: "User", select: { name: 1, biography: 1, avatar: 1 } },
            { path: "category", model: "Category", select: { title: 1, slug: 1 } },
          ],
        },
      ])
      .limit(limit)
      .skip(skip)
      .sort(sortQuery),

    PostModel.countDocuments(dbQuery),
  ]);

  const totalPages = Math.ceil(totalPosts / limit);

  const transformedPosts = copyObject(posts) as LeanPost[];

  const result = [];
  for (const post of transformedPosts) {
    result.push(await transformPost(post, user));
  }

  return ok(
    {
      message: "پست های مدنظر شما",
      posts: result,
      totalPosts,
      totalPages,
    },
    HttpStatus.OK,
  );
});
