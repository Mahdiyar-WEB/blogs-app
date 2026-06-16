import callAPI from "api/callAPI";

const commentServices = {
  addNewComment: async (values) => {
    return await callAPI.post("comment/add", values);
  },
};

export default commentServices;
