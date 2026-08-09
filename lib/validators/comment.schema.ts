import Joi from "joi";
import createHttpError from "http-errors";
import { MongoIDPattern } from "../constants";

const contentSchema = Joi.object().keys({
  text: Joi.string()
    .min(5)
    .max(2000)
    .required()
    .error(createHttpError.BadRequest("متن نظر را به درستی وارد کنید")),
});

export const addNewCommentSchema = Joi.object({
  content: contentSchema,
  postId: Joi.string()
    .allow()
    .pattern(MongoIDPattern)
    .error(createHttpError.BadRequest("شناسه پست را به درستی وارد کنید")),
});
