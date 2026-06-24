"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonIcon from "components/ButtonIcon";
import FileInput from "components/FileInput";
import SelectForm from "components/SelectForm";
import SubmitButton from "components/SubmitButton";
import TextField from "components/TextField";
import useCategories from "hooks/useCategories";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
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
  const [coverImageURL, setCoverImageURL] = useState(null);
  const { selectOptions } = useCategories();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isLoading },
  } = useForm({
    resolver: yupResolver(schemas),
    mode: "onTouched",
  });

  const onSubmit = async (inputs) => {};

  useEffect(() => {
    return () => {
      if (coverImageURL) {
        URL.revokeObjectURL(coverImageURL);
      }
    };
  }, [coverImageURL]);
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
      <div>
        <Controller
          name="coverImage"
          control={control}
          rules={{ required: "کاور پست الزامی است" }}
          render={({ field: { value, onChange, ...rest } }) => (
            <FileInput
              label="انتخاب کاور پست"
              name="coverImage"
              value={value?.fileName}
              {...rest}
              onChange={(e) => {
                const file = e.target.files?.[0];
                onChange(file);
                setCoverImageURL(URL.createObjectURL(file));
                e.target.value = null;
              }}
            />
          )}
        />
        {coverImageURL && (
          <div className="relative overflow-hidden aspect-1 mt-5 rounded-lg">
            <Image
              fill
              src={coverImageURL}
              alt="cover-image"
              className="object-cover object-center"
            />
            <ButtonIcon
              onClick={() => {
                setCoverImageURL(null);
                setValue("coverImage", null);
              }}
              variant="red"
              className="absolute top-3 left-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </ButtonIcon>
          </div>
        )}
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
