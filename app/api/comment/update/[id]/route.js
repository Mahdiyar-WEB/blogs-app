import createHttpError from "http-errors";
import { StatusCodes as HttpStatus } from "http-status-codes";
import connectDB from "lib/db";
import { CommentModel } from "lib/models/Comment";
import { requireUser } from "lib/auth";
import { withErrorHandler, ok } from "lib/apiHandler";
import { findCommentById } from "lib/comments";

export const PATCH = withErrorHandler(async (req, { params }) => {
  await connectDB();
  await requireUser(req);
  const { id } = await params;
  const { status } = await req.json();

  const comment = await findCommentById(id);

  if (comment && comment.openToComment) {
    const updateResult = await CommentModel.updateOne(
      { _id: id },
      { $set: { status } },
    );
    if (updateResult.modifiedCount == 0)
      throw createHttpError.InternalServerError("آپدیت کامنت انجام نشد");
    return ok({ message: "کامنت با موفقیت آپدیت شد" }, HttpStatus.OK);
  }

  const updateResult = await CommentModel.updateOne(
    { "answers._id": id },
    { $set: { "answers.$.status": status } },
  );
  if (updateResult.modifiedCount == 0)
    throw createHttpError.InternalServerError("آپدیت کامنت انجام نشد");

  return ok({ message: "کامنت با موفقیت آپدیت شد" }, HttpStatus.OK);
});
