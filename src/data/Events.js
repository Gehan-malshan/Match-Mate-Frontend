export const mockEvents = [
  {
    eventId: "velvet-masquerade",
    eventName: "Velvet Masquerade",
    description:
      "An intimate masked night of candlelight, live jazz, and slow-burn conversation. Guests arrive anonymous and leave with a story.",
    eventType: "SPEED_DATING",
    eventStatus: "UPCOMING",
    eventDate: "2026-07-18T19:30:00",
    eventEndDate: "2026-07-18T23:00:00",
    location: "Galle Face Terrace, Colombo",
    imageUrl:
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1200&q=80",
    specialInstructions: "Dress in black or deep jewel tones. Masks provided at the door.",
    createdByUsername: "Match Mate",
    latitude: 6.9271,
    longitude: 79.8612,
    ticketPrice: 7500,
    totalSeats: 60,
    availableSeats: 18,
    maleLimit: 30,
    femaleLimit: 30,
  },
  {
    eventId: "midnight-supper-club",
    eventName: "Midnight Supper Club",
    description:
      "A candlelit dinner experience built for first impressions, shared plates, and long conversations that outlast dessert.",
    eventType: "DINNER_NIGHT",
    eventStatus: "UPCOMING",
    eventDate: "2026-07-24T20:00:00",
    eventEndDate: "2026-07-25T00:30:00",
    location: "The Gallery Cafe, Colombo 03",
    imageUrl:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
    specialInstructions: "Smart casual attire. Arrive 15 minutes early for seating.",
    createdByUsername: "Match Mate",
    latitude: 6.9062,
    longitude: 79.8605,
    ticketPrice: 6000,
    totalSeats: 40,
    availableSeats: 12,
    maleLimit: 20,
    femaleLimit: 20,
  },
  {
    eventId: "harbor-afterglow",
    eventName: "Harbor Afterglow",
    description:
      "A social adventure date with live music, waterfront views, and paired mini-challenges designed to spark chemistry.",
    eventType: "ADVENTURE_DATE",
    eventStatus: "ONGOING",
    eventDate: "2026-07-01T18:00:00",
    eventEndDate: "2026-07-01T22:00:00",
    location: "Port City Marina, Colombo",
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
    specialInstructions: "Comfortable shoes recommended. Outdoor sections may run late.",
    createdByUsername: "Match Mate",
    latitude: 6.9398,
    longitude: 79.8403,
    ticketPrice: 5000,
    totalSeats: 50,
    availableSeats: 0,
    maleLimit: 25,
    femaleLimit: 25,
  },
  {
    eventId: "moonlit-circle",
    eventName: "Moonlit Circle",
    description:
      "A guided group dating experience with curated prompts, soft lighting, and a private rooftop view.",
    eventType: "GROUP_DATING",
    eventStatus: "COMPLETED",
    eventDate: "2026-06-20T19:00:00",
    eventEndDate: "2026-06-20T22:30:00",
    location: "Cinnamon Life Rooftop, Colombo",
    imageUrl:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1200&q=80",
    specialInstructions: "Invite-only. Coordinators will share the rooftop access code before arrival.",
    createdByUsername: "Match Mate",
    latitude: 6.9318,
    longitude: 79.8555,
    ticketPrice: 7000,
    totalSeats: 48,
    availableSeats: 0,
    maleLimit: 24,
    femaleLimit: 24,
  },
];

export const getMockEvents = () => mockEvents;

export const getMockEventById = (eventId) =>
  mockEvents.find((event) => event.eventId === eventId) ?? null;
