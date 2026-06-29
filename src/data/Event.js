// src/data/events.js
export const EVENT_TYPES = [
  "Blind Dinner",
  "Cocktail Mixer",
  "Private Gala",
  "Artistic Encounter",
];

export const EVENT_STATUSES = ["Draft", "Scheduled", "Live", "Sold Out"];

export const events = [
  {
    id: "velvet-masquerade",
    title: "The Velvet Masquerade",
    category: "Masquerade",
    status: "Booking Open",
    statusType: "open", // open | closed | waitlist
    date: "Saturday, Oct 28th, 2024",
    time: "9:00 PM — 2:00 AM",
    location: "The Obsidian Lounge, NYC",
    price: 120,
    seatsLeft: 8,
    totalCapacity: 40,
    genderRatio: "Balanced",
    coordinates: "40.7128° N, 74.0060° W",
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAeays-gypeU9ojjEqHK1qkV-0PoPRiNq54bADpwLbbRPzeev4RLzOG-5KoBIugspW5b4SA_yREK4Jp4v2Cn_iALBDcPOvO_gwUJY1_k2E2JIKJrLUMvzbEun6vbfo5ycz78SrlT37Qa6VYwvUq3J0cymH_3zECFeZxTbJ4AGrjN8kUvXjfD2gj76VDLIOrLu_QDX6P2jJkc0BSiEls6108clPpAcFnHBH1NNniIrJoFRfiEzPWzsXjqTfLHPzRKE8dqmiqIbL2NGs",
    mapImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuByqMQ4pCnKRJFn7oYRDck4Q1xFT5D68K8HNeWWVn7YvuHvtE9UBfWarBLXKrWbUTaoFbbuI-tNnorK7TUHLJ2WpkIJtO6WTLBnLOhSe-yAAg8qZPEsTbP0qtWluFAOrHNSBKzBo8ctJeoJybO8pCw4hDlQ15ZBoDO1pI45moNhwbIq5734IGz1mkCuebYt3f6PSNKBXPk_lmAfKcfAT6ogHDMVd--6TBxk5AKRU2QjPfCSZIU_xgtFbjPCT4tjS4VptVulDNNPzsk",
    hostName: "Elowen Vance",
    hostImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAD6CA_lc-zkO8eLFhPEX7yShU9jK6_JKZyJRYicFoQaJGXQUbnv223zpn9WB4oj0ER3_3IbeFEVT7nG0DytLStCDxcD4wiGV5wcmz4OvSmrMkAQD0eHXAszd4jkShnxzdK5yJiYjuqAsv3of49P7HE7lETqlTVf45Hq08pQSdzRiot--8RbXPYWlXRPuSh--tkPqs4XTq9sRxHWNfKFGPTd1HK5OTE6aXGz9VgSMu_IfnslWKy4Mro90BCZFRrCHveKk-py6Qgx50",
    description: [
      "Step behind the veil and into a world where identities are shed and only chemistry remains. The Velvet Masquerade is a curated experience designed for those who seek the thrill of discovery without the bias of first sight. Our host will guide you through a series of anonymous encounters, punctuated by fine wine and an atmospheric soundtrack.",
      "This is not just a party—it is a social experiment in raw attraction. Each guest is required to maintain their anonymity until the stroke of midnight, when the final reveal takes place in the Obsidian Gallery.",
    ],
    features: [
      {
        icon: "restaurant",
        title: "Dinner & Spirits",
        description:
          "A four-course blind tasting menu paired with artisanal cocktails curated by our master mixologist.",
      },
      {
        icon: "apparel",
        title: "Dress Code",
        description:
          "Black Tie & Mask. Deep jewel tones or midnight black only. No street attire will be permitted entry.",
      },
    ],
    preparation: [
      "Pick up your physical invite at the Concierge Desk.",
      "Confirm your dietary allergies via secure portal.",
    ],
    venueNote: "Entrance through the copper door in the alleyway.",
  },
  {
    id: "crimson-affair",
    title: "The Crimson Affair",
    category: "Dinner Date",
    status: "Waitlist",
    statusType: "waitlist",
    date: "Friday, Nov 10th, 2024",
    time: "7:00 PM — 11:00 PM",
    location: "Maison Rouge, Chicago",
    price: 95,
    seatsLeft: 0,
    totalCapacity: 24,
    genderRatio: "Balanced",
    coordinates: "41.8827° N, 87.6233° W",
    heroImage:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
    mapImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuByqMQ4pCnKRJFn7oYRDck4Q1xFT5D68K8HNeWWVn7YvuHvtE9UBfWarBLXKrWbUTaoFbbuI-tNnorK7TUHLJ2WpkIJtO6WTLBnLOhSe-yAAg8qZPEsTbP0qtWluFAOrHNSBKzBo8ctJeoJybO8pCw4hDlQ15ZBoDO1pI45moNhwbIq5734IGz1mkCuebYt3f6PSNKBXPk_lmAfKcfAT6ogHDMVd--6TBxk5AKRU2QjPfCSZIU_xgtFbjPCT4tjS4VptVulDNNPzsk",
    hostName: "Marcus Delacroix",
    hostImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    description: [
      "An intimate candlelit dinner experience where strangers become connections. The Crimson Affair is a curated blind date dinner for twelve pairs, where conversation is the only currency and chemistry is the prize.",
      "Guests dine anonymously across from their matched partner—selected by our compatibility algorithm—and reveal their identities only at the final toast.",
    ],
    features: [
      {
        icon: "wine_bar",
        title: "Sommelier Pairing",
        description:
          "Each course is paired with a hand-selected wine by our resident sommelier, tailored to your palate profile.",
      },
      {
        icon: "forum",
        title: "Curated Conversation",
        description:
          "Table cards with thoughtfully crafted conversation prompts to spark genuine connection beyond small talk.",
      },
    ],
    preparation: [
      "Complete your personality questionnaire 48 hours before the event.",
      "Dress code: Deep red, burgundy, or black formal attire.",
    ],
    venueNote: "Private entrance on the west side of the building.",
  },
  {
    id: "midnight-garden",
    title: "Midnight Garden",
    category: "Outdoor",
    status: "Booking Open",
    statusType: "open",
    date: "Saturday, Nov 18th, 2024",
    time: "8:00 PM — 1:00 AM",
    location: "Rooftop Eden, Los Angeles",
    price: 80,
    seatsLeft: 15,
    totalCapacity: 50,
    genderRatio: "Balanced",
    coordinates: "34.0522° N, 118.2437° W",
    heroImage:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&q=80",
    mapImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuByqMQ4pCnKRJFn7oYRDck4Q1xFT5D68K8HNeWWVn7YvuHvtE9UBfWarBLXKrWbUTaoFbbuI-tNnorK7TUHLJ2WpkIJtO6WTLBnLOhSe-yAAg8qZPEsTbP0qtWluFAOrHNSBKzBo8ctJeoJybO8pCw4hDlQ15ZBoDO1pI45moNhwbIq5734IGz1mkCuebYt3f6PSNKBXPk_lmAfKcfAT6ogHDMVd--6TBxk5AKRU2QjPfCSZIU_xgtFbjPCT4tjS4VptVulDNNPzsk",
    hostName: "Saoirse Moon",
    hostImage:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    description: [
      "Under the open sky and a canopy of fairy lights, Midnight Garden is a rooftop blind dating experience unlike any other. Meet your match surrounded by lush greenery, ambient music, and the glittering LA skyline.",
      "Guests rotate through a series of intimate garden nooks for ten-minute blind encounters before choosing who they'd like to revisit at the evening's end.",
    ],
    features: [
      {
        icon: "local_bar",
        title: "Craft Cocktails",
        description:
          "Seasonal botanical cocktails and mocktails inspired by the garden's own herbs and edible flowers.",
      },
      {
        icon: "music_note",
        title: "Live Acoustic Set",
        description:
          "An intimate live performance by a curated local artist sets the mood for the entire evening.",
      },
    ],
    preparation: [
      "Wear comfortable yet elegant attire — the rooftop can be breezy.",
      "Arrive by 7:45 PM for the welcome reception and briefing.",
    ],
    venueNote: "Take the private elevator to Level 12. Show your e-ticket.",
  },
];

