import { useMutation, useQueryClient } from "@tanstack/react-query";
import categoryServices from "api/categoryServices";
import toast from "react-hot-toast";

const useCreateCategory = () => {
  const queryClient = useQueryClient();
  const { mutate: createCategory, isPending: isUpdating } = useMutation({
    mutationFn: categoryServices.createCategory,
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

  return { createCategory, isUpdating };
};

export default useCreateCategory;
