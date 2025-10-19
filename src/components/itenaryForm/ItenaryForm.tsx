import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ItinerarySchema,
  defaultItineraryFormValues,
} from "./ItenaryFormSchema";
import { Textarea } from "../ui/textarea";
import { useItineraryFormStore } from "@/store/ItenaryFormStore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import type { ItineraryForm } from "@/types/ItenaryFormTypes";

function getNumberOfDays(startDate: string, endDate: string) {
  const date1 = new Date(startDate);
  const date2 = new Date(endDate);

  const diffInMilliseconds = Math.abs(date2.getTime() - date1.getTime());
  const oneDayInMilliseconds = 1000 * 60 * 60 * 24;

  const diffInDays = Math.round(diffInMilliseconds / oneDayInMilliseconds);
  return diffInDays;
}

export default function ItenaryForm() {
  const methods = useForm<ItineraryForm>({
    resolver: zodResolver(ItinerarySchema),
    defaultValues: defaultItineraryFormValues,
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;
  const navigate = useNavigate();
  const [itenaryDates, setItenaryDates] = useState({ start: "", end: "" });

  // Arrays
  const flightsArray = useFieldArray({ control, name: "flights" });
  const hotelsArray = useFieldArray({ control, name: "hotels" });
  const activitiesArray = useFieldArray({ control, name: "activities" });
  const notesArray = useFieldArray({ control, name: "importantNotes" });
  const servicesArray = useFieldArray({ control, name: "services" });
  const inclusionsArray = useFieldArray({ control, name: "inclusions" });
  const paymentsArray = useFieldArray({ control, name: "paymentPlans" });
  const additionalActivitiesArray = useFieldArray({
    control,
    name: "additionalActivities",
  });

  const itenaryFormStore = useItineraryFormStore();
  // console.log(itenaryFormStore);
  useEffect(() => {
    // Only fill if store data is present
    if (itenaryFormStore.formData) {
      reset(itenaryFormStore.formData);
      // Optionally set local dates state too:
      if (
        itenaryFormStore.formData.tripDates?.start &&
        itenaryFormStore.formData.tripDates?.end
      ) {
        setItenaryDates({
          start: itenaryFormStore.formData.tripDates.start,
          end: itenaryFormStore.formData.tripDates.end,
        });
      }
    }
  }, [itenaryFormStore.formData, reset]);

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <FormProvider {...methods}>
      <Form {...methods}>
        <form
          onSubmit={handleSubmit((data) => {
            // console.log({ errors, isValid });
            // console.log(data);
            // @ts-expect-error asd
            Object.keys(data).forEach((key: keyof ItineraryForm) => {
              console.log(key, data[key]);
              itenaryFormStore.updateField(key, data[key]);
            });
            toast.success("Successfully submitted the form taking to preview", {
              position: "top-right",
            });
            navigate("/preview");
            // console.log(itenaryFormStore.formData);
          })}
          className="space-y-8 max-w-3xl mx-auto p-8 rounded-xl bg-white shadow-lg">
          <h2 className="text-3xl font-medium text-violet-800 ">
            Itenary From
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={control}
              name="travelerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Traveler Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Full Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="tripTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trip Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Trip Title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <FormField
              control={control}
              name="tripDates.start"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      onChange={(e) => {
                        const val = e.target.value;
                        field.onChange(val);
                        setItenaryDates((p) => ({ ...p, start: val }));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="tripDates.end"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      onChange={(e) => {
                        const val = e.target.value;
                        field.onChange(val);
                        setItenaryDates((p) => ({ ...p, end: val }));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <FormField
              control={control}
              name="contactInfo.phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Phone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Phone"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="contactInfo.email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="departure"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Departure</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Departure"
                      type="departure"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="destination"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Destination"
                      type="destination"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="peopleCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>People Count</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="People Count"
                      type="peopleCount"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* {getNumberOfDays(itenaryDates.start, itenaryDates.end)} */}
          {itenaryDates.start === "" || itenaryDates.end === "" ? (
            "select dates"
          ) : (
            <div>
              <h2 className="text-lg font-bold text-violet-700 mb-4">
                Activities
              </h2>
              {activitiesArray.fields.map((item, idx) => (
                <div
                  key={item.id}
                  className="grid grid-cols-2 gap-4 mb-4">
                  <FormField
                    control={control}
                    name={`activities.${idx}.day`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Day</FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            onChange={(e) => {
                              field.onChange(e.target.value);
                            }}>
                            <option
                              value=""
                              hidden></option>
                            {Array.from(
                              {
                                length: getNumberOfDays(
                                  itenaryDates.start,
                                  itenaryDates.end
                                ),
                              },
                              (_, idx) => (
                                <option
                                  key={item.id + idx + 1}
                                  value={`Day ` + (idx + 1)}>
                                  {`Day ${idx + 1}`}
                                </option>
                              )
                            )}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name={`activities.${idx}.time`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time</FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            onChange={(e) => {
                              field.onChange(e.target.value);
                            }}>
                            <option
                              value=""
                              hidden></option>
                            <option value="morning">Morning</option>
                            <option value="afternoon">Afternoon</option>
                            <option value="enening">Evening</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name={`activities.${idx}.activity`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Activity (enter comma separated)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Activity"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name={`activities.${idx}.location`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Location"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name={`activities.${idx}.imgUrl`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ImageUrl</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="ImgUrl"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
          )}
          <div className="flex gap-3">
            <Button
              type="button"
              className="!bg-purple-700"
              onClick={() =>
                activitiesArray.append({
                  date: "",
                  activity: "",
                  day: "",
                  time: "",
                  location: "",
                  imgUrl: "",
                })
              }>
              Add Activity
            </Button>
            <Button
              type="button"
              className="!bg-amber-700"
              onClick={() => {
                activitiesArray.remove(activitiesArray.fields.length - 1);
              }}>
              Remove Activity
            </Button>
          </div>

          <div>
            <h2 className="text-lg font-bold text-violet-700 mb-4">Flights</h2>
            {flightsArray.fields.map((item, idx) => (
              <div
                key={item.id}
                className="grid grid-cols-2 gap-4 mb-4">
                <FormField
                  control={control}
                  name={`flights.${idx}.airline`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Airline</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Airline"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`flights.${idx}.flightNo`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Flight No</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Flight No"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`flights.${idx}.departure`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Departure</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Departure"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`flights.${idx}.arrival`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Arrival</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Arrival"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`flights.${idx}.date`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <Button
              type="button"
              className="!bg-purple-700"
              onClick={() =>
                flightsArray.append({
                  date: "",
                  airline: "",
                  departure: "",
                  arrival: "",
                  flightNo: "",
                })
              }>
              Add Flight
            </Button>
            <Button
              type="button"
              className="!bg-amber-700"
              onClick={() => {
                flightsArray.remove(flightsArray.fields.length - 1);
              }}>
              Remove Flight
            </Button>
          </div>
          <div>
            <h2 className="text-lg font-bold text-violet-700 mb-4">
              Hotel Booking
            </h2>
            {hotelsArray.fields.map((item, idx) => (
              <div
                key={item.id}
                className="grid grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name={`hotels.${idx}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Hotel Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`hotels.${idx}.city`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Hotel Location"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`hotels.${idx}.checkIn`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Check In</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          onChange={(e) => {
                            const val = e.target.value;
                            field.onChange(val);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`hotels.${idx}.checkOut`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Check Out</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          onChange={(e) => {
                            const val = e.target.value;
                            field.onChange(val);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`hotels.${idx}.nights`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Nights</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Total Nights"
                          {...field}
                          onChange={(e) => {
                            field.onChange(parseInt(e.target.value));
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <Button
              type="button"
              className="!bg-purple-700"
              onClick={() =>
                hotelsArray.append({
                  checkIn: "",
                  checkOut: "",
                  city: "",
                  name: "",
                  nights: 0,
                })
              }>
              Add Hotel
            </Button>
            <Button
              type="button"
              className="!bg-amber-700"
              onClick={() => {
                hotelsArray.remove(hotelsArray.fields.length - 1);
              }}>
              Remove Hotel
            </Button>
          </div>
          <div>
            <h2 className="text-lg font-bold text-violet-700 mb-4">
              Important Notes
            </h2>
            {notesArray.fields.map((item, idx) => (
              <div
                key={item.id}
                className="grid grid-cols-2 gap-4 items-start">
                <FormField
                  control={control}
                  name={`importantNotes.${idx}.note`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Note</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Note"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`importantNotes.${idx}.detail`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Details</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter Note Detail"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <Button
              type="button"
              className="!bg-purple-700"
              onClick={() =>
                notesArray.append({
                  detail: "",
                  note: "",
                })
              }>
              Add Notes
            </Button>
            <Button
              type="button"
              className="!bg-amber-700"
              onClick={() => {
                notesArray.remove(notesArray.fields.length - 1);
              }}>
              Remove Notes
            </Button>
          </div>
          <div>
            <h2 className="text-lg font-bold text-violet-700 mb-4">
              Scope of Service
            </h2>
            {servicesArray.fields.map((item, idx) => (
              <div
                key={item.id}
                className="grid grid-cols-2 gap-4 items-start">
                <FormField
                  control={control}
                  name={`services.${idx}.service`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Service"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`services.${idx}.detail`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Details</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter Service Detail"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <Button
              type="button"
              className="!bg-purple-700"
              onClick={() =>
                servicesArray.append({
                  detail: "",
                  service: "",
                })
              }>
              Add Service
            </Button>
            <Button
              type="button"
              className="!bg-amber-700"
              onClick={() => {
                servicesArray.remove(servicesArray.fields.length - 1);
              }}>
              Remove Service
            </Button>
          </div>
          <div>
            <h2 className="text-lg font-bold text-violet-700 mb-4">
              Inclusions
            </h2>
            {inclusionsArray.fields.map((item, idx) => (
              <div
                key={item.id}
                className="grid grid-cols-2 gap-4 items-start">
                <FormField
                  control={control}
                  name={`inclusions.${idx}.category`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Inclusion Category"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`inclusions.${idx}.count`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Count</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Inclusion Count"
                          {...field}
                          onChange={(e) => {
                            field.onChange(parseInt(e.target.value));
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`inclusions.${idx}.status`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Inclusion Status"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`inclusions.${idx}.details`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Details</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Inclusion Details"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <Button
              type="button"
              className="!bg-purple-700"
              onClick={() =>
                inclusionsArray.append({
                  category: "",
                  count: 0,
                  details: "",
                  status: "",
                })
              }>
              Add Inclusion
            </Button>
            <Button
              type="button"
              className="!bg-amber-700"
              onClick={() => {
                inclusionsArray.remove(inclusionsArray.fields.length - 1);
              }}>
              Remove Inclusion
            </Button>
          </div>
          <div>
            <h2 className="text-lg font-bold text-violet-700 mb-4">
              Additional Activities
            </h2>
            {additionalActivitiesArray.fields.map((item, idx) => (
              <div
                key={item.id}
                className="grid grid-cols-2 gap-4 items-start">
                <FormField
                  control={control}
                  name={`additionalActivities.${idx}.activity`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>activity</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Activity"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`additionalActivities.${idx}.city`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="City"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`additionalActivities.${idx}.timeRequired`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time Required</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Time Required"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`additionalActivities.${idx}.type`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Type"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <Button
              type="button"
              className="!bg-purple-700"
              onClick={() =>
                additionalActivitiesArray.append({
                  activity: "",
                  city: "",
                  timeRequired: "",
                  type: "",
                })
              }>
              Add Additional Activity
            </Button>
            <Button
              type="button"
              className="!bg-amber-700"
              onClick={() => {
                additionalActivitiesArray.remove(
                  additionalActivitiesArray.fields.length - 1
                );
              }}>
              Remove Additional Activity
            </Button>
          </div>
          <div>
            <h2 className="text-lg font-bold text-violet-700 mb-4">
              Payment Plans
            </h2>
            {paymentsArray.fields.map((item, idx) => (
              <div
                key={item.id}
                className="grid grid-cols-3 gap-4 mb-4">
                <FormField
                  control={control}
                  name={`paymentPlans.${idx}.dueDate`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Due Date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`paymentPlans.${idx}.amount`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => {
                            field.onChange(parseInt(e.target.value));
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <Button
              type="button"
              className="!bg-purple-700"
              onClick={() =>
                paymentsArray.append({
                  amount: 0,
                  dueDate: "",
                })
              }>
              Add Additional Payment
            </Button>
            <Button
              type="button"
              className="!bg-amber-700"
              onClick={() => {
                paymentsArray.remove(paymentsArray.fields.length - 1);
              }}>
              Remove Additional Payment
            </Button>
          </div>
          <FormField
            control={control}
            name={`totalAmmount`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Ammount</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Total Ammount"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`tcs`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>TCS</FormLabel>
                <FormControl>
                  <Input
                    placeholder="TCS"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`processingDate`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Processing Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(val);
                      setItenaryDates((p) => ({ ...p, start: val }));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`validity`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valid Till</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    onChange={(e) => {
                      const val = e.target.value;
                      field.onChange(val);
                      setItenaryDates((p) => ({ ...p, start: val }));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`visaType`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Visa Type</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Vica Type"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-gradient-to-r from-violet-700 to-blue-400 text-white">
            Submit
          </Button>
        </form>
      </Form>
    </FormProvider>
  );
}
