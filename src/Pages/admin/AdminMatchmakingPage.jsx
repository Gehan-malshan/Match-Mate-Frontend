// src/Pages/admin/AdminMatchmakingPage.jsx
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "../../data/Event";
import { members, getMemberById, getMatchesForEvent } from "../../data/Members";
import AttendeeListItem from "../../components/admin/AttendeeListItem";
import MatchCard from "../../components/admin/MatchCard";
import GlassPanel from "../../components/admin/GlassPanel";
import '../../styles/admin.css';

export default function AdminMatchmakingPage() {
  const { eventId } = useParams();
  const event = getEventById(eventId);

  const [searchTerm, setSearchTerm] = useState("");
  const [matches, setMatches] = useState(() => getMatchesForEvent(eventId));
  const [isMatching, setIsMatching] = useState(false);

  // Robust, crash-safe filtering logic
  const filteredMembers = useMemo(() => {
    if (!searchTerm.trim()) return members;
    const term = searchTerm.toLowerCase();
    
    return members.filter((member) => {
      // Safely fall back to alternative keys if alias doesn't exist on this record
      const safetyName = member?.alias || member?.name || member?.username || "";
      return safetyName.toLowerCase().includes(term);
    });
  }, [searchTerm]);

  const handleInitiateMatching = () => {
    setIsMatching(true);
    // TODO: replace with real AI synthesis call.
    setTimeout(() => {
      setMatches(getMatchesForEvent(eventId));
      setIsMatching(false);
    }, 1200);
  };

  const handleConfirmMatch = (matchId) => {
    setMatches((prev) =>
      prev.map((m) => (m.id === matchId ? { ...m, status: "confirmed" } : m))
    );
  };

  const handleAdjustPairing = (matchId) => {
    // TODO: open pairing-adjustment UI.
    console.log("Adjust pairing for", matchId);
  };

  if (!event) {
    return (
      <div className="matchmaking-page__not-found">
        <p>Event not found.</p>
      </div>
    );
  }

  return (
    <div className="matchmaking-page">
      <div className="matchmaking-page__header">
        {/* Guarding the event title rendering against key differences */}
        <h1 className="matchmaking-page__title">
          {event.title || event.name || event.id}
        </h1>
        <p className="matchmaking-page__tagline">{event.tagline || ""}</p>
      </div>

      <div className="matchmaking-page__layout">
        {/* Left: Attendee Pool */}
        <section className="matchmaking-page__pool-col">
          <div className="matchmaking-page__pool-header">
            <h2 className="matchmaking-page__pool-title">Attendee Pool</h2>
            <span className="matchmaking-page__pool-count">
              {event.registeredCount || 0} Registered
            </span>
          </div>

          <div className="matchmaking-page__search-row">
            <div className="matchmaking-page__search-input-wrap">
              <span className="material-symbols-outlined">search</span>
              <input
                type="text"
                placeholder="Search aliases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value || "")}
              />
            </div>
            <button type="button" className="matchmaking-page__filter-btn" aria-label="Filter attendees">
              <span className="material-symbols-outlined">filter_list</span>
            </button>
          </div>

          <div className="matchmaking-page__attendee-list">
            {filteredMembers.map((member) => (
              <AttendeeListItem key={member.id} member={member} />
            ))}
            {filteredMembers.length === 0 && (
              <p className="matchmaking-page__no-matches" style={{ padding: "1rem", opacity: 0.5 }}>
                No active attendees match your search.
              </p>
            )}
          </div>
        </section>

        {/* Right: Alchemical Forge */}
        <section className="matchmaking-page__forge-col">
          <GlassPanel className="matchmaking-page__forge-panel">
            <h2 className="matchmaking-page__forge-title">The Alchemical Forge</h2>
            <p className="matchmaking-page__forge-copy">
              Analyze compatibility vectors and weave the destiny of tonight&apos;s guests
              with our proprietary AI Synthesis.
            </p>
            <button
              type="button"
              className="matchmaking-page__initiate-btn"
              onClick={handleInitiateMatching}
              disabled={isMatching}
            >
              <span>{isMatching ? "Synthesizing..." : "Initiate AI Matchmaking"}</span>
              <span className="material-symbols-outlined">settings_suggest</span>
            </button>
          </GlassPanel>

          <div className="matchmaking-page__matches">
            <h3 className="matchmaking-page__matches-title">Matched Connections</h3>
            <div className="matchmaking-page__matches-grid">
              {matches.map((match) => {
                const memberA = getMemberById(match.memberAId);
                const memberB = getMemberById(match.memberBId);
                if (!memberA || !memberB) return null;
                return (
                  <MatchCard
                    key={match.id}
                    memberA={memberA}
                    memberB={memberB}
                    score={match.score}
                    status={match.status}
                    onConfirm={() => handleConfirmMatch(match.id)}
                    onAdjust={() => handleAdjustPairing(match.id)}
                  />
                );
              })}
              {matches.length === 0 && (
                <p className="matchmaking-page__no-matches">
                  No matches yet. Run AI Matchmaking to generate pairings.
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}