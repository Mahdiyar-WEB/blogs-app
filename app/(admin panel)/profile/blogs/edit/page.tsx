import categoryServices from "api/categoryServices";
import postServices from "api/postServices";
import BreadCrumbs from "components/BreadCrumbs";
import { notFound } from "next/navigation";
import React from "react";
import { imageUrlToFile } from "utils/fileFormatter";
import EditPostForm from "./EditPostForm";

type SearchParams = {
  postId: string;
};

type EditPostPageProps = {
  searchParams: Promise<SearchParams>;
};

const fetchPostById = async (postId: string) => {
  try {
    return await postServices.getPostById(postId);
  } catch (error) {
    notFound();
  }
};

const EditPostPage = async ({
  searchParams,
}: EditPostPageProps) => {
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
        coverImageName={coverImageFile?.name ?? ""}
        coverImageUrl={coverImageUrl}
      />
    </main>
  );
};

export default EditPostPage;