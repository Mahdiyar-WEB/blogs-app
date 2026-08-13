import { Post } from "lib/models/Post";
import callAPI from "api/callAPI";

const postServices = {
  getPostBySlug: async (postSlug: string): Promise<Post> => {
    const { data = {} } = await callAPI.get(`post/slug/${postSlug}`);
    const { post } = data || null;
    return post;
  },
  getPostById: async (id: string) => {
    const { data = {} } = await callAPI.get(`post/${id}`);
    const { post } = data || null;
    return post;
  },
  getAllPosts: async (
    cookies: string,
    searchOption: string,
  ): Promise<{ posts: Post[]; totalPages: number }> => {
    const { data } = await callAPI.get(`post/list?${searchOption}`, cookies);
    return data;
  },
  getPostsByCategory: async (
    category = "",
    searchOption: string,
    cookies: string,
  ): Promise<{ posts: Post[]; totalPages: number }> => {
    const { data } = await callAPI.get(
      `post/list?categorySlug=${category}&${searchOption}`,
      cookies,
    );
    return data;
  },
  likePost: async (id: string) => {
    return await callAPI.post(`post/like/${id}`, {});
  },
  bookmarkPost: async (id: string) => {
    return await callAPI.post(`post/bookmark/${id}`, {});
  },
  deletePost: async (id: string) => {
    return await callAPI.delete(`post/remove/${id}`);
  },
  createPost: async (data: FormData) => {
    return await callAPI.post("post/create", data);
  },
  updatePost: async ({ id, data }: { id: string; data: FormData }) => {
    return await callAPI.patch(`post/update/${id}`, data);
  },
};

export default postServices;
