import React from "react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

const FileInput = ({
  label,
  name,
  dir = "rtl",
  value,
  onChange,
  className,
}) => {
  return (
    <label
      htmlFor="file-upload"
      className={`cursor-pointer border-2 border-primary-900 rounded-lg px-3 py-2 text-primary-900 flex items-center justify-center gap-x-2 ${className}`}
    >
      {label}
      <ArrowUpTrayIcon className="w5- h-5" />
      <input
        type="file"
        id="file-upload"
        className="sr-only"
        name={name}
        dir={dir}
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

export default FileInput;
