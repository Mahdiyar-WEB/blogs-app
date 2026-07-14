import createHttpError from "http-errors";
import slugify from "slugify";
import { StatusCodes as HttpStatus } from "http-status-codes";
import connectDB from "lib/db";
import { CategoryModel } from "lib/models/Category";
import { requireUser } from "lib/auth";
import { withErrorHandler, ok } from "lib/apiHandler";
import { addCategorySchema, type AddCategoryInput } from "lib/validators/category.schema";

export const POST = withErrorHandler(async (req) => {
  await connectDB();
  await requireUser(req);

  const body: unknown = await req.json();
  const { title, englishTitle, description }: AddCategoryInput =
    await addCategorySchema.validateAsync(body);

  const existing = await CategoryModel.findOne({ englishTitle });
  if (existing) throw createHttpError.BadRequest("دسته بندی با این عنوان وجود دارد.");

  const category = await CategoryModel.create({
    title,
    englishTitle,
    description,
    slug: slugify(englishTitle),
  });

  if (!category) throw createHttpError.InternalServerError("خطای داخلی");

  return ok({ message: "دسته بندی با موفقیت افزوده شد" }, HttpStatus.CREATED);
});
