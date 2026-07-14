import { useQuery } from "@tanstack/react-query";
import commentServices from "api/commentServices";

const useGetComments = (params) => {
  const { data, isLoading } = useQuery({
    queryFn: () => {
      return commentServices.getAllComments("", params);
    },
    queryKey: ["get-comments", params],
  });
  return { comments: data?.data?.comments || [], isLoading };
};

export default useGetComments;
