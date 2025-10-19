import { useRef, useLayoutEffect, useState } from "react";
import { Accordian } from "../shared/Accordian";

interface ItenaryCardProps {
  day: string;
  imageUrl: string;
  date: string;
  title: string;
  activities: {
    timeOfDay: string;
    items: string[];
  }[];
}

export function ItenaryCard({
  day,
  imageUrl,
  date,
  title,
  activities,
}: ItenaryCardProps) {
  // Sync timeline height to activities content
  const activitiesRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    if (activitiesRef.current) {
      setHeight(activitiesRef.current.offsetHeight);
    }
  }, [activities]);

  return (
    <div className="flex w-full max-w-5xl mx-auto items-center py-8 border-b-2 mt-2">
      {/* Left day label */}
      <div className="flex-grow w-[40%] flex gap-10 items-center justify-between">
        <div className="bg-[#32205d] rounded-[2.5rem] h-60 w-16 flex items-center justify-center  mr-8">
          <span className="text-white text-2xl font-bold -rotate-90 text-nowrap">
            {day}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <img
            src={imageUrl}
            alt={title}
            className="rounded-full object-cover w-40 h-40 shadow-md border"
          />
          <div className="text-center mt-4">
            <div className="font-bold text-xl">{date}</div>
            <div className="text-lg mt-1 font-medium">{title}</div>
          </div>
        </div>
      </div>
      <div className="flex-grow  w-[60%] flex items-start gap-8 justify-between">
        <div
          className="flex gap-7 relative "
          style={{ height }}>
          {/* Timeline */}
          <div
            className="flex flex-col items-center justify-between"
            style={{ height: height || "100%" }}>
            <span className="w-1 flex-1 bg-[#46a0fd]"></span>
          </div>
          <Accordian items={activities} />
        </div>
      </div>
    </div>
  );
}
