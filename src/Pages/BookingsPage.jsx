// src/Pages/BookingsPage.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyBookings, cancelBooking } from "../api/bookings";
import { extractErrorMessage } from "../api/client";

const STATUS_STYLES = {
  CONFIRMED: "bg-primary/15 text-primary border-primary/30",
  PENDING: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
  CANCELLED: "bg-white/5 text-on-surface-variant border-white/10",
};

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "—";

const formatTime = (value) => (value ? String(value).slice(0, 5) : "");

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState(null);
  const [reloadIndex, setReloadIndex] = useState(0);

  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getMyBookings();
        if (active) setBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        if (active)
          setError(extractErrorMessage(err, "Could not load your bookings."));
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, [reloadIndex]);

  const handleCancel = async (bookingId) => {
    if (!window.confirm("Cancel this booking?")) return;
    setCancellingId(bookingId);
    try {
      const updated = await cancelBooking(bookingId);
      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, status: updated?.status ?? "CANCELLED" } : b
        )
      );
    } catch (err) {
      window.alert(extractErrorMessage(err, "Could not cancel this booking."));
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-background pt-24 pb-16 px-5 md:px-16">
      <div className="max-w-[900px] mx-auto">
        <header className="mb-10">
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest mb-2 block">
            — Your Reservations
          </span>
          <h1 className="font-display-lg text-[32px] md:text-[48px] leading-tight">
            My Bookings
          </h1>
        </header>

        {loading && (
          <p className="text-on-surface-variant">Loading your bookings…</p>
        )}

        {!loading && error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-red-300">
            <p className="mb-3">{error}</p>
            <button
              onClick={() => setReloadIndex((i) => i + 1)}
              className="text-primary uppercase tracking-widest text-label-sm font-label-sm hover:opacity-70"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && bookings.length === 0 && (
          <div className="rounded-2xl border border-white/10 glass-panel p-10 text-center">
            <span className="material-symbols-outlined text-primary text-5xl mb-4 block">
              confirmation_number
            </span>
            <p className="text-on-surface-variant mb-6">
              You haven&apos;t booked any events yet.
            </p>
            <Link
              to="/events"
              className="inline-flex items-center gap-2 rounded-full bg-primary-container text-on-primary-container px-6 py-3 font-label-sm text-label-sm uppercase tracking-widest hover:opacity-90"
            >
              Explore Events
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
        )}

        {!loading && !error && bookings.length > 0 && (
          <ul className="space-y-4">
            {bookings.map((booking) => {
              const canCancel = booking.status !== "CANCELLED";
              return (
                <li
                  key={booking.id}
                  className="glass-panel rounded-2xl border border-white/10 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div className="space-y-1">
                    <Link
                      to={`/events/${booking.eventId}`}
                      className="font-headline-md text-xl text-on-background hover:text-primary transition-colors"
                    >
                      {booking.eventName || `Event #${booking.eventId}`}
                    </Link>
                    <div className="flex flex-wrap gap-x-6 gap-y-1 text-on-surface-variant text-sm">
                      <span className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-base text-primary">
                          calendar_today
                        </span>
                        {formatDate(booking.bookingDate)}
                      </span>
                      {booking.bookingTime && (
                        <span className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-base text-primary">
                            schedule
                          </span>
                          {formatTime(booking.bookingTime)}
                        </span>
                      )}
                      <span className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-base text-primary">
                          tag
                        </span>
                        MM-{booking.id}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-widest ${
                        STATUS_STYLES[booking.status] ?? STATUS_STYLES.CANCELLED
                      }`}
                    >
                      {booking.status}
                    </span>
                    {canCancel && (
                      <button
                        type="button"
                        onClick={() => handleCancel(booking.id)}
                        disabled={cancellingId === booking.id}
                        className="rounded-full border border-white/10 px-4 py-2 text-label-sm font-label-sm uppercase tracking-widest text-on-surface-variant transition-all hover:border-red-400 hover:text-red-300 disabled:opacity-40"
                      >
                        {cancellingId === booking.id ? "Cancelling…" : "Cancel"}
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
