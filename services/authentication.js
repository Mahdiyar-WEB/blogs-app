import callAPI from "./callAPI";

const authentication = {
  signUp: async (inputs) => {
    return await callAPI.post("user/signup", inputs).then((data) => data);
  },
  signIn: async (inputs) => {
    return await callAPI.post("user/signin", inputs).then((data) => data);
  },
  getUser: async () => {
    const res = await callAPI.get("user/profile");
    return res;
  },
};

export default authentication;
