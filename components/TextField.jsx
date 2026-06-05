function TextField({
  type = "text",
  label,
  name,
  value,
  dir = "rtl",
  onChange,
  required = false,
  className,
  placeholder,
  haveIcon = false,
  icon,
  customIcon,
}) {
  return (
    <div>
      <label className="textField__label">{label}</label>
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          dir={dir}
          className={`textField__input pl-10 ${className ?? ""}`}
        />
        {haveIcon && !customIcon && (
          <span className="textField__icon">{icon ?? "icon"}</span>
        )}
        {customIcon}
      </div>
    </div>
  );
}

export default TextField;
