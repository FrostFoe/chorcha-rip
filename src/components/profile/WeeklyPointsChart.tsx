"use client";

import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";

export function WeeklyPointsChart() {
  const [dateRange, setDateRange] = useState("");

  useEffect(() => {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 6);

    const formattedStartDate = startDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    const formattedEndDate = today.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    setDateRange(`${formattedStartDate} - ${formattedEndDate}`);
  }, []);

  return (
    <div className="mt-2 w-full ">
      <div className="-mb-12">
        <div className="flex items-center justify-between relative">
          <div className="flex-1 flex justify-start">
            <button
              type="button"
              className="flex items-center gap-1 text-gray-700 dark:text-gray-100 text-sm md:text-md"
            >
              <ChevronLeft height={16} width={16} />
              <span className="font-medium">গত সপ্তাহ</span>
            </button>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative pr-6">
              <h3 className="font-semibold text-base md:text-lg">
                সাপ্তাহিক পয়েন্ট
              </h3>
              <div className="absolute right-0 top-1.5">
                <div className="group relative">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                  >
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Weekly Points Chart Details</title>
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="16" x2="12" y2="12" />
                      <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                  </button>
                  <div className="opacity-0 group-hover:opacity-100 absolute z-50 bottom-[calc(100%+.5rem)] left-1/2 transform -translate-x-1/2 bg-yellow-900 text-white rounded-lg p-3 shadow-lg w-48 pointer-events-none">
                    <div className="text-md font-semibold">
                      সাপ্তাহিক পয়েন্ট
                    </div>
                    <div className="text-sm">
                      প্রতিদিনের পয়েন্ট এখানে দেখা যাবে
                    </div>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                      <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-yellow-900" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 flex justify-end">
            <div />
          </div>
        </div>
      </div>
      <div className="w-full mx-auto" style={{ maxWidth: "416px" }}>
        <svg
          width="100%"
          height="310"
          viewBox="0 0 401 310"
          preserveAspectRatio="xMidYMid meet"
          className="overflow-visible"
        >
          <title>Weekly Points Chart</title>
          <defs>
            <linearGradient id="chartFillGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F793295B" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#F793295B" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="verticalLineGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#F793295B" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#F793295B" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="
      M 40,210 L 93.5,210 L 147,210 L 200.5,210 L 254,210
      L 254,270
      L 40,270
      Z
    "
            fill="url(#chartFillGradient)"
          />
          <path
            d="M 40,210 L 93.5,210 L 147,210 L 200.5,210 L 254,210"
            stroke="#F79329"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M 40,210 L 40,270"
            stroke="url(#verticalLineGradient)"
            strokeWidth="2"
          />
          <path
            d="M 93.5,210 L 93.5,270"
            stroke="url(#verticalLineGradient)"
            strokeWidth="2"
          />
          <path
            d="M 147,210 L 147,270"
            stroke="url(#verticalLineGradient)"
            strokeWidth="2"
          />
          <path
            d="M 200.5,210 L 200.5,270"
            stroke="url(#verticalLineGradient)"
            strokeWidth="2"
          />
          <path
            d="M 254,210 L 254,270"
            stroke="url(#verticalLineGradient)"
            strokeWidth="2"
          />
          <path
            d="M 307.5,210 L 307.5,270"
            stroke="url(#verticalLineGradient)"
            strokeWidth="2"
          />
          <path
            d="M 361,210 L 361,270"
            stroke="url(#verticalLineGradient)"
            strokeWidth="2"
          />
          <g>
            <text
              x="40"
              y="186"
              fill="currentColor"
              fontSize="18"
              fontWeight=""
              textAnchor="middle"
              fontFamily="sans-serif"
              className="text-foreground"
            >
              ০
            </text>
            <circle cx="40" cy="210" r="7" fill="#9C5B16" />
          </g>
          <g>
            <text
              x="93.5"
              y="186"
              fill="currentColor"
              fontSize="18"
              fontWeight=""
              textAnchor="middle"
              fontFamily="sans-serif"
              className="text-foreground"
            >
              ০
            </text>
            <circle cx="93.5" cy="210" r="7" fill="#9C5B16" />
          </g>
          <g>
            <text
              x="147"
              y="186"
              fill="currentColor"
              fontSize="18"
              fontWeight=""
              textAnchor="middle"
              fontFamily="sans-serif"
              className="text-foreground"
            >
              ০
            </text>
            <circle cx="147" cy="210" r="7" fill="#9C5B16" />
          </g>
          <g>
            <text
              x="200.5"
              y="186"
              fill="currentColor"
              fontSize="18"
              fontWeight=""
              textAnchor="middle"
              fontFamily="sans-serif"
              className="text-foreground"
            >
              ০
            </text>
            <circle cx="200.5" cy="210" r="7" fill="#9C5B16" />
          </g>
          <g>
            <text
              x="254"
              y="186"
              fill="currentColor"
              fontSize="18"
              fontWeight=""
              textAnchor="middle"
              fontFamily="sans-serif"
              className="text-foreground"
            >
              ০
            </text>
            <circle cx="254" cy="210" r="7" fill="#9C5B16" />
          </g>
          {[...Array(7)].map((_, i) => {
            const day = ["S", "M", "T", "W", "T", "F", "S"][i];
            return (
              <g key={`day-${i}`}>
                <defs>
                  <linearGradient
                    id={`verticalLineDayGradient-${i}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                    gradientUnits="objectBoundingBox"
                  >
                    <stop offset="0%" stopColor="#F79329" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#F79329" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <rect
                  x={40 + i * 53.5 - 1}
                  y="218"
                  width="1"
                  height="44"
                  fill={`url(#verticalLineDayGradient-${i})`}
                  rx="1"
                />
                {i === 4 && (
                  <rect
                    x={40 + i * 53.5 - 17}
                    y="268"
                    width="34"
                    height="34"
                    fill="#016A3E"
                    rx="17"
                  />
                )}
                <text
                  x={40 + i * 53.5}
                  y="294"
                  fill="currentColor"
                  fontSize="18"
                  fontWeight="bold"
                  textAnchor="middle"
                  className={i === 4 ? "text-white" : "text-muted-foreground"}
                >
                  {day}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="text-center">
        <span className="font-medium text-sm">{dateRange}</span>
      </div>
    </div>
  );
}
