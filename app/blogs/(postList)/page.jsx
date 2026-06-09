import React from "react";
import Post from "../_components/Post";
import postServices from "services/postServices";

export const metadata = {
  title: "بلاگ ها",
};

const Blogs = async () => {
  const posts = await postServices.getAllPosts();
  return (
    <div className="grid grid-cols-12 gap-5">
      {posts.map((post, id) => {
        return <Post key={id} {...post} />;
      })}
    </div>
  );
};

export default Blogs;
