import React from "react";

const Card = ({ title, icon, content }) => {
  return (
    <div className="col-span-12 md:col-span-6 xl:col-span-4 px-6 py-4 space-y-5 border rounded-lg bg-secondary-0">
      {/* title */}
      <p className="flex gap-2 items-center font-semibold">
        <span>{icon}</span>
        <span>{title}</span>
      </p>
      {/* content */}
      <div className="flex items-center justify-center py-10 rounded-lg border bg-secondary-50">
        {content}
      </div>
    </div>
  );
};

export default Card;
