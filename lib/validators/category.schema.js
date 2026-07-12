import Joi from "joi";
import createHttpError from "http-errors";

export const addCategorySchema = Joi.object({
  title: Joi.string()
    .required()
    .min(3)
    .max(100)
    .error(createHttpError.BadRequest("عنوان فارسی دسته بندی صحیح نمیباشد")),
  englishTitle: Joi.string()
    .required()
    .min(3)
    .max(100)
    .error(
      createHttpError.BadRequest("عنوان انگلیسی دسته بندی صیحیح نمی باشد"),
    ),
  description: Joi.string()
    .required()
    .min(3)
    .max(200)
    .error(createHttpError.BadRequest("توضیحات دسته بندی صحیح نمی باشد")),
});

export const updateCategorySchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(100)
    .error(createHttpError.BadRequest("عنوان فارسی دسته بندی صحیح نمیباشد")),
  englishTitle: Joi.string()
    .min(3)
    .max(100)
    .error(
      createHttpError.BadRequest("عنوان انگلیسی دسته بندی صیحیح نمی باشد"),
    ),
  description: Joi.string()
    .required()
    .min(3)
    .max(200)
    .error(createHttpError.BadRequest("توضیحات دسته بندی صحیح نمی باشد")),
});
