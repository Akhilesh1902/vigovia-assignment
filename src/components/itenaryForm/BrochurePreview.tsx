// @ts-nocheck

import { MdAirplanemodeActive } from "react-icons/md";
import { ItenaryCard } from "./ItenaryCard";
import { useItineraryFormStore } from "@/store/ItenaryFormStore";
import { dummyItineraryData } from "./dummyData";
import type { Activity } from "@/types/ItenaryFormTypes";
import jsPDF from "jspdf";

import html2canvas from "html2canvas-pro";
import Footer from "../shared/Footer";
import { useEffect } from "react";

function transformHotelsData(hotels: any) {
  if (!hotels)
    return {
      city: [],
      name: [],
      checkIn: [],
      checkOut: [],
      nights: [],
    };
  return {
    city: hotels.map((h) => h.city),
    name: hotels.map((h) => h.name),
    checkIn: hotels.map((h) => h.checkIn),
    checkOut: hotels.map((h) => h.checkOut),
    nights: hotels.map((h) => h.nights),
  };
}
function transformInstallments(data: any) {
  if (!data)
    return {
      idx: [],
      amount: [],
      dueDate: [],
    };
  return {
    idx: data.map((h, idx) => idx),
    amount: data.map((h) => h.amount),
    dueDate: data.map((h) => h.dueDate),
  };
}

function transofrmNotesData(notes: any) {
  if (!notes)
    return {
      point: [],
      details: [],
    };
  return {
    point: notes.map((n) => n.note),
    details: notes.map((n) => n.detail),
  };
}
function transofrmServiceData(services: any) {
  if (!services)
    return {
      point: [],
      details: [],
    };
  return {
    point: services.map((n) => n.service),
    details: services.map((n) => n.detail),
  };
}
function transofrmInclusionSummaryData(data: any) {
  if (!data)
    return {
      category: [],
      count: [],
      details: [],
      status: [],
    };
  return {
    category: data.map((n) => n.category),
    count: data.map((n) => n.count),
    details: data.map((n) => n.details),
    status: data.map((n) => n.status),
  };
}
function tadditionActivity(data: any) {
  if (!data)
    return {
      city: [],
      activity: [],
      type: [],
      timeRequired: [],
    };
  return {
    city: data.map((n) => n.city),
    activity: data.map((n) => n.activity),
    type: data.map((n) => n.type),
    timeRequired: data.map((n) => n.timeRequired),
  };
}

function groupActivitiesByDay(
  activities: Activity[]
): Record<string, Activity[]> {
  // console.log({ activities });
  if (!activities) return {};
  return activities.reduce((grouped, activity) => {
    if (!grouped[activity.day]) {
      grouped[activity.day] = [];
    }
    grouped[activity.day].push(activity);
    return grouped;
  }, {} as Record<string, Activity[]>);
}
function calculateDaysNights(startDateStr: string, endDateStr: string) {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  // Calculate difference in milliseconds
  const diffMs = endDate - startDate;
  // Convert milliseconds to days
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  // Nights are usually days minus 1
  const nights = diffDays > 0 ? diffDays - 1 : 0;

  return { days: diffDays, nights: nights };
}

