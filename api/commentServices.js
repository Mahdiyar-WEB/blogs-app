import callAPI from "api/callAPI";

const commentServices = {
  addNewComment: async (values) => {
    return await callAPI.post("comment/add", values);
  },
  getAllComments: async (cookies, searchOption) => {
    return await callAPI.get(`comment/list?${searchOption}`, cookies);
  },
};

export default commentServices;
