import apiClient from "./client";

// POST /auth/login -> { token, user, message }
export const login = (credentials) =>
  apiClient.post("/auth/login", credentials).then((res) => res.data);

// POST /auth/register -> { token, user, message }
export const register = (payload) =>
  apiClient.post("/auth/register", payload).then((res) => res.data);

// GET /auth/check-email/{email} -> boolean (true if already registered)
export const checkEmailExists = (email) =>
  apiClient
    .get(`/auth/check-email/${encodeURIComponent(email)}`)
    .then((res) => res.data);