const BrochurePreview = () => {
  const itenaryFormStore = useItineraryFormStore();
  // console.log(itenaryFormStore.formData);
  // const data = dummyItineraryData;
  const data = itenaryFormStore.formData;
  // console.log({ data });

  const activities = data.activities;
  console.log({ activities });

  const daybygroup = groupActivitiesByDay(data.activities);
  const newHotels = transformHotelsData(data.hotels);
  const newNotes = transofrmNotesData(data.importantNotes);
  const newServices = transofrmServiceData(data.services);
  const newInclusions = transofrmInclusionSummaryData(data.inclusions);
  const newAdditionalActivity = tadditionActivity(data.additionalActivities);
  const newInstallments = transformInstallments(data.paymentPlans);
  // console.log({ daybygroup });

  const downloadElement = async () => {
    const source = window.document.getElementById("printable")!;
    html2canvas(source).then(function (canvas) {
      // Convert pixels to millimeters (1 px ≈ 0.264583 mm)
      const pxToMm = 0.264583;
      const pdfWidth = canvas.width * pxToMm;
      const pdfHeight = canvas.height * pxToMm;

      const imgData = canvas.toDataURL("image/png");
      // Dynamically set pdf size to captured content
      const pdf = new jsPDF({
        orientation: pdfWidth > pdfHeight ? "l" : "p",
        unit: "mm",
        format: [pdfWidth, pdfHeight],
      });

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("document.pdf");
    });
  };

  const { days, nights } = calculateDaysNights(
    data.tripDates.start,
    data.tripDates.end
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="w-full grid place-items-center">
        <div className="flex items-start ">
          <button
            className="!bg-white !border-2 !border-blue-500"
            onClick={() => {
              downloadElement();
            }}>
            Print Pdf
          </button>
        </div>
      </div>
      <div
        className="w-screen grid place-items-center px-20"
        id="printable">
        <div className="max-w-[1200px] bg-white flex flex-col items-center printable py-20">
          <section className="hero w-full flex flex-col items-center justify-between">
            <div className="w-64">
              <img
                src="/logo.png"
                alt=""
              />
            </div>
            <div className="w-full mt-4 pt-8 text-white flex flex-col gap-3 items-center bg-gradient-to-r from-[#4BA1EB] to-[#936FE0] rounded-3xl ">
              <h2 className="text-3xl font-normal">{data.travelerName}</h2>
              <h2 className="text-5xl font-bold">{data.tripTitle}</h2>
              <h2 className="text-2xl font-medium">
                {days} Days {nights} Nights
              </h2>
              <div className="flex gap-4 py-4">
                <MdAirplanemodeActive size={24} />
                <MdAirplanemodeActive size={24} />
                <MdAirplanemodeActive size={24} />
                <MdAirplanemodeActive size={24} />
              </div>
            </div>
            <div className="border-2 border-slate-500 rounded-2xl p-4 mt-10 w-full grid grid-cols-5 place-items-center">
              <div className="flex flex-col">
                <span className="font-bold"> Departure From :</span>
                <span>{data.departure}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold"> Departure :</span>
                <span>{data.tripDates.start}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold"> Arrival :</span>
                <span>{data.tripDates.end}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold"> Destination :</span>
                <span>{data.destination}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold"> No of Travellers :</span>
                <span>{data.peopleCount}</span>
              </div>
            </div>
          </section>
          <hr className="my-10 border-t-2 w-full" />
          <section className="w-full">
            {Object.keys(daybygroup).map((item, idx) => {
              // console.log({ item }, daybygroup[item][0]);
              const tripStartDate = new Date(data.tripDates.start);
              console.log({ tripStartDate, idx });
              tripStartDate.setDate(tripStartDate.getDate() + idx);
              const title = `Arriving ${daybygroup[item][0].location} and Exploring`;
              const imgurl = daybygroup[item][0]?.imgUrl;
              // const newDate = new Date(daybygroup[item][0].date);
              const stringDate = tripStartDate.toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              });
              const activities = daybygroup[item].map((item) => ({
                items: item.activity.split(","),
                timeOfDay: item.time,
              }));
              console.log({ item, activities, stringDate, imgurl });
              return (
                <ItenaryCard
                  key={title + idx}
                  title={title}
                  date={stringDate}
                  day={item}
                  imageUrl={imgurl ?? "/logo.png"}
                  activities={activities}
                />
              );
            })}
          </section>
          {/* <hr className="my-10 border-t-2 w-full" /> */}
          <section className="w-full mt-10 flex flex-col items-center justify-between">
            <h2 className="text-3xl self-start font-bold">
              Flight <span className="text-themeviolet">Summary</span>
            </h2>
            <div className="w-full mt-10 flex flex-col gap-4">
              {data.flights.map((item, idx) => {
                const newDate = new Date(item.date);
                const stringDate = newDate.toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });
                return (
                  <div
                    key={item.flightNo + idx}
                    className=" w-full flex justify-between border-2 rounded-lg border-themeborder">
                    <h2
                      style={{ borderRadius: "8px 40px 40px 8px" }}
                      className="text-xl w-[25%] font-medium bg-themelightacc  outline-2 outline-themeborder p-4  ">
                      {stringDate}
                    </h2>
                    <p className="text-xl p-4">
                      <span className="font-bold">
                        {item.airline} {item.flightNo}
                      </span>{" "}
                      From {item.departure} To {item.arrival}
                    </p>
                  </div>
                );
              })}
            </div>
            <p className="self-start mt-4">
              Note: All flights include meals, seat choice (excluding XL), and
              20kg/25Kg checked baggage.
            </p>
          </section>
          <hr className="my-10 border-t-2 w-full" />
          <section className="w-full mt-10 flex flex-col items-center justify-between">
            <h2 className="text-3xl self-start font-bold">
              Hotel <span className="text-themeviolet">Booking</span>
            </h2>
            <div className="grid mt-10 overflow-clip grid-cols-5 w-full gap-4 ">
              {Object.keys(newHotels).map((item, idx) => {
                return (
                  <div
                    key={idx}
                    className="rounded-4xl overflow-hidden ">
                    <p className="p-4 w-full text-center bg-themeborder capitalize text-white rounded-t-full">
                      {item}
                    </p>
                    <div className="flex-col text-center gap-2 bg-themelightacc">
                      {newHotels[item].map((item, idx) => {
                        return (
                          <p
                            key={item + idx}
                            className="py-4">
                            {item}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="w-full mt-10">
              <p>
                1. All hotels are tentative and can be replaced with similar.
              </p>
              <p>2. Breakfast included for all hotel stays.</p>
              <p>3. All Hotels will be 4* and above category</p>
              <p>
                4. A maximum occupancy of 2 people/room is allowed in most
                hotels.
              </p>
            </div>
          </section>
          <hr className="my-10 border-t-2 w-full" />
          <section className="w-full mt-10 flex flex-col items-center justify-between">
            <h2 className="text-3xl self-start font-bold">
              Important <span className="text-themeviolet">Notes</span>
            </h2>
            <div className="flex mt-10 overflow-clip  w-full gap-4 ">
              {Object.keys(newNotes).map((item, idx) => {
                return (
                  <div
                    key={item + idx}
                    className={`rounded-4xl overflow-hidden ${
                      idx ? "w-[70%]" : "w-[30%]"
                    } `}>
                    <p className="p-4 w-full text-center bg-themeborder capitalize text-white rounded-t-full">
                      {item}
                    </p>
                    <div className="flex-col text-center gap-2 bg-themelightacc ">
                      {newNotes[item].map((item, idx) => {
                        return (
                          <p
                            key={item + idx}
                            className="py-4 h-16">
                            {item}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
          <hr className="my-10 border-t-2 w-full" />
          <section className="w-full mt-10 flex flex-col items-center justify-between">
            <h2 className="text-3xl self-start font-bold">
              Scope Of <span className="text-themeviolet">Service</span>
            </h2>
            <div className="flex mt-10 overflow-clip  w-full gap-4 ">
              {Object.keys(newServices).map((item, idx) => {
                return (
                  <div
                    key={item + idx}
                    className={`rounded-4xl overflow-hidden ${
                      idx ? "w-[70%]" : "w-[30%]"
                    } `}>
                    <p className="p-4 w-full text-center bg-themeborder capitalize text-white rounded-t-full">
                      {item}
                    </p>
                    <div className="grid flex-col place-items-center text-center gap-2 bg-themelightacc ">
                      {newServices[item].map((item, idx) => {
                        return (
                          <p
                            key={item + idx}
                            className="py-4 h-16">
                            {item}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
          <hr className="my-10 border-t-2 w-full" />
          <section className="w-full mt-10 flex flex-col items-center justify-between">
            <h2 className="text-3xl self-start font-bold">
              Inclusion <span className="text-themeviolet">Summary</span>
            </h2>
            <div className="flex mt-10 overflow-clip  w-full gap-4 ">
              {Object.keys(newInclusions).map((item, idx) => {
                return (
                  <div
                    key={idx}
                    className={`rounded-4xl overflow-hidden ${
                      !idx ? "w-[30%]" : idx === 1 ? "w-[20%]" : "w-[70%]"
                    } `}>
                    <p className="p-4 w-full text-center bg-themeborder capitalize text-white rounded-t-full">
                      {item}
                    </p>
                    <div className="grid flex-col place-items-center text-center gap-2 bg-themelightacc ">
                      {newInclusions[item].map((item, idx) => {
                        return (
                          <p
                            key={item + idx}
                            className="py-4 h-16">
                            {item}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="w-full mt-10">
              <p className="font-bold">
                Transfer Policy(Refundable Upon Claim)
              </p>
              <p>
                If any transfer is delayed beyond 15 minutes, customers may book
                an app-based or radio taxi and claim a refund for that specific
                leg.
              </p>
            </div>
          </section>
          <hr className="my-10 border-t-2 w-full" />
          <section className="w-full mt-10 flex flex-col items-center justify-between">
            <h2 className="text-3xl self-start font-bold">
              Activity <span className="text-themeviolet">Table</span>
            </h2>
            <div className="flex mt-10 overflow-clip  w-full gap-4 ">
              {Object.keys(newAdditionalActivity).map((item, idx) => {
                return (
                  <div
                    key={idx}
                    className={`rounded-4xl overflow-hidden ${
                      !idx ? "w-[30%]" : idx === 1 ? "w-[80%]" : "w-[40%]"
                    } `}>
                    <p className="p-4 w-full text-center bg-themeborder capitalize text-white rounded-t-full">
                      {item}
                    </p>
                    <div className="grid flex-col place-items-center text-center gap-2 bg-themelightacc ">
                      {newAdditionalActivity[item].map((item, idx) => {
                        return (
                          <p
                            key={item + idx}
                            className="py-4 h-16">
                            {item}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
          <section className="w-full mt-10 flex flex-col  justify-between">
            <h2 className="text-3xl self-start font-bold mb-8">
              Terms And <span className="text-themeviolet">Condition</span>
            </h2>
            <a href="#">
              <p className="text-xl font-medium underline">
                View All Terms and conditions
              </p>
            </a>
          </section>
          <hr className="my-10 border-t-2 w-full" />
          <section className="w-full mt-16 flex flex-col items-center justify-between">
            <h2 className="text-3xl self-start font-bold">
              Payment <span className="text-themeviolet">Plan</span>
            </h2>
            <div className="w-full mt-10 flex flex-col gap-4">
              <div className=" w-full flex justify-between border-2 rounded-lg border-themeborder">
                <h2
                  style={{ borderRadius: "8px 40px 40px 8px" }}
                  className="text-xl w-[25%] font-bold bg-themelightacc  outline-2 outline-themeborder p-4  ">
                  Total Ammount
                </h2>
                <p className="text-xl p-4 text-center w-full">
                  <span className="font-bold">{data.totalAmmount}</span>{" "}
                  (Inclusive of Tax)
                </p>
              </div>
              <div className=" w-full flex justify-between border-2 rounded-lg border-themeborder">
                <h2
                  style={{ borderRadius: "8px 40px 40px 8px" }}
                  className="text-xl w-[25%] font-bold bg-themelightacc  outline-2 outline-themeborder p-4  ">
                  TCS
                </h2>
                <p className="text-xl p-4 text-center w-full">
                  <span className="font-bold">{data.tcs}</span>
                </p>
              </div>
            </div>
            <div className="flex mt-10 overflow-clip  w-full gap-4 ">
              {Object.keys(newInstallments).map((item, idx) => {
                return (
                  <div
                    key={idx}
                    className={`rounded-4xl overflow-hidden ${
                      !idx ? "w-[30%]" : idx === 1 ? "w-[80%]" : "w-[40%]"
                    } `}>
                    <p className="p-4 w-full text-center bg-themeborder capitalize text-white rounded-t-full">
                      {idx === 0 ? "Installment" : item}
                    </p>
                    <div className="grid flex-col place-items-center text-center gap-2 bg-themelightacc ">
                      {newInstallments[item].map((item, index) => {
                        return (
                          <p
                            key={item + index}
                            className="py-4 h-16">
                            {idx === 0 && "Installment"} {item}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
          <section className="w-full mt-16 flex flex-col items-center justify-between">
            <h2 className="text-3xl self-start font-bold">
              Visa <span className="text-themeviolet">Details</span>
            </h2>
            <div className="border-2 border-slate-500 rounded-2xl p-4 mt-10 w-full grid grid-cols-3 place-items-center">
              <div className="flex flex-col">
                <span className="font-bold"> Visa Type :</span>
                <span>{data.visaType}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold"> Validity :</span>
                <span>{data.validity}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold"> Processing Date :</span>
                <span>{data.processingDate}</span>
              </div>
            </div>
          </section>
          <hr className="my-10 border-t-2 w-full" />
          <section className="flex flex-col items-center gap-10">
            <h1>PLAN PACK GO !</h1>
            <button className="!text-2xl !rounded-full text-white !bg-themeborder w-full">
              Book Now
            </button>
          </section>
        </div>
        <div className="w-full">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default BrochurePreview;
