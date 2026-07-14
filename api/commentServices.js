import callAPI from "api/callAPI";

const commentServices = {
  addNewComment: async (values) => {
    return await callAPI.post("comment/add", values);
  },
  getAllComments: async (cookies, searchOption) => {
    return await callAPI.get(`comment/list?${searchOption}`, cookies);
  },
  deleteComment: async (id) => {
    return await callAPI.delete(`comment/remove/${id}`);
  },
};

export default commentServices;
