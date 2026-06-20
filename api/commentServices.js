import callAPI from "api/callAPI";

const commentServices = {
  addNewComment: async (values) => {
    return await callAPI.post("comment/add", values);
  },
  getAllComments: async (cookies) => {
    return await callAPI.get("comment/list", cookies);
  },
};

export default commentServices;
