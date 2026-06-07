const callAPI = {
  get: async (endPoint) => {
    return await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${endPoint}`, {
      credentials: "include",
    });
  },
  post: async (endPoint, inputs) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${endPoint}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(inputs),
        credentials: "include",
      }
    );
    const data = await response.json();
    if (!response.ok)
      throw new Error(
        data?.message ?? `HTTP error! status: ${response.status}`
      );

    return data;
  },
};

export default callAPI;
