import callAPI from "api/callAPI";

const userServices = {
  getAllUsers: async (cookies) => {
    return await callAPI.get("user/list",cookies);
  },
};

export default userServices;
