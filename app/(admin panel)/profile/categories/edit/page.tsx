import categoryServices from "api/categoryServices";
import BreadCrumbs from "components/BreadCrumbs";
import { notFound } from "next/navigation";
import React from "react";
import EditCategoryForm from "./EditCategoryForm";

type SearchParams = {
  categoryTitle: string;
};

type Category = {
  _id: string;
  title: string;
  englishTitle: string;
  description: string;
};

type GetCategoryResponse = {
  data: {
    category: Category;
  };
};

const fetchCategoryByTitle = async (
  categoryTitle: string,
): Promise<GetCategoryResponse> => {
  try {
    const data = await categoryServices.getCategoryByTitle(categoryTitle);

    return data;
  } catch (error) {
    notFound();
  }
};

const EditCategoryPage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const { categoryTitle } = await searchParams;

  const {
    data: { category },
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