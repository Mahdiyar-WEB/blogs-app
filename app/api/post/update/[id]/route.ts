import createHttpError from "http-errors";
import mongoose from "mongoose";
import { StatusCodes as HttpStatus } from "http-status-codes";
import connectDB from "lib/db";
import { PostModel } from "lib/models/Post";
import { requireUser } from "lib/auth";
import { withErrorHandler, ok } from "lib/apiHandler";
import { sanitizePostText } from "lib/sanitizeHtml";
import { validateUpdatePost } from "lib/validators/post.schema";
import { copyObject, deleteInvalidPropertyInObject } from "lib/utils";
import {
  saveUploadedFile,
  deleteUploadedFile,
  COVER_IMAGE_MAX_SIZE,
} from "lib/upload";

type FormArrayField = string[];

type PostUpdateData = {
  title?: string;
  slug?: string;
  type?: "free" | "premium";
  category?: string;
  briefText?: string;
  text?: string;
  readingTime?: number;
  tags?: FormArrayField;
  related?: FormArrayField;
  [key: string]: string | number | string[] | undefined;
};

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

function parseFormArrayField(
  formData: FormData,
  key: string,
): string[] | undefined {
  const values = formData.getAll(key);

  const stringValues = values.filter(
    (value): value is string => typeof value === "string",
  );

  if (stringValues.length > 1) {
    return stringValues;
  }

  if (stringValues.length === 1) {
    try {
      const parsed: unknown = JSON.parse(stringValues[0]);

      if (Array.isArray(parsed)) {
        return parsed.filter(
          (item): item is string => typeof item === "string",
        );
      }

      return stringValues;
    } catch {
      return stringValues[0] ? [stringValues[0]] : undefined;
    }
  }

  return undefined;
}

async function findPostById(id: string) {
  if (!mongoose.isValidObjectId(id)) {
    throw createHttpError.BadRequest("شناسه پست نامعتبر است");
  }

  const post = await PostModel.findById(id);

  if (!post) {
    throw createHttpError.NotFound("پست با این مشخصات یافت نشد");
  }

  return post;
}

export const PATCH = withErrorHandler<RouteContext>(async (req, { params }) => {
  await connectDB();
  await requireUser(req);

  const { id } = await params;
  const post = await findPostById(id);

  const formData = await req.formData();
  const coverImageFile = formData.get("coverImage");

  const rest: PostUpdateData = {};

  for (const [key, value] of formData.entries()) {
    if (key === "coverImage" || key === "tags" || key === "related") {
      continue;
    }

    if (typeof value !== "string") {
      continue;
    }

    rest[key] = value;
  }

  const tags = parseFormArrayField(formData, "tags");
  const related = parseFormArrayField(formData, "related");

  if (tags !== undefined) {
    rest.tags = tags;
  }

  if (related !== undefined) {
    rest.related = related;
  }

  if (rest.readingTime !== undefined) {
    rest.readingTime = Number(rest.readingTime);
  }

  const data = copyObject(rest);

  if (typeof data.text === "string") {
    data.text = sanitizePostText(data.text);
  }

  await validateUpdatePost(data);

  const blackListFields = ["time", "likes", "comments", "bookmarks", "author"];

  deleteInvalidPropertyInObject(data, blackListFields);

  let nextCoverImage = post.coverImage;
  let nextCoverImageBlurDataURL = post.coverImageBlurDataURL;

  let uploadedFile: Awaited<ReturnType<typeof saveUploadedFile>> | null = null;

  try {
    if (coverImageFile instanceof File && coverImageFile.size > 0) {
      uploadedFile = await saveUploadedFile(coverImageFile, "coverImage", {
        maxSize: COVER_IMAGE_MAX_SIZE,
      });
      if (uploadedFile) {
        nextCoverImage = uploadedFile.fileAddress;
        nextCoverImageBlurDataURL = uploadedFile.blurDataURL;
      }
    }

    const updatePostResult = await PostModel.updateOne(
      { _id: id },
      {
        $set: {
          ...data,
          coverImage: nextCoverImage,
          coverImageBlurDataURL: nextCoverImageBlurDataURL,
        },
      },
    );

    if (!updatePostResult.matchedCount) {
      throw createHttpError.NotFound("پست با این مشخصات یافت نشد");
    }

    if (uploadedFile && post.coverImage) {
      await deleteUploadedFile(post.coverImage);
    }

    return ok(
      {
        message: "به روزرسانی پست با موفقیت انجام شد",
      },
      HttpStatus.OK,
    );
  } catch (error) {
    if (uploadedFile?.fileAddress) {
      await deleteUploadedFile(uploadedFile.fileAddress);
    }

    throw error;
  }
});
