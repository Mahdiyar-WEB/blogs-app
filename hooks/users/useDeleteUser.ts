import { useMutation, useQueryClient } from "@tanstack/react-query";
import userServices from "api/userServices";
import toast from "react-hot-toast";

const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteUser } = useMutation({
    mutationFn: userServices.deleteUser,
    onSuccess: ({ data }) => {
      toast.success(data?.message ?? "");
      queryClient.invalidateQueries({
        queryKey: ["get-users"],
      });
    },
    onError: (error: Error) => {
      toast.error(error?.message);
    },
  });

  return { deleteUser };
};

export default useDeleteUser;
