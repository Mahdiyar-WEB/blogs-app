import { cacheLife, cacheTag } from "next/cache";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import postServices from "services/postServices";

export async function generateStaticParams() {
  const posts = await postServices.getAllPosts();
  return posts.slice(0, 3).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = (await postServices.getPostBySlug(slug)) || {
    title: "",
    briefText: "",
  };
  return { title: post.title, description: post.briefText };
}

const SinglePost = async ({ params }) => {
  const { slug } = await params;
  const post = await postServices.getPostBySlug(slug);

  if (!post) notFound();
  return <>{post.title}</>;
};

export default SinglePost;
