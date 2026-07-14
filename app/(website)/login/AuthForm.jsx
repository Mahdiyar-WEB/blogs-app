"use client";
import TextField from "components/TextField";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUser } from "context/UserContext";
import SubmitButton from "components/SubmitButton";

// ─── Icons ────────────────────────────────────────────────────────────────────
const EyeIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
    />
  </svg>
);

const UserIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const EmailIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

// ─── Schemas ────────────────────────────────────────────────────────────────

const sharedFields = {
  email: yup.string().email("ایمیل نامعتبر است").required("ایمیل را وارد کنید"),

  password: yup
    .string()
    .min(8, "حداقل ۸ حرف وارد کنید")
    .max(20, "تعداد حروف زیاد است")
    .required("رمز خود را وارد کنید"),
};

const schemas = {
  login: yup.object(sharedFields),

  signup: yup.object({
    name: yup
      .string()
      .min(5, "حداقل ۵ حرف وارد کنید")
      .max(30, "تعداد حروف زیاد است")
      .required("نام و نام خانوادگی را وارد کنید"),

    ...sharedFields,

    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "رمز مطابقت ندارد")
      .required("رمز خود را تکرار کنید"),
  }),
};

// ─── Component ─────────────────────────────────────────────────────────────

export default function AuthForm() {
  const [mode, setMode] = useState("login");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { signUp, signIn } = useUser();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schemas[mode]),
    mode: "onTouched",
  });

  const isSignup = mode === "signup";

  const onSubmit = async (inputs) => {
    if (isSignup) {
      await signUp({
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });

      return;
    }

    await signIn({
      email: inputs.email,
      password: inputs.password,
    });
  };

  const switchMode = (newMode) => {
    if (newMode === mode) return;

    setMode(newMode);

    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <main className="relative mb-8 max-w-xl w-full overflow-hidden rounded-[28px] border border-white/70 bg-white/90 backdrop-blur-sm shadow-[0_20px_60px_rgba(59,130,246,0.12)] transition-all duration-300">
      {/* Tabs */}
      <div className="border-b border-secondary-100 bg-secondary-50 p-2">
        <div className="grid grid-cols-2 gap-1 rounded-2xl bg-white p-1">
          {["login", "signup"].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => switchMode(item)}
              className={`rounded-xl py-3 text-sm font-medium transition-all duration-300 ${
                mode === item
                  ? "bg-primary-800 text-white shadow-sm"
                  : "text-secondary-500 hover:text-secondary-700"
              }`}
            >
              {item === "login" ? "ورود" : "ثبت‌نام"}
            </button>
          ))}
        </div>
      </div>

      <div className="px-8 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-5 flex justify-center">
            <div className="group relative">
              <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-r from-orange-200/70 via-orange-100/60 to-primary-100/50 blur-2xl transition-all duration-500 group-hover:scale-110" />

              <div className="relative flex h-20 w-20 items-center justify-center rounded-[24px] border border-white bg-white shadow-[0_15px_40px_rgba(0,0,0,0.08)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  className="h-14 w-14"
                >
                  <circle cx="24" cy="24" r="24" fill="#F0780C" />

                  <path
                    fill="#FFFFFF"
                    d="M17 12C13.7 12 11 14.7 11 18V30C11 33.3 13.7 36 17 36H31C34.3 36 37 33.3 37 30V24.5C37 23.4 36.1 22.5 35 22.5C33.9 22.5 33 21.6 33 20.5V18C33 14.7 30.3 12 27 12H17ZM18 18H26C27.7 18 29 19.3 29 21C29 22.7 27.7 24 26 24H18C16.3 24 15 22.7 15 21C15 19.3 16.3 18 18 18ZM18 26H27C28.7 26 30 27.3 30 29C30 30.7 28.7 32 27 32H18C16.3 32 15 30.7 15 29C15 27.3 16.3 26 18 26Z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-secondary-900">
            {isSignup ? "ایجاد حساب کاربری" : "خوش برگشتی 👋"}
          </h1>

          <p className="mt-2 text-sm text-secondary-400">
            {isSignup
              ? "برای شروع فقط چند ثانیه زمان نیاز داری"
              : "برای ادامه وارد حساب کاربری خودت شو"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5">
            {isSignup && (
              <div className="space-y-1.5 slide-down-enter">
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="نام و نام خانوادگی"
                      dir="rtl"
                      placeholder="مهدیار مروی"
                      icon={<UserIcon />}
                      hasError={!!errors.name}
                      {...field}
                    />
                  )}
                />
                <FieldError error={errors.name} />
              </div>
            )}

            <div className="space-y-1.5">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="ایمیل"
                    type="email"
                    placeholder="test@example.com"
                    icon={<EmailIcon />}
                    hasError={!!errors.email}
                    {...field}
                  />
                )}
              />
              <FieldError error={errors.email} />
            </div>

            <div className="space-y-1.5">
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="رمز عبور"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    customIcon={
                      <PasswordToggle
                        show={showPassword}
                        onToggle={() => setShowPassword((prev) => !prev)}
                      />
                    }
                    hasError={!!errors.password}
                    {...field}
                  />
                )}
              />
              <FieldError error={errors.password} />
            </div>

            {isSignup && (
              <div className="space-y-1.5 slide-down-enter">
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="تکرار رمز عبور"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      customIcon={
                        <PasswordToggle
                          show={showConfirmPassword}
                          onToggle={() =>
                            setShowConfirmPassword((prev) => !prev)
                          }
                        />
                      }
                      hasError={!!errors.confirmPassword}
                      {...field}
                    />
                  )}
                />
                <FieldError error={errors.confirmPassword} />
              </div>
            )}

            <SubmitButton
              loading={isSubmitting}
              className="h-12 w-full rounded-xl font-semibold shadow-sm transition-all duration-300 hover:shadow-md"
            >
              {isSignup ? "ایجاد حساب کاربری" : "ورود به حساب"}
            </SubmitButton>
          </div>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-secondary-200" />
          <span className="text-xs text-secondary-400">یا</span>
          <div className="h-px flex-1 bg-secondary-200" />
        </div>

        <p className="text-center text-sm text-secondary-500">
          {isSignup ? "قبلاً ثبت‌نام کرده‌ای؟" : "حساب کاربری نداری؟"}{" "}
          <button
            type="button"
            onClick={() => switchMode(isSignup ? "login" : "signup")}
            className="font-semibold text-primary-900 transition-colors hover:text-primary-700"
          >
            {isSignup ? "وارد شو" : "ثبت‌نام کن"}
          </button>
        </p>
      </div>
    </main>
  );
}

// ─── Password Toggle ───────────────────────────────────────────────────────

const PasswordToggle = ({ show, onToggle }) => (
  <button type="button" onClick={onToggle} className="textField__icon--btn">
    {show ? <EyeOffIcon /> : <EyeIcon />}
  </button>
);

// ─── Error ────────────────────────────────────────────────────────────────

const FieldError = ({ error }) =>
  error ? <span className="text-xs text-red-500">{error.message}</span> : null;
