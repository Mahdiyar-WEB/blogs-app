import callAPI from "api/callAPI";
import { User } from "types/userType";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

const userServices = {
  getAllUsers: async (
    cookies: string,
    searchOptions = "",
  ): Promise<{
    data: {
      users: User[];
      totalPages: number;
      totalUsers: number;
    };
  }> => {
    return await callAPI.get(`user/list?${searchOptions}`, cookies);
  },
  deleteUser: async (id: string) => {
    return await callAPI.delete(`user/remove/${id}`);
  },
  getUserById: async (cookies: string, id = "") => {
    return await callAPI.get(`user/profile/${id}`, cookies);
  },
  updateUser: async ({ id, data }: { id: string; data: FormData }) => {
    return await callAPI.patch(`user/update/${id}`, data);
  },
};

export default userServices;
