export default function Button({ children, variant = "primary", icon, href = "#", className = "" }) {
  const base =
    "font-label-sm text-label-sm px-8 py-4 rounded-full inline-flex items-center gap-2 transition-all";

  const variants = {
    primary:
      "bg-primary-container text-on-primary-container hover:opacity-90 shadow-[0_0_20px_rgba(248,55,224,0.3)]",
    outlinePrimary: "border border-primary text-primary hover:bg-primary/10",
    outline: "border border-outline text-on-background hover:bg-white/5",
  };

  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
      {icon && (
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
          {icon}
        </span>
      )}
    </a>
  );
}