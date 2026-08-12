import { Category } from "lib/models/Category";

const { default: callAPI } = require("api/callAPI");

const categoryServices = {
  getAllCategories: async (searchOptions = "") => {
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
    data: Omit<Category, "slug" | "icon">;
  }) => {
    return await callAPI.patch(`category/update/${id}`, data);
  },
  createCategory: async (data: Omit<Category, "slug" | "icon">) => {
    return await callAPI.post("category/add", data);
  },
};

export default categoryServices;
