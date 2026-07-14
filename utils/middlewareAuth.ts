import type { NextRequest } from "next/server";
import type { UserDocument } from "types/models";

export default async function middlewareAuth(
  req: NextRequest,
): Promise<UserDocument | null> {
  try {
    const options = {
      method: "GET",
      credentials: "include" as RequestCredentials,
      headers: {
        Cookie: `${req.cookies.get("accessToken")?.name}=${
          req.cookies.get("accessToken")?.value
        }; ${req.cookies.get("refreshToken")?.name}=${
          req.cookies.get("refreshToken")?.value
        }`,
      },
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`,
      options,
    );

    if (!res.ok) return null;

    const result = await res.json();

    return result?.data?.user ?? null;
  } catch (error) {
    return null;
  }
}
