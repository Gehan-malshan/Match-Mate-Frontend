// Helpers to adapt the backend EventResponseDTO to the existing UI components.

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=80";

export const formatEventDate = (value) => {
  if (!value) return "Date TBA";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date TBA";
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const formatEventTime = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
};

export const prettifyType = (type) =>
  type ? String(type).replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()) : "";

// Derive a display badge from status + seat availability.
export const deriveStatus = (event) => {
  const status = event?.eventStatus;
  const seats = event?.availableSeats ?? 0;

  if (status === "CANCELLED") {
    return { label: "Cancelled", type: "closed", variant: "neutral" };
  }
  if (status === "COMPLETED") {
    return { label: "Completed", type: "closed", variant: "neutral" };
  }
  if (seats <= 0) {
    return { label: "Waitlist", type: "waitlist", variant: "secondary" };
  }
  return { label: "Booking Open", type: "open", variant: "primary" };
};

// EventResponseDTO -> EventCard props
export const mapEventToCard = (event) => {
  const status = deriveStatus(event);
  return {
    id: event.eventId,
    image: event.imageUrl || FALLBACK_IMAGE,
    title: event.eventName,
    location: event.location,
    date: formatEventDate(event.eventDate),
    time: formatEventTime(event.eventDate),
    badge: status.label,
    badgeVariant: status.variant,
    grayscale: status.type === "closed",
    ctaLabel: status.type === "open" ? "Step Inside" : "View Details",
  };
};

export { FALLBACK_IMAGE };
