"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import SubmitButton from "components/SubmitButton";
import TextField from "components/TextField";
import useUpdateCategory from "hooks/categories/useUpdateCategory";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemas = yup.object({
  title: yup
    .string()
    .min(5, "حداقل ۵ حرف وارد کنید")
    .required("عنوان دسته بندی را وارد کنید"),
  englishTitle: yup
    .string()
    .min(5, "حداقل ۵ حرف وارد کنید")
    .required("متن انگلیسی دسته بندی را وارد کنید"),
  description: yup
    .string()
    .min(5, "حداقل ۵ حرف وارد کنید")
    .required("توضیحات دسته بندی را وارد کنید"),
});

const EditCategoryForm = ({ initialValues, categoryId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemas),
    defaultValues: initialValues,
    mode: "all",
  });

  const router = useRouter();

  const { isUpdating, updateCategory } = useUpdateCategory();

  const onSubmit = async (inputs) => {
    updateCategory(
      { id: categoryId, data: inputs },
      {
        onSuccess: () => {
          router.push("/profile/categories");
        },
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full md:w-2/3 xl:w-1/3 flex flex-col gap-5"
    >
      <div>
        <TextField
          label="عنوان دسته بندی"
          name="title"
          type="text"
          dir="rtl"
          placeholder="ورزشی"
          register={register}
          hasError={!!errors.title}
        />
        <FieldError error={errors.title} />
      </div>
      <div>
        <TextField
          label="عنوان انگلیسی دسته بندی"
          name="englishTitle"
          type="text"
          dir="rtl"
          placeholder="sports"
          register={register}
          hasError={!!errors.englishTitle}
        />
        <FieldError error={errors.englishTitle} />
      </div>
      <div>
        <TextField
          label="توضیحات دسته بندی"
          name="description"
          type="text"
          dir="rtl"
          placeholder="توضیحات ورزشی"
          register={register}
          hasError={!!errors.description}
        />
        <FieldError error={errors.description} />
      </div>
      <SubmitButton loading={isUpdating} className="w-full">
        ذخیره تغییرات
      </SubmitButton>
    </form>
  );
};

const FieldError = ({ error }) =>
  error ? <span className="text-xs text-red-500">{error.message}</span> : null;

export default EditCategoryForm;
