import { Fragment } from "react";

const stats = [
  { value: "2300+", label: "Members" },
  { value: "43", label: "Events Held" },
  { value: "90%", label: "Match satisfaction" },
];

export default function TrustStats() {
  return (
    <section className="relative z-20 -mt-10 px-margin-mobile md:px-margin-desktop mb-24">
      <div className="max-w-container-max mx-auto">
        <div className="glass-panel rounded-2xl p-8 flex flex-col md:flex-row justify-around items-center gap-8 border border-white/5 shadow-xl">
          {stats.map((stat, i) => (
            <Fragment key={stat.label}>
              <div className="text-center">
                <h3 className="font-headline-md text-headline-md text-primary mb-2">{stat.value}</h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">{stat.label}</p>
              </div>
              {i < stats.length - 1 && <div className="hidden md:block w-px h-16 bg-white/10" />}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}