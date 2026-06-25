import { Navigate, Route, Routes } from "react-router-dom";
import CommunityPage from "./Pages/CommunityPage";
import EventsPage from "./Pages/EventsPage";
import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";
import RegistrationPage from "./Pages/RegistrationPage";
import MemberProfilePage from "./Pages/MemberProfilePage";
import EventDetailsPage from "./Pages/EventDetailsPage";
//admin imports
import AdminLayout from "./components/layout/AdminLayout";
import AdminEventListPage from "./Pages/admin/AdminEventListPage";
import AdminManageEventPage from "./Pages/admin/AdminManageEventPage";
import AdminMatchmakingPage from "./Pages/admin/AdminMatchmakingPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/community/:memberId" element={<MemberProfilePage />} />
      <Route path="/events/:id" element={<EventDetailsPage />} />
      
      {/* --- Admin route tree, nested under AdminLayout --- */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/events" replace />} />
        <Route path="events" element={<AdminEventListPage />} />
        <Route path="events/create" element={<AdminManageEventPage />} />
        <Route path="events/:eventId/edit" element={<AdminManageEventPage />} />
        <Route path="events/:eventId/matchmake" element={<AdminMatchmakingPage />} />
        {/* Analytics / Settings are referenced by the sidebar nav but
            not part of this deliverable — stub routes so links resolve.
            Swap <AdminPlaceholderPage /> for real pages when built. */}
        <Route path="matchmaking" element={<AdminPlaceholderPage title="Matchmaking" />} />
        <Route path="settings" element={<AdminPlaceholderPage title="Settings" />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

// Temporary placeholder so "Analytics" / "Settings" sidebar links don't
// 404 before those pages are built. Delete once real pages exist.
function AdminPlaceholderPage({ title }) {
  return (
    <div style={{ padding: "2rem", color: "#e5e2e1" }}>
      <h2>{title}</h2>
      <p style={{ opacity: 0.6 }}>This section hasn&apos;t been built yet.</p>
    </div>
  );
}