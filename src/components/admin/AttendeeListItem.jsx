// src/components/admin/AttendeeListItem.jsx
import '../../styles/admin.css';

export default function AttendeeListItem({ member, onClick }) {
  return (
    <div
      className="attendee-item"
      onClick={() => onClick?.(member)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick?.(member);
      }}
    >
      <div className="attendee-item__avatar">
        <img src={member.avatarUrl} alt={member.alias} />
      </div>
      <div className="attendee-item__info">
        <div className="attendee-item__top-row">
          <span className="attendee-item__alias">{member.alias}</span>
          <span className="attendee-item__tag">{member.tag}</span>
        </div>
        <span className="attendee-item__traits">{member.traits}</span>
      </div>
      <span className="material-symbols-outlined attendee-item__chevron">chevron_right</span>
    </div>
  );
}