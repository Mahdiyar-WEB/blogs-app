import BreadCrumbs from "components/BreadCrumbs";
import React from "react";
import CreatePostForm from "./CreatePostForm";

const CreatePost = () => {
  return (
    <main className="p-5">
      <BreadCrumbs />
      <CreatePostForm />
    </main>
  );
};

export default CreatePost;
