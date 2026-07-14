import type { cookies } from "next/headers";

type CookieStore = Awaited<ReturnType<typeof cookies>>;

const generateSSRCookies = (cookies: CookieStore): string => {
  const accessToken = cookies.get("accessToken");
  const refreshToken = cookies.get("refreshToken");
  const cookiesValues = `${accessToken?.name}=${accessToken?.value}; ${refreshToken?.name}=${refreshToken?.value}`;
  return cookiesValues;
};

export default generateSSRCookies;
