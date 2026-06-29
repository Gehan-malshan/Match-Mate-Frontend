import apiClient from "./client";

// POST /payments/initiate -> PaymentHashResponse { orderId, amount, currency, hash, merchantId }
export const initiatePayment = (payload) =>
  apiClient.post("/payments/initiate", payload).then((res) => res.data);

// GET /payments/booking/{bookingId} -> PaymentResponse
export const getPaymentByBooking = (bookingId) =>
  apiClient.get(`/payments/booking/${bookingId}`).then((res) => res.data);
