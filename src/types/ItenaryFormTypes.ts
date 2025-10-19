export interface Flight {
  airline: string;
  flightNo: string;
  departure: string;
  arrival: string;
  date: string;
}

export interface Hotel {
  city: string;
  name: string;
  checkIn: string;
  checkOut: string;
  nights: number;
}

export interface Activity {
  imgurl?: string;
  date: string;
  time: string;
  activity: string;
  location: string;
  day: string;
  imgUrl: string;
}

export interface ImportantNote {
  note: string;
  detail: string;
}

export interface Service {
  service: string;
  detail: string;
}

export interface Inclusion {
  category: string;
  count: number;
  details: string;
  status: string;
}

export interface PaymentPlan {
  dueDate: string;
  amount: number;
}
export interface AdditionalActivities {
  city: string;
  activity: string;
  type: string;
  timeRequired: string;
}

export interface ItineraryForm {
  travelerName: string;
  tripTitle: string;
  departure: string;
  destination: string;
  peopleCount: string;
  tripDates: {
    start: string;
    end: string;
  };
  contactInfo: {
    phone: string;
    email: string;
  };
  flights: Flight[];
  hotels: Hotel[];
  activities: Activity[];
  importantNotes: ImportantNote[];
  services: Service[];
  inclusions: Inclusion[];
  additionalActivities: AdditionalActivities[];
  paymentPlans: PaymentPlan[];
  totalAmmount: string;
  tcs: string;
  visaType: string;
  validity: string;
  processingDate: string;
}
