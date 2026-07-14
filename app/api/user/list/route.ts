import { StatusCodes as HttpStatus } from "http-status-codes";
import type { FilterQuery } from "mongoose";
import connectDB from "lib/db";
import { UserModel } from "lib/models/User";
import { requireUser } from "lib/auth";
import { withErrorHandler, ok } from "lib/apiHandler";
import type { UserDocument } from "types/models";

export const GET = withErrorHandler(async (req) => {
  await connectDB();
  await requireUser(req);

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search");
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 6;

  const skip = (page - 1) * limit;
  const query: FilterQuery<UserDocument> = {};

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { biography: { $regex: search, $options: "i" } },
    ];
  }

  const [users, totalUsers] = await Promise.all([
    UserModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    UserModel.countDocuments(query),
  ]);

  const totalPages = Math.ceil(totalUsers / limit);

  return ok({ users, totalPages, totalUsers }, HttpStatus.OK);
});
