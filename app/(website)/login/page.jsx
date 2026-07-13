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

const GoogleIcon = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

const GithubIcon = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
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
    <main className="mb-8 max-w-xl w-11/12 mx-auto overflow-hidden rounded-2xl border border-secondary-200 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.06)] transition-all duration-300">
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
              <div className="absolute -inset-3 rounded-[28px] bg-orange-100/70 blur-xl transition-all duration-500 group-hover:scale-110" />

              <div className="relative flex h-20 w-20 items-center justify-center rounded-[24px] border border-secondary-100 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
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
