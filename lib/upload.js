import path from "path";
import createError from "http-errors";
import { getPlaiceholder } from "plaiceholder";
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "lib/s3";

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
const AVATAR_MAX_SIZE = 2 * 1000 * 1000;
const COVER_MAX_SIZE = 5 * 1000 * 1000;

const bucketName = process.env.LIARA_BUCKET_NAME;

if (!bucketName) {
  throw new Error("LIARA_BUCKET_NAME is missing");
}

export function getStorageFileUrl(fileKey) {
  if (!fileKey) return null;
  const baseUrl = process.env.NEXT_PUBLIC_STORAGE_BASE_URL;
  if (!baseUrl) return null;
  return `${baseUrl.replace(/\/$/, "")}/${fileKey}`;
}

export async function saveUploadedFile(
  file,
  fieldName,
  { maxSize } = {},
) {
  if (!file || typeof file === "string") return null;

  const originalName = file.name || "";
  const ext = path.extname(originalName).toLowerCase();

  if (!IMAGE_EXTENSIONS.includes(ext)) {
    throw createError.BadRequest("فرمت ارسال شده تصویر صحیح نمیباشد");
  }

  const limit = maxSize || AVATAR_MAX_SIZE;
  if (file.size > limit) {
    throw createError.BadRequest("حجم فایل ارسال شده بیش از حد مجاز است");
  }

  const date = new Date();
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1);
  const day = String(date.getDate());

  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const filename = `${uniqueSuffix}${ext}`;
  const fileAddress = path.posix.join("uploads", fieldName, year, month, day, filename);

  const buffer = Buffer.from(await file.arrayBuffer());
  const { base64 } = await getPlaiceholder(buffer);

  await s3.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: fileAddress,
      Body: buffer,
      ContentType: file.type || "application/octet-stream",
    }),
  );

  return {
    filename,
    fileUploadPath: path.posix.dirname(fileAddress),
    fileAddress,
    blurDataURL: base64,
  };
}

export async function deleteUploadedFile(relativePath) {
  if (!relativePath) return;

  try {
    await s3.send(
      new DeleteObjectCommand({
        Bucket: bucketName,
        Key: relativePath,
      }),
    );
  } catch {
    // اگر فایل نبود یا حذف نشد، فعلا هندل نرم
  }
}

export const COVER_IMAGE_MAX_SIZE = COVER_MAX_SIZE;
export const AVATAR_IMAGE_MAX_SIZE = AVATAR_MAX_SIZE;
