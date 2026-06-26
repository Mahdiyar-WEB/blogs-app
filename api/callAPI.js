const callAPI = {
  get: async (endPoint, cookies) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${endPoint}`,
      {
        credentials: "include",
        method: "GET",
        headers: {
          Cookie: cookies || "",
        },
      },
    );

    if (response.status === 401 && endPoint === "user/profile") {
      try {
        const refreshRes = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user/refresh-token`,
          { credentials: "include" },
        );

        if (!refreshRes.ok) throw new Error("refresh failed");

        const retryResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/${endPoint}`,
          { credentials: "include" },
        );

        const retryData = await retryResponse.json();
        if (!retryResponse.ok)
          throw new Error(
            retryData?.message ?? `HTTP error! status: ${retryResponse.status}`,
          );

        return retryData;
      } catch (error) {
        throw new Error("session expired");
      }
    }

    const data = await response.json();
    if (!response.ok)
      throw new Error(
        data?.message ?? `HTTP error! status: ${response.status}`,
      );

    return data;
  },
  post: async (endPoint, inputs, cookies) => {
    const isFormData = inputs instanceof FormData;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${endPoint}`,
      {
        method: "POST",
        headers: {
          ...(isFormData
            ? {}
            : { "Content-Type": "application/json; charset=utf-8" }),
          Cookie: cookies || "",
        },
        body: isFormData ? inputs : JSON.stringify(inputs),
        credentials: "include",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data?.message ?? `HTTP error! status: ${response.status}`,
      );
    }

    return data;
  },
  delete: async (endPoint, inputs = {}, cookies) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${endPoint}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Cookie: cookies || "",
        },
        body: JSON.stringify(inputs),
        credentials: "include",
      },
    );
    const data = await response.json();
    if (!response.ok)
      throw new Error(
        data?.message ?? `HTTP error! status: ${response.status}`,
      );

    return data;
  },
};

export default callAPI;
