import { useMutation, useQueryClient } from "@tanstack/react-query";
import postServices from "api/postServices";
import toast from "react-hot-toast";

const useUpdatePost = () => {
  const queryClient = useQueryClient();
  const { mutate: updatePost, isPending: isUpdating } = useMutation({
    mutationFn: postServices.updatePost,
    onSuccess: ({ data }) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({
        queryKey: ["get-posts"],
      });
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  return { updatePost, isUpdating };
};

export default useUpdatePost;

