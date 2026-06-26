import { useQuery } from "@tanstack/react-query";
import postServices from "api/postServices";

const useGetPosts = () => {
  const { data: posts, isLoading } = useQuery({
    queryFn: postServices.getAllPosts,
    queryKey: ["get-posts"],
  });
  return { posts, isLoading };
};

export default useGetPosts;
