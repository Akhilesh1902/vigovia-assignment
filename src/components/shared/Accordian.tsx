type AccordionItem = {
  timeOfDay: string;
  items: string[];
};

type AccordionProps = {
  items: AccordionItem[];
};

export function Accordian({ items }: AccordionProps) {
  return (
    <div className="w-full  rounded-md   bg-white ">
      <span className="w-1 h-full bg-blue-400 absolute"></span>
      {items.map((item, idx) => (
        <div
          key={idx}
          className="flex relative">
          <span className="absolute border-6 border-indigo-800 bg-white rounded-full w-6 h-6 block top-[18px] left-[-10px]"></span>
          <div className="w-[200px] py-4 px-6 text-left font-medium text-lg text-violet-700 capitalize">
            {item.timeOfDay}
          </div>
          <div className="w-full py-4 px-6">
            <ul className="list-disc ml-6 space-y-1">
              {item.items.map((line, lineIdx) => (
                <li key={lineIdx}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
