import React from "react";

const cardTone = {
  primary: "bg-primary-50 text-primary-700 ring-primary-100",
  success: "bg-green-50 text-green-700 ring-green-100",
  warning: "bg-amber-50 text-amber-700 ring-amber-100",
};

function CardIcon({ children, tone = "primary" }) {
  return (
    <div
      className={`
        flex h-12 w-12 items-center justify-center rounded-2xl ring-1
        ${cardTone[tone] ?? cardTone.primary}
      `}
    >
      {children}
    </div>
  );
}

const Card = ({ title, icon, content, description, tone = "primary" }) => {
  return (
    <div
      className=" col-span-12 md:col-span-6 xl:col-span-4 rounded-2xl border border-secondary-200 bg-white p-5 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-100 hover:shadow-lg hover:shadow-secondary-200/70"
    >
      <div className="flex items-center justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <CardIcon tone={tone}>{icon}</CardIcon>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-secondary-600">
              {title}
            </p>
            {description && (
              <p className="mt-1 truncate text-xs text-secondary-400">
                {description}
              </p>
            )}
          </div>
        </div>

        <button
          type="button"
          aria-label="گزینه های کارت"
          className="
            text-secondary-400
            hover:text-secondary-700
            transition-colors
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm6 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm6 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </button>
      </div>

      <div className="mt-6">
        <h3
          className="
            text-3xl
            font-bold
            tracking-tight
            text-secondary-900
          "
        >
          {content}
        </h3>
      </div>
    </div>
  );
};


export default Card;