// // src/data/events.js
// export const events = [
//   { id: "obsidian-gala", title: "The Obsidian Gala", location: "Manhattan, NY", date: "Oct 24", time: "9:00 PM", badge: "Booking Open", badgeVariant: "primary", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAAgP5GVrL75kuzgsgD_eYESCi14pYZLgIRFvHapqocRNG-BDkI0jPAGbxTchcZNnq2GZWpILS9xZMmvioNajLWYHotZ0FadLYJXSzfDql1qdUanFsMWunAd_tpRlHVUZSkxJah2AdohojRv4QDugaT8oKbSYSky7M_6D_fliPtElYlJzwOmzAqsTLY3a_hBgudrUsESwZlbcvf6h6jehRBhJZggxfvLpi4GzTTUtiTO3vocXn88iKsPXHtQK4FEr9TmSaM2k-mtqs" },
//   { id: "midnight-mezcal", title: "Midnight Mezcal", location: "Brooklyn, NY", date: "Oct 26", time: "10:30 PM", badge: "Limited Seats", badgeVariant: "secondary", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRCQ2BLHlcl43fE0ISpdjYXa0Hsdx6ljiqAUIQvowJ5IW3c7nKRMeZJnB-_B-ugbBUpVWuVT5omv9DpWXcqFvA2pSeKqm3o5pr1Kwb5lXoKUoQMSq_uw1g_e1Eq7WKXy8heyIlgfPrv3G6rrxVGZCcokLXw-rVW8hYJkEAygGOV-iHmPpaUf5f1CtENwKmStvZK-1R631UoPaPntj44nVfvRJXw-9bH0vw8AV9QlVUCxJOkyoycs8VfHbChg6-C8kbYt_ehQe-8oE" },
//   { id: "crimson-masquerade", title: "Crimson Masquerade", location: "Chelsea, NY", date: "Oct 31", time: "8:00 PM", badge: "Booking Open", badgeVariant: "primary", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCuNDHqfI54hZmQWd4AhXg-SyQtSVNXOTAYq76R6CkfZNdyEU1K9csnOpNa14IU2Pghw-XJgGfRb0-936K6dSU_Hgr9UF1RVsKG30FZFE-i6Ng2r4p-61DxJ-tC98Utv1e9tBwmlvE7-_4eo-HnYDg7K-XtkiNegwjZL1hYwlMbFm8u73eZ2l5eij47Ldn0wiA1X7Lg_KOeOAqngJaRkHbcoIn56XIAaSMq4Q3YzNUA4NQyNMQa0I4unpkZn5pehawXObNo3YwI1EU" },
//   { id: "velvet-noir-dinner", title: "Velvet Noir Dinner", location: "Tribeca, NY", date: "Nov 03", time: "7:30 PM", badge: "Waitlist Only", badgeVariant: "neutral", grayscale: true, ctaLabel: "Join Waitlist", ctaIcon: "lock_open", ctaVariant: "outline", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDW-l8ZNJmd-1gpdREbKSU1BNtTzl-3grjmk79VzmqPBgTZwk5EzWAm4FdmmZDzTzIQK-ZD8DWtpaayNf3yOzj2KN26EOsAj0HxgGTa0n2Db7Ys1mP29BSWBUXz4_uV1u3rqmoNVli-jFYD3CenbL2S4RtfS374DvM1GIwkIPKyCigwiLrMQvu7yl1EBtWGDzL3b64Q0UrG4Vz45jM0oSPNwbGZ872TGpxXTONDBkas3Rx56iZoRGsZuFzeRK4R0yRessZK-wM--J0" },
//   { id: "silent-solstice", title: "The Silent Solstice", location: "SOHO, NY", date: "Nov 12", time: "6:00 PM", badge: "Booking Open", badgeVariant: "primary", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRNHYt94OyLIFXKYGn9MJBvdo1SAMdW2uwdP20f6aBJgQRdDLa5szeHSmcleRf_lGGT_Sq6w6F5yavrz1RmDDqcxvOnQyGc9_77kGC3ReaF5d4mKIb90n_U6AWJgj6lZPs0VZMEiCfU6ecQGEkLJuqbRP03dr4OCjoPDa3KtD4Sc_Z8U20wSo4bHQ6FQBsopcTEywpUs8_Aa8RQc2A6c1BNn38AVpJ-YmbtLx8J0Rzxu88d57qFcGH9WDdKgjHOqnLhbqSbwkTnaU" },
//   { id: "secret-roof-soiree", title: "Secret Roof Soiree", location: "Central Park South", date: "Nov 18", time: "11:00 PM", badge: "Limited Seats", badgeVariant: "secondary", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEpz3S92JIbDOaA-_1p1GXehbkT_-1-kzYruZWsiMAh87B0tqbc-cAf1cjZz7im31dm2MuuBdOsGy7O95mb1WjFPMJeCT3XbuDvYwm7ctx_wJdpXIqlGfCNS0SKOANVaK006ECGErHI8OjUpK0x3I-dA9BWMpgwY9zOiHhN7BY5wk5i0bDRmtLPOGiIC1bXUxbKzBgU1pXozgUZ6Qc8ntOrTX8dHHCJy2JwMzUMomnbdR57gczMeTdVjNDvnc-vQzZQi7ITQl4lAo" },
// ];

export const getEventById = (eventId) =>
  events.find((event) => event.id === eventId);

export const createBlankEvent = () => ({
  id: `EVT-DRAFT-${Date.now()}`,
  name: "",
  description: "",
  tagline: "",
  eventType: EVENT_TYPES[0],
  status: "Draft",
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
  createdBy: "Julian Voss",
  registeredCount: 0,
  matchingStatus: "Not Started",
});

export default events;