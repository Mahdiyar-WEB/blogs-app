import { cookies } from "next/headers";
import React from "react";
import Post from "../../../_components/Post";
import postServices from "api/postServices";
import generateSSRCookies from "utils/generateSSRCookies";

const CategorySlug = async ({params}) => {
  const cookieStore = await cookies();
  const { categorySlug } = await params;
  const posts = await postServices.getPostsByCategory(
    categorySlug,
    generateSSRCookies(cookieStore),
  );

  return (
    <div className="grid grid-cols-12 gap-5">
      {posts.map((post, id) => (
        <Post key={id} {...post} />
      ))}
    </div>
  );
};

export default CategorySlug;
