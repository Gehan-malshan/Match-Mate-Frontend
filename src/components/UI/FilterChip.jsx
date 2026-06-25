export default function FilterChip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-full font-label-sm text-label-sm whitespace-nowrap transition-all ${
        active
          ? "border border-primary/40 bg-primary/10 text-primary font-semibold"
          : "border border-white/10 hover:border-primary/40 text-on-surface-variant hover:text-on-surface"
      }`}
    >
      {label}
    </button>
  );
}