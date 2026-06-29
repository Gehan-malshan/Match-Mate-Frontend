// src/Pages/admin/AdminManageEventPage.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getEventById,
  createEvent,
  updateEvent,
  updateEventLimits,
} from "../../api/events";
import {
  EVENT_TYPE_OPTIONS,
  EVENT_STATUS_OPTIONS,
  createBlankEventForm,
  mapEventToForm,
  buildEventRequest,
  buildEventUpdate,
  validateEventForm,
} from "../../utils/adminEventMapper";
import GlassPanel from "../../components/admin/GlassPanel";
import AdminFormField from "../../components/admin/AdminFormField";
import CapacityPricingBento from "../../components/admin/CapacityPricingBento";
import EventMetaPanel from "../../components/admin/EventMetaPanel";
import '../../styles/admin.css';

export default function AdminManageEventPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(eventId);

  const [formState, setFormState] = useState(() => createBlankEventForm());
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [savingLimits, setSavingLimits] = useState(false);
  const [errors, setErrors] = useState({});
  const [banner, setBanner] = useState(null); // { type: 'error'|'success', text }

  useEffect(() => {
    if (!isEditMode) return undefined;
    let active = true;
    const load = async () => {
      setLoading(true);
      try {
        const dto = await getEventById(eventId);
        if (active && dto) setFormState(mapEventToForm(dto));
      } catch {
        if (active)
          setBanner({ type: "error", text: "Could not load this event." });
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, [eventId, isEditMode]);

  const handleChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const persistEvent = async () => {
    const validationErrors = validateEventForm(formState);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setBanner({ type: "error", text: "Please fix the highlighted fields." });
      return null;
    }

    setSaving(true);
    setBanner(null);
    try {
      let saved;
      if (isEditMode) {
        saved = await updateEvent(eventId, buildEventUpdate(formState));
      } else {
        saved = await createEvent(buildEventRequest(formState));
        // Apply gender limits on the freshly created event when provided.
        const male = Number(formState.maleLimit);
        const female = Number(formState.femaleLimit);
        if (saved?.eventId && (male > 0 || female > 0)) {
          await updateEventLimits(saved.eventId, {
            maleLimit: male || 0,
            femaleLimit: female || 0,
          });
        }
      }
      return saved;
    } catch (err) {
      setBanner({
        type: "error",
        text:
          err?.response?.data?.message ||
          `Could not ${isEditMode ? "update" : "create"} the event.`,
      });
      return null;
    } finally {
      setSaving(false);
    }
  };

  const handleSaveDraft = async () => {
    const saved = await persistEvent();
    if (saved) {
      setBanner({ type: "success", text: "Event saved." });
      if (!isEditMode && saved.eventId) {
        navigate(`/admin/events/${saved.eventId}/edit`, { replace: true });
      }
    }
  };

  const handlePublish = async () => {
    const saved = await persistEvent();
    if (saved) navigate("/admin/events");
  };

  const handleApplyLimits = async () => {
    if (!isEditMode) {
      setBanner({
        type: "error",
        text: "Save the event first, then adjust gender limits.",
      });
      return;
    }
    setSavingLimits(true);
    setBanner(null);
    try {
      await updateEventLimits(eventId, {
        maleLimit: Number(formState.maleLimit) || 0,
        femaleLimit: Number(formState.femaleLimit) || 0,
      });
      setBanner({ type: "success", text: "Gender limits updated." });
    } catch (err) {
      setBanner({
        type: "error",
        text:
          err?.response?.data?.message || "Could not update gender limits.",
      });
    } finally {
      setSavingLimits(false);
    }
  };

  if (loading) {
    return (
      <div className="manage-event-page" style={{ padding: "2rem", opacity: 0.7 }}>
        Loading event…
      </div>
    );
  }

  return (
    <div className="manage-event-page">
      <div className="manage-event-page__topbar-title">
        <h2 className="admin-page-header__compact-title">
          {isEditMode ? "Manage" : "Create"}{" "}
          <span className="admin-page-header__accent">Event</span>
        </h2>
      </div>

      {banner && (
        <div
          role="status"
          style={{
            margin: "0 0 1rem",
            padding: "0.75rem 1rem",
            borderRadius: "10px",
            fontSize: "14px",
            background:
              banner.type === "error"
                ? "rgba(255, 80, 80, 0.12)"
                : "rgba(80, 220, 140, 0.12)",
            color: banner.type === "error" ? "#ff9b9b" : "#7be8a8",
            border: `1px solid ${
              banner.type === "error"
                ? "rgba(255,80,80,0.3)"
                : "rgba(80,220,140,0.3)"
            }`,
          }}
        >
          {banner.text}
        </div>
      )}

      <div className="manage-event-page__grid">
        {/* Left column: form */}
        <div className="manage-event-page__form-col">
          <GlassPanel className="manage-event-page__card">
            <h3 className="manage-event-page__card-title">Event Essence</h3>
            <div className="manage-event-page__field-grid">
              <AdminFormField label="Event ID" htmlFor="eventId" fullWidth>
                <input
                  id="eventId"
                  type="text"
                  value={formState.id || "(assigned on save)"}
                  readOnly
                  className="is-readonly"
                />
              </AdminFormField>

              <AdminFormField label="Event Name" htmlFor="name" fullWidth>
                <input
                  id="name"
                  type="text"
                  placeholder="e.g., Midnight Masquerade"
                  value={formState.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
                {errors.name && (
                  <span className="admin-form-field__error">{errors.name}</span>
                )}
              </AdminFormField>

              <AdminFormField label="Description" htmlFor="description" fullWidth>
                <textarea
                  id="description"
                  rows={4}
                  placeholder="Describe the chemistry and atmosphere..."
                  value={formState.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
                {errors.description && (
                  <span className="admin-form-field__error">
                    {errors.description}
                  </span>
                )}
              </AdminFormField>

              <AdminFormField label="Event Type" htmlFor="eventType">
                <select
                  id="eventType"
                  value={formState.eventType}
                  onChange={(e) => handleChange("eventType", e.target.value)}
                >
                  {EVENT_TYPE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </AdminFormField>

              <AdminFormField label="Status" htmlFor="status">
                <select
                  id="status"
                  value={formState.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                  disabled={!isEditMode}
                >
                  {EVENT_STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {!isEditMode && (
                  <span className="admin-form-field__hint">
                    New events start as Upcoming.
                  </span>
                )}
              </AdminFormField>
            </div>
          </GlassPanel>

          <GlassPanel className="manage-event-page__card">
            <h3 className="manage-event-page__card-title">Journey Logistics</h3>
            <div className="manage-event-page__field-grid">
              <AdminFormField label="Start Date & Time" htmlFor="startDateTime">
                <input
                  id="startDateTime"
                  type="datetime-local"
                  value={formState.startDateTime}
                  onChange={(e) => handleChange("startDateTime", e.target.value)}
                />
                {errors.startDateTime && (
                  <span className="admin-form-field__error">
                    {errors.startDateTime}
                  </span>
                )}
              </AdminFormField>

              <AdminFormField label="End Date & Time" htmlFor="endDateTime">
                <input
                  id="endDateTime"
                  type="datetime-local"
                  value={formState.endDateTime}
                  onChange={(e) => handleChange("endDateTime", e.target.value)}
                />
                {errors.endDateTime && (
                  <span className="admin-form-field__error">
                    {errors.endDateTime}
                  </span>
                )}
              </AdminFormField>

              <AdminFormField label="Address" htmlFor="address" fullWidth>
                <input
                  id="address"
                  type="text"
                  placeholder="123 Secret Lane, New York"
                  value={formState.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                />
                {errors.address && (
                  <span className="admin-form-field__error">
                    {errors.address}
                  </span>
                )}
              </AdminFormField>

              <AdminFormField label="Latitude" htmlFor="latitude">
                <input
                  id="latitude"
                  type="text"
                  placeholder="40.7128"
                  value={formState.latitude}
                  onChange={(e) => handleChange("latitude", e.target.value)}
                />
                {errors.latitude && (
                  <span className="admin-form-field__error">
                    {errors.latitude}
                  </span>
                )}
              </AdminFormField>

              <AdminFormField label="Longitude" htmlFor="longitude">
                <input
                  id="longitude"
                  type="text"
                  placeholder="-74.0060"
                  value={formState.longitude}
                  onChange={(e) => handleChange("longitude", e.target.value)}
                />
                {errors.longitude && (
                  <span className="admin-form-field__error">
                    {errors.longitude}
                  </span>
                )}
              </AdminFormField>
            </div>
          </GlassPanel>

          <CapacityPricingBento formState={formState} onChange={handleChange} />
          {(errors.ticketPrice || errors.totalCapacity) && (
            <p className="admin-form-field__error" style={{ marginTop: "0.5rem" }}>
              {errors.ticketPrice || errors.totalCapacity}
            </p>
          )}

          <div className="manage-event-page__limits-action" style={{ marginTop: "0.75rem" }}>
            <button
              type="button"
              className="manage-event-page__draft-btn"
              onClick={handleApplyLimits}
              disabled={savingLimits || !isEditMode}
              title={
                isEditMode
                  ? "Apply male/female limits to this event"
                  : "Available after the event is created"
              }
            >
              {savingLimits ? "Applying…" : "Apply Gender Limits"}
            </button>
          </div>
        </div>

        {/* Right column: meta + media */}
        <div className="manage-event-page__meta-col">
          <EventMetaPanel formState={formState} onChange={handleChange} />
        </div>
      </div>

      <div className="manage-event-page__sticky-bar">
        <button
          type="button"
          className="manage-event-page__draft-btn"
          onClick={handleSaveDraft}
          disabled={saving}
        >
          {saving ? "Saving…" : "Save"}
        </button>
        <button
          type="button"
          className="manage-event-page__publish-btn"
          onClick={handlePublish}
          disabled={saving}
        >
          {isEditMode ? "Save & Close" : "Create Event"}
          <span className="material-symbols-outlined">rocket_launch</span>
        </button>
      </div>
    </div>
  );
}
