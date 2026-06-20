import { cookies } from "next/navigation";
import callAPI from "api/callAPI";

const postServices = {
  getPostBySlug: async (postSlug) => {
    const { data = {} } = await callAPI.get(`/post/slug/${postSlug}`);
    const { post } = data || null;
    return post;
  },
  getAllPosts: async (cookies, searchOption) => {
    const {
      data: { posts },
    } = await callAPI.get(`post/list?${searchOption}`, cookies);
    return posts;
  },
  getPostsByCategory: async (category = "", searchOption, cookies) => {
    const {
      data: { posts },
    } = await callAPI.get(
      `post/list?categorySlug=${category}&${searchOption}`,
      cookies,
    );
    return posts;
  },
  likePost: async (id) => {
    return await callAPI.post(`post/like/${id}`);
  },
  bookmarkPost: async (id) => {
    return await callAPI.post(`post/bookmark/${id}`);
  },
  deletePost: async (id) => {
    return await callAPI.delete(`post/remove/${id}`);
  },
};

export default postServices;
