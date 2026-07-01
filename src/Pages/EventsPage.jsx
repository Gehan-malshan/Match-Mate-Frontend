import { useEffect, useState } from "react";
import AppNavbar from "../components/layout/AppNavbar";
import BottomNav from "../components/layout/BottomNav";
import FilterChip from "../components/UI/FilterChip";
import EventCard from "../components/event/EventCard";
import { getEvents, getEventsByType, searchEvents } from "../api/events";
import { extractErrorMessage } from "../api/client";
import { mapEventToCard } from "../utils/eventMapper";
import { getMockEvents } from "../data/Events";

// Map UI filter labels to backend EventType values (All = no filter).
const filters = [
  { label: "All Events", type: null },
  { label: "Speed Dating", type: "SPEED_DATING" },
  { label: "Group Dating", type: "GROUP_DATING" },
  { label: "Dinner Night", type: "DINNER_NIGHT" },
  { label: "Adventure Date", type: "ADVENTURE_DATE" },
];

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState("All Events");
  const [searchInput, setSearchInput] = useState("");
  const [keyword, setKeyword] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError("");
      try {
        let page;
        if (keyword.trim()) {
          page = await searchEvents(keyword.trim());
        } else {
          const filter = filters.find((f) => f.label === activeFilter);
          page = filter?.type
            ? await getEventsByType(filter.type)
            : await getEvents();
        }
        if (!cancelled) {
          setEvents(page?.content ?? []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(extractErrorMessage(err, "Unable to load events right now."));
          setEvents([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [activeFilter, keyword]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setKeyword(searchInput);
  };

  const visibleEvents = (() => {
    if (!error) return events;

    const source = getMockEvents();
    const filteredByType =
      activeFilter === "All Events"
        ? source
        : source.filter((event) => {
            const filter = filters.find((item) => item.label === activeFilter);
            return filter?.type ? event.eventType === filter.type : true;
          });

    if (!keyword.trim()) return filteredByType;

    const query = keyword.trim().toLowerCase();
    return filteredByType.filter((event) => {
      return [event.eventName, event.location, event.description, event.eventType]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query));
    });
  })();

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
                <FilterChip
                  key={filter.label}
                  label={filter.label}
                  active={activeFilter === filter.label && !keyword}
                  onClick={() => {
                    setKeyword("");
                    setSearchInput("");
                    setActiveFilter(filter.label);
                  }}
                />
              ))}
            </div>

            <form onSubmit={handleSearchSubmit} className="relative w-full md:w-72">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search encounters..."
                className="w-full bg-surface-container-low border border-white/5 rounded-full pl-10 pr-4 py-2 text-on-surface placeholder:text-on-surface-variant/60 focus:ring-1 focus:ring-primary/50 font-body-md text-sm"
              />
            </form>
          </div>
        </section>

        <section className="px-margin-mobile md:px-margin-desktop py-12">
          <div className="max-w-container-max mx-auto">
            {loading ? (
              <p className="text-center text-on-surface-variant py-20 font-body-md">Loading encounters...</p>
            ) : visibleEvents.length === 0 ? (
              <p className="text-center text-on-surface-variant py-20 font-body-md">
                No encounters found{keyword ? ` for "${keyword}"` : ""}.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
                {visibleEvents.map((event) => (
                  <EventCard key={event.eventId} {...mapEventToCard(event)} />
                ))}
              </div>
            )}
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

      <BottomNav active="Events" />
    </div>
  );
}
