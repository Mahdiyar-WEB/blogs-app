import { useQuery } from "@tanstack/react-query";
import categoryServices from "api/categoryServices";
import { Category } from "lib/models/Category";

const useGetCategories = (params: string) => {
  const { data, isLoading } = useQuery({
    queryFn: () => {
      return categoryServices.getAllCategories(params);
    },
    queryKey: ["get-categories", params],
  });

  let options = data?.data?.categories
    ? data?.data?.categories.map(
        ({ _id, title }: Category & { _id: string }) => {
          return { label: title, value: _id };
        },
      )
    : [];

  return {
    selectOptions: [{ label: "انتخاب کنید", value: "" }, ...options],
    categories: data?.data?.categories || [],
    totalPages: data?.data?.totalPages || 1,
    isLoading,
  };
};

export default useGetCategories;
