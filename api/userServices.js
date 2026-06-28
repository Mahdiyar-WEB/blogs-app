import callAPI from "api/callAPI";

const userServices = {
  getAllUsers: async (cookies, searchOptions = "") => {
    return await callAPI.get(`user/list?${searchOptions}`, cookies);
  },
  deleteUser: async (id) => {
    return await callAPI.delete(`user/${id}`);
  },
};

export default userServices;
