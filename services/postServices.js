const { default: callAPI } = require("services/callAPI");

const postServices = {
  getPostBySlug: async (postSlug) => {
    const res = await callAPI.get(`/post/slug/${postSlug}`);
    const { data = {} } = await res.json();
    const { post } = data || null;
    return post;
  },
};

export default postServices;
