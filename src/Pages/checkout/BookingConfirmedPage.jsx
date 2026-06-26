// src/Pages/checkout/BookingConfirmedPage.jsx
import { useEffect, useRef } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useAppState } from "../../context/AppStateContext";

export default function BookingConfirmedPage() {
  const { eventId } = useParams();
  const location = useLocation();
  const { getEventById, getMemberById } = useAppState();

  const event = getEventById?.(eventId);
  const ticketId = location.state?.ticketId;
  const memberId = location.state?.memberId;
  const member = memberId ? getMemberById?.(memberId) : null;

  const ticketCardRef = useRef(null);

  // Scoped tilt micro-interaction — ported from the raw HTML's
  // document-level mousemove listener. Scoping the listener to the
  // card's own bounding box (rather than attaching to `document`)
  // avoids leaking a window-level listener across route changes and
  // avoids doing math on every mousemove in the entire app.
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

  const handleAddToCalendar = () => {
    window.alert(`${event?.title ?? "Your event"} has been added to your calendar.`);
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
            style={{
              backgroundImage: `url('${
                event?.heroImage ??
                "https://lh3.googleusercontent.com/aida-public/AB6AXuBdTqWjCnxrlR_e84PB0UCVPDRAz3ANThHKPs2FBrimevGllmy13lNZpv7W4mFs2nK07XZk8GEhSBbpj2AbhBZULasVc3Vu4HWtQcSphyM2FOb1YGwEfUxfkrBgiYMNfPdk5Zbc3tgpEs8DMxq8ah3Ix-GWI9s02MlrvT4G3wJnCSJhoFEP5RLoMir8DjEvRaZTg2uiUkVlWcEvuD4VzfFz5NrwzjCnywlQoM2101dUos0mGOVCj-Oqqz8jXLT5zgMRM6p_EvojF50"
              }')`,
            }}
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
            Your presence is requested at the intersection of mystery and connection.
          </p>

          {/* Ticket card */}
          <div className="booking-confirmed-page__ticket glass-panel" ref={ticketCardRef}>
            <div className="booking-confirmed-page__ticket-glow" />

            <div className="booking-confirmed-page__ticket-body">
              <div className="booking-confirmed-page__ticket-details">
                <div>
                  <span className="booking-confirmed-page__ticket-eyebrow">
                    Confirmed Experience
                  </span>
                  <h2 className="booking-confirmed-page__ticket-title">
                    {event?.title ?? "Your Event"}
                  </h2>
                </div>

                <div className="booking-confirmed-page__ticket-meta">
                  <div className="booking-confirmed-page__ticket-meta-row">
                    <div className="booking-confirmed-page__ticket-meta-icon">
                      <span className="material-symbols-outlined">calendar_today</span>
                    </div>
                    <span>{event?.date ?? "Date to be confirmed"}</span>
                  </div>
                  <div className="booking-confirmed-page__ticket-meta-row">
                    <div className="booking-confirmed-page__ticket-meta-icon">
                      <span className="material-symbols-outlined">schedule</span>
                    </div>
                    <span>{event?.time ?? "Time to be confirmed"}</span>
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
                  Secret Ticket ID
                </span>
                <code className="booking-confirmed-page__ticket-id">
                  {ticketId ?? event?.id?.toUpperCase() ?? "MM-PENDING"}
                </code>

                <div className="booking-confirmed-page__qr-wrap">
                  <div className="booking-confirmed-page__qr-glow" />
                  <img
                    className="booking-confirmed-page__qr"
                    alt="Stylized minimalist QR code with magenta accents"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDs0ilYWriScYHhXqhtMv09xNBBJc4BT_DGFAlRPhOaPDFoKOMUr2dwVSua_yJJIOf7itAcdiuxmaSm0ViW6V_I9fFhnPirN7n_qlfAGvCRn41mUZIeLCvk7hRwAgQn67gM4Otq7rD6QJ6e4ps19tqotRn0s5TkOrh3F6-DBZ-gQLDRDPjZVPY112X_qkrH62SzjiQ9aNCJJ98len9JT28JdE8B9hH3muZsPZmlNUkH-GDDPXx1fdHhX2cNPlJ_XM0wp_65SyHTKjs"
                  />
                </div>
              </div>
            </div>

            <div className="booking-confirmed-page__ticket-footer">
              <div className="booking-confirmed-page__ticket-footer-item">
                <span className="material-symbols-outlined">mail</span>
                <p>
                  {member?.name
                    ? `Check your email, ${member.name}, for your digital mask and secret password.`
                    : "Check your email for your digital mask and secret password."}
                </p>
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
              to="/profile"
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