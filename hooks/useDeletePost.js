import { useMutation, useQueryClient } from "@tanstack/react-query";
import postServices from "api/postServices";
import toast from "react-hot-toast";

const useDeletePost = () => {
  const queryClient = useQueryClient();
  const { mutate: deletePost } = useMutation({
    mutationFn: postServices.deletePost,
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

  return { deletePost };
};

export default useDeletePost;
