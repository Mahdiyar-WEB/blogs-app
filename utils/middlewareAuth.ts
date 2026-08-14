import { NextRequest } from "next/server";

export default async function middlewareAuth(req: NextRequest) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Cookie: `${req.cookies.get("accessToken")?.name}=${
            req.cookies.get("accessToken")?.value
          }; ${req.cookies.get("refreshToken")?.name}=${
            req.cookies.get("refreshToken")?.value
          }`,
        },
      },
    );

    if (!res.ok) return null;

    const result = await res.json();

    return result?.data?.user ?? null;
  } catch (error) {
    return null;
  }
}
