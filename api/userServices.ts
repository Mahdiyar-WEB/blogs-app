import callAPI, { type ApiResponse } from "api/callAPI";
import type { UserDocument } from "types/models";

export interface UserListData {
  users: UserDocument[];
  totalPages: number;
  totalUsers: number;
}

export interface UpdateUserParams {
  id: string;
  data: FormData | Record<string, unknown>;
}

const userServices = {
  getAllUsers: async (
    cookies?: string,
    searchOptions: string = "",
  ): Promise<ApiResponse<UserListData>> => {
    return await callAPI.get<UserListData>(`user/list?${searchOptions}`, cookies);
  },
  deleteUser: async (id: string): Promise<ApiResponse<{ message: string }>> => {
    return await callAPI.delete<{ message: string }>(`user/remove/${id}`);
  },
  getUserById: async (
    cookies?: string,
    id: string = "",
  ): Promise<ApiResponse<{ user: UserDocument }>> => {
    return await callAPI.get<{ user: UserDocument }>(`user/profile/${id}`, cookies);
  },
  updateUser: async ({
    id,
    data,
  }: UpdateUserParams): Promise<ApiResponse<{ message: string }>> => {
    return await callAPI.patch<{ message: string }>(`user/update/${id}`, data);
  },
};

export default userServices;
