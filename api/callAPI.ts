export interface ApiResponse<T = unknown> {
  statusCode: number;
  data?: T;
  message?: string;
  auth?: boolean;
}

export type CallApiBody = FormData | object;

const callAPI = {
  get: async <T = unknown>(endPoint: string, cookies?: string): Promise<ApiResponse<T>> => {
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

        const retryData: ApiResponse<T> = await retryResponse.json();
        if (!retryResponse.ok)
          throw new Error(
            retryData?.message ?? `HTTP error! status: ${retryResponse.status}`,
          );

        return retryData;
      } catch (error) {
        throw new Error("session expired");
      }
    }

    const data: ApiResponse<T> = await response.json();
    if (!response.ok)
      throw new Error(
        data?.message ?? `HTTP error! status: ${response.status}`,
      );

    return data;
  },
  post: async <T = unknown>(
    endPoint: string,
    inputs?: CallApiBody,
    cookies?: string,
  ): Promise<ApiResponse<T>> => {
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

    const data: ApiResponse<T> = await response.json();

    if (!response.ok) {
      throw new Error(
        data?.message ?? `HTTP error! status: ${response.status}`,
      );
    }

    return data;
  },
  patch: async <T = unknown>(
    endPoint: string,
    inputs?: CallApiBody,
    cookies?: string,
  ): Promise<ApiResponse<T>> => {
    const isFormData = inputs instanceof FormData;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${endPoint}`,
      {
        method: "PATCH",
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

    const data: ApiResponse<T> = await response.json();
    if (!response.ok)
      throw new Error(
        data?.message ?? `HTTP error! status: ${response.status}`,
      );

    return data;
  },
  delete: async <T = unknown>(
    endPoint: string,
    inputs: Record<string, unknown> = {},
    cookies?: string,
  ): Promise<ApiResponse<T>> => {
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
    const data: ApiResponse<T> = await response.json();
    if (!response.ok)
      throw new Error(
        data?.message ?? `HTTP error! status: ${response.status}`,
      );

    return data;
  },
};

export default callAPI;
