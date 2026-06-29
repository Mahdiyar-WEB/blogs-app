const { default: callAPI } = require("api/callAPI");

const categoryServices = {
  getAllCategories: async () => {
    const res = await callAPI.get("category/list");
    const { data } = res;
    return data;
  },
};

export default categoryServices;
