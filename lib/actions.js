"use server";

import commentServices from "api/commentServices";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import generateSSRCookies from "utils/generateSSRCookies";

export async function createComment(postId, parentId, formData) {
  const cookiesStore = await cookies();
  const APICookies = generateSSRCookies(cookiesStore);
  try {
    const { data } = await commentServices.addNewComment(
      {
        postId,
        parentId,
        text: formData.get("comment"),
      },
      APICookies,
    );
    console.log("🚀 ~ createComment ~ data:", data);
    // toast.success(data.message);
  } catch (error) {
    console.log(error?.message);
  } finally {
    revalidatePath("/blogs/[slug]", "page");
  }
}
