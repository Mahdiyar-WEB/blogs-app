import { useQuery } from "@tanstack/react-query";
import postServices from "api/postServices";

const useGetPosts = (params) => {
  const { data = {}, isLoading } = useQuery({
    queryFn: () => {
      return postServices.getAllPosts("", params);
    },
    queryKey: ["get-posts", params],
  });
  return { posts: data.posts, isLoading };
};

export default useGetPosts;
