import callAPI, { type ApiResponse } from "api/callAPI";
import type { TransformedComment } from "types/api";

export interface AddCommentValues {
  text: string;
  parentId?: string;
  postId?: string;
}

export interface CommentListData {
  comments: TransformedComment[];
  totalComments: number;
  totalPages: number;
}

const commentServices = {
  addNewComment: async (
    values: AddCommentValues,
  ): Promise<ApiResponse<{ message: string }>> => {
    return await callAPI.post<{ message: string }>("comment/add", values);
  },
  getAllComments: async (
    cookies?: string,
    searchOption?: string,
  ): Promise<ApiResponse<CommentListData>> => {
    return await callAPI.get<CommentListData>(`comment/list?${searchOption}`, cookies);
  },
  deleteComment: async (id: string): Promise<ApiResponse<{ message: string }>> => {
    return await callAPI.delete<{ message: string }>(`comment/remove/${id}`);
  },
};

export default commentServices;
