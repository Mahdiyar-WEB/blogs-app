"use client";
import React, { useEffect, useRef } from "react";

const Modal = ({
  children,
  title = "title",
  description = "description",
  open = false,
  onClose,
}) => {
  const modalRef = useRef();

  useEffect(() => {
    const onClickHandler = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("click", onClickHandler, true);

    return () => document.removeEventListener("click", onClickHandler, true);
  }, [onClose]);

  return (
    open && (
      <div className="fixed bg-secondary-700/80 top-0 left-0 w-full h-full z-20">
        {/* container */}
        <div
          ref={modalRef}
          className="absolute top-1/2 left-1/2 border -translate-x-1/2 -translate-y-1/2 w-1/2 bg-white rounded-md"
        >
          {/* header */}
          <div className="flex  justify-between items-start p-3">
            {/* title & description */}
            <div className="space-y-1">
              <p className="font-semibold">{title}</p>
              <p className="font-medium text-sm">{description}</p>
            </div>
            <button onClick={onClose}>
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
            </button>
          </div>
          <hr className="mx-3 bg-secondary-700/20" />
          {/* content */}
          <div className="p-5">{children}</div>
        </div>
      </div>
    )
  );
};

export default Modal;
