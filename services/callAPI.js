const callAPI = {
  get: async (endPoint) => {
    return await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${endPoint}`);
  },
};

export default callAPI;
