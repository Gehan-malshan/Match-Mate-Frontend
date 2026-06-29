import apiClient from "./client";

// All event endpoints return the ApiResponse wrapper: { success, message, data, statusCode }.
// Paginated endpoints put the Spring Page object in `data` (data.content is the array).
const unwrap = (res) => res.data?.data;

// GET /events (paged)
export const getEvents = (params = {}) =>
  apiClient.get("/events", { params }).then(unwrap);

// GET /events/{eventId}
export const getEventById = (eventId) =>
  apiClient.get(`/events/${eventId}`).then(unwrap);

// GET /events/upcoming (paged)
export const getUpcomingEvents = (params = {}) =>
  apiClient.get("/events/upcoming", { params }).then(unwrap);

// GET /events/available (paged)
export const getAvailableEvents = (params = {}) =>
  apiClient.get("/events/available", { params }).then(unwrap);

// GET /events/type/{type} (paged)
export const getEventsByType = (type, params = {}) =>
  apiClient.get(`/events/type/${type}`, { params }).then(unwrap);

// GET /events/status/{status} (paged)
export const getEventsByStatus = (status, params = {}) =>
  apiClient.get(`/events/status/${status}`, { params }).then(unwrap);

// GET /events/search?keyword= (paged)
export const searchEvents = (keyword, params = {}) =>
  apiClient
    .get("/events/search", { params: { keyword, ...params } })
    .then(unwrap);

// GET /events/nearby?latitude=&longitude=&radius= (paged)
export const getEventsNearby = (latitude, longitude, radius = 50, params = {}) =>
  apiClient
    .get("/events/nearby", { params: { latitude, longitude, radius, ...params } })
    .then(unwrap);

// POST /events/create -> ApiResponse<EventResponseDTO>
export const createEvent = (payload) =>
  apiClient.post("/events/create", payload).then(unwrap);

// PUT /events/{eventId} -> ApiResponse<EventResponseDTO> (creator only)
export const updateEvent = (eventId, payload) =>
  apiClient.put(`/events/${eventId}`, payload).then(unwrap);

// DELETE /events/{eventId} -> ApiResponse (creator only)
export const deleteEvent = (eventId) =>
  apiClient.delete(`/events/${eventId}`).then((res) => res.data);

// PUT /events/{eventId}/limits?maleLimit=&femaleLimit= -> EventResponseDTO (ROLE_ADMIN)
// Note: the backend reads maleLimit/femaleLimit as query params and returns the
// raw EventResponseDTO (no ApiResponse wrapper on this endpoint).
export const updateEventLimits = (eventId, { maleLimit, femaleLimit }) =>
  apiClient
    .put(`/events/${eventId}/limits`, null, { params: { maleLimit, femaleLimit } })
    .then((res) => res.data);

// PUT /events/{eventId}/status/{status} -> ApiResponse<EventResponseDTO> (creator only)
export const updateEventStatus = (eventId, status) =>
  apiClient.put(`/events/${eventId}/status/${status}`).then(unwrap);
