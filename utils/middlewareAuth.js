const middlerWareAuth = async (request) => {
  const accessToken = request.cookies.get("accessToken");
  const refreshToken = request.cookies.get("refreshToken");
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`, {
    method: "GET",
    credentials: "include",
    headers: {
      Cookie: `${accessToken?.name}=${accessToken?.value}; ${refreshToken?.name}=${refreshToken?.value}`,
    },
  });
  const { data } = await res.json();
  const { user } = data || {};
  return user;
};

export default middlerWareAuth;
