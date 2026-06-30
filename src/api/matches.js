import apiClient from "./client";

// Match endpoints return the ApiResponse wrapper: { success, message, data, statusCode }.
const unwrap = (res) => res.data?.data;

// POST /events/{eventId}/matchmake -> ApiResponse<MatchResponse[]> (ROLE_ADMIN)
// Runs the graph-based matchmaking engine and returns the persisted matches.
export const generateMatches = (eventId) =>
  apiClient.post(`/events/${eventId}/matchmake`).then(unwrap);

// GET /events/{eventId}/matches -> ApiResponse<MatchResponse[]> (ROLE_ADMIN)
export const getMatches = (eventId) =>
  apiClient.get(`/events/${eventId}/matches`).then(unwrap);

// PUT /matches/{matchId}/status -> ApiResponse<MatchResponse> (ROLE_ADMIN)
// status: SUGGESTED | CONFIRMED | REJECTED
export const updateMatchStatus = (matchId, status) =>
  apiClient.put(`/matches/${matchId}/status`, { status }).then(unwrap);
