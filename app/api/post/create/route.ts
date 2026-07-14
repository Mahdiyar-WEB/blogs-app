import createHttpError from "http-errors";
import { StatusCodes as HttpStatus } from "http-status-codes";
import connectDB from "lib/db";
import { PostModel } from "lib/models/Post";
import { requireUser } from "lib/auth";
import { withErrorHandler, ok } from "lib/apiHandler";
import { sanitizePostText } from "lib/sanitizeHtml";
import { validateAddNewPost } from "lib/validators/post.schema";
import { saveUploadedFile } from "lib/upload";
import type { PostType } from "types/models";

function parseFormArrayField(formData: FormData, key: string): string[] {
  // فرانت ممکنه tags[] / related[] رو به صورت چندین فیلد هم‌نام یا JSON string بفرسته
  const values = formData.getAll(key) as string[];
  if (values.length > 1) return values;
  if (values.length === 1) {
    try {
      const parsed = JSON.parse(values[0] as string);
      return Array.isArray(parsed) ? parsed : values;
    } catch {
      return values[0] ? [values[0]] : [];
    }
  }
  return [];
}

interface PostFormFields {
  title?: string;
  briefText?: string;
  slug?: string;
  type?: PostType;
  category?: string;
  text?: string;
  readingTime?: number | string;
  tags?: string[];
  related?: string[];
}

export const POST = withErrorHandler(async (req) => {
  await connectDB();
  const user = await requireUser(req);

  const formData = await req.formData();
  const coverImageFile = formData.get("coverImage");

  const rest: PostFormFields & Record<string, unknown> = {};
  for (const [key, value] of formData.entries()) {
    if (key === "coverImage") continue;
    if (key === "tags" || key === "related") continue;
    rest[key] = value;
  }
  rest.tags = parseFormArrayField(formData, "tags");
  rest.related = parseFormArrayField(formData, "related");
  if (rest.readingTime) rest.readingTime = Number(rest.readingTime);

  const sanitizedText = sanitizePostText(rest.text);
  await validateAddNewPost({ ...rest, text: sanitizedText });

  const {
    title,
    briefText,
    slug,
    type = "free",
    category,
    tags = [],
    readingTime,
    related = [],
  } = rest;

  if (!(coverImageFile instanceof File) || coverImageFile.size === 0)
    throw createHttpError.InternalServerError("کاور پست را اپلود کنید");

  const saved = await saveUploadedFile(coverImageFile, "coverImage");
  if (!saved) throw createHttpError.InternalServerError("آپلود کاور پست انجام نشد");

  const post = await PostModel.create({
    title,
    briefText,
    slug,
    type,
    category,
    tags,
    text: sanitizedText,
    readingTime,
    related,
    author: user._id,
    coverImage: saved.fileAddress,
  });

  if (!post?._id) throw createHttpError.InternalServerError("پست ثبت نشد");

  return ok(
    { message: "پست با موفقیت ایجاد شد", post },
    HttpStatus.CREATED,
  );
});
