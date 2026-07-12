import jwt from "jsonwebtoken";
import createError from "http-errors";
import connectDB from "./db";
import { UserModel } from "./models/User";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET_KEY;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET_KEY;

function generateToken(user, expiresIn, secret) {
  return jwt.sign({ _id: user._id }, secret, { expiresIn });
}

function accessCookieOptions() {
  return {
    maxAge: 60 * 60 * 24 * 1, // ۱ روز (بر حسب ثانیه)
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV !== "development",
    path: "/",
  };
}

function refreshCookieOptions() {
  return {
    maxAge: 60 * 60 * 24 * 365, // ۱ سال
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV !== "development",
    path: "/",
  };
}

/** توکن‌های access/refresh رو تولید و روی response ست می‌کنه */
export function setAuthCookies(response, user) {
  const accessToken = generateToken(user, "1d", ACCESS_TOKEN_SECRET);
  const refreshToken = generateToken(user, "1y", REFRESH_TOKEN_SECRET);
  response.cookies.set("accessToken", accessToken, accessCookieOptions());
  response.cookies.set("refreshToken", refreshToken, refreshCookieOptions());
}

export function clearAuthCookies(response) {
  response.cookies.set("accessToken", "", { ...accessCookieOptions(), maxAge: 0 });
  response.cookies.set("refreshToken", "", { ...refreshCookieOptions(), maxAge: 0 });
}

/** کاربر لاگین‌شده رو از accessToken کوکی برمیگردونه، در غیر این صورت null */
export async function getUserFromRequest(req) {
  const accessToken = req.cookies.get("accessToken")?.value;
  if (!accessToken) return null;

  try {
    const payload = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
    await connectDB();
    const user = await UserModel.findById(payload._id, { password: 0 });
    return user || null;
  } catch (error) {
    return null;
  }
}

/** معادل verifyAccessToken میان‌افزار قبلی: اگر یوزر نبود خطا میده */
export async function requireUser(req) {
  const user = await getUserFromRequest(req);
  if (!user) throw createError.Unauthorized("لطفا وارد حساب کاربری خود شوید.");
  return user;
}

/** id کاربر رو از refreshToken کوکی استخراج می‌کنه */
export function getUserIdFromRefreshToken(req) {
  const refreshToken = req.cookies.get("refreshToken")?.value;
  if (!refreshToken)
    throw createError.Unauthorized("لطفا وارد حساب کاربری خود شوید.");

  try {
    const payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    return payload._id;
  } catch (error) {
    throw createError.Unauthorized("لطفا وارد حساب کاربری خود شوید");
  }
}
