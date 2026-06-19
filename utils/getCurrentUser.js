import { cookies } from "next/headers";
import authentication from "api/authentication";
import generateSSRCookies from "utils/generateSSRCookies";

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const { data } = await authentication.getUser(
      generateSSRCookies(cookieStore),
    );
    return data.user;
  } catch {
    return null;
  }
}
