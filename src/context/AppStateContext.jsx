// src/context/AppStateContext.jsx
//
// Centralized reactive data layer for the whole app.
//
// Why this exists:
// Event.js and Members.js export plain static arrays. That's fine for
// read-only mock data, but the booking flow needs to *mutate* state
// (decrement seatsLeft, bump registeredCount, add a new member) and have
// every consumer — the public Event Details page AND the Admin
// Matchmaking dashboard — see the same up-to-date numbers without a
// page refresh. A Context Provider wrapping the whole app is the
// simplest way to do that with built-in React state only (no Redux).
//
// Usage:
//   import { AppStateProvider, useAppState } from "./context/AppStateContext";
//   // wrap <App /> in main.jsx or at the top of App.jsx
//   const { events, members, bookTicket } = useAppState();

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { events as seedEvents, getEventById as getSeedEventById } from "../data/Event";
import { members as seedMembers } from "../data/Members";

const AppStateContext = createContext(null);

let memberSequence = 0;
function generateMemberId(eventId) {
  memberSequence += 1;
  return `guest-${eventId ?? "event"}-${Date.now()}-${memberSequence}`;
}

function generateTicketId() {
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `MM-${Date.now().toString().slice(-4)}-${random}`;
}

export function AppStateProvider({ children }) {
  const [events, setEvents] = useState(seedEvents);
  const [members, setMembers] = useState(seedMembers);

  /**
   * Books one ticket for `eventId`.
   * - Decrements that event's seatsLeft (floored at 0).
   * - Increments that event's registeredCount.
   * - Pushes a new simulated member/customer record.
   * Returns the booking result ({ event, member, ticketId }) so the
   * caller (PaymentProcessingPage) can hand the ticket id forward to
   * the confirmation screen — or `null` if the event wasn't found.
   */
  const bookTicket = useCallback((eventId, customerDetails = {}) => {
    const targetEvent = events.find((event) => event?.id === eventId);
    if (!targetEvent) return null;

    const ticketId = generateTicketId();

    setEvents((prevEvents) =>
      prevEvents.map((event) => {
        if (event?.id !== eventId) return event;
        const currentSeats = typeof event.seatsLeft === "number" ? event.seatsLeft : 0;
        const currentRegistered =
          typeof event.registeredCount === "number" ? event.registeredCount : 0;
        return {
          ...event,
          seatsLeft: Math.max(0, currentSeats - 1),
          registeredCount: currentRegistered + 1,
        };
      })
    );

    const newMember = {
      id: generateMemberId(eventId),
      name: customerDetails.name ?? `Guest_${ticketId.slice(-4)}`,
      online: true,
      age: customerDetails.age ?? null,
      gender: customerDetails.gender ?? "Unspecified",
      location: customerDetails.location ?? "Colombo",
      avatar:
        customerDetails.avatar ??
        "https://lh3.googleusercontent.com/aida-public/AB6AXuALcJ8-6ctEr4LedTP1COyudsoxdvCAqMKPfZ-D69X5jGJ5Y-qadEpmEeYKsV23KKRw18O9ZOSyg-0jCznOPfAXWEKDnatwnmHx9hrrM0X0pLq_0D0j8-ky6VXK28FytZnz6FRNEeSXhhDC2ZrULDMZFhy1tzQ-PVnaX8ZOGoFR7hgIU98K3DZdPBgmHn2sTZKbLSqAqpCFlnQK_Kj3PLXNqVOd3e60ou02mcTdYa5k2P1kL6Y4jZ1MWfjyWiRdP1SXWCcfvsik8Co",
      tags: ["New Booking"],
      bio: "Profile details coming soon.",
      occupation: "—",
      occupationIcon: "work",
      education: "—",
      traits: ["New Booking"],
      discoveryIntent: "Curiosity",
      discoveryNote: "Just booked their first event",
      bookedEventId: eventId,
      ticketId,
    };

    setMembers((prevMembers) => [...prevMembers, newMember]);

    return { event: targetEvent, member: newMember, ticketId };
  }, [events]);

  const getEventById = useCallback(
    (eventId) => events.find((event) => event?.id === eventId) ?? getSeedEventById(eventId),
    [events]
  );

  const getMemberById = useCallback(
    (memberId) => members.find((member) => member?.id === memberId),
    [members]
  );

  const value = useMemo(
    () => ({
      events,
      members,
      setEvents,
      setMembers,
      bookTicket,
      getEventById,
      getMemberById,
    }),
    [events, members, bookTicket, getEventById, getMemberById]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return context;
}