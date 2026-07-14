import { useMutation, useQueryClient } from "@tanstack/react-query";
import userServices from "api/userServices";
import toast from "react-hot-toast";

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: userServices.updateUser,
    onSuccess: ({ data }) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({
        queryKey: ["get-users"],
      });
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  return { updateUser, isUpdating };
};

export default useUpdateUser;
