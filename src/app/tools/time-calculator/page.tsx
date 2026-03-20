"use client";

import { useState } from "react";
import Link from "next/link";

const RELATED_TOOLS = [
  { name: "Date Calculator", href: "/tools/date-calculator" },
  { name: "Age Calculator", href: "/tools/age-calculator" },
  { name: "Countdown Timer", href: "/tools/countdown-timer" },
  { name: "Pace Calculator", href: "/tools/pace-calculator" },
];

type Mode = "add-subtract" | "between";

export default function TimeCalculatorPage() {
  const [mode, setMode] = useState<Mode>("add-subtract");

  // Add/Subtract state
  const [baseDate, setBaseDate] = useState("");
  const [baseTime, setBaseTime] = useState("");
  const [addDays, setAddDays] = useState("0");
  const [addHours, setAddHours] = useState("0");
  const [addMinutes, setAddMinutes] = useState("0");
  const [addSeconds, setAddSeconds] = useState("0");
  const [operation, setOperation] = useState<"add" | "subtract">("add");
  const [addResult, setAddResult] = useState<string | null>(null);

  // Time Between state
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [betweenResult, setBetweenResult] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    totalSeconds: number;
  } | null>(null);

  const calculateAddSubtract = () => {
    if (!baseDate || !baseTime) return;
    const base = new Date(`${baseDate}T${baseTime}`);
    if (isNaN(base.getTime())) return;

    const totalMs =
      (parseInt(addDays) || 0) * 86400000 +
      (parseInt(addHours) || 0) * 3600000 +
      (parseInt(addMinutes) || 0) * 60000 +
      (parseInt(addSeconds) || 0) * 1000;

    const resultDate =
      operation === "add"
        ? new Date(base.getTime() + totalMs)
        : new Date(base.getTime() - totalMs);

    setAddResult(
      resultDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }) +
        " at " +
        resultDate.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
    );
  };

  const calculateBetween = () => {
    if (!startDate || !startTime || !endDate || !endTime) return;
    const start = new Date(`${startDate}T${startTime}`);
    const end = new Date(`${endDate}T${endTime}`);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return;

    let diffMs = Math.abs(end.getTime() - start.getTime());
    const totalSeconds = Math.floor(diffMs / 1000);

    const days = Math.floor(diffMs / 86400000);
    diffMs -= days * 86400000;
    const hours = Math.floor(diffMs / 3600000);
    diffMs -= hours * 3600000;
    const minutes = Math.floor(diffMs / 60000);
    diffMs -= minutes * 60000;
    const seconds = Math.floor(diffMs / 1000);

    setBetweenResult({ days, hours, minutes, seconds, totalSeconds });
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How does the time calculator handle daylight saving time?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The calculator works with absolute time differences in days, hours, minutes, and seconds. It does not adjust for daylight saving transitions because it operates on raw duration values rather than calendar-aware time zones. For most practical purposes this is the expected behavior.",
                },
              },
              {
                "@type": "Question",
                name: "Can I add more than 24 hours or 60 minutes at once?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. You can enter any number in the days, hours, minutes, or seconds fields. The calculator converts everything to milliseconds internally, so entering 90 minutes is the same as entering 1 hour and 30 minutes.",
                },
              },
              {
                "@type": "Question",
                name: "What is the maximum time span this calculator supports?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The calculator relies on JavaScript's Date object, which can represent dates from roughly 271,821 BCE to 275,760 CE. For any practical time calculation you would ever need, the range is more than sufficient.",
                },
              },
              {
                "@type": "Question",
                name: "Does the Time Between mode care which date comes first?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. The calculator takes the absolute difference between the two date-times, so it does not matter which one you enter as the start or the end. The result is always a positive duration.",
                },
              },
              {
                "@type": "Question",
                name: "Can I use this to calculate time zones?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "This calculator works with local times and durations. It is not designed for time zone conversion. If you need to find the time difference between two cities, you would need to manually account for the UTC offset of each location.",
                },
              },
            ],
          }),
        }}
      />

      <h1 className="text-3xl font-bold mb-2">Time Calculator</h1>
      <p className="text-gray-600 mb-6">
        Add or subtract time from a date, or find the exact duration between two
        date-times.
      </p>

      <div className="w-full max-w-[728px] h-[90px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm mx-auto mb-8 rounded">
        Advertisement
      </div>

      {/* Mode toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setMode("add-subtract")}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
            mode === "add-subtract"
              ? "bg-[#2563eb] text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Add / Subtract Time
        </button>
        <button
          onClick={() => setMode("between")}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
            mode === "between"
              ? "bg-[#2563eb] text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Time Between
        </button>
      </div>

      {/* Add / Subtract Mode */}
      {mode === "add-subtract" && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={baseDate}
                onChange={(e) => setBaseDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Time
              </label>
              <input
                type="time"
                step="1"
                value={baseTime}
                onChange={(e) => setBaseTime(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
              />
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setOperation("add")}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
                operation === "add"
                  ? "bg-[#2563eb] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              + Add
            </button>
            <button
              onClick={() => setOperation("subtract")}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
                operation === "subtract"
                  ? "bg-[#2563eb] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              &minus; Subtract
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Days
              </label>
              <input
                type="number"
                min="0"
                value={addDays}
                onChange={(e) => setAddDays(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hours
              </label>
              <input
                type="number"
                min="0"
                value={addHours}
                onChange={(e) => setAddHours(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minutes
              </label>
              <input
                type="number"
                min="0"
                value={addMinutes}
                onChange={(e) => setAddMinutes(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Seconds
              </label>
              <input
                type="number"
                min="0"
                value={addSeconds}
                onChange={(e) => setAddSeconds(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
              />
            </div>
          </div>

          <button
            onClick={calculateAddSubtract}
            className="w-full bg-[#2563eb] text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Calculate
          </button>
        </div>
      )}

      {mode === "add-subtract" && addResult && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center mb-6">
          <div className="text-sm text-gray-600 mb-1">Result</div>
          <div className="text-2xl font-bold text-[#2563eb]">{addResult}</div>
        </div>
      )}

      {/* Time Between Mode */}
      {mode === "between" && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Start
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <input
                type="time"
                step="1"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
              />
            </div>
          </div>

          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            End
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <input
                type="time"
                step="1"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
              />
            </div>
          </div>

          <button
            onClick={calculateBetween}
            className="w-full bg-[#2563eb] text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Calculate Duration
          </button>
        </div>
      )}

      {mode === "between" && betweenResult && (
        <div className="mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center mb-4">
            <div className="text-sm text-gray-600 mb-1">Duration</div>
            <div className="text-3xl font-bold text-[#2563eb]">
              {betweenResult.days}d {betweenResult.hours}h{" "}
              {betweenResult.minutes}m {betweenResult.seconds}s
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-[#2563eb]">
                {betweenResult.days}
              </div>
              <div className="text-sm text-gray-600 mt-1">Days</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-[#2563eb]">
                {betweenResult.hours}
              </div>
              <div className="text-sm text-gray-600 mt-1">Hours</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-[#2563eb]">
                {betweenResult.minutes}
              </div>
              <div className="text-sm text-gray-600 mt-1">Minutes</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-[#2563eb]">
                {betweenResult.seconds}
              </div>
              <div className="text-sm text-gray-600 mt-1">Seconds</div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center mt-4">
            <div className="text-2xl font-bold text-[#2563eb]">
              {betweenResult.totalSeconds.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 mt-1">Total Seconds</div>
          </div>
        </div>
      )}

      <div className="w-[300px] h-[250px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm mx-auto mt-8 rounded">
        Advertisement
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">What Is a Time Calculator?</h2>
        <p className="text-gray-700 mb-3">
          A time calculator lets you perform arithmetic with dates and times the
          same way a regular calculator works with numbers. Instead of manually
          counting days on a calendar or converting hours to minutes in your head,
          you enter the values and get an instant, accurate result. The tool
          handles all of the tricky conversions between days, hours, minutes, and
          seconds for you.
        </p>
        <p className="text-gray-700 mb-3">
          This calculator offers two modes. &quot;Add / Subtract Time&quot; takes a
          starting date and time, then shifts it forward or backward by whatever
          duration you specify. &quot;Time Between&quot; accepts two date-time
          pairs and returns the exact gap between them, broken down into days,
          hours, minutes, and seconds as well as a total seconds count.
        </p>
        <p className="text-gray-700">
          Every calculation runs entirely in your browser. No data is sent to any
          server, and you can use the tool offline once the page has loaded.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Example</h2>
        <p className="text-gray-700 mb-3">
          Suppose you need to know the exact date and time 45 days and 6 hours from
          now. Select today&apos;s date, enter the current time, type
          &quot;45&quot; in the Days field and &quot;6&quot; in the Hours field,
          and click &quot;Calculate.&quot; The result instantly shows the future
          date and time. Alternatively, if you want to find out how long it has
          been since a past event, switch to &quot;Time Between,&quot; enter the
          event&apos;s date-time as the start and today as the end, and the
          calculator displays the full breakdown.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Frequently Asked Questions</h2>

        <h3 className="text-lg font-medium mt-4 mb-2">
          How does the time calculator handle daylight saving time?
        </h3>
        <p className="text-gray-700 mb-3">
          The calculator works with absolute time differences in days, hours,
          minutes, and seconds. It does not adjust for daylight saving transitions
          because it operates on raw duration values rather than calendar-aware time
          zones. For most practical purposes this is the expected behavior.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">
          Can I add more than 24 hours or 60 minutes at once?
        </h3>
        <p className="text-gray-700 mb-3">
          Yes. You can enter any number in the days, hours, minutes, or seconds
          fields. The calculator converts everything to milliseconds internally, so
          entering 90 minutes is the same as entering 1 hour and 30 minutes.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">
          What is the maximum time span this calculator supports?
        </h3>
        <p className="text-gray-700 mb-3">
          The calculator relies on JavaScript&apos;s Date object, which can
          represent dates from roughly 271,821 BCE to 275,760 CE. For any
          practical time calculation you would ever need, the range is more than
          sufficient.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">
          Does the Time Between mode care which date comes first?
        </h3>
        <p className="text-gray-700 mb-3">
          No. The calculator takes the absolute difference between the two
          date-times, so it does not matter which one you enter as the start or the
          end. The result is always a positive duration.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">
          Can I use this to calculate time zones?
        </h3>
        <p className="text-gray-700 mb-3">
          This calculator works with local times and durations. It is not designed
          for time zone conversion. If you need to find the time difference between
          two cities, you would need to manually account for the UTC offset of each
          location.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Related Tools</h2>
        <div className="flex flex-wrap gap-3">
          {RELATED_TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="px-4 py-2 bg-blue-50 text-[#2563eb] rounded-lg hover:bg-blue-100 transition text-sm font-medium"
            >
              {tool.name}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
