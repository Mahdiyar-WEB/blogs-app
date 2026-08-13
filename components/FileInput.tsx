import React, { ComponentProps } from "react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

const FileInput = ({
  label,
  name,
  id = "file-upload",
  dir = "rtl",
  onChange,
  className,
}: ComponentProps<"input"> & { label: string }) => {
  return (
    <label
      htmlFor={id}
      className={`cursor-pointer border-2 border-primary-900 rounded-lg px-3 py-2 text-primary-900 flex items-center justify-center gap-x-2 ${className}`}
    >
      {label}

      <ArrowUpTrayIcon className="w-5 h-5" />

      <input
        type="file"
        id={id}
        className="sr-only"
        name={name}
        dir={dir}
        onChange={onChange}
      />
    </label>
  );
};

export default FileInput;
