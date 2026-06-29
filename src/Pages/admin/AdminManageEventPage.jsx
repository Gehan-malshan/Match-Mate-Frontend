// src/Pages/admin/AdminManageEventPage.jsx
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EVENT_TYPES, EVENT_STATUSES, createBlankEvent, getEventById } from "../../data/Event";
import GlassPanel from "../../components/admin/GlassPanel";
import AdminFormField from "../../components/admin/AdminFormField";
import CapacityPricingBento from "../../components/admin/CapacityPricingBento";
import EventMetaPanel from "../../components/admin/EventMetaPanel";
import '../../styles/admin.css';

export default function AdminManageEventPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(eventId);

  const [formState, setFormState] = useState(() =>
    isEditMode ? getEventById(eventId) ?? createBlankEvent() : createBlankEvent()
  );

  const handleChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveDraft = () => {
    // TODO: wire up to backend persistence layer.
    console.log("Saving draft", formState);
  };

  const handlePublish = () => {
    // TODO: wire up to backend persistence layer.
    console.log("Publishing event", formState);
    navigate("/admin/events");
  };

  return (
    <div className="manage-event-page">
      <div className="manage-event-page__topbar-title">
        <h2 className="admin-page-header__compact-title">
          Manage <span className="admin-page-header__accent">Event</span>
        </h2>
      </div>

      <div className="manage-event-page__grid">
        {/* Left column: form */}
        <div className="manage-event-page__form-col">
          <GlassPanel className="manage-event-page__card">
            <h3 className="manage-event-page__card-title">Event Essence</h3>
            <div className="manage-event-page__field-grid">
              <AdminFormField label="Event ID" htmlFor="eventId" fullWidth>
                <input id="eventId" type="text" value={formState.id} readOnly className="is-readonly" />
              </AdminFormField>

              <AdminFormField label="Event Name" htmlFor="name" fullWidth>
                <input
                  id="name"
                  type="text"
                  placeholder="e.g., Midnight Masquerade"
                  value={formState.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </AdminFormField>

              <AdminFormField label="Description" htmlFor="description" fullWidth>
                <textarea
                  id="description"
                  rows={4}
                  placeholder="Describe the chemistry and atmosphere..."
                  value={formState.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </AdminFormField>

              <AdminFormField label="Event Type" htmlFor="eventType">
                <select
                  id="eventType"
                  value={formState.eventType}
                  onChange={(e) => handleChange("eventType", e.target.value)}
                >
                  {EVENT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </AdminFormField>

              <AdminFormField label="Status" htmlFor="status">
                <select
                  id="status"
                  value={formState.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                >
                  {EVENT_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
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
              </AdminFormField>

              <AdminFormField label="End Date & Time" htmlFor="endDateTime">
                <input
                  id="endDateTime"
                  type="datetime-local"
                  value={formState.endDateTime}
                  onChange={(e) => handleChange("endDateTime", e.target.value)}
                />
              </AdminFormField>

              <AdminFormField label="Address" htmlFor="address" fullWidth>
                <input
                  id="address"
                  type="text"
                  placeholder="123 Secret Lane, New York"
                  value={formState.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                />
              </AdminFormField>

              <AdminFormField label="Latitude" htmlFor="latitude">
                <input
                  id="latitude"
                  type="text"
                  placeholder="40.7128"
                  value={formState.latitude}
                  onChange={(e) => handleChange("latitude", e.target.value)}
                />
              </AdminFormField>

              <AdminFormField label="Longitude" htmlFor="longitude">
                <input
                  id="longitude"
                  type="text"
                  placeholder="-74.0060"
                  value={formState.longitude}
                  onChange={(e) => handleChange("longitude", e.target.value)}
                />
              </AdminFormField>
            </div>
          </GlassPanel>

          <CapacityPricingBento formState={formState} onChange={handleChange} />
        </div>

        {/* Right column: meta + media */}
        <div className="manage-event-page__meta-col">
          <EventMetaPanel formState={formState} onChange={handleChange} />
        </div>
      </div>

      <div className="manage-event-page__sticky-bar">
        <button type="button" className="manage-event-page__draft-btn" onClick={handleSaveDraft}>
          Save Draft
        </button>
        <button type="button" className="manage-event-page__publish-btn" onClick={handlePublish}>
          Publish Event
          <span className="material-symbols-outlined">rocket_launch</span>
        </button>
      </div>
    </div>
  );
}