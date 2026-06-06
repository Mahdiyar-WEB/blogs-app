"use client";

function TextField({
  type = "text",
  label,
  name,
  dir = "ltr",
  placeholder,
  icon,
  customIcon,
  register,
  hasError = false,
  ...rest
}) {
  const hasLeftIcon = !!icon || !!customIcon;

  return (
    <div>
      <label className="textField__label">{label}</label>
      <div className="relative">
        <input
          type={type}
          name={name}
          dir={dir}
          placeholder={placeholder}
          className={`${hasError ? "textField__input_error" : "textField__input"} ${hasLeftIcon ? "pl-10" : ""}`}
          {...register(name)}
          {...rest}
        />
        {customIcon ?? (icon && <span className="textField__icon">{icon}</span>)}
      </div>
    </div>
  );
}

export default TextField;