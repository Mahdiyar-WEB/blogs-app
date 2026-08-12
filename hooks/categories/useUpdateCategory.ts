import { useMutation, useQueryClient } from "@tanstack/react-query";
import categoryServices from "api/categoryServices";
import toast from "react-hot-toast";

const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  const { mutate: updateCategory, isPending: isUpdating } = useMutation({
    mutationFn: categoryServices.updateCategory,
    onSuccess: ({ data }) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({
        queryKey: ["get-categories"],
      });
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  return { updateCategory, isUpdating };
};

export default useUpdateCategory;
