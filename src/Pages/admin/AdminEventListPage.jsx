// src/Pages/admin/AdminEventListPage.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getEvents, deleteEvent } from "../../api/events";
import { mapEventToAdminRow } from "../../utils/adminEventMapper";
import GlassPanel from "../../components/admin/GlassPanel";
import '../../styles/admin.css';

const PAGE_SIZE = 10;

export default function AdminEventListPage() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [reloadIndex, setReloadIndex] = useState(0);

  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const page = await getEvents({ page: 0, size: PAGE_SIZE });
        const content = page?.content ?? [];
        if (active) setRows(content.map(mapEventToAdminRow));
      } catch (err) {
        if (active)
          setError(
            err?.response?.data?.message ||
              "Could not load events. Please try again."
          );
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, [reloadIndex]);

  const handleDelete = async (eventId, title) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeletingId(eventId);
    try {
      await deleteEvent(eventId);
      setRows((prev) => prev.filter((row) => row.id !== eventId));
    } catch (err) {
      window.alert(
        err?.response?.data?.message || "Could not delete this event."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (value) =>
    value
      ? new Date(value).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "—";

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

        {loading && (
          <p style={{ padding: "1.5rem", opacity: 0.6 }}>Loading events…</p>
        )}

        {!loading && error && (
          <div style={{ padding: "1.5rem" }}>
            <p style={{ color: "#ff9b9b", marginBottom: "0.75rem" }}>{error}</p>
            <button
              type="button"
              className="event-row__edit-btn"
              onClick={() => setReloadIndex((i) => i + 1)}
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && rows.length === 0 && (
          <p style={{ padding: "1.5rem", opacity: 0.6 }}>
            No events yet. Create your first event to get started.
          </p>
        )}

        {!loading &&
          !error &&
          rows.map((event) => (
            <div key={event.id} className="event-row">
              <div className="event-row__name-cell">
                <span className="event-row__name">{event.title}</span>
                <span className="event-row__id">#{event.id}</span>
              </div>
              <span className="event-row__type">{event.type}</span>
              <span className="event-row__date">{formatDate(event.date)}</span>
              <span className="event-row__registered">
                {event.registered}
                {event.totalSeats ? ` / ${event.totalSeats}` : ""}
              </span>
              <span className={`event-row__status ${event.statusModifier}`}>
                {event.statusLabel}
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
                <button
                  type="button"
                  className="event-row__edit-btn"
                  disabled={deletingId === event.id}
                  onClick={() => handleDelete(event.id, event.title)}
                >
                  {deletingId === event.id ? "Deleting…" : "Delete"}
                </button>
              </div>
            </div>
          ))}
      </GlassPanel>
    </div>
  );
}
