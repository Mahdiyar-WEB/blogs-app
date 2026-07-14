import Joi from "joi";
import createHttpError from "http-errors";
import { MongoIDPattern } from "../constants";
import type { PostType } from "types/models";

export interface AddNewPostInput {
  title: string;
  slug: string;
  category: string;
  text: string;
  briefText: string;
  readingTime: number;
  type?: PostType;
  related?: string[];
  tags?: string[];
}

export type UpdatePostInput = Partial<AddNewPostInput>;

const postFields = {
  title: Joi.string()
    .trim()
    .min(5)
    .max(100)
    .error(createHttpError.BadRequest("عنوان پست را به درستی وارد کنید")),

  slug: Joi.string()
    .trim()
    .error(createHttpError.BadRequest("اسلاگ پست را به درستی وارد کنید")),

  category: Joi.string()
    .pattern(MongoIDPattern)
    .error(createHttpError.BadRequest("شناسه دسته بندی را به درستی وارد کنید")),

  text: Joi.string()
    .custom((value: string, helpers) => {
      if (!value || value.trim() === "") {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .error(createHttpError.BadRequest("متن پست را به درستی وارد کنید")),

  briefText: Joi.string()
    .trim()
    .error(createHttpError.BadRequest("خلاصه پست را به درستی وارد کنید")),

  readingTime: Joi.number().error(
    createHttpError.BadRequest("زمان مطالعه پست را به درستی وارد کنید"),
  ),

  type: Joi.string()
    .regex(/(free|premium)/i)
    .error(createHttpError.BadRequest("نوع پست صحیح نمی باشد")),

  related: Joi.array()
    .items(Joi.string().pattern(MongoIDPattern))
    .error(createHttpError.BadRequest("پست های مرتبط صحیح نمی باشد")),

  tags: Joi.array()
    .items(Joi.string())
    .error(createHttpError.BadRequest("تگ های پست صحیح نمی باشد")),
};

export async function validateAddNewPost(data: unknown): Promise<AddNewPostInput> {
  const schema = Joi.object<AddNewPostInput>({
    title: postFields.title.required(),
    slug: postFields.slug.required(),
    category: postFields.category.required(),
    text: postFields.text.required(),
    briefText: postFields.briefText.required(),
    readingTime: postFields.readingTime.required(),
    type: postFields.type,
    related: postFields.related,
    tags: postFields.tags,
  });

  return schema.validateAsync(data);
}

export async function validateUpdatePost(data: unknown): Promise<UpdatePostInput> {
  const schema = Joi.object<UpdatePostInput>({
    title: postFields.title,
    slug: postFields.slug,
    category: postFields.category,
    text: postFields.text,
    briefText: postFields.briefText,
    readingTime: postFields.readingTime,
    type: postFields.type,
    related: postFields.related,
    tags: postFields.tags,
  });

  return schema.validateAsync(data);
}
