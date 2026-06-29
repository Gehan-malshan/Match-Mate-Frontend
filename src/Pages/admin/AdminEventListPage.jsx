// src/Pages/admin/AdminEventListPage.jsx
import { Link, useNavigate } from "react-router-dom";
import { events } from "../../data/Event";
import GlassPanel from "../../components/admin/GlassPanel";
import '../../styles/admin.css';

const STATUS_STYLES = {
  Draft: "event-row__status--draft",
  Scheduled: "event-row__status--scheduled",
  Live: "event-row__status--live",
  "Sold Out": "event-row__status--sold-out",
};

export default function AdminEventListPage() {
  const navigate = useNavigate();

  return (
    <div className="admin-event-list">
      <div className="admin-event-list__header">
        <h2 className="admin-event-list__title">
          Event <span className="admin-page-header__accent">Manager</span>
        </h2>
        <Link to="/admin/events/create" className="admin-event-list__create-btn">
          <span className="material-symbols-outlined">add</span>
          Create New Event
        </Link>
      </div>

      <GlassPanel className="admin-event-list__table-wrap">
        <div className="event-row event-row--head">
          <span>Event</span>
          <span>Type</span>
          <span>Date</span>
          <span>Registered</span>
          <span>Status</span>
          <span aria-hidden="true" />
        </div>

        {events.map((event) => (
          <div key={event.id} className="event-row">
            <div className="event-row__name-cell">
              <span className="event-row__name">{event.title}</span>
              <span className="event-row__id">{event.id}</span>
            </div>
            <span className="event-row__type">{event.category}</span>
            <span className="event-row__date">
              {new Date(event.startDateTime).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="event-row__registered">{event.totalCapacity - event.seatsLeft}</span>
            <span className={`event-row__status ${STATUS_STYLES[event.status] ?? ""}`}>
              {event.status}
            </span>
            <div className="event-row__actions">
              <button
                type="button"
                className="event-row__edit-btn"
                onClick={() => navigate(`/admin/events/${event.id}/edit`)}
              >
                Manage
              </button>
              <button
                type="button"
                className="event-row__match-btn"
                onClick={() => navigate(`/admin/events/${event.id}/matchmake`)}
              >
                Matchmaking
              </button>
            </div>
          </div>
        ))}
      </GlassPanel>
    </div>
  );
}