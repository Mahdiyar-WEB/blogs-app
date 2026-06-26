import BreadCrumbs from "components/BreadCrumbs";
import React from "react";
import postServices from "api/postServices";
import { notFound } from "next/navigation";
import EditPostForm from "./EditPostForm";

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
    _id,
  } = await fetchPostById(postId);

  return (
    <main className="p-5">
      <BreadCrumbs />
      <EditPostForm
        key={postId}
        initialValues={{
          title,
          briefText,
          text,
          readingTime,
          slug,
          category: category._id,
          coverImageUrl,
          coverImage,
          _id
        }}
      />
    </main>
  );
};

export default EditPostPage;
