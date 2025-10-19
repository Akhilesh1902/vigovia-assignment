import type { ItineraryForm } from "@/types/ItenaryFormTypes";

const dummyItineraryData: ItineraryForm = {
  travelerName: "Rahul Sharma",
  tripTitle: "Singapore Business & Leisure Trip",
  tripDates: {
    start: "2025-11-25",
    end: "2025-12-02",
  },
  contactInfo: {
    phone: "+91 98765 43210",
    email: "rahul.sharma@example.com",
  },
  flights: [
    {
      airline: "Singapore Airlines",
      flightNo: "SQ 423",
      departure: "Delhi (DEL)",
      arrival: "Singapore (SIN)",
      date: "2025-11-25",
    },
    {
      airline: "Singapore Airlines",
      flightNo: "SQ 424",
      departure: "Singapore (SIN)",
      arrival: "Delhi (DEL)",
      date: "2025-12-02",
    },
  ],
  hotels: [
    {
      city: "Singapore",
      name: "Marina Bay Sands",
      checkIn: "2025-11-25",
      checkOut: "2025-12-02",
      nights: 7,
    },
    {
      city: "Singapore",
      name: "Raffles Hotel",
      checkIn: "2025-11-25",
      checkOut: "2025-12-02",
      nights: 7,
    },
    {
      city: "Singapore",
      name: "The Ritz-Carlton, Millenia Singapore",
      checkIn: "2025-11-25",
      checkOut: "2025-12-02",
      nights: 7,
    },
    {
      city: "Singapore",
      name: "Capella Singapore",
      checkIn: "2025-11-25",
      checkOut: "2025-12-02",
      nights: 7,
    },
    {
      city: "Singapore",
      name: "Mandarin Oriental, Singapore",
      checkIn: "2025-11-25",
      checkOut: "2025-12-02",
      nights: 7,
    },
    {
      city: "Singapore",
      name: "Fullerton Bay Hotel",
      checkIn: "2025-11-25",
      checkOut: "2025-12-02",
      nights: 7,
    },
  ],
  activities: [
    {
      date: "2025-11-26",
      day: "Day 2",
      time: "morning",
      activity: "Visit Marina Bay Sands Sky Park, Eat breakfast",
      imgUrl: "",
      location: "Marina Bay",
    },
    {
      date: "2025-11-26",
      day: "Day 2",
      time: "afternoon",
      activity: "Explore Gardens by the Bay, Eat Lunch",
      imgUrl: "",
      location: "Gardens by the Bay",
    },
    {
      date: "2025-11-26",
      day: "Day 2",
      time: "evening",
      activity: "Dinner at Marina Bay Restaurant",
      imgUrl: "",
      location: "Marina Bay",
    },
    {
      date: "2025-11-27",
      day: "Day 3",
      time: "morning",
      activity: "Breakfast at local cafe",
      location: "Singapore City",
      imgUrl: "",
    },
    {
      date: "2025-11-27",
      day: "Day 3",
      time: "afternoon",
      activity: "Shopping on Orchard Road",
      imgUrl: "",
      location: "Orchard Road",
    },
  ],
  importantNotes: [
    {
      note: "Visa",
      detail: "Tourist visa approved, carry a printout of approval letter.",
    },
    {
      note: "Health",
      detail: "COVID-19 vaccination certificate required for entry.",
    },
  ],
  services: [
    {
      service: "Airport Pickup",
      detail: "Private car from airport to hotel included",
    },
    {
      service: "City Tour",
      detail: "Half-day guided city tour on Day 2",
    },
  ],
  inclusions: [
    {
      category: "Transport",
      count: 1,
      details: "Airport transfers included",
      status: "Confirmed",
    },
    {
      category: "Meals",
      count: 5,
      details: "Breakfast included at hotel",
      status: "Confirmed",
    },
  ],
  additionalActivities: [
    {
      city: "Singapore",
      activity: "Gardens by the Bay",
      type: "Sightseeing",
      timeRequired: "3-4 hours",
    },
    {
      city: "Singapore",
      activity: "Marina Bay Sands SkyPark",
      type: "Observation Deck",
      timeRequired: "1-2 hours",
    },
    {
      city: "Singapore",
      activity: "Sentosa Island",
      type: "Leisure",
      timeRequired: "Half-day",
    },
    {
      city: "Singapore",
      activity: "Singapore Zoo",
      type: "Wildlife",
      timeRequired: "3-5 hours",
    },
    {
      city: "Singapore",
      activity: "Clarke Quay Nightlife",
      type: "Entertainment",
      timeRequired: "2-3 hours",
    },
    {
      city: "Singapore",
      activity: "Chinatown Food Tour",
      type: "Culinary",
      timeRequired: "2 hours",
    },
    {
      city: "Singapore",
      activity: "Singapore Flyer",
      type: "Observation Wheel",
      timeRequired: "1 hour",
    },
    {
      city: "Singapore",
      activity: "Universal Studios Singapore",
      type: "Theme Park",
      timeRequired: "Full-day",
    },
  ],
  totalAmmount: "90000",
  tcs: "Not Collected",

  paymentPlans: [
    {
      dueDate: "2025-10-15",
      amount: 2500,
    },
    {
      dueDate: "2025-11-10",
      amount: 3500,
    },
  ],
  visaType: "123123",
  validity: "123123",
  processingDate: "asdas",
  departure: "",
  destination: "",
  peopleCount: "",
};

export { dummyItineraryData };
