import { StatusCodes as HttpStatus } from "http-status-codes";
import connectDB from "lib/db";
import { PostModel } from "lib/models/Post";
import { CategoryModel } from "lib/models/Category";
import { getUserFromRequest } from "lib/auth";
import { withErrorHandler, ok } from "lib/apiHandler";
import { transformPost } from "lib/transformPost";

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

  const dbQuery = {};

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

  const sortQuery = {};

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
        {
          path: "author",
          select: {
            name: 1,
            biography: 1,
            avatar: 1,
            avatarBlurDataURL: 1,
          },
        },
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
            category: 1,
          },
          populate: [
            {
              path: "author",
              model: "User",
              select: {
                name: 1,
                biography: 1,
                avatar: 1,
                avatarBlurDataURL: 1,
              },
            },
            {
              path: "category",
              model: "Category",
              select: { title: 1, slug: 1 },
            },
          ],
        },
      ])
      .limit(limit)
      .skip(skip)
      .sort(sortQuery),

    PostModel.countDocuments(dbQuery),
  ]);

  const totalPages = Math.ceil(totalPosts / limit);

  const transformedPosts = posts.map((post) => post.toJSON());

  for (const post of transformedPosts) {
    await transformPost(post, user);
  }

  return ok(
    {
      message: "پست های مدنظر شما",
      posts: transformedPosts,
      totalPosts,
      totalPages,
    },
    HttpStatus.OK,
  );
});
