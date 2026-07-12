import createError from "http-errors";
import mongoose from "mongoose";
import { intervalToDuration } from "date-fns";

export function deleteInvalidPropertyInObject(data = {}, blackListFields = []) {
  let nullishData = ["", " ", null, undefined];
  Object.keys(data).forEach((key) => {
    if (blackListFields.includes(key)) delete data[key];
    if (typeof data[key] == "string" && key !== "text") {
      data[key] = data[key].trim();
    }
    if (Array.isArray(data[key]) && data[key].length > 0)
      data[key] = data[key].map((item) => (typeof item === "string" ? item.trim() : item));
    if (Array.isArray(data[key]) && data[key].length == 0) delete data[key];
    if (nullishData.includes(data[key])) delete data[key];
  });
}

export function copyObject(object) {
  return JSON.parse(JSON.stringify(object));
}

export async function checkPostExist(id) {
  const { PostModel } = await import("./models/Post");
  if (!mongoose.isValidObjectId(id))
    throw createError.BadRequest("شناسه پست ارسال شده صحیح نمیباشد");
  const post = await PostModel.findById(id);
  if (!post) throw createError.NotFound("پستی یافت نشد");
  return post;
}

const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

export function toPersianNumbers(n) {
  return n.toString().replace(/\d/g, (x) => farsiDigits[parseInt(x)]);
}

export function calculateDateDuration(endTime) {
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
