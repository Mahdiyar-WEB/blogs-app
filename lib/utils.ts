import createError from "http-errors";
import mongoose from "mongoose";
import { intervalToDuration } from "date-fns";

type MutableRecord = Record<string, unknown>;

export function deleteInvalidPropertyInObject(
  data: MutableRecord = {},
  blackListFields: string[] = [],
): void {
  Object.keys(data).forEach((key) => {
    if (blackListFields.includes(key)) delete data[key];

    let value = data[key];
    if (typeof value === "string" && key !== "text") {
      value = value.trim();
      data[key] = value;
    }

    if (Array.isArray(value) && value.length > 0) {
      value = value.map((item) =>
        typeof item === "string" ? item.trim() : item,
      );
      data[key] = value;
    }

    if (Array.isArray(value) && value.length === 0) delete data[key];
    if (
      value === "" ||
      value === " " ||
      value === null ||
      value === undefined
    ) {
      delete data[key];
    }
  });
}

export function copyObject<T>(object: T): T {
  return JSON.parse(JSON.stringify(object));
}

export async function checkPostExist(id: string) {
  const { PostModel } = await import("./models/Post");
  if (!mongoose.isValidObjectId(id))
    throw createError.BadRequest("شناسه پست ارسال شده صحیح نمیباشد");
  const post = await PostModel.findById(id);
  if (!post) throw createError.NotFound("پستی یافت نشد");
  return post;
}

const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

export function toPersianNumbers(n: string | number): string {
  return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
}

export function calculateDateDuration(endTime: Date | string | number): string {
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
