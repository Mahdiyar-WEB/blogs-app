import createHttpError from "http-errors";
import mongoose from "mongoose";
import { StatusCodes as HttpStatus } from "http-status-codes";
import connectDB from "lib/db";
import { CommentModel } from "lib/models/Comment";
import { requireUser } from "lib/auth";
import { withErrorHandler, ok } from "lib/apiHandler";
import { addNewCommentSchema } from "lib/validators/comment.schema";
import { checkPostExist } from "lib/utils";
import { findCommentById } from "lib/comments";
import type { CommentStatus } from "types/models";

interface AddCommentBody {
  text: string;
  parentId?: string;
  postId?: string;
}

export const POST = withErrorHandler(async (req) => {
  await connectDB();
  const user = await requireUser(req);

  // ! فقط برای اهداف آموزشی => STATUS: 2 (تایید خودکار)
  const status: CommentStatus = 2;

  const body: AddCommentBody = await req.json();
  const { text, parentId, postId } = body;
  const content = { text };

  await addNewCommentSchema.validateAsync({ content, postId });
  await checkPostExist(postId as string);

  if (parentId && mongoose.isValidObjectId(parentId)) {
    const parentComment = await findCommentById(parentId);
    if (parentComment && !parentComment?.openToComment)
      throw createHttpError.BadRequest("ثبت پاسخ برای این کامنت مجاز نیست");

    const createAnswerResult = await CommentModel.updateOne(
      { _id: parentId },
      {
        $push: {
          answers: {
            content,
            post: postId,
            user: user._id,
            status,
            openToComment: false,
          },
        },
      },
    );

    if (!createAnswerResult.matchedCount && !createAnswerResult.modifiedCount)
      throw createHttpError.InternalServerError("ثبت پاسخ انجام نشد");

    return ok(
      { message: "پاسخ شما با موفقیت ثبت شد، پس از تایید قابل مشاهده است" },
      HttpStatus.CREATED,
    );
  }

  const newComment = await CommentModel.create({
    content,
    post: postId,
    user: user._id,
    status,
    openToComment: true,
  });

  if (!newComment) throw createHttpError.InternalServerError("ثبت نطر انجام نشد");

  return ok(
    { message: "نظر شما با موفقیت ثبت شد، پس از تایید قابل مشاهده است" },
    HttpStatus.CREATED,
  );
});
