import createHttpError from "http-errors";
import { StatusCodes as HttpStatus } from "http-status-codes";
import connectDB from "lib/db";
import { CategoryModel } from "lib/models/Category";
import { requireUser } from "lib/auth";
import { withErrorHandler, ok } from "lib/apiHandler";
import { updateCategorySchema } from "lib/validators/category.schema";

export const PATCH = withErrorHandler(async (req, { params }) => {
  await connectDB();
  await requireUser(req);
  const { id } = await params;

  const category = await CategoryModel.findById(id);
  if (!category) throw createHttpError.BadRequest("دسته بندی با این عنوان وجود ندارد.");

  const body = await req.json();
  const { title, englishTitle, description } = body;
  await updateCategorySchema.validateAsync(body);

  const updateResult = await CategoryModel.updateOne(
    { _id: id },
    { $set: { title, englishTitle, description } },
  );

  if (updateResult.modifiedCount == 0)
    throw createHttpError.InternalServerError("به روزرسانی انجام نشد");

  return ok({ message: "به روز رسانی با موفقیت انجام شد" }, HttpStatus.OK);
});
