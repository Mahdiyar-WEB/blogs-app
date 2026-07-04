import BreadCrumbs from "components/BreadCrumbs";
import React from "react";
import CreateCategoryForm from "./CreateCategoryForm";

const CreateCategoryPage = () => {
  return (
    <main className="p-7">
      <BreadCrumbs slugTitle="ایجاد دسته‌بندی" />
      <CreateCategoryForm />
    </main>
  );
};

export default CreateCategoryPage;
