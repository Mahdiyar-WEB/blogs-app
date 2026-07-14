import callAPI from "api/callAPI";

const postServices = {
  getPostBySlug: async (postSlug) => {
    const { data = {} } = await callAPI.get(`post/slug/${postSlug}`);
    const { post } = data || null;
    return post;
  },
  getPostById: async (id) => {
    const { data = {} } = await callAPI.get(`post/${id}`);
    const { post } = data || null;
    return post;
  },
  getAllPosts: async (cookies, searchOption) => {
    const { data } = await callAPI.get(`post/list?${searchOption}`, cookies);
    return data;
  },
  getPostsByCategory: async (category = "", searchOption, cookies) => {
    const { data } = await callAPI.get(
      `post/list?categorySlug=${category}&${searchOption}`,
      cookies,
    );
    return data;
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
  createPost: async (data) => {
    return await callAPI.post("post/create", data);
  },
  updatePost: async ({ id, data }) => {
    return await callAPI.patch(`post/update/${id}`, data);
  },
};

export default postServices;
