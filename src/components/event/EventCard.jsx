const badgeClasses = {
  primary: "bg-primary/20 border border-primary/30 text-primary",
  secondary: "bg-secondary-container/40 border border-secondary-container/60 text-on-secondary-container",
  neutral: "bg-surface-container-highest border border-white/10 text-on-surface-variant",
};

export default function EventCard({
  image, badge, badgeVariant = "primary", location, title, date, time,
  ctaLabel = "Step Inside", ctaIcon = "arrow_forward", ctaVariant = "primary", grayscale = false,
}) {
  return (
    <div className={`group relative overflow-hidden rounded-2xl glass-panel transition-all duration-500 hover:border-primary/30 flex flex-col h-[520px] ${grayscale ? "opacity-90 grayscale hover:grayscale-0" : ""}`}>
      <div className="absolute inset-0 z-0">
        <div
          className={`w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105 ${grayscale ? "opacity-60" : "opacity-80"}`}
          style={{ backgroundImage: `url('${image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      <div className="relative z-10 p-8 mt-auto">
        <div className="flex justify-between items-start mb-4">
          <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold ${badgeClasses[badgeVariant]}`}>
            {badge}
          </span>
          <span className="text-on-surface-variant text-xs flex items-center gap-1 font-semibold">
            <span className="material-symbols-outlined text-sm">location_on</span> {location}
          </span>
        </div>
        <h3 className="font-headline-md text-headline-md mb-2 leading-tight">{title}</h3>
        <div className="flex items-center gap-4 text-on-surface-variant text-sm mb-6 opacity-80">
          <span className="flex items-center gap-1"><span className="material-symbols-outlined text-base">calendar_today</span> {date}</span>
          <span className="flex items-center gap-1"><span className="material-symbols-outlined text-base">schedule</span> {time}</span>
        </div>
        <button
          className={
            ctaVariant === "primary"
              ? "w-full py-4 bg-primary-container text-on-primary-container font-label-sm text-label-sm rounded-full flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.98] shadow-[0_0_20px_rgba(248,55,224,0.2)]"
              : "w-full py-4 border border-primary text-primary font-label-sm text-label-sm rounded-full flex items-center justify-center gap-2 transition-all hover:bg-primary/10 active:scale-[0.98]"
          }
        >
          {ctaLabel}{" "}
          <span className="material-symbols-outlined text-base" style={ctaVariant === "primary" ? { fontVariationSettings: "'FILL' 1" } : {}}>
            {ctaIcon}
          </span>
        </button>
      </div>
    </div>
  );
}