import { SigninInputs, SignupInputs } from "types/authentication/auth";
import callAPI from "./callAPI";

const authentication = {
  signUp: async (inputs: SignupInputs) => {
    return await callAPI.post("user/signup", inputs).then((data) => data);
  },
  signIn: async (inputs: SigninInputs) => {
    return await callAPI.post("user/signin", inputs).then((data) => data);
  },
  getUser: async (cookies?: string) => {
    const res = await callAPI.get("user/profile", cookies);
    return res;
  },
  logout: async () => {
    return await callAPI.post("user/logout", {}).then((data) => data);
  },
};

export default authentication;
