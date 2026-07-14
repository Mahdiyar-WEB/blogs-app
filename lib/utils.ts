import createError from "http-errors";
import mongoose from "mongoose";
import { intervalToDuration } from "date-fns";
import type { PostDocument } from "types/models";

export function deleteInvalidPropertyInObject<T extends Record<string, unknown>>(
  data: T = {} as T,
  blackListFields: string[] = [],
): void {
  const nullishData: unknown[] = ["", " ", null, undefined];
  (Object.keys(data) as Array<keyof T>).forEach((key) => {
    if (blackListFields.includes(key as string)) delete data[key];
    const value = data[key];
    if (typeof value === "string" && (key as string) !== "text") {
      (data[key] as unknown) = value.trim();
    }
    if (Array.isArray(value) && value.length > 0) {
      (data[key] as unknown) = value.map((item) =>
        typeof item === "string" ? item.trim() : item,
      );
    }
    if (Array.isArray(value) && value.length === 0) delete data[key];
    if (nullishData.includes(data[key])) delete data[key];
  });
}

export function copyObject<T>(object: T): T {
  return JSON.parse(JSON.stringify(object));
}

export async function checkPostExist(id: string): Promise<PostDocument> {
  const { PostModel } = await import("./models/Post");
  if (!mongoose.isValidObjectId(id))
    throw createError.BadRequest("شناسه پست ارسال شده صحیح نمیباشد");
  const post = await PostModel.findById(id);
  if (!post) throw createError.NotFound("پستی یافت نشد");
  return post;
}

const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

export function toPersianNumbers(n: number | string): string {
  return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x, 10)] ?? x);
}

export function calculateDateDuration(endTime: Date | string): string {
  const { years, months, days, hours, minutes, seconds } = intervalToDuration({
    start: new Date(),
    end: new Date(endTime),
  });

  if (years) return `${toPersianNumbers(years)} سال پیش`;
  if (months) return `${toPersianNumbers(months)} ماه پیش`;
  if (days && days > 7)
    return `${toPersianNumbers((days / 7).toFixed(0))} هفته پیش`;
  if (days) return `${toPersianNumbers(days)} روز پیش`;
  if (hours) return `${toPersianNumbers(hours)} ساعت پیش`;
  if (minutes) return `${toPersianNumbers(minutes)} دقیقه پیش`;
  if (seconds) return `${toPersianNumbers(seconds)} ثانیه پیش`;
  return "همین الان";
}
