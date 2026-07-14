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
import { saveUploadedFile, deleteUploadedFile } from "lib/upload";

function parseFormArrayField(formData, key) {
  const values = formData.getAll(key);
  if (values.length > 1) return values;
  if (values.length === 1) {
    try {
      const parsed = JSON.parse(values[0]);
      return Array.isArray(parsed) ? parsed : values;
    } catch {
      return values[0] ? [values[0]] : [];
    }
  }
  return undefined;
}

async function findPostById(id) {
  if (!mongoose.isValidObjectId(id))
    throw createHttpError.BadRequest("شناسه پست نامعتبر است");
  const post = await PostModel.findById(id);
  if (!post) throw createHttpError.BadRequest("پست با این مشخصات یافت نشد");
  return copyObject(post);
}

export const PATCH = withErrorHandler(async (req, { params }) => {
  await connectDB();
  await requireUser(req);
  const { id } = await params;

  const post = await findPostById(id);

  const formData = await req.formData();
  const coverImageFile = formData.get("coverImage");

  const rest = {};
  for (const [key, value] of formData.entries()) {
    if (key === "coverImage") continue;
    if (key === "tags" || key === "related") continue;
    rest[key] = value;
  }
  const tags = parseFormArrayField(formData, "tags");
  const related = parseFormArrayField(formData, "related");
  if (tags !== undefined) rest.tags = tags;
  if (related !== undefined) rest.related = related;
  if (rest.readingTime) rest.readingTime = Number(rest.readingTime);

  const data = copyObject(rest);

  if (data.text) {
    data.text = sanitizePostText(data.text);
  }

  await validateUpdatePost(data);

  const blackListFields = ["time", "likes", "comments", "bookmarks", "author"];
  deleteInvalidPropertyInObject(data, blackListFields);

  let coverImage = post.coverImage;

  if (coverImageFile instanceof File && coverImageFile.size > 0) {
    const saved = await saveUploadedFile(coverImageFile, "coverImage");
    if (post.coverImage) await deleteUploadedFile(post.coverImage);
    coverImage = saved.fileAddress;
  }

  const updatePostResult = await PostModel.updateOne(
    { _id: id },
    { $set: { ...data, coverImage } },
  );

  if (!updatePostResult.modifiedCount)
    throw createHttpError.InternalServerError("به روزرسانی پست انجام نشد");

  return ok({ message: "به روزرسانی پست با موفقیت انجام شد" }, HttpStatus.OK);
});
