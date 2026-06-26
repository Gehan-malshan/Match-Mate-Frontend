// src/Pages/checkout/PaymentFailedPage.jsx
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

const MAX_RETRY_ATTEMPTS = 3;

export default function PaymentFailedPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // retryCount tracks how many times we've already attempted & failed.
  // It travels in router state so a hard refresh resets it intentionally
  // (a fresh page load is a fresh session, which is the simplest correct
  // behavior for a client-only simulation).
  const retryCount = location.state?.retryCount ?? 0;
  const hasRetriesLeft = retryCount < MAX_RETRY_ATTEMPTS;

  const handleTryAgain = () => {
    if (!hasRetriesLeft) return;
    navigate(`/events/${eventId}/payment-processing`, {
      replace: true,
      state: { retryCount: retryCount + 1 },
    });
  };

  return (
    <div className="payment-failed-page">
      <div className="payment-failed-page__backdrop" />

      <div className="payment-failed-page__content">
        <div className="payment-failed-page__icon-wrap">
          <span className="material-symbols-outlined payment-failed-page__icon">
            error
          </span>
        </div>

        <h1 className="payment-failed-page__title">Transaction Declined</h1>

        <div className="payment-failed-page__banner" role="alert">
          <span className="material-symbols-outlined">warning</span>
          <p>
            Your bank or card issuer declined this charge. No funds have been taken
            from your account.
          </p>
        </div>

        <p className="payment-failed-page__attempts">
          Attempt {Math.min(retryCount + 1, MAX_RETRY_ATTEMPTS)} of {MAX_RETRY_ATTEMPTS}
        </p>

        {hasRetriesLeft ? (
          <button
            type="button"
            className="payment-failed-page__retry-btn"
            onClick={handleTryAgain}
          >
            <span className="material-symbols-outlined">refresh</span>
            Try Again
          </button>
        ) : (
          <div className="payment-failed-page__limit-notice">
            <p>
              Transaction Limit Exceeded. Please return to the Event Details page to
              re-verify your security allocation.
            </p>
            <Link to={`/events/${eventId}`} className="payment-failed-page__escape-link">
              <span className="material-symbols-outlined">arrow_back</span>
              Back to Event Details
            </Link>
          </div>
        )}

        {hasRetriesLeft && (
          <Link to={`/events/${eventId}`} className="payment-failed-page__cancel-link">
            Cancel and return to event
          </Link>
        )}
      </div>
    </div>
  );
}