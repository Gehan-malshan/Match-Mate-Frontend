import { Routes, Route, Navigate } from "react-router-dom";

// Public / Client Pages
import CommunityPage from "./Pages/CommunityPage";
import EventsPage from "./Pages/EventsPage";
import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";
import RegistrationPage from "./Pages/RegistrationPage";
import MemberProfilePage from "./Pages/MemberProfilePage";
import EventDetailsPage from "./Pages/EventDetailsPage";
import BookingsPage from "./Pages/BookingsPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminRoute from "./components/auth/AdminRoute";

// Checkout Journey Pages
import PaymentProcessingPage from "./Pages/checkout/PaymentProcessingPage";
import PaymentFailedPage from "./Pages/checkout/PaymentFailedPage";
import BookingConfirmedPage from "./Pages/checkout/BookingConfirmedPage";

// Admin Portal Layout & Pages
import AdminLayout from "./components/layout/AdminLayout";
import AdminEventListPage from "./Pages/admin/AdminEventListPage";
import AdminManageEventPage from "./Pages/admin/AdminManageEventPage";
import AdminMatchmakingPage from "./Pages/admin/AdminMatchmakingPage";

// Styles for Checkout Pages
import "./styles/checkout.css";

export default function App() {
  return (
    <>
      {/* Note: The duplicate <Router> wrapper has been removed here 
        since your app is already wrapped in one inside src/main.jsx.
      */}
      <Routes>
        {/* Public Client Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <BookingsPage />
            </ProtectedRoute>
          }
        />
        <Route path="/community/:memberId" element={<MemberProfilePage />} />
        
        {/* Standardized parameter to :eventId to ensure perfect alignment with checkout lookups */}
        <Route path="/events/:eventId" element={<EventDetailsPage />} />

        {/* Dynamic Simulated PayHere Gateway Flow Routes */}
        <Route 
          path="/events/:eventId/payment-processing" 
          element={<PaymentProcessingPage />} 
        />
        <Route 
          path="/events/:eventId/payment-failed" 
          element={<PaymentFailedPage />} 
        />
        <Route 
          path="/events/:eventId/booking-confirmed" 
          element={<BookingConfirmedPage />} 
        />
        
        {/* Admin route tree nested under AdminLayout (ADMIN role required) */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<Navigate to="/admin/events" replace />} />
          <Route path="events" element={<AdminEventListPage />} />
          <Route path="events/create" element={<AdminManageEventPage />} />
          <Route path="events/:eventId/edit" element={<AdminManageEventPage />} />
          <Route path="events/:eventId/matchmake" element={<AdminMatchmakingPage />} />
          
          {/* Fallback stub routes referenceable by sidebar links */}
          <Route path="matchmaking" element={<AdminPlaceholderPage title="Matchmaking Dashboard" />} />
          <Route path="settings" element={<AdminPlaceholderPage title="System Settings" />} />
        </Route>

        {/* Global Fallback Route Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

/**
 * Temporary layout placeholder component to ensure that sidebar routes 
 * don't trigger unhandled 404 errors prior to generation.
 */
function AdminPlaceholderPage({ title }) {
  return (
    <div style={{ padding: "2rem", color: "#e5e2e1" }}>
      <h2 style={{ fontFamily: "var(--mm-font-display, serif)", fontSize: "24px", marginBottom: "0.5rem" }}>
        {title}
      </h2>
      <p style={{ opacity: 0.6, fontSize: "14px" }}>
        This administration module hasn&apos;t been connected yet.
      </p>
    </div>
  );
}