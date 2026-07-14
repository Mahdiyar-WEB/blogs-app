const generateSSRCookies = (cookies) => {
  const accessToken = cookies.get("accessToken");
  const refreshToken = cookies.get("refreshToken");
  const cookiesValues = `${accessToken?.name}=${accessToken?.value}; ${refreshToken?.name}=${refreshToken?.value}`;
  return cookiesValues;
};

export default generateSSRCookies;
