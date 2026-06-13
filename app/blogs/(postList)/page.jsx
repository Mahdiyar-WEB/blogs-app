import React from "react";
import Post from "../_components/Post";
import postServices from "api/postServices";
import generateSSRCookies from "utils/generateSSRCookies";
import { cookies } from "next/headers";

export const metadata = {
  title: "بلاگ ها",
};

const Blogs = async () => {
  const cookieStore = await cookies();
  const posts = await postServices.getAllPosts(generateSSRCookies(cookieStore));
  return (
    <div className="grid grid-cols-12 gap-5">
      {posts.map((post, id) => {
        return <Post key={id} {...post} />;
      })}
    </div>
  );
};

export default Blogs;
