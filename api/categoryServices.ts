import { Category } from "lib/models/Category";

const { default: callAPI } = require("api/callAPI");

type UpdateCategoryData = Pick<
  Category,
  "title" | "englishTitle" | "description"
>;

type CreateCategoryData = Pick<
  Category,
  "title" | "englishTitle" | "description"
>;

const categoryServices = {
  getAllCategories: async (
    searchOptions = "",
  ): Promise<{
    data: { categories: Category[]; totalPages: number };
  }> => {
    const data = await callAPI.get(`category/list?${searchOptions}`);
    return data;
  },
  deleteCategory: async (id: string) => {
    return await callAPI.delete(`category/remove/${id}`);
  },
  getCategoryByTitle: async (title = "") => {
    const data = await callAPI.get(`category/${title}`);
    return data;
  },
  updateCategory: async ({
    id,
    data,
  }: {
    id: string;
    data: UpdateCategoryData;
  }) => {
    return await callAPI.patch(`category/update/${id}`, data);
  },
  createCategory: async (data: CreateCategoryData) => {
    return await callAPI.post("category/add", data);
  },
};

export default categoryServices;
