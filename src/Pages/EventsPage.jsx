import { useState } from "react";
import AppNavbar from "../components/layout/AppNavbar";
import BottomNav from "../components/layout/BottomNav";
import FilterChip from "../components/UI/FilterChip";
import EventCard from "../components/event/EventCard";

const filters = ["All Events", "Masquerade", "Blind Dinner", "Secret Soiree"];

const events = [
  { title: "The Obsidian Gala", location: "Manhattan, NY", date: "Oct 24", time: "9:00 PM", badge: "Booking Open", badgeVariant: "primary", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAAgP5GVrL75kuzgsgD_eYESCi14pYZLgIRFvHapqocRNG-BDkI0jPAGbxTchcZNnq2GZWpILS9xZMmvioNajLWYHotZ0FadLYJXSzfDql1qdUanFsMWunAd_tpRlHVUZSkxJah2AdohojRv4QDugaT8oKbSYSky7M_6D_fliPtElYlJzwOmzAqsTLY3a_hBgudrUsESwZlbcvf6h6jehRBhJZggxfvLpi4GzTTUtiTO3vocXn88iKsPXHtQK4FEr9TmSaM2k-mtqs" },
  { title: "Midnight Mezcal", location: "Brooklyn, NY", date: "Oct 26", time: "10:30 PM", badge: "Limited Seats", badgeVariant: "secondary", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRCQ2BLHlcl43fE0ISpdjYXa0Hsdx6ljiqAUIQvowJ5IW3c7nKRMeZJnB-_B-ugbBUpVWuVT5omv9DpWXcqFvA2pSeKqm3o5pr1Kwb5lXoKUoQMSq_uw1g_e1Eq7WKXy8heyIlgfPrv3G6rrxVGZCcokLXw-rVW8hYJkEAygGOV-iHmPpaUf5f1CtENwKmStvZK-1R631UoPaPntj44nVfvRJXw-9bH0vw8AV9QlVUCxJOkyoycs8VfHbChg6-C8kbYt_ehQe-8oE" },
  { title: "Crimson Masquerade", location: "Chelsea, NY", date: "Oct 31", time: "8:00 PM", badge: "Booking Open", badgeVariant: "primary", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCuNDHqfI54hZmQWd4AhXg-SyQtSVNXOTAYq76R6CkfZNdyEU1K9csnOpNa14IU2Pghw-XJgGfRb0-936K6dSU_Hgr9UF1RVsKG30FZFE-i6Ng2r4p-61DxJ-tC98Utv1e9tBwmlvE7-_4eo-HnYDg7K-XtkiNegwjZL1hYwlMbFm8u73eZ2l5eij47Ldn0wiA1X7Lg_KOeOAqngJaRkHbcoIn56XIAaSMq4Q3YzNUA4NQyNMQa0I4unpkZn5pehawXObNo3YwI1EU" },
  { title: "Velvet Noir Dinner", location: "Tribeca, NY", date: "Nov 03", time: "7:30 PM", badge: "Waitlist Only", badgeVariant: "neutral", grayscale: true, ctaLabel: "Join Waitlist", ctaIcon: "lock_open", ctaVariant: "outline", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDW-l8ZNJmd-1gpdREbKSU1BNtTzl-3grjmk79VzmqPBgTZwk5EzWAm4FdmmZDzTzIQK-ZD8DWtpaayNf3yOzj2KN26EOsAj0HxgGTa0n2Db7Ys1mP29BSWBUXz4_uV1u3rqmoNVli-jFYD3CenbL2S4RtfS374DvM1GIwkIPKyCigwiLrMQvu7yl1EBtWGDzL3b64Q0UrG4Vz45jM0oSPNwbGZ872TGpxXTONDBkas3Rx56iZoRGsZuFzeRK4R0yRessZK-wM--J0" },
  { title: "The Silent Solstice", location: "SOHO, NY", date: "Nov 12", time: "6:00 PM", badge: "Booking Open", badgeVariant: "primary", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRNHYt94OyLIFXKYGn9MJBvdo1SAMdW2uwdP20f6aBJgQRdDLa5szeHSmcleRf_lGGT_Sq6w6F5yavrz1RmDDqcxvOnQyGc9_77kGC3ReaF5d4mKIb90n_U6AWJgj6lZPs0VZMEiCfU6ecQGEkLJuqbRP03dr4OCjoPDa3KtD4Sc_Z8U20wSo4bHQ6FQBsopcTEywpUs8_Aa8RQc2A6c1BNn38AVpJ-YmbtLx8J0Rzxu88d57qFcGH9WDdKgjHOqnLhbqSbwkTnaU" },
  { title: "Secret Roof Soiree", location: "Central Park South", date: "Nov 18", time: "11:00 PM", badge: "Limited Seats", badgeVariant: "secondary", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEpz3S92JIbDOaA-_1p1GXehbkT_-1-kzYruZWsiMAh87B0tqbc-cAf1cjZz7im31dm2MuuBdOsGy7O95mb1WjFPMJeCT3XbuDvYwm7ctx_wJdpXIqlGfCNS0SKOANVaK006ECGErHI8OjUpK0x3I-dA9BWMpgwY9zOiHhN7BY5wk5i0bDRmtLPOGiIC1bXUxbKzBgU1pXozgUZ6Qc8ntOrTX8dHHCJy2JwMzUMomnbdR57gczMeTdVjNDvnc-vQzZQi7ITQl4lAo" },
];

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState("All Events");

  return (
    <div className="bg-background text-on-background font-body-md selection:bg-primary-container selection:text-on-primary-container overflow-x-hidden antialiased min-h-screen">
      <AppNavbar />

      <main className="pt-20">
        <section className="relative hero-gradient pt-16 pb-12 px-margin-mobile md:px-margin-desktop">
          <div className="max-w-container-max mx-auto text-center md:text-left">
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest mb-4 block">— Exclusive Discoveries</span>
            <h1 className="font-display-lg text-display-lg mb-6 leading-tight">
              Available <span className="text-gradient italic">Encounters</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mx-auto md:mx-0 opacity-80">
              Step into the unknown. Discover your next connection through curated experiences where anonymity fuels a deeper attraction.
            </p>
          </div>
        </section>

        <section className="sticky top-[65px] z-40 bg-background/90 backdrop-blur-md border-b border-white/5 px-margin-mobile md:px-margin-desktop py-4">
          <div className="max-w-container-max mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-3 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              {filters.map((filter) => (
                <FilterChip key={filter} label={filter} active={activeFilter === filter} onClick={() => setActiveFilter(filter)} />
              ))}
            </div>

            <div className="relative w-full md:w-64">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">calendar_today</span>
              <select className="w-full bg-surface-container-low border border-white/5 rounded-full pl-10 pr-10 py-2 text-on-surface-variant focus:ring-1 focus:ring-primary/50 font-body-md text-sm appearance-none cursor-pointer">
                <option>This Weekend</option>
                <option>Next 7 Days</option>
                <option>Monthly View</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
            </div>
          </div>
        </section>

        <section className="px-margin-mobile md:px-margin-desktop py-12">
          <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {events.map((event) => (
              <EventCard key={event.title} {...event} />
            ))}
          </div>
        </section>

        <section className="py-32 px-margin-mobile md:px-margin-desktop relative overflow-hidden border-t border-white/5">
          <div className="absolute inset-0 z-0">
            <div className="bg-primary/5 blur-[120px] rounded-full absolute -top-24 -right-24 w-[500px] h-[500px]" />
            <div className="bg-primary/5 blur-[120px] rounded-full absolute -bottom-24 -left-24 w-[500px] h-[500px]" />
          </div>
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest mb-4 block">Begin Your Story</span>
            <h2 className="font-headline-lg text-headline-lg mb-6 leading-tight">Never miss a <span className="text-gradient italic">secret.</span></h2>
            <p className="font-body-md text-on-surface-variant mb-10 opacity-70">
              Join our inner circle to receive private invitations to unlisted encounters and priority access to limited events.
            </p>
            <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
              <input type="email" placeholder="Your secret handle (Email)" className="flex-1 bg-surface-container-low border border-white/10 rounded-full px-6 py-4 focus:ring-1 focus:ring-primary/50 text-on-surface placeholder:text-on-surface-variant/40" />
              <button className="bg-primary-container text-on-primary-container font-label-sm text-label-sm font-bold px-8 py-4 rounded-full hover:opacity-90 transition-all shadow-[0_0_20px_rgba(248,55,224,0.3)]">
                Request Access
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Reuse your existing Footer component here — e.g. <Footer /> */}

      <BottomNav active="Events" />
    </div>
  );
}
