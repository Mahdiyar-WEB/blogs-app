import callAPI, { type ApiResponse } from "api/callAPI";
import type { LeanPost, TransformedPost } from "types/api";

export interface PostListData {
  message: string;
  posts: TransformedPost[];
  totalPosts: number;
  totalPages: number;
}

export interface UpdatePostParams {
  id: string;
  data: FormData;
}

const postServices = {
  getPostBySlug: async (postSlug: string): Promise<LeanPost | undefined> => {
    const { data = {} } = await callAPI.get<{ post?: LeanPost }>(`post/slug/${postSlug}`);
    const { post } = data || {};
    return post;
  },
  getPostById: async (id: string): Promise<LeanPost | undefined> => {
    const { data = {} } = await callAPI.get<{ post?: LeanPost }>(`post/${id}`);
    const { post } = data || {};
    return post;
  },
  getAllPosts: async (
    cookies?: string,
    searchOption?: string,
  ): Promise<PostListData | undefined> => {
    const { data } = await callAPI.get<PostListData>(`post/list?${searchOption}`, cookies);
    return data;
  },
  getPostsByCategory: async (
    category: string = "",
    searchOption?: string,
    cookies?: string,
  ): Promise<PostListData | undefined> => {
    const { data } = await callAPI.get<PostListData>(
      `post/list?categorySlug=${category}&${searchOption}`,
      cookies,
    );
    return data;
  },
  likePost: async (id: string): Promise<ApiResponse<{ message: string }>> => {
    return await callAPI.post<{ message: string }>(`post/like/${id}`);
  },
  bookmarkPost: async (id: string): Promise<ApiResponse<{ message: string }>> => {
    return await callAPI.post<{ message: string }>(`post/bookmark/${id}`);
  },
  deletePost: async (id: string): Promise<ApiResponse<{ message: string }>> => {
    return await callAPI.delete<{ message: string }>(`post/remove/${id}`);
  },
  createPost: async (
    data: FormData,
  ): Promise<ApiResponse<{ message: string }>> => {
    return await callAPI.post<{ message: string }>("post/create", data);
  },
  updatePost: async ({
    id,
    data,
  }: UpdatePostParams): Promise<ApiResponse<{ message: string }>> => {
    return await callAPI.patch<{ message: string }>(`post/update/${id}`, data);
  },
};

export default postServices;
