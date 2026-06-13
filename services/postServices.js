import callAPI from "services/callAPI";

const postServices = {
  getPostBySlug: async (postSlug) => {
    const { data = {} } = await callAPI.get(`/post/slug/${postSlug}`);
    const { post } = data || null;
    return post;
  },
  getAllPosts: async () => {
    const {
      data: { posts },
    } = await callAPI.get("post/list");
    return posts;
  },
  likePost: async (id) => {
    return await callAPI.post(`post/like/${id}`);
  },
};

export default postServices;
