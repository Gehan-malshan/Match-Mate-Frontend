// src/components/admin/MatchCard.jsx
import '../../styles/admin.css';

const scoreLabel = (s) => {
  if (s >= 80) return { label: "Excellent", tier: "excellent" };
  if (s >= 60) return { label: "Strong",    tier: "strong" };
  if (s >= 40) return { label: "Good",      tier: "good" };
  return          { label: "Possible",  tier: "possible" };
};

export default function MatchCard({ memberA, memberB, score, status, onConfirm, onAdjust }) {
  const confirmed = status === "confirmed";
  const { label, tier } = scoreLabel(score);
  // Arc circumference for the SVG score ring (r=22 → c≈138.2)
  const r = 22, c = 2 * Math.PI * r;
  const filled = c - (c * Math.min(score, 100)) / 100;

  return (
    <div className={`match-card match-card--tier-${tier}${confirmed ? " match-card--confirmed" : ""}`}>

      {/* Score ring */}
      <div className="match-card__score-ring">
        <svg width="56" height="56" viewBox="0 0 56 56" aria-hidden="true">
          <circle cx="28" cy="28" r={r} className="match-card__ring-track" />
          <circle
            cx="28" cy="28" r={r}
            className="match-card__ring-fill"
            strokeDasharray={c}
            strokeDashoffset={filled}
            transform="rotate(-90 28 28)"
          />
        </svg>
        <div className="match-card__score-inner">
          <span className="match-card__score-num">{score}</span>
        </div>
      </div>

      {/* Tier badge */}
      <div className="match-card__tier-badge">{label} Match</div>

      {/* Pair row */}
      <div className="match-card__pair">
        <div className="match-card__person">
          <div className="match-card__avatar">
            <img src={memberA.avatarUrl} alt={memberA.alias} />
          </div>
          <span className="match-card__alias">{memberA.alias}</span>
        </div>

        <div className="match-card__connector">
          <div className="match-card__spark-line">
            <div className="match-card__spark-travel" />
          </div>
          <span className="material-symbols-outlined match-card__heart-icon">
            {confirmed ? "favorite" : "favorite_border"}
          </span>
          <div className="match-card__spark-line">
            <div className="match-card__spark-travel" />
          </div>
        </div>

        <div className="match-card__person">
          <div className="match-card__avatar">
            <img src={memberB.avatarUrl} alt={memberB.alias} />
          </div>
          <span className="match-card__alias">{memberB.alias}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="match-card__actions">
        <button
          type="button"
          className={`match-card__confirm-btn${confirmed ? " match-card__confirm-btn--done" : ""}`}
          onClick={onConfirm}
          disabled={confirmed}
        >
          <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
            {confirmed ? "check_circle" : "done"}
          </span>
          {confirmed ? "Confirmed" : "Confirm"}
        </button>
        <button
          type="button"
          className="match-card__adjust-btn"
          onClick={onAdjust}
          disabled={confirmed}
        >
          <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>shuffle</span>
          Adjust
        </button>
      </div>
    </div>
  );
}