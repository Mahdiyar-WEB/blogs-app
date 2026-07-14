import { StatusCodes as HttpStatus } from "http-status-codes";
import connectDB from "lib/db";
import { CommentModel } from "lib/models/Comment";
import { withErrorHandler, ok } from "lib/apiHandler";

export const GET = withErrorHandler(async (req) => {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search");
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 6;

  const skip = (page - 1) * limit;
  const dbQuery = {};

  if (search) {
    dbQuery["content.text"] = { $regex: search, $options: "i" };
  }

  const [comments, totalComments] = await Promise.all([
    CommentModel.find(dbQuery)
      .populate([
        { path: "user", model: "User", select: { name: 1 } },
        { path: "post", model: "Post", select: { title: 1, slug: 1 } },
        { path: "answers.user", model: "User", select: { name: 1 } },
        { path: "answers.post", model: "Post", select: { title: 1, slug: 1 } },
      ])
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),

    CommentModel.countDocuments(dbQuery),
  ]);

  const totalPages = Math.ceil(totalComments / limit);

  return ok({ comments, totalComments, totalPages }, HttpStatus.OK);
});
