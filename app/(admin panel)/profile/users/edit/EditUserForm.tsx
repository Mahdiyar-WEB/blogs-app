"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import ButtonIcon from "components/ButtonIcon";
import FileInput from "components/FileInput";
import SubmitButton from "components/SubmitButton";
import TextField from "components/TextField";
import { useUser } from "context/UserContext";
import useUpdateUser from "hooks/users/useUpdateUser";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import type { FieldError } from "react-hook-form";
import * as yup from "yup";

type EditUserFormValues = {
  name: string;
  email: string;
  avatar: File | null;
};

const schema: yup.ObjectSchema<EditUserFormValues> = yup.object({
  name: yup.string().min(3, "حداقل ۳ حرف وارد کنید").required("نام الزامی است"),

  email: yup.string().email("ایمیل معتبر نیست").required("ایمیل الزامی است"),

  avatar: yup.mixed<File>().nullable().defined(),
});

const EditUserForm = ({
  initialValues,
  avatarUrl,
  avatar,
  avatarName,
  userId,
}: {
  initialValues: { name: string; email: string };
  avatarUrl: string;
  avatar: File | null;
  avatarName: string;
  userId: string;
}) => {
  const router = useRouter();
  const { user, getUser } = useUser();

  const defaultValues = useMemo(
    () => ({
      ...initialValues,
      avatar:
        avatar && avatarName
          ? new File([avatar], avatarName, {
              type: avatar.type || "image/jpeg",
            })
          : null,
    }),
    [initialValues, avatar, avatarName],
  );

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    values: defaultValues,
    mode: "all",
  });

  const [avatarURL, setAvatarURL] = useState(avatarUrl || "");

  const { isUpdating, updateUser } = useUpdateUser();

  const onSubmit = async (inputs: EditUserFormValues) => {
    const formData = new FormData();

    formData.append("name", inputs.name);
    formData.append("email", inputs.email);

    if (inputs.avatar instanceof File) {
      formData.append("filename", inputs.avatar.name);
      formData.append("fileUploadPath", "uploads/avatars");
      formData.append("avatar", inputs.avatar);
    }

    if (inputs.avatar === null) {
      formData.append("removeAvatar", "true");
    }

    updateUser(
      {
        id: userId,
        data: formData,
      },
      {
        onSuccess: () => {
          if (userId === user?._id) {
            getUser();
          }

          router.push("/profile/users");
          reset();
        },
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full md:w-2/3  flex flex-col gap-5 bg-white mx-auto p-5 rounded-lg shadow-md"
    >
      <div>
        <Controller
          name="name"
          control={control}
          render={({ field: { ref, ...field } }) => (
            <TextField
              label="نام"
              type="text"
              dir="rtl"
              placeholder="نام"
              hasError={!!errors.name}
              inputRef={ref}
              {...field}
            />
          )}
        />

        <FieldError error={errors.name} />
      </div>

      <div>
        <Controller
          name="email"
          control={control}
          render={({ field: { ref, ...field } }) => (
            <TextField
              label="ایمیل"
              type="email"
              dir="rtl"
              placeholder="email@example.com"
              hasError={!!errors.email}
              inputRef={ref}
              {...field}
            />
          )}
        />

        <FieldError error={errors.email} />
      </div>

      <div>
        <Controller
          name="avatar"
          control={control}
          render={({ field: { value, onChange, ...rest } }) => (
            <FileInput
              label="انتخاب عکس پروفایل"
              {...rest}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                onChange(file);
                setAvatarURL(URL.createObjectURL(file));
                e.target.value = "";
              }}
            />
          )}
        />

        <FieldError error={errors.avatar} />

        {avatarURL ? (
          <div className="relative overflow-hidden aspect-[4/3] mt-5 rounded-lg">
            <Image
              fill
              src={avatarURL}
              alt="avatar"
              className="object-cover object-center"
            />

            <ButtonIcon
              variant="red"
              className="absolute top-3 left-3"
              onClick={() => {
                setAvatarURL("");
                setValue("avatar", null);
              }}
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
        ) : (
          <div className="mt-5 p-4 rounded-lg border border-dashed text-center text-gray-500 text-sm">
            👤 فاقد عکس پروفایل
          </div>
        )}
      </div>

      <SubmitButton loading={isUpdating} className="w-full">
        ذخیره تغییرات
      </SubmitButton>
    </form>
  );
};

const FieldError = ({ error }: { error: FieldError | undefined }) =>
  error ? <span className="text-xs text-red-500">{error.message}</span> : null;

export default EditUserForm;
