"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import ButtonIcon from "components/ButtonIcon";
import FileInput from "components/FileInput";
import RichTextEditor from "components/RichTextEditor";
import SelectForm from "components/SelectForm";
import SubmitButton from "components/SubmitButton";
import TextField from "components/TextField";
import useGetCategories from "hooks/categories/useGetCategories";
import useUpdatePost from "hooks/posts/useUpdatePost";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  Controller,
  FieldError as RHFFieldError,
  useForm,
} from "react-hook-form";
import * as yup from "yup";

type EditPostFormValues = {
  title: string;
  briefText: string;
  text: string;
  readingTime: number;
  slug: string;
  category: string;
  coverImage: File | null;
};

type EditPostFormProps = {
  initialValues: Omit<EditPostFormValues, "coverImage">;
  postId: string;
  coverImage: File | null;
  coverImageName: string;
  coverImageUrl: string;
};

const schemas: yup.ObjectSchema<EditPostFormValues> = yup.object({
  title: yup
    .string()
    .min(5, "حداقل ۵ حرف وارد کنید")
    .required("عنوان پست را وارد کنید"),

  briefText: yup
    .string()
    .min(5, "حداقل ۵ حرف وارد کنید")
    .required("توضیحات پست خود را وارد کنید"),

  text: yup
    .string()
    .test("text-required", "متن پست را وارد کنید", (value) => {
      if (!value) return false;

      const text = value.replace(/<[^>]*>/g, "");

      return text.trim().length >= 5;
    })
    .required("متن پست را وارد کنید"),

  readingTime: yup
    .number()
    .positive()
    .integer()
    .required("زمان مطالعه پست خود را وارد کنید")
    .typeError("عدد وارد کنید"),

  slug: yup.string().required("آدرس پست خود را وارد کنید"),

  category: yup.string().required("دسته بندی را انتخاب کنید"),

  coverImage: yup.mixed<File>().nullable().required("عکس پست خود را وارد کنید"),
});

const EditPostForm = ({
  initialValues,
  postId,
  coverImageUrl,
  coverImage,
  coverImageName,
}: EditPostFormProps) => {
  const router = useRouter();

  const [coverImageURL, setCoverImageURL] = useState(coverImageUrl || "");

  const { selectOptions } = useGetCategories();
  const { isUpdating, updatePost } = useUpdatePost();

  const defaultValues = useMemo<EditPostFormValues>(
    () => ({
      ...initialValues,
      coverImage:
        coverImage && coverImageName
          ? new File([coverImage], coverImageName, {
              type: coverImage.type || "image/jpeg",
            })
          : null,
    }),
    [initialValues, coverImage, coverImageName],
  );

  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<EditPostFormValues>({
    resolver: yupResolver(schemas),
    values: defaultValues,
    mode: "all",
  });

  const onSubmit = (inputs: EditPostFormValues) => {
    const formData = new FormData();

    Object.entries(inputs).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value instanceof File ? value : String(value));
      }
    });

    updatePost(
      {
        id: postId,
        data: formData,
      },
      {
        onSuccess: () => {
          router.push("/profile/blogs");
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
              label="عنوان"
              type="text"
              dir="rtl"
              placeholder="عنوان پست"
              hasError={!!errors.title}
              inputRef={ref}
              {...field}
            />
          )}
        />

        <FieldError error={errors.title} />
      </div>

      <div>
        <Controller
          name="briefText"
          control={control}
          render={({ field: { ref, ...field } }) => (
            <TextField
              label="توضیح کوتاه"
              type="text"
              dir="rtl"
              placeholder="توضیح کوتاه"
              hasError={!!errors.briefText}
              inputRef={ref}
              {...field}
            />
          )}
        />

        <FieldError error={errors.briefText} />
      </div>

      <div>
        <label className="block mb-2 font-medium">متن پست</label>

        <Controller
          name="text"
          control={control}
          render={({ field }) => (
            <RichTextEditor
              key={postId}
              initialValue={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <FieldError error={errors.text} />
      </div>

      <div>
        <Controller
          name="category"
          control={control}
          render={({ field: { ref, ...field } }) => (
            <SelectForm
              label="دسته بندی"
              hasError={!!errors.category}
              options={selectOptions}
              inputRef={ref}
              {...field}
            />
          )}
        />

        <FieldError error={errors.category} />
      </div>

      <div>
        <Controller
          name="readingTime"
          control={control}
          render={({ field: { ref, onChange, ...field } }) => (
            <TextField
              label="زمان خواندن (دقیقه)"
              type="number"
              max="60"
              dir="rtl"
              hasError={!!errors.readingTime}
              inputRef={ref}
              onChange={(e) => onChange(e.target.valueAsNumber || "")}
              {...field}
            />
          )}
        />

        <FieldError error={errors.readingTime} />
      </div>

      <div>
        <Controller
          name="slug"
          control={control}
          render={({ field: { ref, ...field } }) => (
            <TextField
              label="آدرس پست"
              type="text"
              dir="rtl"
              placeholder="آدرس پست: freelancing-work"
              hasError={!!errors.slug}
              inputRef={ref}
              {...field}
            />
          )}
        />

        <FieldError error={errors.slug} />
      </div>

      <div>
        <Controller
          name="coverImage"
          control={control}
          render={({ field: { value, onChange, ...rest } }) => (
            <FileInput
              label="انتخاب کاور پست"
              {...rest}
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (!file) return;

                onChange(file);

                setCoverImageURL(URL.createObjectURL(file));

                e.target.value = "";
              }}
            />
          )}
        />

        <FieldError error={errors.coverImage} />

        {coverImageURL && (
          <div className="relative overflow-hidden aspect-[4/3] mt-5 rounded-lg">
            <Image
              fill
              src={coverImageURL}
              alt="cover-image"
              className="object-cover object-center"
            />

            <ButtonIcon
              onClick={() => {
                setCoverImageURL("");
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

      <SubmitButton loading={isUpdating} className="w-full">
        ذخیره تغییرات
      </SubmitButton>
    </form>
  );
};

const FieldError = ({ error }: { error?: RHFFieldError }) =>
  error ? <span className="text-xs text-red-500">{error.message}</span> : null;

export default EditPostForm;
