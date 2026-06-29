// src/components/admin/MatchCard.jsx
import '../../styles/admin.css';

export default function MatchCard({ memberA, memberB, score, status, onConfirm, onAdjust }) {
  const isStrong = score >= 90;

  return (
    <div className={`match-card${isStrong ? " match-card--strong" : ""}`}>
      <div className={`match-card__badge${isStrong ? " match-card__badge--strong" : ""}`}>
        {score}% Match
      </div>

      <div className="match-card__pair">
        <div className="match-card__person">
          <div className={`match-card__avatar${isStrong ? " match-card__avatar--strong" : ""}`}>
            <img src={memberA.avatarUrl} alt={memberA.alias} />
          </div>
          <span className="match-card__alias">{memberA.alias}</span>
        </div>

        <div className="match-card__connector">
          <span className="material-symbols-outlined">
            {isStrong ? "auto_awesome" : "link"}
          </span>
          <div className={`match-card__spark-line${isStrong ? " match-card__spark-line--active" : ""}`} />
        </div>

        <div className="match-card__person">
          <div className={`match-card__avatar${isStrong ? " match-card__avatar--strong" : ""}`}>
            <img src={memberB.avatarUrl} alt={memberB.alias} />
          </div>
          <span className="match-card__alias">{memberB.alias}</span>
        </div>
      </div>

      <div className="match-card__actions">
        <button type="button" className="match-card__confirm-btn" onClick={onConfirm}>
          {status === "confirmed" ? "Confirmed" : "Confirm Match"}
        </button>
        <button type="button" className="match-card__adjust-btn" onClick={onAdjust}>
          Adjust Pairing
        </button>
      </div>
    </div>
  );
}