import createHttpError from "http-errors";
import { StatusCodes as HttpStatus } from "http-status-codes";
import connectDB from "lib/db";
import { PostModel } from "lib/models/Post";
import { requireUser } from "lib/auth";
import { withErrorHandler, ok } from "lib/apiHandler";
import { sanitizePostText } from "lib/sanitizeHtml";
import { validateAddNewPost } from "lib/validators/post.schema";
import { COVER_IMAGE_MAX_SIZE, saveUploadedFile } from "lib/upload";

type PostFormData = {
  title?: string;
  briefText?: string;
  slug?: string;
  type?: "free" | "premium";
  category?: string;
  tags: string[];
  related: string[];
  text?: string;
  readingTime?: number;
};

function parseFormArrayField(formData: FormData, key: string): string[] {
  const values = formData.getAll(key);

  if (values.length > 1) {
    return values.filter((value): value is string => typeof value === "string");
  }

  if (values.length === 1) {
    const value = values[0];

    if (typeof value !== "string") {
      return [];
    }

    try {
      const parsed: unknown = JSON.parse(value);

      if (Array.isArray(parsed)) {
        return parsed.filter(
          (item): item is string => typeof item === "string",
        );
      }

      return [value];
    } catch {
      return value ? [value] : [];
    }
  }

  return [];
}

export const POST = withErrorHandler(async (req) => {
  await connectDB();

  const user = await requireUser(req);

  const formData = await req.formData();
  const coverImageFile = formData.get("coverImage");

  const rest: PostFormData = {
    tags: [],
    related: [],
  };

  for (const [key, value] of formData.entries()) {
    if (key === "coverImage" || key === "tags" || key === "related") {
      continue;
    }

    if (typeof value !== "string") {
      continue;
    }

    switch (key) {
      case "title":
        rest.title = value;
        break;

      case "briefText":
        rest.briefText = value;
        break;

      case "slug":
        rest.slug = value;
        break;

      case "type":
        if (value === "free" || value === "premium") {
          rest.type = value;
        }
        break;

      case "category":
        rest.category = value;
        break;

      case "text":
        rest.text = value;
        break;

      case "readingTime":
        rest.readingTime = Number(value);
        break;
    }
  }

  rest.tags = parseFormArrayField(formData, "tags");
  rest.related = parseFormArrayField(formData, "related");

  const sanitizedText = sanitizePostText(rest.text ?? "");

  await validateAddNewPost({
    ...rest,
    text: sanitizedText,
  });

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

  if (!(coverImageFile instanceof File) || coverImageFile.size === 0) {
    throw createHttpError.BadRequest("کاور پست را آپلود کنید");
  }

  const saved = await saveUploadedFile(coverImageFile, "coverImage", {
    maxSize: COVER_IMAGE_MAX_SIZE,
  });

  if (!saved?.fileAddress) {
    throw createHttpError.InternalServerError("ذخیره کاور پست ناموفق بود");
  }

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
    coverImageBlurDataURL: saved.blurDataURL,
  });

  if (!post?._id) {
    throw createHttpError.InternalServerError("پست ثبت نشد");
  }

  return ok(
    {
      message: "پست با موفقیت ایجاد شد",
      post,
    },
    HttpStatus.CREATED,
  );
});
