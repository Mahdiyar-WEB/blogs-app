import { useQuery } from "@tanstack/react-query";
import categoryServices from "api/categoryServices";

const useCategories = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryServices.getAllCategories(),
  });
  let options = data.map(({ _id, title }) => {
    return { label: title, value: _id };
  });

  return {
    selectOptions: [{ label: "انتخاب کنید", value: "" }, ...options],
    data,
    isLoading,
  };
};

export default useCategories;
