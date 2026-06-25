export default function UnderlineField({ label, name, type = "text", value, onChange, placeholder, options, uppercase = true }) {
  const baseClasses =
    "w-full bg-transparent border-0 border-b border-outline-variant py-2 text-on-surface placeholder:text-on-surface-variant/40 focus:border-primary focus:ring-0 transition-colors outline-none";

  return (
    <div>
      <label className={`block font-label-sm text-label-sm text-outline mb-2 ${uppercase ? "uppercase tracking-wider mb-3" : ""}`}>
        {label}
      </label>
      {type === "select" ? (
        <select name={name} value={value} onChange={onChange} className={`${baseClasses} appearance-none cursor-pointer`}>
          {options.map((opt) => (
            <option key={opt} value={opt} className="bg-surface-container">{opt}</option>
          ))}
        </select>
      ) : (
        <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} className={baseClasses} />
      )}
    </div>
  );
}