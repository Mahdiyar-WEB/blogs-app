import callAPI from "utils/callAPI";
import React from "react";
import Post from "../_components/Post";

export const metadata = {
  title: "بلاگ ها",
};

const Blogs = async () => {
  const res = await callAPI.get("post/list");
  const {
    data: { posts },
  } = await res.json();
  console.log("🚀 ~ Blogs ~ data:", posts);
  return (
    <div className="grid grid-cols-12 gap-5">
      {posts.map((post,id) => {
        return <Post key={id} {...post} />;
      })}
    </div>
  );
};

export default Blogs;
