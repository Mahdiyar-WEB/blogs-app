import BreadCrumbs from "components/BreadCrumbs";
import React from "react";
import { notFound } from "next/navigation";
import categoryServices from "api/categoryServices";
import EditCategoryForm from "./EditCategoryForm";

const fetchCategoryByTitle = async (categoryTitle) => {
  try {
    const data = await categoryServices.getCategoryByTitle(categoryTitle);
    return data;
  } catch (error) {
    notFound();
  }
};

const EditCategoryPage = async ({ searchParams }) => {
  const { categoryTitle } = await searchParams;
  const {
    data: { category = {} },
  } = await fetchCategoryByTitle(categoryTitle);

  return (
    <main className="md:p-7">
      <BreadCrumbs slugTitle="ویرایش دسته بندی" />
      <EditCategoryForm
        key={category._id}
        initialValues={{
          title: category.title,
          englishTitle: category.englishTitle,
          description: category.description,
        }}
        categoryId={category._id}
      />
    </main>
  );
};

export default EditCategoryPage;
