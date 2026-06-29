const { default: callAPI } = require("api/callAPI");

const categoryServices = {
  getAllCategories: async (searchOptions = "") => {
    const data = await callAPI.get(`category/list?${searchOptions}`);
    return data;
  },
};

export default categoryServices;
