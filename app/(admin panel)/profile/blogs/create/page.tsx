import BreadCrumbs from "components/BreadCrumbs";
import React from "react";
import CreatePostForm from "./CreatePostForm";

const CreatePostPage = () => {
  return (
    <main className="md:p-7">
      <BreadCrumbs />
      <CreatePostForm />
    </main>
  );
};

export default CreatePostPage;
