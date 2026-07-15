import React from "react";

const PostsLoading = () => {
  return (
    <div className="grid grid-cols-12 gap-5 animate-pulse">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="col-span-12 md:col-span-6 lg:col-span-4 border rounded-lg shadow-md"
        >
          <div className="w-full h-56 bg-secondary-300 rounded-t-lg overflow-hidden" />
          <div className="w-28 h-6 rounded-lg mt-5 bg-secondary-300 ms-2 me-auto" />
          <div className="flex justify-between items-center px-3 mt-5">
            <div className="flex gap-2 items-center">
              <span className="w-8 h-8 rounded-full bg-secondary-300" />
              <span className="w-28 h-6 rounded-lg bg-secondary-300" />
            </div>
            <div className="w-28 h-6 bg-secondary-300 rounded-lg" />
          </div>
          <div className="flex justify-between items-center px-3 mt-7 mb-4">
            <div className="h-8 w-24 rounded-md bg-secondary-300" />
            <div className="flex gap-2">
              <span className="w-8 h-8 bg-secondary-300 rounded-lg" />
              <span className="w-8 h-8 bg-secondary-300 rounded-lg" />
              <span className="w-8 h-8 bg-secondary-300 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostsLoading;
