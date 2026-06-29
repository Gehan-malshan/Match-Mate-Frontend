// src/Pages/checkout/PaymentProcessingPage.jsx
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getEventById } from "../../api/events";
import { useAuth } from "../../context/AuthContext";
import { startBookingAndPayment } from "../../utils/paymentFlow";

export default function PaymentProcessingPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const retryCount = location.state?.retryCount ?? 0;
  const [statusText, setStatusText] = useState("Reserving your seat…");
  const startedRef = useRef(false);

  useEffect(() => {
    // Guard against React 18 StrictMode double-invocation in dev — we only
    // want to create one booking + open PayHere once per mount.
    if (startedRef.current) return;
    startedRef.current = true;

    let active = true;

    const run = async () => {
      try {
        const event =
          location.state?.event || (await getEventById(eventId));
        if (!event) throw new Error("Event could not be loaded.");

        const result = await startBookingAndPayment({
          event,
          user,
          onStatus: (msg) => active && setStatusText(msg),
        });

        if (!active) return;
        navigate(`/events/${eventId}/booking-confirmed`, {
          replace: true,
          state: {
            bookingId: result.booking?.id ?? null,
            booking: result.booking ?? null,
            payment: result.payment ?? null,
            confirmed: result.confirmed,
            event,
          },
        });
      } catch (err) {
        if (!active) return;
        navigate(`/events/${eventId}/payment-failed`, {
          replace: true,
          state: {
            retryCount,
            reason: err?.message || "Payment could not be completed.",
          },
        });
      }
    };

    run();
    return () => {
      active = false;
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
          {statusText}
          <span className="payment-processing-page__ellipsis">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </p>

        {location.state?.event?.eventName && (
          <p className="payment-processing-page__event-name">
            for {location.state.event.eventName}
          </p>
        )}
      </div>
    </div>
  );
}
