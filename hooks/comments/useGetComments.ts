import { useQuery } from "@tanstack/react-query";
import commentServices from "api/commentServices";
import { Comment } from "types/commentType";

const useGetComments = (params: string) => {
  const { data, isLoading } = useQuery<{
    data: {
      comments: Comment[];
    };
  }>({
    queryFn: () => {
      return commentServices.getAllComments("", params);
    },
    queryKey: ["get-comments", params],
  });
  return { comments: data?.data?.comments || [], isLoading };
};

export default useGetComments;
