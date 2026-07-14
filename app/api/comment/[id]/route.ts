import { StatusCodes as HttpStatus } from "http-status-codes";
import connectDB from "lib/db";
import { CommentModel } from "lib/models/Comment";
import { requireUser } from "lib/auth";
import { withErrorHandler, ok } from "lib/apiHandler";
import { findCommentById } from "lib/comments";

export const GET = withErrorHandler<{ id: string }>(async (req, { params }) => {
  await connectDB();
  await requireUser(req);
  const { id } = await params;

  await findCommentById(id);

  const comment = await CommentModel.findById(id)
    .populate([
      { path: "user", model: "User", select: { name: 1 } },
      { path: "answers.user", model: "User", select: { name: 1 } },
    ])
    .sort({ createdAt: -1 });

  return ok({ comment }, HttpStatus.OK);
});
