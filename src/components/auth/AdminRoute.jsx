import ProtectedRoute from "./ProtectedRoute";

// Convenience wrapper: requires authentication AND the ADMIN role.
export default function AdminRoute({ children }) {
  return <ProtectedRoute requireAdmin>{children}</ProtectedRoute>;
}
