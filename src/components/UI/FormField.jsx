export default function FormField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  options,
  hint,
  labelAction,
}) {
  return (
    <div className="group">
      {labelAction ? (
        <div className="mb-3 flex items-center justify-between gap-4">
          <label
            htmlFor={name}
            className="block font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant transition-colors group-focus-within:text-primary"
          >
            {label}
          </label>
          {labelAction}
        </div>
      ) : (
        <label
          htmlFor={name}
          className="mb-3 block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant transition-colors group-focus-within:text-primary"
        >
          {label}
        </label>
      )}

      {options ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="h-14 w-full rounded border border-outline-variant bg-surface-container-low px-5 font-body-md text-body-md text-on-background outline-none transition-colors focus:border-primary"
        >
          {options.map((option) => (
            <option key={option.value ?? option} value={option.value ?? option}>
              {option.label ?? option}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="h-14 w-full rounded border border-outline-variant bg-surface-container-low px-5 font-body-md text-body-md text-on-background outline-none transition-colors placeholder:text-on-surface-variant focus:border-primary"
        />
      )}

      {hint && <p className="mt-2 font-body-md text-sm text-on-surface-variant/70">{hint}</p>}
    </div>
  );
}
