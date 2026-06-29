import apiClient from "./client";

// GET /users/{userId} -> UserResponse
export const getUserProfile = (userId) =>
  apiClient.get(`/users/${userId}`).then((res) => res.data);

// PUT /users/{userId} -> UserResponse
export const updateUserProfile = (userId, payload) =>
  apiClient.put(`/users/${userId}`, payload).then((res) => res.data);

// DELETE /users/{userId}
export const deleteUser = (userId) =>
  apiClient.delete(`/users/${userId}`).then((res) => res.data);
