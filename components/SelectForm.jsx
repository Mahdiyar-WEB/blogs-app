function SelectForm({
  label,
  name,
  register,
  hasError = false,
  icon,
  options = [],
}) {
  return (
    <div>
      <label className="textField__label">{label}</label>

      <div className="relative">
        <select
          {...register(name)}
          id={name}
          className={`${
            hasError ? "textField__input_error" : "textField__input"
          } appearance-none`}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

        {icon && (
          <span className="textField__icon">
            {icon}
          </span>
        )}
      </div>
    </div>
  );
}

export default SelectForm;