"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import ButtonIcon from "components/ButtonIcon";
import FileInput from "components/FileInput";
import SubmitButton from "components/SubmitButton";
import TextField from "components/TextField";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import useUpdateUser from "hooks/useUpdateUser";
import { useRouter } from "next/navigation";

const schema = yup.object({
  name: yup.string().min(3, "حداقل ۳ حرف وارد کنید").required("نام الزامی است"),

  email: yup.string().email("ایمیل معتبر نیست").required("ایمیل الزامی است"),

  avatar: yup.mixed().required("عکس پروفایل الزامی است"),
});

const EditUserForm = ({
  initialValues,
  avatarUrl,
  avatar,
  avatarName,
  userId,
}) => {
  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      ...initialValues,
      avatar: new File([avatar], avatarName, {
        type: avatar.type,
      }),
    }),
    [initialValues, avatar, avatarName],
  );

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
    mode: "all",
  });

  const [avatarURL, setAvatarURL] = useState(avatarUrl || "");

  const { isUpdating, updateUser } = useUpdateUser();

  const onSubmit = async (inputs) => {
    const formData = new FormData();

    for (const key in inputs) {
      formData.append(key, inputs[key]);
    }

    updateUser(
      { id: userId, data: formData },
      {
        onSuccess: () => {
          router.push("/profile/users");
          reset();
        },
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full md:w-2/3 xl:w-1/3 flex flex-col gap-5"
    >
      {/* NAME */}
      <div>
        <TextField
          label="نام"
          name="name"
          type="text"
          dir="rtl"
          placeholder="نام"
          register={register}
          hasError={!!errors.name}
        />
        <FieldError error={errors.name} />
      </div>

      {/* EMAIL */}
      <div>
        <TextField
          label="ایمیل"
          name="email"
          type="email"
          dir="rtl"
          placeholder="email@example.com"
          register={register}
          hasError={!!errors.email}
        />
        <FieldError error={errors.email} />
      </div>

      {/* AVATAR */}
      <div>
        <Controller
          name="avatar"
          control={control}
          render={({ field: { onChange, value, ...rest } }) => (
            <FileInput
              label="انتخاب عکس پروفایل"
              name="avatar"
              value={value?.fileName}
              {...rest}
              onChange={(e) => {
                const file = e.target.files?.[0];
                onChange(file);
                setAvatarURL(URL.createObjectURL(file));
                e.target.value = null;
              }}
            />
          )}
        />
        <FieldError error={errors.avatar} />

        {avatarURL && (
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
        )}
      </div>

      {/* SUBMIT */}
      <SubmitButton loading={isUpdating} className="w-full">
        ذخیره تغییرات
      </SubmitButton>
    </form>
  );
};

const FieldError = ({ error }) =>
  error ? <span className="text-xs text-red-500">{error.message}</span> : null;

export default EditUserForm;
