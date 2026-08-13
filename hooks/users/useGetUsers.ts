import { useQuery } from "@tanstack/react-query";
import userServices from "api/userServices";
import { User } from "lib/models/User";

const useGetUsers = (params: string) => {
  const { data, isLoading } = useQuery<{
    data: {
      users: User[];
    };
  }>({
    queryFn: () => {
      return userServices.getAllUsers("", params);
    },
    queryKey: ["get-users", params],
  });
  return { users: data?.data?.users || [], isLoading };
};

export default useGetUsers;
