import callAPI, { type ApiResponse } from "./callAPI";
import type { SignupInput, SigninInput } from "lib/validators/auth.schema";
import type { UserDocument } from "types/models";

export interface AuthSuccessData {
  message: string;
  user: UserDocument;
}

const authentication = {
  signUp: async (inputs: SignupInput): Promise<ApiResponse<AuthSuccessData>> => {
    return await callAPI.post<AuthSuccessData>("user/signup", inputs).then((data) => data);
  },
  signIn: async (inputs: SigninInput): Promise<ApiResponse<AuthSuccessData>> => {
    return await callAPI.post<AuthSuccessData>("user/signin", inputs).then((data) => data);
  },
  getUser: async (cookies?: string): Promise<ApiResponse<{ user: UserDocument }>> => {
    const res = await callAPI.get<{ user: UserDocument }>("user/profile", cookies);
    return res;
  },
  logout: async (): Promise<ApiResponse<unknown>> => {
    return await callAPI.post("user/logout").then((data) => data);
  },
};

export default authentication;
