import type { ItineraryForm } from "@/types/ItenaryFormTypes";
import z from "zod";

const ItinerarySchema = z.object({
  travelerName: z.string().min(1, "Required"),
  tripTitle: z.string().min(1, "Required"),
  departure: z.string().min(1, "Required"),
  destination: z.string().min(1, "Required"),
  peopleCount: z.string().min(1, "Required"),
  tripDates: z.object({
    start: z.string().min(1, "Required"),
    end: z.string().min(1, "Required"),
  }),
  contactInfo: z.object({
    phone: z.string(),
    email: z.string().email("Invalid email"),
  }),
  flights: z
    .array(
      z.object({
        airline: z.string(),
        flightNo: z.string(),
        departure: z.string(),
        arrival: z.string(),
        date: z.string(),
      })
    )
    .min(1),
  hotels: z
    .array(
      z.object({
        name: z.string(),
        city: z.string(),
        checkIn: z.string(),
        checkOut: z.string(),
        nights: z.number(),
      })
    )
    .min(1),
  activities: z.array(
    z.object({
      day: z.string(),
      time: z.string(),
      activity: z.string(),
      date: z.string(),
      location: z.string(),
      imgUrl: z.string(),
    })
  ),
  importantNotes: z.array(z.object({ note: z.string(), detail: z.string() })),
  services: z.array(z.object({ service: z.string(), detail: z.string() })),
  inclusions: z.array(
    z.object({
      category: z.string(),
      count: z.number(),
      details: z.string(),
      status: z.string(),
    })
  ),

  paymentPlans: z.array(
    z.object({
      dueDate: z.string(),
      amount: z.number(),
    })
  ),
  additionalActivities: z.array(
    z.object({
      activity: z.string(),
      city: z.string(),
      timeRequired: z.string(),
      type: z.string(),
    })
  ),
  totalAmmount: z.string(),
  tcs: z.string(),
  processingDate: z.string(),
  validity: z.string(),
  visaType: z.string(),
});
// export type ItineraryFormType = z.infer<typeof ItinerarySchema>;

const defaultItineraryFormValues: ItineraryForm = {
  travelerName: "",
  tripTitle: "",
  departure: "",
  destination: "",
  peopleCount: "0",
  tripDates: { start: "", end: "" },
  contactInfo: { phone: "", email: "" },
  flights: [
    {
      airline: "",
      flightNo: "",
      departure: "",
      arrival: "",
      date: "",
    },
  ],
  hotels: [
    {
      city: "",
      name: "",
      checkIn: "",
      checkOut: "",
      nights: 1,
    },
  ],
  activities: [
    { date: "", time: "", activity: "", location: "", day: "", imgUrl: "" },
  ],
  importantNotes: [{ note: "", detail: "" }],
  services: [{ service: "", detail: "" }],
  inclusions: [{ category: "", count: 0, details: "", status: "" }],
  paymentPlans: [{ dueDate: "", amount: 0 }],
  additionalActivities: [
    { activity: "", city: "", timeRequired: "", type: "" },
  ],
  processingDate: "",
  tcs: "",
  totalAmmount: "",
  validity: "",
  visaType: "",
};

export { ItinerarySchema, defaultItineraryFormValues };
