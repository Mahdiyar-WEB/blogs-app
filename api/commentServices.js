import callAPI from "api/callAPI";

const commentServices = {
  addNewComment: async (values, cookies) => {
    return await callAPI.post("comment/add", values, cookies);
  },
};

export default commentServices;
