import { Link } from "react-router-dom";

export default function MemberCard({ id, name, image, tags, variant = "primary" }) {
  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col items-center group">
      <div className="relative w-40 h-40 mb-6 rounded-full overflow-hidden border-2 border-primary/20 p-1 bg-surface-container">
        <img src={image} alt={name} className="w-full h-full object-cover rounded-full" />
      </div>
      <h3 className="font-headline-md text-headline-md text-on-surface mb-2">{name}</h3>
      <div className="flex gap-2 mb-8">
        {tags.map((tag) => (
          <span key={tag} className="px-3 py-1 rounded-full bg-on-tertiary-fixed-variant/20 border border-on-tertiary-fixed-variant/30 text-[10px] uppercase tracking-wider text-on-tertiary-fixed-variant">
            {tag}
          </span>
        ))}
      </div>
      <Link
        to={`/community/${id}`}
        className={
          variant === "primary"
            ? "w-full py-4 rounded-xl bg-primary-container text-on-primary-container font-label-sm text-label-sm flex items-center justify-center gap-2 active:scale-95 transition-transform"
            : "w-full py-4 rounded-xl border border-secondary text-secondary font-label-sm text-label-sm flex items-center justify-center gap-2 hover:bg-secondary/5 transition-all active:scale-95"
        }
      >
        View Profile <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
      </Link>
    </div>
  );
}