import jwt, { type JwtPayload } from "jsonwebtoken";
import createError from "http-errors";
import type { NextRequest, NextResponse } from "next/server";
import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import connectDB from "./db";
import { UserModel } from "./models/User";
import type { UserDocument } from "types/models";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET_KEY as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET_KEY as string;

type AuthCookieOptions = Partial<ResponseCookie>;

function generateToken(
  user: Pick<UserDocument, "_id">,
  expiresIn: string,
  secret: string,
): string {
  return jwt.sign({ _id: user._id.toString() }, secret, { expiresIn });
}

function accessCookieOptions(): AuthCookieOptions {
  return {
    maxAge: 60 * 60 * 24 * 1, // ۱ روز (بر حسب ثانیه)
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV !== "development",
    path: "/",
  };
}

function refreshCookieOptions(): AuthCookieOptions {
  return {
    maxAge: 60 * 60 * 24 * 365, // ۱ سال
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV !== "development",
    path: "/",
  };
}

/** توکن‌های access/refresh رو تولید و روی response ست می‌کنه */
export function setAuthCookies(response: NextResponse, user: UserDocument): void {
  const accessToken = generateToken(user, "1d", ACCESS_TOKEN_SECRET);
  const refreshToken = generateToken(user, "1y", REFRESH_TOKEN_SECRET);
  response.cookies.set("accessToken", accessToken, accessCookieOptions());
  response.cookies.set("refreshToken", refreshToken, refreshCookieOptions());
}

export function clearAuthCookies(response: NextResponse): void {
  response.cookies.set("accessToken", "", { ...accessCookieOptions(), maxAge: 0 });
  response.cookies.set("refreshToken", "", { ...refreshCookieOptions(), maxAge: 0 });
}

function getPayloadId(payload: JwtPayload | string): string {
  if (typeof payload === "string") {
    throw createError.Unauthorized("لطفا وارد حساب کاربری خود شوید");
  }
  const id = (payload as JwtPayload & { _id?: string })._id;
  if (!id) throw createError.Unauthorized("لطفا وارد حساب کاربری خود شوید");
  return id;
}

/** کاربر لاگین‌شده رو از accessToken کوکی برمیگردونه، در غیر این صورت null */
export async function getUserFromRequest(req: NextRequest): Promise<UserDocument | null> {
  const accessToken = req.cookies.get("accessToken")?.value;
  if (!accessToken) return null;

  try {
    const payload = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
    const userId = getPayloadId(payload);
    await connectDB();
    const user = await UserModel.findById(userId, { password: 0 });
    return user || null;
  } catch (error) {
    return null;
  }
}

/** معادل verifyAccessToken میان‌افزار قبلی: اگر یوزر نبود خطا میده */
export async function requireUser(req: NextRequest): Promise<UserDocument> {
  const user = await getUserFromRequest(req);
  if (!user) throw createError.Unauthorized("لطفا وارد حساب کاربری خود شوید.");
  return user;
}

/** id کاربر رو از refreshToken کوکی استخراج می‌کنه */
export function getUserIdFromRefreshToken(req: NextRequest): string {
  const refreshToken = req.cookies.get("refreshToken")?.value;
  if (!refreshToken)
    throw createError.Unauthorized("لطفا وارد حساب کاربری خود شوید.");

  try {
    const payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    return getPayloadId(payload);
  } catch (error) {
    throw createError.Unauthorized("لطفا وارد حساب کاربری خود شوید");
  }
}
