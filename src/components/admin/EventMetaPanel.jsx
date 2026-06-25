// src/components/admin/EventMetaPanel.jsx
import GlassPanel from "./GlassPanel";
import '../../styles/admin.css';

export default function EventMetaPanel({ formState, onChange }) {
  return (
    <div className="event-meta-panel">
      <GlassPanel className="event-meta-panel__visual">
        <div className="event-meta-panel__cover">
          <img
            src={formState.coverImageUrl || "https://placehold.co/600x338/1c1b1b/fface9?text=Event+Cover"}
            alt="Event cover"
            id="previewImage"
          />
          <div className="event-meta-panel__cover-overlay">
            <button type="button" className="event-meta-panel__update-btn">
              Update Visual
            </button>
          </div>
        </div>
        <div className="event-meta-panel__cover-url">
          <label className="admin-form-field__label" htmlFor="coverImageUrl">
            Cover Image URL
          </label>
          <input
            id="coverImageUrl"
            type="text"
            value={formState.coverImageUrl}
            onChange={(e) => onChange("coverImageUrl", e.target.value)}
          />
        </div>
      </GlassPanel>

      <GlassPanel className="event-meta-panel__instructions">
        <label className="admin-form-field__label" htmlFor="specialInstructions">
          Special Instructions
        </label>
        <textarea
          id="specialInstructions"
          rows={3}
          placeholder="Dress code, secret password, arrival guidelines..."
          value={formState.specialInstructions}
          onChange={(e) => onChange("specialInstructions", e.target.value)}
        />
      </GlassPanel>

      <GlassPanel className="event-meta-panel__metadata">
        <div className="event-meta-panel__metadata-row">
          <span className="event-meta-panel__metadata-label">Created At</span>
          <span className="event-meta-panel__metadata-value">{formState.createdAt}</span>
        </div>
        <div className="event-meta-panel__metadata-row">
          <span className="event-meta-panel__metadata-label">Last Updated</span>
          <span className="event-meta-panel__metadata-value">{formState.lastUpdated}</span>
        </div>
        <div className="event-meta-panel__metadata-row event-meta-panel__metadata-row--last">
          <span className="event-meta-panel__metadata-label">Created By</span>
          <span className="event-meta-panel__metadata-value event-meta-panel__metadata-value--verified">
            <span className="material-symbols-outlined">verified</span>
            {formState.createdBy}
          </span>
        </div>
      </GlassPanel>
    </div>
  );
}