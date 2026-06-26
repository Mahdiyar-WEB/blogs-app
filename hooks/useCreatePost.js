import { useMutation, useQueryClient } from "@tanstack/react-query";
import postServices from "api/postServices";
import toast from "react-hot-toast";

const useCreatePost = () => {
  const queryClient = useQueryClient();
  const { mutate: createPost, isPending: isCreating } = useMutation({
    mutationFn: postServices.createPost,
    onSuccess: ({ data }) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  return { createPost, isCreating };
};

export default useCreatePost;
