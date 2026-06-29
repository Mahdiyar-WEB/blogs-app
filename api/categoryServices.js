const { default: callAPI } = require("api/callAPI");

const categoryServices = {
  getAllCategories: async (searchOptions = "") => {
    const data = await callAPI.get(`category/list?${searchOptions}`);
    return data;
  },
  deleteCategory: async (id) => {
    return await callAPI.delete(`category/remove/${id}`);
  },
  getCategoryByTitle: async (title = "") => {
    const data = await callAPI.get(`category/${title}`);
    return data;
  },
  updateCategory: async ({ id, data }) => {
    return await callAPI.patch(`category/update/${id}`, data);
  },
};

export default categoryServices;
