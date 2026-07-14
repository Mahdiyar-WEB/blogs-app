import callAPI, { type ApiResponse } from "api/callAPI";
import type { AddCategoryInput, UpdateCategoryInput } from "lib/validators/category.schema";
import type { CategoryDocument } from "types/models";

export interface CategoryListData {
  categories: CategoryDocument[];
  totalPages: number;
}

export interface UpdateCategoryParams {
  id: string;
  data: UpdateCategoryInput;
}

const categoryServices = {
  getAllCategories: async (
    searchOptions: string = "",
  ): Promise<ApiResponse<CategoryListData>> => {
    const data = await callAPI.get<CategoryListData>(`category/list?${searchOptions}`);
    return data;
  },
  deleteCategory: async (id: string): Promise<ApiResponse<{ message: string }>> => {
    return await callAPI.delete<{ message: string }>(`category/remove/${id}`);
  },
  getCategoryByTitle: async (
    title: string = "",
  ): Promise<ApiResponse<{ category: CategoryDocument }>> => {
    const data = await callAPI.get<{ category: CategoryDocument }>(`category/${title}`);
    return data;
  },
  updateCategory: async ({
    id,
    data,
  }: UpdateCategoryParams): Promise<ApiResponse<{ message: string }>> => {
    return await callAPI.patch<{ message: string }>(`category/update/${id}`, data);
  },
  createCategory: async (
    data: AddCategoryInput,
  ): Promise<ApiResponse<{ message: string }>> => {
    return await callAPI.post<{ message: string }>("category/add", data);
  },
};

export default categoryServices;
