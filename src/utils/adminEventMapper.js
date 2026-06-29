// Helpers that bridge the admin event form <-> backend Event DTOs.
// Backend enums live in com.edu.basic.event.enums.{EventType,EventStatus}.

export const EVENT_TYPE_OPTIONS = [
  { value: "SPEED_DATING", label: "Speed Dating" },
  { value: "GROUP_DATING", label: "Group Dating" },
  { value: "DINNER_NIGHT", label: "Dinner Night" },
  { value: "ACTIVITY_DATE", label: "Activity Date" },
  { value: "VIRTUAL_DATE", label: "Virtual Date" },
  { value: "ADVENTURE_DATE", label: "Adventure Date" },
];

export const EVENT_STATUS_OPTIONS = [
  { value: "UPCOMING", label: "Upcoming" },
  { value: "ONGOING", label: "Ongoing" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Cancelled" },
];

const STATUS_LABELS = Object.fromEntries(
  EVENT_STATUS_OPTIONS.map((o) => [o.value, o.label])
);
const TYPE_LABELS = Object.fromEntries(
  EVENT_TYPE_OPTIONS.map((o) => [o.value, o.label])
);

// Map backend status -> a css modifier used by the admin list row.
export const statusModifier = (status) => {
  switch (status) {
    case "UPCOMING":
      return "event-row__status--scheduled";
    case "ONGOING":
      return "event-row__status--live";
    case "COMPLETED":
      return "event-row__status--sold-out";
    case "CANCELLED":
      return "event-row__status--draft";
    default:
      return "";
  }
};

// A datetime-local <input> wants "YYYY-MM-DDTHH:MM"; the backend returns ISO
// strings (often with seconds). Trim to minute precision for the form.
const toInputDateTime = (value) => (value ? String(value).slice(0, 16) : "");

// The backend LocalDateTime accepts ISO; ensure seconds are present.
const toBackendDateTime = (value) => {
  if (!value) return null;
  return value.length === 16 ? `${value}:00` : value;
};

const numOrNull = (value) =>
  value === "" || value === null || value === undefined ? null : Number(value);

// A fresh, empty admin form.
export const createBlankEventForm = () => ({
  id: "",
  name: "",
  description: "",
  tagline: "",
  eventType: EVENT_TYPE_OPTIONS[0].value,
  status: "UPCOMING",
  startDateTime: "",
  endDateTime: "",
  address: "",
  latitude: "",
  longitude: "",
  ticketPrice: "",
  totalCapacity: "",
  maleLimit: "",
  femaleLimit: "",
  coverImageUrl: "",
  specialInstructions: "",
  createdAt: "—",
  lastUpdated: "—",
  createdBy: "—",
  registeredCount: 0,
});

// EventResponseDTO -> admin list row.
export const mapEventToAdminRow = (dto) => {
  const registered =
    dto.totalSeats != null && dto.availableSeats != null
      ? dto.totalSeats - dto.availableSeats
      : (dto.confirmedMaleCount ?? 0) + (dto.confirmedFemaleCount ?? 0);
  return {
    id: dto.eventId,
    title: dto.eventName,
    type: TYPE_LABELS[dto.eventType] ?? dto.eventType ?? "—",
    date: dto.eventDate,
    registered,
    totalSeats: dto.totalSeats ?? 0,
    status: dto.eventStatus,
    statusLabel: STATUS_LABELS[dto.eventStatus] ?? dto.eventStatus ?? "—",
    statusModifier: statusModifier(dto.eventStatus),
  };
};

// EventResponseDTO -> admin form state (edit hydration).
export const mapEventToForm = (dto) => ({
  ...createBlankEventForm(),
  id: dto.eventId,
  name: dto.eventName ?? "",
  description: dto.description ?? "",
  eventType: dto.eventType ?? EVENT_TYPE_OPTIONS[0].value,
  status: dto.eventStatus ?? "UPCOMING",
  startDateTime: toInputDateTime(dto.eventDate),
  endDateTime: toInputDateTime(dto.eventEndDate),
  address: dto.location ?? "",
  latitude: dto.latitude ?? "",
  longitude: dto.longitude ?? "",
  ticketPrice: dto.ticketPrice ?? "",
  totalCapacity: dto.totalSeats ?? "",
  maleLimit: dto.maleLimit ?? "",
  femaleLimit: dto.femaleLimit ?? "",
  coverImageUrl: dto.imageUrl ?? "",
  specialInstructions: dto.specialInstructions ?? "",
  createdAt: dto.createdAt ?? "—",
  lastUpdated: dto.updatedAt ?? "—",
  createdBy: dto.createdByUsername ?? "—",
  registeredCount:
    dto.totalSeats != null && dto.availableSeats != null
      ? dto.totalSeats - dto.availableSeats
      : 0,
});

// Admin form -> EventRequestDTO (create). Backend requires every field.
export const buildEventRequest = (form) => ({
  eventName: form.name?.trim(),
  description: form.description?.trim(),
  eventType: form.eventType,
  eventDate: toBackendDateTime(form.startDateTime),
  eventEndDate: toBackendDateTime(form.endDateTime),
  location: form.address?.trim(),
  latitude: numOrNull(form.latitude),
  longitude: numOrNull(form.longitude),
  ticketPrice: numOrNull(form.ticketPrice),
  totalSeats: numOrNull(form.totalCapacity),
  imageUrl: form.coverImageUrl?.trim() || null,
  specialInstructions: form.specialInstructions?.trim() || null,
});

// Admin form -> EventUpdateDTO (edit). Note: no totalSeats; carries eventStatus.
export const buildEventUpdate = (form) => ({
  eventName: form.name?.trim(),
  description: form.description?.trim(),
  eventType: form.eventType,
  eventDate: toBackendDateTime(form.startDateTime),
  eventEndDate: toBackendDateTime(form.endDateTime),
  location: form.address?.trim(),
  latitude: numOrNull(form.latitude),
  longitude: numOrNull(form.longitude),
  ticketPrice: numOrNull(form.ticketPrice),
  eventStatus: form.status,
  imageUrl: form.coverImageUrl?.trim() || null,
  specialInstructions: form.specialInstructions?.trim() || null,
});

// Lightweight client-side validation shared by create/edit.
export const validateEventForm = (form) => {
  const errors = {};
  if (!form.name || form.name.trim().length < 3)
    errors.name = "Event name must be at least 3 characters.";
  if (!form.description || form.description.trim().length < 10)
    errors.description = "Description must be at least 10 characters.";
  if (!form.startDateTime) errors.startDateTime = "Start date & time is required.";
  if (!form.endDateTime) errors.endDateTime = "End date & time is required.";
  if (!form.address || !form.address.trim())
    errors.address = "Location is required.";
  if (numOrNull(form.latitude) === null)
    errors.latitude = "Latitude is required.";
  if (numOrNull(form.longitude) === null)
    errors.longitude = "Longitude is required.";
  if (!(numOrNull(form.ticketPrice) > 0))
    errors.ticketPrice = "Ticket price must be greater than 0.";
  if (!(numOrNull(form.totalCapacity) >= 1))
    errors.totalCapacity = "Total capacity must be at least 1.";
  return errors;
};
