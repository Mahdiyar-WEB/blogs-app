function SelectForm({
  label,
  name,
  register,
  hasError = false,
  hasLeftIcon = false,
  customIcon = false,
  icon,
  options = [],
  setValue,
  value
}) {
  return (
    <div>
      <label className="textField__label">{label}</label>
      <div className="relative">
        <select
          {...register(name)}
          value={value || ''}
          onChange={(e) =>
            setValue(name, e.target.value, { shouldValidate: true })
          }
          id={name}
          className={`${hasError ? "textField__input_error" : "textField__input"} appearance-none ${hasLeftIcon ? "pl-10" : ""}`}
        >
          {options.map((option) => (
            <option
              className={`hover:bg-secondary-100/50 hover:text-primary-800 font-medium`}
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
        {customIcon ??
          (icon && <span className="textField__icon">{icon}</span>)}
      </div>
    </div>
  );
}
export default SelectForm;
