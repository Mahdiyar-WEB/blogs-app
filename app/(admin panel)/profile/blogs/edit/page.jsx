import BreadCrumbs from "components/BreadCrumbs";
import React from "react";
import CreatePostForm from "../create/CreatePostForm";
import postServices from "api/postServices";
import { notFound } from "next/navigation";

const fetchPostById = async (postId) => {
  try {
    const data = await postServices.getPostById(postId);
    return data;
  } catch (error) {
    notFound();
  }
};

const EditPostPage = async ({ searchParams }) => {
  const { postId } = await searchParams;
  const {
    title,
    briefText,
    text,
    readingTime,
    slug,
    category,
    coverImageUrl,
    coverImage,
  } = await fetchPostById(postId);

  return (
    <main className="p-5">
      <BreadCrumbs />
      <CreatePostForm
        initialValues={{
          title,
          briefText,
          text,
          readingTime,
          slug,
          category: category._id,
          coverImageUrl,
          coverImage,
        }}
      />
    </main>
  );
};

export default EditPostPage;
