import { notFound } from "next/navigation";
import React from "react";
import postServices from "services/postServices";

export async function generateMetadata({ params }) {
  const { singlePost } = await params;
  const post = await postServices.getPostBySlug(singlePost);
  return {
    title: post.title,
    description: post.briefText,
  };
}

const SinglePost = async ({ params }) => {
  const { singlePost } = await params;
  const post = await postServices.getPostBySlug(singlePost);

  if (!post) notFound();
  console.log("🚀 ~ SinglePost ~ data:", post);
  return (
    <main className="w-11/12 mx-auto 2xl:max-w-screen-2xl">{post.title}</main>
  );
};

export default SinglePost;
