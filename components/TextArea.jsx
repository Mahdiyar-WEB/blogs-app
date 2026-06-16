"use client";
import { useRef } from "react";

const TextArea = ({ label, name, value, dir = "rtl", onChange }) => {
  const hasValue = Boolean(value);
  const textareaRef = useRef(null);

  return (
    <div className="relative group">
      <textarea
        name={name}
        id={name}
        ref={textareaRef}
        dir={dir}
        className={`textField__input min-h-[150px] leading-8 ${
          dir === "ltr" ? "text-left" : "text-right"
        }`}
        value={value}
        onChange={onChange}
      />
      <label
        onClick={() => textareaRef.current.focus()}
        htmlFor={name}
        className={`
          text-sm absolute font-semibold z-10 bg-white px-2
          transition-all duration-100 ease-in
          right-4 cursor-text
          ${
            hasValue
              ? "-top-3 text-primary-700"
              : "top-4 text-secondary-600 group-focus-within:-top-3 group-focus-within:text-primary-700"
          }
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default TextArea;
