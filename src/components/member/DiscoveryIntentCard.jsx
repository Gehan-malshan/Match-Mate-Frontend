export default function DiscoveryIntentCard({ intent, note }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary-container to-on-primary-fixed-variant p-8 rounded-xl shadow-2xl">
      <div className="absolute top-0 right-0 opacity-10">
        <span className="material-symbols-outlined text-[120px]">favorite</span>
      </div>
      <h3 className="font-label-sm text-on-primary font-bold uppercase tracking-widest mb-4">Discovery Intent</h3>
      <p className="font-headline-md text-on-primary leading-tight">
        Searching for a <br />
        <span className="italic font-bold">{intent}</span>
      </p>
      <div className="mt-8 flex items-center gap-2 text-on-primary/80 font-body-md">
        <span className="material-symbols-outlined">auto_awesome</span>
        {note}
      </div>
    </div>
  );
}