import apiClient from "./client";

// POST /bookings -> BookingResponse (status PENDING)
export const createBooking = (payload) =>
  apiClient.post("/bookings", payload).then((res) => res.data);

// GET /bookings/{bookingId} -> BookingResponse
export const getBooking = (bookingId) =>
  apiClient.get(`/bookings/${bookingId}`).then((res) => res.data);

// GET /bookings/my -> BookingResponse[]
export const getMyBookings = () =>
  apiClient.get("/bookings/my").then((res) => res.data);

// GET /bookings/event/{eventId} -> BookingResponse[] (attendees for an event)
export const getBookingsByEvent = (eventId) =>
  apiClient.get(`/bookings/event/${eventId}`).then((res) => res.data);

// GET /bookings/event/{eventId}/availability -> EventResponseDTO
export const getEventAvailability = (eventId) =>
  apiClient.get(`/bookings/event/${eventId}/availability`).then((res) => res.data);

// PUT /bookings/{bookingId}/cancel -> BookingResponse
export const cancelBooking = (bookingId) =>
  apiClient.put(`/bookings/${bookingId}/cancel`).then((res) => res.data);
