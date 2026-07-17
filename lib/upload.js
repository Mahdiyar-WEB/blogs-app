import path from "path";
import fs from "fs/promises";
import createError from "http-errors";
import { getPlaiceholder } from "plaiceholder";

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
const AVATAR_MAX_SIZE = 2 * 1000 * 1000; // 2MB
const COVER_MAX_SIZE = 5 * 1000 * 1000; // 5MB

/**
 * یک فایل (از FormData) رو داخل public/uploads/<fieldName>/<yyyy>/<m>/<d>/ ذخیره می‌کنه
 * و مسیر نسبی (که داخل دیتابیس ذخیره میشه) رو برمیگردونه، دقیقا مشابه رفتار multer قبلی.
 */
export async function saveUploadedFile(file, fieldName, { maxSize } = {}) {
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
  const year = date.getFullYear().toString();
  const month = date.getMonth().toString();
  const day = date.getDate().toString();

  const relativeDir = path.posix.join("uploads", fieldName, year, month, day);
  const absoluteDir = path.join(process.cwd(), "public", relativeDir);
  await fs.mkdir(absoluteDir, { recursive: true });

  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const filename = `${uniqueSuffix}${ext}`;

  const buffer = Buffer.from(await file.arrayBuffer());

  const { base64 } = await getPlaiceholder(buffer);

  await fs.writeFile(path.join(absoluteDir, filename), buffer);

  const fileAddress = path.posix.join(relativeDir, filename);

  return {
    filename,
    fileUploadPath: relativeDir,
    fileAddress,
    blurDataURL: base64,
  };
}

export async function deleteUploadedFile(relativePath) {
  if (!relativePath) return;
  try {
    const absolutePath = path.join(process.cwd(), "public", relativePath);
    await fs.unlink(absolutePath);
  } catch (error) {
    // فایل موجود نبود، مشکلی نیست
  }
}

export const COVER_IMAGE_MAX_SIZE = COVER_MAX_SIZE;
export const AVATAR_IMAGE_MAX_SIZE = AVATAR_MAX_SIZE;
