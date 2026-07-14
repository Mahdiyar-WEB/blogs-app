import createHttpError from "http-errors";
import { StatusCodes as HttpStatus } from "http-status-codes";
import connectDB from "lib/db";
import { CommentModel } from "lib/models/Comment";
import { requireUser } from "lib/auth";
import { withErrorHandler, ok } from "lib/apiHandler";
import { findCommentById } from "lib/comments";

export const DELETE = withErrorHandler<{ id: string }>(async (req, { params }) => {
  await connectDB();
  await requireUser(req);
  const { id } = await params;

  const comment = await findCommentById(id);

  if (comment && comment.openToComment) {
    const commentToDelete = await CommentModel.findOneAndDelete({ _id: id });
    if (!commentToDelete) throw createHttpError.InternalServerError("کامنت حذف نشد");
    return ok({ message: "کامنت با موفقیت حذف شد" }, HttpStatus.OK);
  }

  const updateResult = await CommentModel.updateOne(
    { "answers._id": id },
    { $pull: { answers: { _id: id } } },
  );
  if (updateResult.modifiedCount === 0)
    throw createHttpError.InternalServerError("کامنت حذف نشد");

  return ok({ message: "کامنت با موفقیت حذف شد" }, HttpStatus.OK);
});
