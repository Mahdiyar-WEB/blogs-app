import BreadCrumbs from "components/BreadCrumbs";
import React from "react";
import postServices from "api/postServices";
import { notFound } from "next/navigation";
import EditPostForm from "./EditPostForm";
import { imageUrlToFile } from "utils/fileFormatter";

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
    _id,
  } = await fetchPostById(postId);

  const coverImageFile = await imageUrlToFile(coverImageUrl);
  return (
    <main className="md:p-7">
      <BreadCrumbs />
      <EditPostForm
        key={postId}
        initialValues={{
          title,
          briefText,
          text,
          readingTime,
          slug,
          category: category?._id || "",
        }}
        postId={_id}
        coverImage={coverImageFile}
        coverImageName={coverImageFile.name}
        coverImageUrl={coverImageUrl}
      />
    </main>
  );
};

export default EditPostPage;
