import { useState, useRef, useEffect } from "react";

const Select = ({ value, onChange, options }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const handleSelect = (val) => {
    onChange({ target: { value: val } });
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full h-full px-3 text-left text-sm rounded-md text-secondary-500 bg-secondary-50/20 flex justify-between items-center"
      >
        <span className="font-medium text-xs md:text-sm">{selected?.label}</span>
        <span
          className={`${open && "rotate-180"} transition-all duration-200 ease-out`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </span>
      </button>

      {open && (
        <ul className="absolute z-50 mt-2 w-full bg-white rounded-md border border-secondary-200 shadow-md max-h-48 overflow-y-auto ">
          {options.map((item) => (
            <li
              key={item.value}
              onClick={() => handleSelect(item.value)}
              className={`
                px-3 py-2 text-sm cursor-pointer
                hover:bg-secondary-100/50 hover:text-primary-800
                ${item.value === value ? "bg-secondary-100/50 text-primary-700 font-medium" : ""}
              `}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
