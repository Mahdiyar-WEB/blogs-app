"use client";

function TextField({
  type = "text",
  label,
  name,
  dir = "ltr",
  min = "1",
  max = "100",
  placeholder,
  icon,
  customIcon,
  hasError = false,
  value,
  onChange,
  onBlur,
  inputRef,
  ...rest
}) {
  const hasLeftIcon = !!icon || !!customIcon;

  return (
    <div>
      <label className="textField__label">{label}</label>
      <div className="relative">
        <input
          type={type}
          min={min}
          max={max}
          name={name}
          dir={dir}
          placeholder={placeholder}
          value={value ?? ""}
          onChange={onChange}
          onBlur={onBlur}
          ref={inputRef}
          className={`${hasError ? "textField__input_error" : "textField__input"} ${hasLeftIcon ? "pl-10" : ""}`}
          {...rest}
        />
        {customIcon ??
          (icon && <span className="textField__icon">{icon}</span>)}
      </div>
    </div>
  );
}

export default TextField;