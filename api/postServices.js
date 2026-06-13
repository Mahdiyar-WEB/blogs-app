import { cookies } from "next/navigation";
import callAPI from "api/callAPI";

const postServices = {
  getPostBySlug: async (postSlug) => {
    const { data = {} } = await callAPI.get(`/post/slug/${postSlug}`);
    const { post } = data || null;
    return post;
  },
  getAllPosts: async (cookies) => {
    const {
      data: { posts },
    } = await callAPI.get("post/list", cookies);
    return posts;
  },
  likePost: async (id) => {
    return await callAPI.post(`post/like/${id}`);
  },
};

export default postServices;
