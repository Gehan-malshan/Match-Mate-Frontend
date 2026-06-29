// src/Pages/admin/AdminMatchmakingPage.jsx
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "../../api/events";
import { getBookingsByEvent } from "../../api/bookings";
import { generateMatches, getMatches, updateMatchStatus } from "../../api/matches";
import { extractErrorMessage } from "../../api/client";
import AttendeeListItem from "../../components/admin/AttendeeListItem";
import GlassPanel from "../../components/admin/GlassPanel";
import MatchCard from "../../components/admin/MatchCard";
import '../../styles/admin.css';

// Backend bookings carry no avatar; derive a deterministic placeholder.
const avatarFor = (name) =>
  `https://ui-avatars.com/api/?background=2a2422&color=fface9&name=${encodeURIComponent(
    name || "Guest"
  )}`;

// BookingResponse -> AttendeeListItem props.
const mapBookingToAttendee = (booking) => ({
  id: booking.id,
  alias: booking.userFullName || `User #${booking.userId}`,
  tag: booking.status,
  traits: booking.bookingDate ? `Booked ${booking.bookingDate}` : "",
  avatarUrl: avatarFor(booking.userFullName),
});

// MatchResponse member -> MatchCard person props.
const mapMember = (member) => ({
  alias: member?.fullName || `User #${member?.userId ?? "?"}`,
  avatarUrl: member?.profileImageUrl || avatarFor(member?.fullName),
});

export default function AdminMatchmakingPage() {
  const { eventId } = useParams();

  const [event, setEvent] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [isMatching, setIsMatching] = useState(false);
  const [matchError, setMatchError] = useState(null);

  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const [eventDto, bookings, existingMatches] = await Promise.all([
          getEventById(eventId),
          getBookingsByEvent(eventId),
          getMatches(eventId),
        ]);
        if (!active) return;
        setEvent(eventDto);
        setAttendees((bookings ?? []).map(mapBookingToAttendee));
        setMatches(existingMatches ?? []);
      } catch {
        if (active) setError("Could not load event attendees.");
      } finally {
        if (active) setLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, [eventId]);

  const filteredAttendees = useMemo(() => {
    if (!searchTerm.trim()) return attendees;
    const term = searchTerm.toLowerCase();
    return attendees.filter((a) => a.alias.toLowerCase().includes(term));
  }, [searchTerm, attendees]);

  // Rejected pairings are kept server-side for audit but hidden from the board.
  const visibleMatches = useMemo(
    () => matches.filter((m) => m.status !== "REJECTED"),
    [matches]
  );

  const handleInitiateMatching = async () => {
    setIsMatching(true);
    setMatchError(null);
    try {
      const generated = await generateMatches(eventId);
      setMatches(generated ?? []);
    } catch (err) {
      setMatchError(extractErrorMessage(err, "Matchmaking failed. Please try again."));
    } finally {
      setIsMatching(false);
    }
  };

  const applyStatus = async (matchId, status) => {
    setMatchError(null);
    try {
      const updated = await updateMatchStatus(matchId, status);
      setMatches((current) =>
        current.map((m) => (m.matchId === matchId ? updated : m))
      );
    } catch (err) {
      setMatchError(extractErrorMessage(err, "Could not update the pairing."));
    }
  };

  const handleConfirm = (matchId) => applyStatus(matchId, "CONFIRMED");
  const handleAdjust = (matchId) => applyStatus(matchId, "REJECTED");

  if (loading) {
    return (
      <div className="matchmaking-page" style={{ padding: "2rem", opacity: 0.7 }}>
        Loading attendees…
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="matchmaking-page__not-found">
        <p>{error || "Event not found."}</p>
      </div>
    );
  }

  return (
    <div className="matchmaking-page">
      <div className="matchmaking-page__header">
        <h1 className="matchmaking-page__title">{event.eventName}</h1>
        <p className="matchmaking-page__tagline">{event.location || ""}</p>
      </div>

      <div className="matchmaking-page__layout">
        {/* Left: Attendee Pool (live from /bookings/event/{id}) */}
        <section className="matchmaking-page__pool-col">
          <div className="matchmaking-page__pool-header">
            <h2 className="matchmaking-page__pool-title">Attendee Pool</h2>
            <span className="matchmaking-page__pool-count">
              {attendees.length} Registered
            </span>
          </div>

          <div className="matchmaking-page__search-row">
            <div className="matchmaking-page__search-input-wrap">
              <span className="material-symbols-outlined">search</span>
              <input
                type="text"
                placeholder="Search attendees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value || "")}
              />
            </div>
            <button type="button" className="matchmaking-page__filter-btn" aria-label="Filter attendees">
              <span className="material-symbols-outlined">filter_list</span>
            </button>
          </div>

          <div className="matchmaking-page__attendee-list">
            {filteredAttendees.map((attendee) => (
              <AttendeeListItem key={attendee.id} member={attendee} />
            ))}
            {filteredAttendees.length === 0 && (
              <p className="matchmaking-page__no-matches" style={{ padding: "1rem", opacity: 0.5 }}>
                {attendees.length === 0
                  ? "No bookings for this event yet."
                  : "No attendees match your search."}
              </p>
            )}
          </div>
        </section>

        {/* Right: Alchemical Forge — graph-based matchmaking engine */}
        <section className="matchmaking-page__forge-col">
          <GlassPanel className="matchmaking-page__forge-panel">
            <h2 className="matchmaking-page__forge-title">The Alchemical Forge</h2>
            <p className="matchmaking-page__forge-copy">
              Analyze compatibility vectors and weave the destiny of tonight&apos;s guests.
              Pairings are computed with a graph-based maximum-weight matching engine
              and saved as suggestions for you to confirm.
            </p>
            <button
              type="button"
              className="matchmaking-page__initiate-btn"
              onClick={handleInitiateMatching}
              disabled={isMatching || attendees.length < 2}
              title={
                attendees.length < 2
                  ? "Need at least two confirmed attendees"
                  : "Generate compatibility-based pairings"
              }
            >
              <span>{isMatching ? "Synthesizing…" : "Initiate AI Matchmaking"}</span>
              <span className="material-symbols-outlined">settings_suggest</span>
            </button>
            {matchError && (
              <p className="admin-form-field__error" style={{ marginTop: "0.75rem" }}>
                {matchError}
              </p>
            )}
          </GlassPanel>

          <div className="matchmaking-page__matches">
            <h3 className="matchmaking-page__matches-title">Matched Connections</h3>
            <div className="matchmaking-page__matches-grid">
              {visibleMatches.map((match) => (
                <MatchCard
                  key={match.matchId}
                  memberA={mapMember(match.memberA)}
                  memberB={mapMember(match.memberB)}
                  score={match.score}
                  status={(match.status || "").toLowerCase()}
                  onConfirm={() => handleConfirm(match.matchId)}
                  onAdjust={() => handleAdjust(match.matchId)}
                />
              ))}
              {visibleMatches.length === 0 && (
                <p className="matchmaking-page__no-matches">
                  No pairings yet. Click “Initiate AI Matchmaking” to generate suggestions.
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
