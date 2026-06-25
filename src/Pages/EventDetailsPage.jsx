// src/pages/EventDetailPage.jsx

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { getEventById } from "../data/Event";


const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const heroBgRef = useRef(null);
  const event = getEventById(id);

  // Parallax scroll effect on hero image
  useEffect(() => {
    const handleScroll = () => {
      if (heroBgRef.current) {
        const scrolled = window.pageYOffset;
        heroBgRef.current.style.transform = `translateY(${scrolled * 0.15}px) scale(1.05)`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-on-surface-variant">
        <span className="material-symbols-outlined text-primary text-6xl">
          event_busy
        </span>
        <h2 className="font-headline-md text-headline-md text-on-background">
          Event not found
        </h2>
        <button
          onClick={() => navigate("/events")}
          className="text-primary font-label-sm text-label-sm uppercase tracking-widest hover:opacity-70 transition-opacity flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Back to Events
        </button>
      </div>
    );
  }

  const statusColors = {
    open: "text-primary",
    waitlist: "text-yellow-400",
    closed: "text-on-surface-variant",
  };

  return (
    <div className="bg-background text-on-background font-body-md antialiased overflow-x-hidden">
      {/* Grain overlay */}
      <div
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999] opacity-[0.03]"
        style={{
          backgroundImage: `url(https://lh3.googleusercontent.com/aida-public/AB6AXuDo1Am-TM_6vvI3G1-v5F8objH6ipuaMWQJ_fZu822IHUYnNQEDStFXsbEvvhQly3RRg_PCRFl4291XCouIzaKm5bVUXdrSROPHf87TYdQ6OtL1BLF2r9gaWsmAtj3N9JGzC6TLSp71_xc8ZrbsRo1O6qVCH9M6y6h5TRb8fSyPmxeeBXbw7BoiAqfAObkEfXWhv7NJSOY0hNgIBNjXDuWWkI9dqIFQZ80-6moPqPgE_cV65PYpCLaBxTYH2FrwTVHWmverinfZPiA)`,
        }}
      />

      <main className="pt-16 pb-24 md:pb-12">
        {/* ── Hero Section ── */}
        <section className="relative h-[614px] md:h-[768px] w-full overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div
              ref={heroBgRef}
              className="bg-cover bg-center w-full h-full opacity-50 scale-105"
              style={{ backgroundImage: `url('${event.heroImage}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          </div>

          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-6 left-6 z-20 glass-panel px-4 py-2 rounded-full flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label-sm text-label-sm"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Back
          </button>

          <div className="relative z-20 h-full flex flex-col justify-end px-5 md:px-16 pb-12 max-w-[1200px] mx-auto">
            {/* Tags */}
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="bg-primary/10 border border-primary/20 px-4 py-1 rounded-full font-label-sm text-label-sm text-primary uppercase tracking-widest">
                {event.category}
              </span>
              <span className="bg-secondary/10 border border-secondary/20 px-4 py-1 rounded-full font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                {event.status}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display-lg text-[32px] md:text-[64px] leading-tight mb-4">
              <span
                className="italic"
                style={{
                  background: "linear-gradient(to right, #fface9, #f837e0)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {event.title}
              </span>
            </h1>

            {/* Meta */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 text-on-surface-variant">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  calendar_today
                </span>
                <span className="font-label-sm text-label-sm">{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  schedule
                </span>
                <span className="font-label-sm text-label-sm">{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  location_on
                </span>
                <span className="font-label-sm text-label-sm">{event.location}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Content Grid ── */}
        <div className="max-w-[1200px] mx-auto px-5 md:px-16 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* ── Left Column ── */}
          <div className="lg:col-span-8 space-y-16">
            {/* Description */}
            <section>
              <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest mb-4 block">
                — About the Encounter
              </span>
              <div className="space-y-4 text-on-surface-variant font-body-lg text-body-lg leading-relaxed">
                {event.description.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </section>

            {/* Features */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {event.features.map((feature, i) => (
                <div
                  key={i}
                  className="glass-panel p-8 rounded-2xl relative overflow-hidden group hover:border-primary/30 transition-all"
                >
                  <div className="bg-primary/10 p-3 rounded-lg w-fit mb-6">
                    <span className="material-symbols-outlined text-primary text-3xl">
                      {feature.icon}
                    </span>
                  </div>
                  <h4 className="font-headline-md text-2xl text-on-background mb-4">
                    {feature.title}
                  </h4>
                  <p className="font-body-md text-body-md text-on-surface-variant text-sm">
                    {feature.description}
                  </p>
                </div>
              ))}
            </section>

            {/* Location Map */}
            <section className="space-y-6">
              <div className="flex justify-between items-end">
                <h2 className="font-headline-md text-headline-md text-on-background">
                  Location Details
                </h2>
                <span className="font-label-sm text-label-sm text-primary mb-1">
                  {event.coordinates}
                </span>
              </div>
              <div className="h-64 md:h-80 w-full rounded-2xl overflow-hidden relative glass-panel group">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700"
                  style={{ backgroundImage: `url('${event.mapImage}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 flex items-center gap-4 glass-panel p-4 rounded-xl border border-white/10">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">
                      near_me
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-on-surface">{event.location}</p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">
                      {event.venueNote}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* ── Right Column: Sticky Booking Card ── */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
            {/* Main Booking Card */}
            <div className="glass-panel p-8 rounded-2xl space-y-8 relative overflow-hidden border border-primary/20 shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -mr-16 -mt-16" />

              {/* Price & Seats */}
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-1">
                    Entry Ticket
                  </p>
                  <h3 className="font-headline-md text-[32px] text-on-background">
                    ${event.price}
                    <span className="text-body-md text-on-surface-variant ml-2 font-body-md italic text-base">
                      / person
                    </span>
                  </h3>
                </div>
                {event.seatsLeft > 0 ? (
                  <div className="bg-primary/20 text-primary px-3 py-1 rounded font-label-sm text-label-sm font-bold">
                    {event.seatsLeft} seats left
                  </div>
                ) : (
                  <div className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded font-label-sm text-label-sm font-bold">
                    Waitlist
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-on-surface-variant font-body-md">
                    Total Capacity
                  </span>
                  <span className="text-on-surface font-bold">
                    {event.totalCapacity} Guests
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-on-surface-variant font-body-md">
                    Gender Ratio
                  </span>
                  <span className="text-on-surface font-bold">
                    {event.genderRatio}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-on-surface-variant font-body-md">
                    Status
                  </span>
                  <span className={`font-bold ${statusColors[event.statusType]}`}>
                    {event.status}
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="space-y-4 pt-4">
                <button
                  disabled={event.statusType === "closed"}
                  className="w-full bg-primary-container text-on-primary-container py-4 rounded-full font-bold font-label-sm text-label-sm uppercase tracking-wider flex justify-center items-center gap-3 hover:opacity-90 transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(248,55,224,0.3)] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {event.statusType === "waitlist"
                    ? "Join the Waitlist"
                    : event.statusType === "closed"
                    ? "Event Sold Out"
                    : "Book Your Secret Ticket"}
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    arrow_forward
                  </span>
                </button>
                <p className="text-center text-[10px] text-on-surface-variant px-4 uppercase tracking-tighter">
                  By booking, you agree to our anonymity protocol and dress code
                  requirements.
                </p>
              </div>

              {/* Host Info */}
              <div className="pt-8 border-t border-white/5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-primary/30 flex-shrink-0">
                  <img
                    src={event.hostImage}
                    alt={event.hostName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    Hosted by
                  </p>
                  <p className="font-bold text-on-background">{event.hostName}</p>
                </div>
                <button className="ml-auto glass-panel p-2 rounded-full hover:bg-primary/20 transition-colors border border-white/10">
                  <span className="material-symbols-outlined text-primary text-xl">
                    forum
                  </span>
                </button>
              </div>
            </div>

            {/* Preparation Card */}
            <div className="mt-6 glass-panel p-6 rounded-2xl border border-dashed border-white/20">
              <h4 className="font-headline-md text-xl mb-3 italic text-primary">
                Preparation
              </h4>
              <ul className="space-y-3">
                {event.preparation.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-3 font-label-sm text-label-sm text-on-surface-variant"
                  >
                    <span
                      className="material-symbols-outlined text-secondary text-sm flex-shrink-0 mt-0.5"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default EventDetailPage;
