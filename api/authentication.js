import callAPI from "./callAPI";

const authentication = {
  signUp: async (inputs) => {
    return await callAPI.post("user/signup", inputs).then((data) => data);
  },
  signIn: async (inputs) => {
    return await callAPI.post("user/signin", inputs).then((data) => data);
  },
  getUser: async (cookies) => {
    const res = await callAPI.get("user/profile", cookies);
    return res;
  },
  logout: async () => {
    return await callAPI.post("user/logout").then((data) => data);
  },
};

export default authentication;
