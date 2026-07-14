import Joi from "joi";
import createHttpError from "http-errors";
import { MongoIDPattern } from "../constants";
import type { ICommentContent } from "types/models";

export interface AddNewCommentInput {
  content: ICommentContent;
  postId?: string;
}

const contentSchema = Joi.object<ICommentContent>().keys({
  text: Joi.string()
    .min(5)
    .max(2000)
    .required()
    .error(createHttpError.BadRequest("متن نظر را به درستی وارد کنید")),
});

export const addNewCommentSchema = Joi.object<AddNewCommentInput>({
  content: contentSchema,
  postId: Joi.string()
    .allow()
    .pattern(MongoIDPattern)
    .error(createHttpError.BadRequest("شناسه پست را به درستی وارد کنید")),
});
