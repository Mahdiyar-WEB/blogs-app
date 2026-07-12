import createHttpError from "http-errors";
import { StatusCodes as HttpStatus } from "http-status-codes";
import connectDB from "lib/db";
import { CategoryModel } from "lib/models/Category";
import { withErrorHandler, ok } from "lib/apiHandler";

export const GET = withErrorHandler(async (req, { params }) => {
  await connectDB();
  const { categoryTitle } = await params;

  const category = await CategoryModel.findOne({ englishTitle: categoryTitle });
  if (!category) throw createHttpError.NotFound("دسته بندی یافت نشد");

  return ok({ category }, HttpStatus.OK);
});
