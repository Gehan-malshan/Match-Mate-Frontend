import { useState } from "react";
import AppNavbar from "../components/layout/AppNavbar";
import BottomNav from "../components/layout/BottomNav";
import FilterChip from "../components/UI/FilterChip";
import MemberCard from "../components/community/MemberCard";
import { members } from "../data/members";


const filters = ["All Members", "Mysterious", "Vibrant"];

export default function CommunityPage() {
  const [activeFilter, setActiveFilter] = useState("All Members");

  return (
    <div className="bg-background text-on-background min-h-screen">
      <AppNavbar />

      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-tertiary/5 blur-[120px] rounded-full" />
      </div>

      <main className="pt-32 pb-32 px-gutter max-w-container-max mx-auto relative z-10">
        <section className="mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-2xl">
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-[0.3em] block mb-4">The Directory</span>
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface leading-tight">
              Discovery through <span className="italic text-primary-fixed-dim">Anonymity.</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-6 max-w-lg">
              Browse the exclusive circle of souls awaiting their next chemistry encounter. Profiles remain veiled until sparks fly.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center md:justify-end">
            {filters.map((filter) => (
              <FilterChip key={filter} label={filter} active={activeFilter === filter} onClick={() => setActiveFilter(filter)} />
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {members.map((member) => (
            <MemberCard key={member.name} {...member} />
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <button className="group flex flex-col items-center gap-4">
            <span className="font-label-sm text-label-sm text-on-surface-variant group-hover:text-primary transition-colors uppercase tracking-[0.2em]">Seek further</span>
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary/50 group-hover:scale-110 transition-all">
              <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary">expand_more</span>
            </div>
          </button>
        </div>
      </main>

      <BottomNav active="Community" />
    </div>
  );
}
