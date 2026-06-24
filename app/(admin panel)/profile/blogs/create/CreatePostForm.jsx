"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import SelectForm from "components/SelectForm";
import SubmitButton from "components/SubmitButton";
import TextField from "components/TextField";
import useCategories from "hooks/useCategories";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemas = yup.object({
  title: yup
    .string()
    .min(5, "حداقل ۵ حرف وارد کنید")
    .max(30, "تعداد حروف زیاد است")
    .required("نام و نام خانوادگی را وارد کنید"),
  briefText: yup.string().required("عنوان کوتاه خودرا وارد کنید"),
  text: yup.string().required(""),
  readingTime: yup.number(),
  slug: yup.string().required("آدرس پست خودرا وارد کنید"),
  category: yup.string().required("دسته بندی را انتخاب کنید"),
});

const CreatePostForm = () => {
  const { selectOptions } = useCategories();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isLoading },
  } = useForm({
    resolver: yupResolver(schemas),
    mode: "onTouched",
  });

  const onSubmit = async (inputs) => {};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full md:w-2/3 xl:w-1/3 flex flex-col gap-5"
    >
      <div>
        <TextField
          label="عنوان"
          name="title"
          type="text"
          dir="rtl"
          placeholder="عنوان پست"
          register={register}
          hasError={!!errors.title}
        />
        <FieldError error={errors.title} />
      </div>
      <div>
        <TextField
          label="عنوان کوتاه"
          name="briefText"
          type="text"
          dir="rtl"
          placeholder="عنوان کوتاه"
          register={register}
          hasError={!!errors.briefText}
        />
        <FieldError error={errors.briefText} />
      </div>
      <div>
        <TextField
          label="متن"
          name="text"
          type="text"
          dir="rtl"
          placeholder="متن پست"
          register={register}
          hasError={!!errors.text}
        />
        <FieldError error={errors.text} />
      </div>
      <div>
        <SelectForm
          setValue={setValue}
          label="دسته بندی"
          name="category"
          register={register}
          hasError={!!errors.category}
          options={selectOptions}
        />
        <FieldError error={errors.category} />
      </div>
      <div>
        <TextField
          label="زمان خواندن (دقیقه)"
          name="readingTime"
          type="number"
          max="60"
          dir="rtl"
          register={register}
          hasError={!!errors.readingTime}
        />
        <FieldError error={errors.readingTime} />
      </div>
      <div>
        <TextField
          label="آدرس پست"
          name="slug"
          type="text"
          dir="rtl"
          placeholder="آدرس پست: freelancing-work"
          register={register}
          hasError={!!errors.slug}
        />
        <FieldError error={errors.slug} />
      </div>
      <SubmitButton loading={isLoading} className="w-full">
        ثبت پست
      </SubmitButton>
    </form>
  );
};

const FieldError = ({ error }) =>
  error ? <span className="text-xs text-red-500">{error.message}</span> : null;

export default CreatePostForm;
