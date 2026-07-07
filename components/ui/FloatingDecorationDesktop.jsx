const FloatingDecorationDesktop = () => {
  return (
    <div className="absolute top-36 left-0 bottom-0 right-0 w-[95%] 2xl:max-w-screen-2xl 2xl:w-[75%] mx-auto h-[55vh] hidden lg:flex justify-between -z-10">
      {/* right */}
      <div className="w-1/4 relative">
        {/* background dots */}
        <div className="absolute top-16 -right-10 w-24 h-24 grid grid-cols-4 -z-20">
          <div className="w-1 h-1 bg-primary-300 rounded-full"></div>
          <div className="w-1 h-1 bg-primary-300 rounded-full"></div>
          <div className="w-1 h-1 bg-primary-300 rounded-full"></div>
          <div className="w-1 h-1 bg-primary-300 rounded-full"></div>
          <div className="w-1 h-1 bg-primary-300 rounded-full"></div>
          <div className="w-1 h-1 bg-primary-300 rounded-full"></div>
          <div className="w-1 h-1 bg-primary-300 rounded-full"></div>
          <div className="w-1 h-1 bg-primary-300 rounded-full"></div>
          <div className="w-1 h-1 bg-primary-300 rounded-full"></div>
          <div className="w-1 h-1 bg-primary-300 rounded-full"></div>
          <div className="w-1 h-1 bg-primary-300 rounded-full"></div>
          <div className="w-1 h-1 bg-primary-300 rounded-full"></div>
        </div>
        {/* background circle */}
        <div className="absolute top-60 -left-10 w-52 h-52 bg-gradient-to-r from-primary-100/50 rounded-full -z-30"></div>
        {/* categories  */}
        <div className="flex -rotate-3 justify-between items-center bg-white shadow-lg shadow-primary-200/80 rounded-lg w-56 px-3 py-3 xl:ms-6">
          <div className="text-secondary-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </div>
          <div className="flex items-center gap-4">
            {/* text */}
            <p className="text-xs font-medium">دسته‌بندی‌ها</p>
            {/* folder icon */}
            <div className="text-primary-800 bg-primary-100/60 p-[6px] rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path d="M19.5 21a3 3 0 0 0 3-3v-4.5a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h15ZM1.5 10.146V6a3 3 0 0 1 3-3h5.379a2.25 2.25 0 0 1 1.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 0 1 3 3v1.146A4.483 4.483 0 0 0 19.5 9h-15a4.483 4.483 0 0 0-3 1.146Z" />
              </svg>
            </div>
          </div>
        </div>
        {/* heart icon */}
        <div className="bg-white rounded-full p-[10px] shadow-lg shadow-primary-200/80 w-fit xl:ms-auto xl:mt-5 2xl:mt-0 xl:me-12 2xl:me-8">
          <div className="text-red-400 p-[4px] rounded-full bg-red-100/80">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>
          </div>
        </div>

        {/* last blogs */}
        <div className="bg-white rounded-xl p-5 shadow-lg shadow-primary-200/80 xl:w-72 w-60 rotate-3 mt-5 -ms-5 xl:ms-0">
          <p className="font-medium mb-4">آخرین مقالات</p>
          {/* items */}
          <div className="flex flex-col gap-5">
            {/* item */}
            <div className="flex justify-between items-center">
              {/* content */}
              <div className="flex flex-col gap-2">
                <p>کار فریلنسری</p>
                <span className="text-sm text-secondary-400">۱ روز پیش</span>
              </div>
              {/* icon */}
              <div className="text-primary-700 bg-primary-100/60 p-[8px] rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z"
                    clipRule="evenodd"
                  />
                  <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
                </svg>
              </div>
            </div>
            {/* item */}
            <div className="flex justify-between items-center">
              {/* content */}
              <div className="flex flex-col gap-2">
                <p>بهترین هتل های ایران</p>
                <span className="text-sm text-secondary-400">۲ روز پیش</span>
              </div>
              {/* icon */}
              <div className="text-primary-700 bg-primary-100/60 p-[8px] rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z"
                    clipRule="evenodd"
                  />
                  <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
                </svg>
              </div>
            </div>
            {/* item */}
            <div className="flex justify-between items-center">
              {/* content */}
              <div className="flex flex-col gap-2">
                <p>روستاهای پلکانی</p>
                <span className="text-sm text-secondary-400">۳ روز پیش</span>
              </div>
              {/* icon */}
              <div className="text-primary-700 bg-primary-100/60 p-[8px] rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z"
                    clipRule="evenodd"
                  />
                  <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        {/* message icon */}
        <div className="bg-white text-primary-800 rounded-xl p-3 shadow-lg shadow-primary-200/80 w-fit ms-auto -mt-3 -rotate-3 2xl:block hidden">
          <svg
            fill="currentColor"
            className="size-6"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" />
          </svg>
        </div>
      </div>
      {/* left */}
      <div className="w-1/4 relative">
        {/* background circle */}
        <div className="absolute -top-10 -left-10 w-52 h-52 bg-gradient-to-r from-primary-100 rounded-full -z-30"></div>
        {/* background dots */}
        <div className="absolute top-10 -left-10 w-24 -rotate-3 h-24 grid grid-cols-4 -z-20">
          <div className="w-1 h-1 bg-primary-300 rounded-full"></div>
          <div className="w-1 h-1 bg-primary-300 rounded-full"></div>
          <div className="w-1 h-1 bg-primary-300 rounded-full"></div>
          <div className="w-1 h-1 bg-primary-300 rounded-full"></div>
          <div className="w-1 h-1 bg-primary-300 rounded-full"></div>
          <div className="w-1 h-1 bg-primary-300 rounded-full"></div>
          <div className="w-1 h-1 bg-primary-300 rounded-full"></div>
          <div className="w-1 h-1 bg-primary-300 rounded-full"></div>
          <div className="w-1 h-1 bg-primary-300 rounded-full"></div>
          <div className="w-1 h-1 bg-primary-300 rounded-full"></div>
          <div className="w-1 h-1 bg-primary-300 rounded-full"></div>
          <div className="w-1 h-1 bg-primary-300 rounded-full"></div>
        </div>
        {/* background dots */}
        <div className="absolute top-32 right-10 w-24 rotate-3 h-24 grid grid-cols-4 -z-20">
          <div className="w-1 h-1 bg-primary-300 rounded-full"></div>
          <div className="w-1 h-1 bg-primary-300 rounded-full"></div>
          <div className="w-1 h-1 bg-primary-300 rounded-full"></div>
          <div className="w-1 h-1 bg-primary-300 rounded-full"></div>
          <div className="w-1 h-1 bg-primary-300 rounded-full"></div>
          <div className="w-1 h-1 bg-primary-300 rounded-full"></div>
          <div className="w-1 h-1 bg-primary-300 rounded-full"></div>
          <div className="w-1 h-1 bg-primary-300 rounded-full"></div>
          <div className="w-1 h-1 bg-primary-300 rounded-full"></div>
          <div className="w-1 h-1 bg-primary-300 rounded-full"></div>
          <div className="w-1 h-1 bg-primary-300 rounded-full"></div>
          <div className="w-1 h-1 bg-primary-300 rounded-full"></div>
        </div>
        {/* new post */}
        <div className="-rotate-3 flex justify-end items-center bg-white shadow-lg shadow-primary-200/80 rounded-lg xl:w-72 w-52 ms-auto xl:ms-0 px-3 py-3">
          {/* add button */}
          <div className="bg-primary-800 p-2 rounded-xl text-white">
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>
          {/* content */}
          <div className="flex flex-col gap-1 w-full items-end px-3">
            <p className="text-sm font-semibold">پست جدید</p>
            <span className="w-2/3 h-2 bg-secondary-200 rounded-md"></span>
            <span className="w-1/4 h-2 bg-secondary-200 rounded-md"></span>
            <span className="w-2/5 h-2 bg-secondary-200 rounded-md"></span>
          </div>
          {/* icon */}
          <div className="text-primary-600 bg-primary-100/60 p-[10px] rounded-lg w-fit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.7}
              stroke="currentColor"
              className="size-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
          </div>
        </div>
        {/* new comments */}
        <div className="rotate-3 flex justify-end gap-5 items-center bg-white shadow-lg shadow-primary-200/80 rounded-lg w-48 p-3 ms-auto -me-4 xl:me-5 mt-14">
          {/* content */}
          <p className="text-sm font-medium">۱۲ نظر جدید</p>
          {/* icon */}
          <div className="text-primary-700 bg-primary-100/60 p-[10px] rounded-lg w-fit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        {/* heart icon */}
        <div className="bg-white rounded-xl -rotate-6 p-[10px] shadow-lg shadow-primary-200/80 w-fit">
          <div className="text-primary-700 p-[4px] rounded-xl bg-primary-100/60">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
              <path
                fillRule="evenodd"
                d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        {/* today views */}
        <div className="-rotate-2 bg-white shadow-lg shadow-primary-200/80 rounded-2xl w-72 py-4 px-6 mt-8">
          {/* header */}
          <div className="flex justify-end items-center gap-2">
            {/* badge */}
            <div className="bg-green-200 text-green-600 text-xs px-3 py-1 rounded-full border border-green-200">
              ۱۲% +
            </div>
            {/* count */}
            <div className="flex flex-col items-end gap-1">
              <p className="text-xs font-medium text-secondary-400">
                بازدید امروز
              </p>
              <p className="text-2xl font-bold text-secondary-800">۲۵۹</p>
            </div>
          </div>
          {/* chart */}
          <svg viewBox="0 0 260 60" className="w-full h-16" fill="none">
            {/* area */}
            <path
              d="
      M4 50
      C4 50 32 24 60 24
      C82 24 92 44 112 44
      C138 44 146 14 170 14
      C194 14 206 36 224 36
      C242 37 232 25 255 2
      L254 70
      L4 70
      Z
    "
              fill="currentColor"
              opacity="0.12"
              className="text-primary-600"
            />

            {/* line */}
            <path
              d="
      M4 50
      C4 50 32 24 60 24
      C82 24 92 44 112 44
      C138 44 146 14 170 14
      C194 14 206 36 224 36
      C242 36 252 8 254 8
    "
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="text-primary-600"
            />

            {/* markers */}
            {[
              [4, 50],
              [60, 24],
              [112, 44],
              [170, 14],
              [224, 36],
              [254, 8],
            ].map(([cx, cy], index) => (
              <circle
                key={index}
                cx={cx}
                cy={cy}
                r="3.5"
                fill="currentColor"
                className="text-primary-600"
              />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FloatingDecorationDesktop;
