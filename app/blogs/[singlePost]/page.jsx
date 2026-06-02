import callAPI from "@/utils/callAPI";
import { notFound } from "next/navigation";
import React from "react";

const SinglePost = async ({ params }) => {
  const { singlePost } = await params;
  const res = await callAPI.get(`/post/slug/${singlePost}`);
  const { data = {} } = await res.json();
  const { post } = data || null;

  if (!post) notFound();
  console.log("🚀 ~ SinglePost ~ data:", post);
  return (
    <main className="w-11/12 mx-auto 2xl:max-w-screen-2xl">{post.title}</main>
  );
};

export default SinglePost;
