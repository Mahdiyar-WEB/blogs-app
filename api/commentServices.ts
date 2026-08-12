import callAPI from "api/callAPI";

const commentServices = {
  addNewComment: async (values: {
    text: string;
    parentId: string;
    postId: string;
  }) => {
    return await callAPI.post("comment/add", values);
  },
  getAllComments: async (cookies: string, searchOption: string) => {
    return await callAPI.get(`comment/list?${searchOption}`, cookies);
  },
  deleteComment: async (id: string) => {
    return await callAPI.delete(`comment/remove/${id}`);
  },
};

export default commentServices;
