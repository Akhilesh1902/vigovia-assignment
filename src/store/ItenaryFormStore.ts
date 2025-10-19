import type { ItineraryForm } from "@/types/ItenaryFormTypes";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type ItineraryFormStore = {
  formData: ItineraryForm;

  updateField: <K extends keyof ItineraryForm>(
    key: K,
    value: ItineraryForm[K]
  ) => void;

  updateNestedField: <
    K extends keyof ItineraryForm,
    NK extends keyof ItineraryForm[K]
  >(
    key: K,
    nestedKey: NK,
    value: ItineraryForm[K][NK]
  ) => void;

  addToArray: <K extends keyof ItineraryForm>(
    key: K,
    newItem: ItineraryForm[K] extends Array<infer U> ? U : never
  ) => void;

  removeFromArray: <K extends keyof ItineraryForm>(
    key: K,
    index: number
  ) => void;
};

const defaultFormData: ItineraryForm = {
  travelerName: "",
  tripTitle: "",
  tripDates: { start: "", end: "" },
  contactInfo: { phone: "", email: "" },
  flights: [],
  hotels: [],
  activities: [],
  importantNotes: [],
  inclusions: [],
  paymentPlans: [],
  services: [],
  additionalActivities: [],
  departure: "",
  destination: "",
  peopleCount: "",
  processingDate: "",
  tcs: "",
  totalAmmount: "",
  validity: "",
  visaType: "",
};

const useItineraryFormStore = create<ItineraryFormStore>()(
  persist(
    (set) => ({
      formData: defaultFormData,

      updateField: (key, value) =>
        set((state) => ({
          formData: {
            ...state.formData,
            [key]: value,
          },
        })),

      updateNestedField: (key, nestedKey, value) =>
        set((state) => ({
          formData: {
            ...state.formData,
            [key]: {
              ...(state.formData[key] as object),
              [nestedKey]: value,
            },
          },
        })),

      addToArray: (key, newItem) =>
        set((state) => ({
          formData: {
            ...state.formData,
            [key]: [...(state.formData[key] as any[]), newItem],
          },
        })),

      removeFromArray: (key, index) =>
        set((state) => {
          const arrayCopy = [...(state.formData[key] as any[])];
          arrayCopy.splice(index, 1);
          return {
            formData: {
              ...state.formData,
              [key]: arrayCopy,
            },
          };
        }),
    }),
    {
      name: "itenary-form-store", // unique localStorage key
      partialize: (state) => ({ formData: state.formData }), // optional: persist only the formData
    }
  )
);
export { useItineraryFormStore };
