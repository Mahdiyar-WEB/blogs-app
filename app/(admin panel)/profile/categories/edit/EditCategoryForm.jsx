"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import SubmitButton from "components/SubmitButton";
import TextField from "components/TextField";
import useUpdateCategory from "hooks/categories/useUpdateCategory";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
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
  const router = useRouter();
  const { isUpdating, updateCategory } = useUpdateCategory();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemas),
    mode: "all",
    defaultValues: {
      title: "",
      englishTitle: "",
      description: "",
      ...initialValues,
    },
  });

  const onSubmit = (inputs) => {
    updateCategory(
      {
        id: categoryId,
        data: inputs,
      },
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
      className="w-full md:w-2/3 flex flex-col gap-5 bg-white mx-auto p-5 rounded-lg shadow-md"
    >
      <div>
        <Controller
          name="title"
          control={control}
          render={({ field: { ref, ...field } }) => (
            <TextField
              label="عنوان دسته بندی"
              type="text"
              dir="rtl"
              placeholder="ورزشی"
              inputRef={ref}
              hasError={!!errors.title}
              {...field}
            />
          )}
        />

        <FieldError error={errors.title} />
      </div>

      <div>
        <Controller
          name="englishTitle"
          control={control}
          render={({ field: { ref, ...field } }) => (
            <TextField
              label="عنوان انگلیسی دسته بندی"
              type="text"
              dir="ltr"
              placeholder="sports"
              inputRef={ref}
              hasError={!!errors.englishTitle}
              {...field}
            />
          )}
        />

        <FieldError error={errors.englishTitle} />
      </div>

      <div>
        <Controller
          name="description"
          control={control}
          render={({ field: { ref, ...field } }) => (
            <TextField
              label="توضیحات دسته بندی"
              type="text"
              dir="rtl"
              placeholder="توضیحات ورزشی"
              inputRef={ref}
              hasError={!!errors.description}
              {...field}
            />
          )}
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
  error ? (
    <span className="text-xs text-red-500">{error.message}</span>
  ) : null;

export default EditCategoryForm;
