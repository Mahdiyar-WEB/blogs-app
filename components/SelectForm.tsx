import { ComponentProps, ForwardedRef, ReactNode } from "react";

type Props = {
  label: string;
  hasError: boolean;
  icon: ReactNode;
  options: { value: string; label: string }[];
  inputRef: ForwardedRef<HTMLSelectElement>;
} & ComponentProps<"select">;

function SelectForm({
  label,
  name,
  hasError = false,
  icon,
  options,
  value,
  onChange,
  onBlur,
  inputRef,
}: Props) {
  return (
    <div>
      <label className="textField__label">{label}</label>

      <div className="relative">
        <select
          id={name}
          name={name}
          value={value ?? ""}
          onChange={onChange}
          onBlur={onBlur}
          ref={inputRef}
          className={`${
            hasError ? "textField__input_error" : "textField__input"
          } appearance-none`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {icon && <span className="textField__icon">{icon}</span>}
      </div>
    </div>
  );
}

export default SelectForm;
