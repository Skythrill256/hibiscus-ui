"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
const filters = [
  "Data processing",
  "Statistical analysis",
  "Visualization",
  "Threat detection",
  "Traffic analysis",
  "Authentication",
  "Resource tracking",
  "Performance optimization",
  "Anomaly detection",
  "Query response",
  "Knowledge retrieval",
  "Task automation",
  "Energy management",
  "Load balancing",
  "Consumption analysis",
  "Data synchronization",
  "Format conversion",
  "Schema mapping"
];

export default function FilterBarUI({
  selectedFilters,
  onFilterClick
}: {
  selectedFilters: string[];
  onFilterClick: (filter: string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth"
      });
    }
  };
  return (
   <div className="relative px-4 py-3 w-full text-black overflow-x-auto scrollbar-hide mb-4"
   style={{
    msOverflowStyle: 'none',  /* IE and Edge */
    scrollbarWidth: 'none',   /* Firefox */
    WebkitOverflowScrolling: 'touch'
  }}>
      <div className="relative flex items-center">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="z-10 bg-white rounded-full p-1 shadow-md mr-2"
        >
          <ChevronLeft className="w-5 h-5 text-black" />
        </button>

        {/* Scrollable Filters */}
        <div
          ref={scrollRef}
          className="flex items-center gap-3 overflow-x-auto no-scrollbar scroll-smooth"
        >
          {filters.map((item) => (
            <button
              key={item}
              onClick={() => onFilterClick(item)}
              className={`flex items-center gap-1 text-sm px-4 py-2 rounded-lg whitespace-nowrap border transition-colors duration-200
                ${
                  selectedFilters.includes(item)
                    ? "bg-pulse-50 border-pulse-300 text-pulse-700"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="z-10 bg-white rounded-full p-1 shadow-md ml-2"
        >
          <ChevronRight className="w-5 h-5 text-black" />
        </button>
      </div>
    </div>
  );
}
