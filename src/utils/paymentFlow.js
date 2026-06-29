import { createBooking } from "../api/bookings";
import { initiatePayment, getPaymentByBooking } from "../api/payments";

// Derive a FutureOrPresent booking date/time from the event start.
const toBookingDateTime = (event) => {
  const start = event?.eventDate ? new Date(event.eventDate) : new Date();
  const safe = Number.isNaN(start.getTime()) ? new Date() : start;
  const pad = (n) => String(n).padStart(2, "0");
  return {
    bookingDate: `${safe.getFullYear()}-${pad(safe.getMonth() + 1)}-${pad(safe.getDate())}`,
    bookingTime: `${pad(safe.getHours())}:${pad(safe.getMinutes())}:00`,
  };
};

// Poll the payment status until it leaves PENDING (PayHere confirms via a
// server-to-server callback, so the popup completing doesn't mean it's saved yet).
const pollPaymentStatus = async (bookingId, { attempts = 10, intervalMs = 2000 } = {}) => {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const payment = await getPaymentByBooking(bookingId);
      if (payment?.status && payment.status !== "PENDING") {
        return payment;
      }
    } catch {
      // payment record may not be queryable yet; keep polling
    }
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }
  return null;
};

// Open the PayHere popup with the hash returned by the backend.
const openPayHere = (hashResponse, { event, user }) =>
  new Promise((resolve, reject) => {
    const payhere = window.payhere;
    if (!payhere) {
      reject(new Error("Payment gateway failed to load. Please refresh and try again."));
      return;
    }

    payhere.onCompleted = (orderId) => resolve(orderId);
    payhere.onDismissed = () => reject(new Error("Payment was dismissed."));
    payhere.onError = (error) => reject(new Error(error || "Payment failed."));

    const payment = {
      sandbox: true,
      merchant_id: hashResponse.merchantId,
      return_url: undefined,
      cancel_url: undefined,
      // PayHere calls this server-to-server to confirm the payment.
      notify_url: `${import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1"}/payments/callback`,
      order_id: hashResponse.orderId,
      items: event?.eventName || "Match Mate Event",
      amount: Number(hashResponse.amount).toFixed(2),
      currency: hashResponse.currency || "LKR",
      hash: hashResponse.hash,
      first_name: user?.firstName || "Guest",
      last_name: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phoneNumber || "",
      address: "",
      city: user?.city || "",
      country: user?.country || "Sri Lanka",
    };

    payhere.startPayment(payment);
  });

/**
 * Full booking + payment orchestration:
 * 1. Create a PENDING booking for the event.
 * 2. Ask the backend to initiate a payment (returns the PayHere hash).
 * 3. Open the PayHere popup.
 * 4. Poll until the booking is confirmed via the gateway callback.
 */
export async function startBookingAndPayment({ event, user, onStatus = () => {} }) {
  onStatus("Reserving your seat...");
  const { bookingDate, bookingTime } = toBookingDateTime(event);
  const booking = await createBooking({
    eventId: event.eventId,
    bookingDate,
    bookingTime,
  });

  onStatus("Preparing secure payment...");
  const hashResponse = await initiatePayment({
    bookingId: booking.id,
    amount: Number(event.ticketPrice),
  });

  onStatus("Opening payment gateway...");
  await openPayHere(hashResponse, { event, user });

  onStatus("Confirming payment...");
  const payment = await pollPaymentStatus(booking.id);

  if (payment?.status === "COMPLETED") {
    return { booking, payment, confirmed: true };
  }
  // Popup completed but callback not yet reflected — surface a soft success.
  return { booking, payment, confirmed: false };
}
