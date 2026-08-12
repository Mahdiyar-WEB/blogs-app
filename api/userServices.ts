import callAPI from "api/callAPI";

const userServices = {
  getAllUsers: async (cookies: string, searchOptions = "") => {
    return await callAPI.get(`user/list?${searchOptions}`, cookies);
  },
  deleteUser: async (id: string) => {
    return await callAPI.delete(`user/remove/${id}`);
  },
  getUserById: async (cookies: string, id = "") => {
    return await callAPI.get(`user/profile/${id}`, cookies);
  },
  updateUser: async ({ id, data }: { id: string; data: FormData }) => {
    return await callAPI.patch(`user/update/${id}`, data);
  },
};

export default userServices;
