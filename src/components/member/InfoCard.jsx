export default function InfoCard({ icon, label, value }) {
  return (
    <div className="glass-card p-8 rounded-xl border-l-4 border-primary/40">
      <div className="flex items-start gap-4">
        <span className="material-symbols-outlined text-primary p-2 bg-primary/10 rounded-lg">{icon}</span>
        <div>
          <p className="font-label-sm text-primary/60 uppercase tracking-tighter">{label}</p>
          <p className="font-headline-md text-on-surface">{value}</p>
        </div>
      </div>
    </div>
  );
}