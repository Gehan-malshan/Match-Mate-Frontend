// src/pages/EventDetailPage.jsx

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getEventById } from "../api/events";
import { extractErrorMessage } from "../api/client";
import { useAuth } from "../context/AuthContext";
import { startBookingAndPayment } from "../utils/paymentFlow";
import {
  FALLBACK_IMAGE,
  deriveStatus,
  formatEventDate,
  formatEventTime,
  prettifyType,
} from "../utils/eventMapper";

const statusColors = {
  open: "text-primary",
  waitlist: "text-yellow-400",
  closed: "text-on-surface-variant",
};

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const heroBgRef = useRef(null);
  const { isAuthenticated, user } = useAuth();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [booking, setBooking] = useState(false);
  const [bookingMessage, setBookingMessage] = useState("");
  const [bookingError, setBookingError] = useState("");

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

  useEffect(() => {
    window.scrollTo(0, 0);
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getEventById(id);
        if (!cancelled) setEvent(data);
      } catch (err) {
        if (!cancelled) setError(extractErrorMessage(err, "Event not found"));
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleBooking = async () => {
    setBookingError("");
    setBookingMessage("");

    if (!isAuthenticated) {
      navigate("/login", { state: { from: { pathname: `/events/${id}` } } });
      return;
    }

    setBooking(true);
    try {
      const result = await startBookingAndPayment({
        event,
        user,
        onStatus: (msg) => setBookingMessage(msg),
      });
      setBookingMessage(
        result.confirmed
          ? "Booking confirmed! Your seat is secured."
          : "Payment received. Your booking will be confirmed shortly."
      );
      // Refresh seat availability after a successful booking.
      try {
        const refreshed = await getEventById(id);
        setEvent(refreshed);
      } catch {
        /* non-critical */
      }
    } catch (err) {
      setBookingError(extractErrorMessage(err, "Booking could not be completed."));
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-on-surface-variant">
        <span className="material-symbols-outlined text-primary text-5xl animate-pulse">hourglass_top</span>
        <p className="font-body-md">Unveiling the encounter...</p>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-on-surface-variant">
        <span className="material-symbols-outlined text-primary text-6xl">event_busy</span>
        <h2 className="font-headline-md text-headline-md text-on-background">
          {error || "Event not found"}
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

  const status = deriveStatus(event);
  const heroImage = event.imageUrl || FALLBACK_IMAGE;
  const descriptionParas = (event.description || "")
    .split(/\n+/)
    .filter((p) => p.trim().length > 0);
  const coordinates =
    event.latitude != null && event.longitude != null
      ? `${event.latitude.toFixed(4)}, ${event.longitude.toFixed(4)}`
      : "Location coordinates unavailable";
  const genderRatio =
    event.maleLimit || event.femaleLimit
      ? `${event.maleLimit ?? 0}M / ${event.femaleLimit ?? 0}F`
      : "Balanced";

  return (
    <div className="bg-background text-on-background font-body-md antialiased overflow-x-hidden">
      <main className="pt-16 pb-24 md:pb-12">
        {/* Hero */}
        <section className="relative h-[614px] md:h-[768px] w-full overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div
              ref={heroBgRef}
              className="bg-cover bg-center w-full h-full opacity-50 scale-105"
              style={{ backgroundImage: `url('${heroImage}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          </div>

          <button
            onClick={() => navigate(-1)}
            className="absolute top-6 left-6 z-20 glass-panel px-4 py-2 rounded-full flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label-sm text-label-sm"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Back
          </button>

          <div className="relative z-20 h-full flex flex-col justify-end px-5 md:px-16 pb-12 max-w-[1200px] mx-auto">
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="bg-primary/10 border border-primary/20 px-4 py-1 rounded-full font-label-sm text-label-sm text-primary uppercase tracking-widest">
                {prettifyType(event.eventType)}
              </span>
              <span className="bg-secondary/10 border border-secondary/20 px-4 py-1 rounded-full font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                {status.label}
              </span>
            </div>

            <h1 className="font-display-lg text-[32px] md:text-[64px] leading-tight mb-4">
              <span
                className="italic"
                style={{
                  background: "linear-gradient(to right, #fface9, #f837e0)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {event.eventName}
              </span>
            </h1>

            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 text-on-surface-variant">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">calendar_today</span>
                <span className="font-label-sm text-label-sm">{formatEventDate(event.eventDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">schedule</span>
                <span className="font-label-sm text-label-sm">
                  {formatEventTime(event.eventDate)}
                  {event.eventEndDate ? ` — ${formatEventTime(event.eventEndDate)}` : ""}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">location_on</span>
                <span className="font-label-sm text-label-sm">{event.location}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Content grid */}
        <div className="max-w-[1200px] mx-auto px-5 md:px-16 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-16">
            <section>
              <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest mb-4 block">
                — About the Encounter
              </span>
              <div className="space-y-4 text-on-surface-variant font-body-lg text-body-lg leading-relaxed">
                {descriptionParas.length > 0 ? (
                  descriptionParas.map((para, i) => <p key={i}>{para}</p>)
                ) : (
                  <p>{event.description || "No description provided."}</p>
                )}
              </div>
            </section>

            {event.specialInstructions && (
              <section className="glass-panel p-8 rounded-2xl border border-primary/20">
                <div className="bg-primary/10 p-3 rounded-lg w-fit mb-6">
                  <span className="material-symbols-outlined text-primary text-3xl">info</span>
                </div>
                <h4 className="font-headline-md text-2xl text-on-background mb-4">Special Instructions</h4>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {event.specialInstructions}
                </p>
              </section>
            )}

            <section className="space-y-6">
              <div className="flex justify-between items-end">
                <h2 className="font-headline-md text-headline-md text-on-background">Location Details</h2>
                <span className="font-label-sm text-label-sm text-primary mb-1">{coordinates}</span>
              </div>
              <div className="h-64 md:h-80 w-full rounded-2xl overflow-hidden relative glass-panel group flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 flex items-center gap-4 glass-panel p-4 rounded-xl border border-white/10">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">near_me</span>
                  </div>
                  <div>
                    <p className="font-bold text-on-surface">{event.location}</p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">{coordinates}</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sticky booking card */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
            <div className="glass-panel p-8 rounded-2xl space-y-8 relative overflow-hidden border border-primary/20 shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -mr-16 -mt-16" />

              <div className="flex justify-between items-start">
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-1">
                    Entry Ticket
                  </p>
                  <h3 className="font-headline-md text-[32px] text-on-background">
                    {event.ticketPrice != null ? `LKR ${event.ticketPrice}` : "—"}
                    <span className="text-body-md text-on-surface-variant ml-2 font-body-md italic text-base">
                      / person
                    </span>
                  </h3>
                </div>
                {(event.availableSeats ?? 0) > 0 ? (
                  <div className="bg-primary/20 text-primary px-3 py-1 rounded font-label-sm text-label-sm font-bold">
                    {event.availableSeats} seats left
                  </div>
                ) : (
                  <div className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded font-label-sm text-label-sm font-bold">
                    Waitlist
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-on-surface-variant font-body-md">Total Capacity</span>
                  <span className="text-on-surface font-bold">{event.totalSeats ?? "—"} Guests</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-on-surface-variant font-body-md">Gender Ratio</span>
                  <span className="text-on-surface font-bold">{genderRatio}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-on-surface-variant font-body-md">Status</span>
                  <span className={`font-bold ${statusColors[status.type]}`}>{status.label}</span>
                </div>
              </div>

              {bookingMessage && (
                <p className="rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 font-body-md text-sm text-primary">
                  {bookingMessage}
                </p>
              )}
              {bookingError && (
                <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 font-body-md text-sm text-red-300">
                  {bookingError}
                </p>
              )}

              <div className="space-y-4 pt-4">
                <button
                  onClick={handleBooking}
                  disabled={status.type === "closed" || booking}
                  className="w-full bg-primary-container text-on-primary-container py-4 rounded-full font-bold font-label-sm text-label-sm uppercase tracking-wider flex justify-center items-center gap-3 hover:opacity-90 transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(248,55,224,0.3)] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {booking
                    ? "Processing..."
                    : status.type === "waitlist"
                    ? "Join the Waitlist"
                    : status.type === "closed"
                    ? "Event Closed"
                    : "Book Your Secret Ticket"}
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    arrow_forward
                  </span>
                </button>
                <p className="text-center text-[10px] text-on-surface-variant px-4 uppercase tracking-tighter">
                  By booking, you agree to our anonymity protocol and dress code requirements.
                </p>
              </div>

              <div className="pt-8 border-t border-white/5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-primary/30 flex-shrink-0 bg-primary/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">person</span>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">Hosted by</p>
                  <p className="font-bold text-on-background">{event.createdByUsername || "Match Mate"}</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default EventDetailPage;
