// src/components/layout/AdminSidebar.jsx
import { Link, useLocation } from "react-router-dom";

// Strict nav set per spec: Event Manager, Matchmaking, Settings ONLY.
const NAV_ITEMS = [
  { key: "event-manager", label: "Event Manager", icon: "event_note", to: "/admin/events" },
  { key: "matchmaking", label: "Matchmaking", icon: "monitoring", to: "/admin/matchmaking" },
  { key: "settings", label: "Settings", icon: "settings", to: "/admin/settings" },
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
  if (pathname.startsWith("/admin/settings")) {
    return "settings";
  }
  return null;
}

export default function AdminSidebar() {
  const { pathname } = useLocation();
  const activeKey = getActiveNavKey(pathname);

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
          <div className="admin-sidebar__avatar">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAB5_K3QuedB547isUMfBsrtbk64sDWhaB7IZqWLmx6sOTzPga-KK-THgB3Y1ZvGjDR8Y1bdyR0ZVO8RveYie9LykBGQdBn_f3E_PGqT5BKF0Dw1Sok-EXjsT3hIe7EnZw-L4HjjG2Ey_yXxz_BQvBOSy2IjCkg9fbia1DEpWLu-1ZXOtjJ8IRUYQW_fl1syoNDBR-7nZSCesogtBJp3Y-8SL_HmGr0d1Owi5TdeDLaSkaF71_6G9t61dSPIsPirRassH8MopHhU7U"
              alt="Admin profile"
            />
          </div>
          <div className="admin-sidebar__profile-info">
            <p className="admin-sidebar__profile-name">Julian Voss</p>
            <p className="admin-sidebar__profile-role">Senior Curator</p>
          </div>
        </div>
      </div>
    </aside>
  );
}