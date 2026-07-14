import createHttpError from "http-errors";
import { StatusCodes as HttpStatus } from "http-status-codes";
import connectDB from "lib/db";
import { CategoryModel } from "lib/models/Category";
import { requireUser } from "lib/auth";
import { withErrorHandler, ok } from "lib/apiHandler";

export const DELETE = withErrorHandler<{ id: string }>(async (req, { params }) => {
  await connectDB();
  await requireUser(req);
  const { id } = await params;

  const category = await CategoryModel.findById(id);
  if (!category) throw createHttpError.BadRequest("دسته بندی با این عنوان وجود ندارد.");

  const deleteResult = await CategoryModel.findByIdAndDelete(id);
  if (!deleteResult) throw createHttpError.InternalServerError("حدف دسته بندی انجام نشد");

  return ok({ message: "حذف دسته بندی با موفقیت انجام شد" }, HttpStatus.OK);
});
