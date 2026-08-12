import { useMutation, useQueryClient } from "@tanstack/react-query";
import commentServices from "api/commentServices";
import toast from "react-hot-toast";

const useDeleteComment = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteComment } = useMutation({
    mutationFn: commentServices.deleteComment,
    onSuccess: ({ data }) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({
        queryKey: ["get-comments"],
      });
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  return { deleteComment };
};

export default useDeleteComment;
