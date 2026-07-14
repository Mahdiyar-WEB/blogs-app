import { useMutation, useQueryClient } from "@tanstack/react-query";
import categoryServices from "api/categoryServices";
import toast from "react-hot-toast";

const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteCategory } = useMutation({
    mutationFn: categoryServices.deleteCategory,
    onSuccess: ({ data }) => {
      toast.success(data?.message ?? "");
      queryClient.invalidateQueries({
        queryKey: ["get-categories"],
      });
    },
    onError: (error: Error) => {
      toast.error(error?.message);
    },
  });

  return { deleteCategory };
};

export default useDeleteCategory;
