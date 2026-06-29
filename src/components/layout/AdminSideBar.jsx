// src/components/layout/AdminSidebar.jsx
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function getInitials(name) {
  if (!name) return "MM";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "MM";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function formatRole(role) {
  if (!role) return "Organizer";
  return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
}

// Strict nav set per spec: Event Manager, Matchmaking ONLY.
const NAV_ITEMS = [
  { key: "event-manager", label: "Event Manager", icon: "event_note", to: "/admin/events" },
  { key: "matchmaking", label: "Matchmaking", icon: "monitoring", to: "/admin/matchmaking" },
];

/**
 * Determines which sidebar key should be highlighted for the current route.
 *
 * Per product spec this is intentionally NOT a simple path-prefix match:
 * - /admin/events             -> "event-manager" (Event List)
 * - /admin/events/create      -> "event-manager" (Create Event)
 * - /admin/events/:id/edit    -> "event-manager" (Edit Event)
 * - /admin/events/:id/matchmake -> "matchmaking" (intentional override —
 *   business requirement mapping the specific active event to this item)
 */
export function getActiveNavKey(pathname) {
  if (/^\/admin\/events\/[^/]+\/matchmake/.test(pathname)) {
    return "matchmaking";
  }
  if (pathname.startsWith("/admin/events")) {
    return "event-manager";
  }
  if (pathname.startsWith("/admin/matchmaking")) {
    return "matchmaking";
  }
  return null;
}

export default function AdminSidebar() {
  const { pathname } = useLocation();
  const activeKey = getActiveNavKey(pathname);
  const { user } = useAuth();

  const fullName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ").trim() ||
    user?.email ||
    "Admin";
  const initials = getInitials(
    [user?.firstName, user?.lastName].filter(Boolean).join(" ").trim() || user?.email
  );
  const roleLabel = formatRole(user?.role);

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__brand">
        <h1 className="admin-sidebar__brand-name">MatchMate</h1>
        <p className="admin-sidebar__brand-sub">Organizer Portal</p>
      </div>

      <nav className="admin-sidebar__nav">
        {NAV_ITEMS.map((item) => {
          const isActive = item.key === activeKey;
          return (
            <Link
              key={item.key}
              to={item.to}
              className={`admin-sidebar__link${isActive ? " admin-sidebar__link--active" : ""}`}
              aria-current={isActive ? "page" : undefined}
              onClick={(e) => {
                // Intercept clicks on Matchmaking if we are not already viewing a specific event's matchmaking screen
                if (item.key === "matchmaking" && activeKey !== "matchmaking") {
                  e.preventDefault();
                  alert("⚠️ Action Required: Please select an active event from the Event Manager first to view its matchmaking pool.");
                }
              }}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="admin-sidebar__link-label">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="admin-sidebar__footer">
        <Link to="/admin/events/create" className="admin-sidebar__create-btn">
          <span className="material-symbols-outlined">add</span>
          Create New Event
        </Link>

        <div className="admin-sidebar__profile">
          <div className="admin-sidebar__avatar admin-sidebar__avatar--initials">
            {initials}
          </div>
          <div className="admin-sidebar__profile-info">
            <p className="admin-sidebar__profile-name">{fullName}</p>
            <p className="admin-sidebar__profile-role">{roleLabel}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}