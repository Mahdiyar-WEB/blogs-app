import { StatusCodes as HttpStatus } from "http-status-codes";
import connectDB from "lib/db";
import { requireUser } from "lib/auth";
import { withErrorHandler, ok } from "lib/apiHandler";

export const GET = withErrorHandler(async (req) => {
  await connectDB();
  const user = await requireUser(req);
  return ok({ user }, HttpStatus.OK);
});
