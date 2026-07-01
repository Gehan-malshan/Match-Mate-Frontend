// src/Pages/checkout/BookingConfirmedPage.jsx
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getEventById } from "../../api/events";
import { FALLBACK_IMAGE, formatEventDate, formatEventTime } from "../../utils/eventMapper";

export default function BookingConfirmedPage() {
  const { eventId } = useParams();
  const location = useLocation();

  const bookingId = location.state?.bookingId ?? null;
  const confirmed = location.state?.confirmed ?? true;
  const [event, setEvent] = useState(location.state?.event ?? null);

  const ticketCardRef = useRef(null);

  // If we landed here without router state (e.g. refresh), fetch the event.
  useEffect(() => {
    if (event || !eventId) return;
    let active = true;
    getEventById(eventId)
      .then((dto) => active && setEvent(dto))
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [event, eventId]);

  useEffect(() => {
    const card = ticketCardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
        const rotateX = (y - rect.height / 2) / 40;
        const rotateY = -(x - rect.width / 2) / 40;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      } else {
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const eventName = event?.eventName ?? "Your Event";
  const heroImage = event?.imageUrl || event?.coverImageUrl || FALLBACK_IMAGE;
  const ticketCode = bookingId ? `MM-${bookingId}` : "MM-PENDING";

  const handleAddToCalendar = () => {
    window.alert(`${eventName} has been added to your calendar.`);
  };

  return (
    <div className="booking-confirmed-page">
      <nav className="booking-confirmed-page__nav">
        <Link to="/" className="booking-confirmed-page__brand">
          MatchMate
        </Link>
      </nav>

      <main className="booking-confirmed-page__main">
        <div className="booking-confirmed-page__atmosphere">
          <div
            className="booking-confirmed-page__atmosphere-bg"
            style={{ backgroundImage: `url('${heroImage}')` }}
          />
          <div className="booking-confirmed-page__atmosphere-gradient" />
        </div>

        <div className="booking-confirmed-page__content animate-reveal">
          <div className="booking-confirmed-page__success-icon">
            <span className="material-symbols-outlined">auto_awesome</span>
          </div>

          <h1 className="booking-confirmed-page__heading">
            The <span className="text-gradient booking-confirmed-page__heading-accent">Veil</span> Awaits
          </h1>
          <p className="booking-confirmed-page__subheading">
            {confirmed
              ? "Your presence is requested at the intersection of mystery and connection."
              : "Payment received — your booking will be confirmed shortly."}
          </p>

          {/* Ticket card */}
          <div className="booking-confirmed-page__ticket glass-panel" ref={ticketCardRef}>
            <div className="booking-confirmed-page__ticket-glow" />

            <div className="booking-confirmed-page__ticket-body">
              <div className="booking-confirmed-page__ticket-details">
                <div>
                  <span className="booking-confirmed-page__ticket-eyebrow">
                    {confirmed ? "Confirmed Experience" : "Pending Confirmation"}
                  </span>
                  <h2 className="booking-confirmed-page__ticket-title">{eventName}</h2>
                </div>

                <div className="booking-confirmed-page__ticket-meta">
                  <div className="booking-confirmed-page__ticket-meta-row">
                    <div className="booking-confirmed-page__ticket-meta-icon">
                      <span className="material-symbols-outlined">calendar_today</span>
                    </div>
                    <span>
                      {event?.eventDate
                        ? formatEventDate(event.eventDate)
                        : "Date to be confirmed"}
                    </span>
                  </div>
                  <div className="booking-confirmed-page__ticket-meta-row">
                    <div className="booking-confirmed-page__ticket-meta-icon">
                      <span className="material-symbols-outlined">schedule</span>
                    </div>
                    <span>
                      {event?.eventDate
                        ? formatEventTime(event.eventDate)
                        : "Time to be confirmed"}
                    </span>
                  </div>
                  <div className="booking-confirmed-page__ticket-meta-row">
                    <div className="booking-confirmed-page__ticket-meta-icon">
                      <span className="material-symbols-outlined">location_on</span>
                    </div>
                    <span>{event?.location ?? "Secret Location (To be revealed)"}</span>
                  </div>
                </div>
              </div>

              <div className="booking-confirmed-page__ticket-id-block">
                <span className="booking-confirmed-page__ticket-id-label">
                  Booking Reference
                </span>
                <code className="booking-confirmed-page__ticket-id">{ticketCode}</code>

                <div className="booking-confirmed-page__qr-wrap">
                  <div className="booking-confirmed-page__qr-glow" />
                  <img
                    className="booking-confirmed-page__qr"
                    alt="Booking QR code"
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&bgcolor=27201f&color=fface9&data=${encodeURIComponent(
                      ticketCode
                    )}`}
                  />
                </div>
              </div>
            </div>

            <div className="booking-confirmed-page__ticket-footer">
              <div className="booking-confirmed-page__ticket-footer-item">
                <span className="material-symbols-outlined">mail</span>
                <p>Check your email for your digital mask and secret password.</p>
              </div>
              <div className="booking-confirmed-page__ticket-footer-item">
                <span className="material-symbols-outlined">lock</span>
                <p>Your invitation is strictly non-transferable. Identity will be verified.</p>
              </div>
            </div>
          </div>

          {/* Action cluster */}
          <div className="booking-confirmed-page__actions">
            <button
              type="button"
              className="booking-confirmed-page__action-btn booking-confirmed-page__action-btn--primary"
              onClick={handleAddToCalendar}
            >
              Add to Calendar
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <Link
              to="/bookings"
              className="booking-confirmed-page__action-btn booking-confirmed-page__action-btn--secondary"
            >
              View My Bookings
            </Link>
          </div>

          <footer className="booking-confirmed-page__footer">
            <div className="booking-confirmed-page__footer-brand">MatchMate</div>
            <div className="booking-confirmed-page__footer-links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/support">Support</Link>
            </div>
            <p className="booking-confirmed-page__footer-copyright">
              © {new Date().getFullYear()} MatchMate. All rights reserved.
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
