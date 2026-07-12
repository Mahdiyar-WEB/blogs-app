import { StatusCodes as HttpStatus } from "http-status-codes";
import connectDB from "lib/db";
import { CategoryModel } from "lib/models/Category";
import { withErrorHandler, ok } from "lib/apiHandler";

export const GET = withErrorHandler(async (req) => {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search");
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 6;

  const filter = {};
  if (search) {
    filter.title = { $regex: search, $options: "i" };
  }

  const skip = (page - 1) * limit;

  const [categories, totalCategories] = await Promise.all([
    CategoryModel.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }),
    CategoryModel.countDocuments(filter),
  ]);

  return ok(
    { categories, totalPages: Math.ceil(totalCategories / limit) },
    HttpStatus.OK,
  );
});
