import callAPI from "api/callAPI";

const userServices = {
  getAllUsers: async (cookies, searchOptions = "") => {
    return await callAPI.get(`user/list?${searchOptions}`, cookies);
  },
  deleteUser: async (id) => {
    return await callAPI.delete(`user/remove/${id}`);
  },
  getUserById: async (cookies, id = "") => {
    return await callAPI.get(`user/profile/${id}`, cookies);
  },
  updateUser: async ({ id, data }) => {
    return await callAPI.patch(`user/update/${id}`, data);
  },
};

export default userServices;
