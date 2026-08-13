import { useQuery } from "@tanstack/react-query";
import postServices from "api/postServices";
import { Post } from "types/postType";

const useGetPosts = (params: string) => {
  const { data, isLoading } = useQuery<{
    posts: Post[];
    totalPosts: number;
  }>({
    queryFn: () => {
      return postServices.getAllPosts("", params);
    },
    queryKey: ["get-posts", params],
  });
  return { posts: data?.posts || [], isLoading };
};

export default useGetPosts;
