const { default: callAPI } = require("services/callAPI");

const postServices = {
  getPostBySlug: async (postSlug) => {
    const res = await callAPI.get(`/post/slug/${postSlug}`);
    const { data = {} } = await res.json();
    const { post } = data || null;
    return post;
  },
  getAllPosts: async () => {
    const res = await callAPI.get("post/list");
    const {
      data: { posts },
    } = await res.json();
    return posts;
  },
};

export default postServices;
