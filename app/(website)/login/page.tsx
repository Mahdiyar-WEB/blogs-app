import AuthForm from "./AuthForm";
import {
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  FolderIcon,
  FireIcon,
} from "@heroicons/react/24/outline";

export default function AuthPage() {
  return (
    <div className="relative flex min-h-[calc(100vh-120px)] items-center justify-center overflow-hidden px-4 py-0 md:py-10">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-100/40 blur-3xl" />

        <div className="absolute top-20 left-[20%] h-24 w-24 rounded-full bg-primary-100/60 blur-2xl" />

        <div className="absolute bottom-20 right-[20%] h-32 w-32 rounded-full bg-primary-100/50 blur-3xl" />
      </div>

      {/* Right Floating Card */}
      <div className="hidden lg:block absolute right-[4%] xl:right-[12%] top-[28%] rotate-6">
        <div className="w-44 xl:w-56 rounded-2xl bg-white p-3 xl:p-4 shadow-lg shadow-primary-200/80 border border-secondary-100/50">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-primary-100 p-2.5 xl:p-3 text-primary-700">
              <DocumentTextIcon className="h-5 w-5 xl:h-6 xl:w-6" />
            </div>

            <div>
              <p className="text-sm xl:text-base font-semibold text-secondary-800">
                ۱۲ مقاله
              </p>

              <p className="text-[11px] xl:text-xs text-secondary-400">
                آماده مطالعه
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Left Floating Card */}
      <div className="hidden lg:block absolute left-[4%] xl:left-[12%] bottom-[25%] -rotate-6">
        <div className="w-44 xl:w-56 rounded-2xl bg-white p-3 xl:p-4 shadow-lg shadow-primary-200/80 border border-secondary-100/50">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-green-100 p-2.5 xl:p-3 text-green-600">
              <ChatBubbleLeftRightIcon className="h-5 w-5 xl:h-6 xl:w-6" />
            </div>

            <div>
              <p className="text-sm xl:text-base font-semibold text-secondary-800">
                ۲۴ نظر جدید
              </p>

              <p className="text-[11px] xl:text-xs text-secondary-400">
                مشارکت کاربران
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Floating Card */}
      <div className="hidden 2xl:block absolute left-[18%] top-[18%] rotate-3">
        <div className="rounded-2xl bg-white px-5 py-4 shadow-lg shadow-primary-200/80 border border-secondary-100/50">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-primary-100 p-2 text-primary-700">
              <FolderIcon className="h-5 w-5" />
            </div>

            <span className="font-medium text-secondary-700">
              دسته‌بندی‌های متنوع
            </span>
          </div>
        </div>
      </div>



      {/* Bottom Floating Card */}
      <div className="hidden 2xl:block absolute right-[18%] bottom-[18%] -rotate-3">
        <div className="rounded-2xl bg-white px-5 py-4 shadow-lg shadow-primary-200/80 border border-secondary-100/50">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-orange-100 p-2 text-orange-500">
              <FireIcon className="h-5 w-5" />
            </div>

            <span className="font-medium text-secondary-700">
              محبوب‌ترین مقالات
            </span>
          </div>
        </div>
      </div>

      <AuthForm />
    </div>
  );
}
