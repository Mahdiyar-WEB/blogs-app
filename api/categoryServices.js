const { default: callAPI } = require("api/callAPI");

const categoryServices = {
  getAllCategories: async () => {
    const res = await callAPI.get("category/list");
    const {
      data: { categories = [{ title: "", slug: "" }] },
    } = res
    return categories;
  },
};

export default categoryServices;
