import callAPI from "api/callAPI";

const userServices = {
  getAllUsers: async (cookies, searchOptions = "") => {
    return await callAPI.get(`user/list?${searchOptions}`, cookies);
  },
};

export default userServices;
