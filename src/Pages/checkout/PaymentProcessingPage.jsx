// src/Pages/checkout/PaymentProcessingPage.jsx
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAppState } from "../../context/AppStateContext";

const SIMULATED_DELAY_MS = 1750; // within the requested 1.5–2s window

export default function PaymentProcessingPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { bookTicket, getEventById } = useAppState();

  const event = getEventById?.(eventId);
  const retryCount = location.state?.retryCount ?? 0;

  const [resolved, setResolved] = useState(false);
  const timeoutRef = useRef(null);

  // Resolve a booking exactly once per mount, then route based on outcome.
  const settle = (outcome) => {
    if (resolved) return; // guard against double-fire (timeout + manual button)
    setResolved(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (outcome === "success") {
      const result = bookTicket?.(eventId);
      navigate(`/events/${eventId}/booking-confirmed`, {
        replace: true,
        state: { ticketId: result?.ticketId ?? null, memberId: result?.member?.id ?? null },
      });
    } else {
      navigate(`/events/${eventId}/payment-failed`, {
        replace: true,
        state: { retryCount },
      });
    }
  };

  useEffect(() => {
    timeoutRef.current = setTimeout(() => settle("success"), SIMULATED_DELAY_MS);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  return (
    <div className="payment-processing-page">
      <div className="payment-processing-page__backdrop" />

      <div className="payment-processing-page__content">
        <div className="payment-processing-page__loader" role="status" aria-live="polite">
          <span className="payment-processing-page__loader-ring" />
          <span className="material-symbols-outlined payment-processing-page__loader-icon">
            shield_lock
          </span>
        </div>

        <h1 className="payment-processing-page__title">Securing Your Spot</h1>
        <p className="payment-processing-page__subtitle">
          Verifying security with PayHere Sandbox Framework
          <span className="payment-processing-page__ellipsis">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </p>

        {event?.title && (
          <p className="payment-processing-page__event-name">for {event.title}</p>
        )}

        {/* Developer utility controls — not part of the production UI flow,
            but explicitly requested for local testing of both branches. */}
        <div className="payment-processing-page__dev-tools">
          <span className="payment-processing-page__dev-label">Developer Tools</span>
          <div className="payment-processing-page__dev-buttons">
            <button
              type="button"
              className="payment-processing-page__dev-btn payment-processing-page__dev-btn--success"
              onClick={() => settle("success")}
            >
              Force Success
            </button>
            <button
              type="button"
              className="payment-processing-page__dev-btn payment-processing-page__dev-btn--failure"
              onClick={() => settle("failure")}
            >
              Force Failure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}