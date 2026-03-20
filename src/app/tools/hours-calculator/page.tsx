"use client";

import { useState } from "react";
import Link from "next/link";

const RELATED_TOOLS = [
  { name: "Salary to Hourly Converter", href: "/tools/salary-to-hourly-converter" },
  { name: "Time Calculator", href: "/tools/time-calculator" },
  { name: "Date Calculator", href: "/tools/date-calculator" },
  { name: "Tip Calculator", href: "/tools/tip-calculator" },
];

const DEFAULT_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

interface DayEntry {
  label: string;
  startTime: string;
  endTime: string;
  breakMinutes: string;
}

function timeToMinutes(t: string): number {
  if (!t) return 0;
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function formatHoursMinutes(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${h}h ${m}m`;
}

function formatDecimal(totalMinutes: number): string {
  return (totalMinutes / 60).toFixed(2);
}

export default function HoursCalculatorPage() {
  const [entries, setEntries] = useState<DayEntry[]>(
    DEFAULT_DAYS.map((label) => ({
      label,
      startTime: "",
      endTime: "",
      breakMinutes: "0",
    }))
  );
  const [hourlyRate, setHourlyRate] = useState("");
  const [calculated, setCalculated] = useState(false);

  const updateEntry = (
    index: number,
    field: keyof DayEntry,
    value: string
  ) => {
    setEntries((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const getDayMinutes = (entry: DayEntry): number => {
    if (!entry.startTime || !entry.endTime) return 0;
    let start = timeToMinutes(entry.startTime);
    let end = timeToMinutes(entry.endTime);
    if (end <= start) end += 1440; // overnight shift
    const worked = end - start - (parseInt(entry.breakMinutes) || 0);
    return Math.max(worked, 0);
  };

  const totalMinutes = entries.reduce(
    (sum, entry) => sum + getDayMinutes(entry),
    0
  );

  const grossPay =
    hourlyRate && totalMinutes
      ? (totalMinutes / 60) * parseFloat(hourlyRate)
      : null;

  const addRow = () => {
    setEntries((prev) => [
      ...prev,
      { label: `Day ${prev.length + 1}`, startTime: "", endTime: "", breakMinutes: "0" },
    ]);
  };

  const removeRow = (index: number) => {
    if (entries.length <= 1) return;
    setEntries((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setEntries(
      DEFAULT_DAYS.map((label) => ({
        label,
        startTime: "",
        endTime: "",
        breakMinutes: "0",
      }))
    );
    setHourlyRate("");
    setCalculated(false);
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
                name: "How does the hours calculator handle overnight shifts?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "If the end time is earlier than or equal to the start time, the calculator assumes the shift crosses midnight and adds 24 hours to the end time automatically. For example, a shift from 10:00 PM to 6:00 AM is calculated as 8 hours.",
                },
              },
              {
                "@type": "Question",
                name: "Does the calculator account for overtime pay?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The current version multiplies total hours by a single hourly rate. It does not automatically apply overtime rules (such as 1.5x after 40 hours). You can manually calculate overtime by noting total hours and applying the appropriate rate to any hours over your overtime threshold.",
                },
              },
              {
                "@type": "Question",
                name: "Can I add more than seven days?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Click the Add Row button to add as many entries as you need. You can use this feature for bi-weekly timesheets, custom schedules, or to track individual project sessions.",
                },
              },
              {
                "@type": "Question",
                name: "How are break times subtracted?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Break time is entered in minutes and subtracted from the total time between the start and end times for that day. If the break exceeds the available working time, the calculator returns zero hours for that day rather than a negative number.",
                },
              },
              {
                "@type": "Question",
                name: "Is my timesheet data saved?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. All calculations run in your browser and nothing is stored on a server. If you refresh the page, the entries reset to their defaults. For permanent records, copy or screenshot the results before leaving the page.",
                },
              },
            ],
          }),
        }}
      />

      <h1 className="text-3xl font-bold mb-2">Hours Calculator</h1>
      <p className="text-gray-600 mb-6">
        Track your daily work hours, subtract breaks, and calculate weekly
        totals and estimated pay.
      </p>

      <div className="w-full max-w-[728px] h-[90px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm mx-auto mb-8 rounded">
        Advertisement
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        {/* Hourly Rate */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hourly Rate (optional)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              $
            </span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              placeholder="0.00"
              className="w-full border border-gray-300 rounded-lg p-3 pl-7 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
            />
          </div>
        </div>

        {/* Time entries */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm mb-4">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-200">
                <th className="pb-2 pr-2">Day</th>
                <th className="pb-2 pr-2">Start</th>
                <th className="pb-2 pr-2">End</th>
                <th className="pb-2 pr-2">Break (min)</th>
                <th className="pb-2 pr-2">Total</th>
                <th className="pb-2"></th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, i) => {
                const dayMin = getDayMinutes(entry);
                return (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="py-2 pr-2">
                      <input
                        type="text"
                        value={entry.label}
                        onChange={(e) =>
                          updateEntry(i, "label", e.target.value)
                        }
                        className="w-20 sm:w-24 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#2563eb] text-sm"
                      />
                    </td>
                    <td className="py-2 pr-2">
                      <input
                        type="time"
                        value={entry.startTime}
                        onChange={(e) =>
                          updateEntry(i, "startTime", e.target.value)
                        }
                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#2563eb] text-sm"
                      />
                    </td>
                    <td className="py-2 pr-2">
                      <input
                        type="time"
                        value={entry.endTime}
                        onChange={(e) =>
                          updateEntry(i, "endTime", e.target.value)
                        }
                        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#2563eb] text-sm"
                      />
                    </td>
                    <td className="py-2 pr-2">
                      <input
                        type="number"
                        min="0"
                        value={entry.breakMinutes}
                        onChange={(e) =>
                          updateEntry(i, "breakMinutes", e.target.value)
                        }
                        className="w-16 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#2563eb] text-sm"
                      />
                    </td>
                    <td className="py-2 pr-2 font-medium text-gray-700">
                      {entry.startTime && entry.endTime
                        ? formatHoursMinutes(dayMin)
                        : "--"}
                    </td>
                    <td className="py-2">
                      <button
                        onClick={() => removeRow(i)}
                        className="text-gray-400 hover:text-red-500 transition text-lg leading-none"
                        title="Remove row"
                      >
                        &times;
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex gap-3 mb-6">
          <button
            onClick={addRow}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
          >
            + Add Row
          </button>
          <button
            onClick={clearAll}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
          >
            Clear All
          </button>
        </div>

        <button
          onClick={() => setCalculated(true)}
          className="w-full bg-[#2563eb] text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Calculate Total
        </button>
      </div>

      {calculated && totalMinutes > 0 && (
        <div className="mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center mb-4">
            <div className="text-sm text-gray-600 mb-1">Weekly Total</div>
            <div className="text-4xl font-bold text-[#2563eb]">
              {formatHoursMinutes(totalMinutes)}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              ({formatDecimal(totalMinutes)} decimal hours)
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-[#2563eb]">
                {formatDecimal(totalMinutes)}
              </div>
              <div className="text-sm text-gray-600 mt-1">Decimal Hours</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-[#2563eb]">
                {totalMinutes.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 mt-1">Total Minutes</div>
            </div>
            {grossPay !== null && (
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-[#2563eb]">
                  ${grossPay.toFixed(2)}
                </div>
                <div className="text-sm text-gray-600 mt-1">Gross Pay</div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="w-[300px] h-[250px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm mx-auto mt-8 rounded">
        Advertisement
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">What Is an Hours Calculator?</h2>
        <p className="text-gray-700 mb-3">
          An hours calculator is a timesheet tool that computes how many hours
          and minutes you worked based on your clock-in and clock-out times. It
          subtracts any break time you took during the day and tallies everything
          into a weekly total. If you enter an hourly wage, the calculator also
          estimates your gross pay before taxes and deductions.
        </p>
        <p className="text-gray-700 mb-3">
          Keeping accurate records of hours worked is important for freelancers
          billing clients, hourly employees verifying paychecks, and managers
          approving timesheets. This calculator removes the mental math and
          reduces errors that come with manual time tracking, especially when
          shifts cross midnight or involve variable break durations.
        </p>
        <p className="text-gray-700">
          The tool defaults to a Monday-through-Sunday week but you can rename
          days, add extra rows for split shifts, or remove days you did not work.
          All data stays in your browser and is never sent to a server.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Example</h2>
        <p className="text-gray-700 mb-3">
          Imagine you work Monday through Friday, starting at 9:00 AM and
          finishing at 5:30 PM with a 30-minute lunch break each day. Enter
          &quot;09:00&quot; as the start time, &quot;17:30&quot; as the end time,
          and &quot;30&quot; for the break on each of the five rows. Click
          &quot;Calculate Total&quot; and the calculator shows 40 hours 0 minutes
          for the week. If your hourly rate is $25, the gross pay field displays
          $1,000.00.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Frequently Asked Questions</h2>

        <h3 className="text-lg font-medium mt-4 mb-2">
          How does the hours calculator handle overnight shifts?
        </h3>
        <p className="text-gray-700 mb-3">
          If the end time is earlier than or equal to the start time, the
          calculator assumes the shift crosses midnight and adds 24 hours to the
          end time automatically. For example, a shift from 10:00 PM to 6:00 AM
          is calculated as 8 hours.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">
          Does the calculator account for overtime pay?
        </h3>
        <p className="text-gray-700 mb-3">
          The current version multiplies total hours by a single hourly rate. It
          does not automatically apply overtime rules such as 1.5x after 40
          hours. You can manually calculate overtime by noting total hours and
          applying the appropriate rate to any hours over your overtime threshold.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">
          Can I add more than seven days?
        </h3>
        <p className="text-gray-700 mb-3">
          Yes. Click the &quot;Add Row&quot; button to add as many entries as you
          need. You can use this feature for bi-weekly timesheets, custom
          schedules, or to track individual project sessions.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">
          How are break times subtracted?
        </h3>
        <p className="text-gray-700 mb-3">
          Break time is entered in minutes and subtracted from the total time
          between the start and end times for that day. If the break exceeds the
          available working time, the calculator returns zero hours for that day
          rather than a negative number.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">
          Is my timesheet data saved?
        </h3>
        <p className="text-gray-700 mb-3">
          No. All calculations run in your browser and nothing is stored on a
          server. If you refresh the page, the entries reset to their defaults.
          For permanent records, copy or screenshot the results before leaving the
          page.
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
