import { useQuery } from "@tanstack/react-query";
import userServices from "api/userServices";

const useGetUsers = (params) => {
  const { data, isLoading } = useQuery({
    queryFn: () => {
      return userServices.getAllUsers("", params);
    },
    queryKey: ["get-comments", params],
  });
  return { users: data?.data?.users || [], isLoading };
};

export default useGetUsers;
