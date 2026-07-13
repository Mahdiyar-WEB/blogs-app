import {
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";

const FloatingDecorationMobile = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none lg:hidden -z-10">
      {/* Glow */}
      <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-primary-100/60 blur-3xl" />

      {/* Latest Posts */}
      <div className="absolute left-[-45px] bottom-[18%] rotate-[-8deg] bg-white rounded-2xl shadow-lg shadow-primary-200/60 px-3 py-2 w-36 scale-90 sm:scale-100">
        <div className="flex items-center gap-2">
          <div className="bg-primary-100 text-primary-700 rounded-lg p-1.5">
            <DocumentTextIcon className="w-5 h-5" />
          </div>

          <div className="text-right">
            <p className="text-[11px] font-semibold">آخرین مقالات</p>
            <span className="text-[9px] text-secondary-400">
              ۳ مطلب جدید
            </span>
          </div>
        </div>
      </div>

      {/* Comments */}
      <div className="absolute right-[-45px] bottom-[30%] rotate-[8deg] bg-white rounded-2xl shadow-lg shadow-primary-200/60 px-3 py-2 w-32 scale-90 sm:scale-100">
        <div className="flex items-center gap-2">
          <div className="bg-green-100 text-green-600 rounded-lg p-1.5">
            <ChatBubbleLeftRightIcon className="w-5 h-5" />
          </div>

          <div>
            <p className="text-[11px] font-semibold">۱۲ نظر</p>
            <span className="text-[9px] text-secondary-400">
              جدید
            </span>
          </div>
        </div>
      </div>

      {/* Views */}
      <div className="absolute right-1/2 translate-x-1/2 bottom-[6%] rotate-[-5deg] bg-white rounded-2xl shadow-lg shadow-primary-200/60 px-3 py-2.5 w-40 scale-90 sm:scale-100">
        <div className="flex items-center justify-between">
          <div className="bg-primary-100 text-primary-700 rounded-xl p-2">
            <EyeIcon className="w-5 h-5" />
          </div>

          <div className="text-right">
            <p className="text-[10px] text-secondary-400">
              بازدید امروز
            </p>

            <p className="text-base font-bold text-secondary-800">
              ۲۵۹
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingDecorationMobile;