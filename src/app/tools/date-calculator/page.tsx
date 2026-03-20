"use client";

import { useState } from "react";
import Link from "next/link";

const RELATED_TOOLS = [
  { name: "Age Calculator", href: "/tools/age-calculator" },
  { name: "Percentage Calculator", href: "/tools/percentage-calculator" },
  { name: "Average Calculator", href: "/tools/average-calculator" },
  { name: "BMI Calculator", href: "/tools/bmi-calculator" },
];

type Mode = "between" | "add";

function countBusinessDays(start: Date, end: Date): number {
  let count = 0;
  const current = new Date(start);
  const endTime = end.getTime();
  const dir = start <= end ? 1 : -1;

  if (dir === 1) {
    while (current.getTime() <= endTime) {
      const day = current.getDay();
      if (day !== 0 && day !== 6) count++;
      current.setDate(current.getDate() + 1);
    }
  } else {
    const swap = new Date(end);
    const swapEnd = start.getTime();
    while (swap.getTime() <= swapEnd) {
      const day = swap.getDay();
      if (day !== 0 && day !== 6) count++;
      swap.setDate(swap.getDate() + 1);
    }
  }

  return count;
}

function dateDiff(start: Date, end: Date) {
  const diffMs = Math.abs(end.getTime() - start.getTime());
  const totalDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(totalDays / 7);
  const remainingDays = totalDays % 7;

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  if (start > end) {
    years = Math.abs(years);
    months = Math.abs(months);
    days = Math.abs(days);
  }

  return { totalDays, weeks, remainingDays, years, months, days };
}

export default function DateCalculatorPage() {
  const [mode, setMode] = useState<Mode>("between");
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [addDate, setAddDate] = useState("");
  const [addDays, setAddDays] = useState("");
  const [addOrSub, setAddOrSub] = useState<"add" | "subtract">("add");
  const [betweenResult, setBetweenResult] = useState<{
    totalDays: number;
    weeks: number;
    remainingDays: number;
    years: number;
    months: number;
    days: number;
    businessDays: number;
  } | null>(null);
  const [addResult, setAddResult] = useState<{ resultDate: string; dayOfWeek: string } | null>(null);

  const DAYS_OF_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const calculateBetween = () => {
    if (!date1 || !date2) return;
    const d1 = new Date(date1 + "T00:00:00");
    const d2 = new Date(date2 + "T00:00:00");
    const diff = dateDiff(d1, d2);
    const businessDays = countBusinessDays(
      d1 <= d2 ? d1 : d2,
      d1 <= d2 ? d2 : d1
    );
    setBetweenResult({ ...diff, businessDays });
  };

  const calculateAdd = () => {
    if (!addDate || !addDays) return;
    const d = new Date(addDate + "T00:00:00");
    const numDays = parseInt(addDays);
    if (isNaN(numDays)) return;

    const resultDate = new Date(d);
    resultDate.setDate(resultDate.getDate() + (addOrSub === "add" ? numDays : -numDays));

    setAddResult({
      resultDate: resultDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      dayOfWeek: DAYS_OF_WEEK[resultDate.getDay()],
    });
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How are business days calculated?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Business days count only Monday through Friday, excluding Saturdays and Sundays. This calculator does not account for public holidays, since those vary by country and region."
                }
              },
              {
                "@type": "Question",
                "name": "Does the order of dates matter in the \"between\" mode?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. The calculator automatically determines which date comes first and computes the absolute difference. You can enter the dates in any order and get the same result."
                }
              },
              {
                "@type": "Question",
                "name": "How does it handle leap years?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The calculator uses JavaScript's Date object, which correctly handles leap years (including century-year rules). If your date range spans February 29 in a leap year, that day is counted."
                }
              },
              {
                "@type": "Question",
                "name": "Can I calculate dates far in the past or future?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. JavaScript's Date object supports dates from roughly 271,821 BCE to 275,760 CE, so you can calculate date differences across centuries."
                }
              }
            ]
          })
        }}
      />
      <h1 className="text-3xl font-bold mb-2">Date Calculator</h1>
      <p className="text-gray-600 mb-6">
        Calculate the number of days between two dates or add/subtract days from a specific date.
      </p>

      <div className="w-full max-w-[728px] h-[90px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm mx-auto mb-8 rounded">
        Advertisement
      </div>

      {/* Mode toggle */}
      <div className="flex gap-2 mb-6">
        <button onClick={() => setMode("between")} className={`flex-1 py-3 rounded-lg text-sm font-medium transition ${mode === "between" ? "bg-[#2563eb] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
          Days Between Dates
        </button>
        <button onClick={() => setMode("add")} className={`flex-1 py-3 rounded-lg text-sm font-medium transition ${mode === "add" ? "bg-[#2563eb] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
          Add/Subtract Days
        </button>
      </div>

      {mode === "between" ? (
        <>
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input type="date" value={date1} onChange={(e) => setDate1(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input type="date" value={date2} onChange={(e) => setDate2(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]" />
              </div>
            </div>
            <button onClick={calculateBetween} className="w-full bg-[#2563eb] text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition">
              Calculate
            </button>
          </div>

          {betweenResult && (
            <div className="mb-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center mb-4">
                <div className="text-sm text-gray-600 mb-1">Total Days</div>
                <div className="text-5xl font-bold text-[#2563eb]">{betweenResult.totalDays.toLocaleString()}</div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-[#2563eb]">{betweenResult.years}y {betweenResult.months}m {betweenResult.days}d</div>
                  <div className="text-sm text-gray-600 mt-1">Years/Months/Days</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-[#2563eb]">{betweenResult.weeks}w {betweenResult.remainingDays}d</div>
                  <div className="text-sm text-gray-600 mt-1">Weeks/Days</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-[#2563eb]">{betweenResult.businessDays.toLocaleString()}</div>
                  <div className="text-sm text-gray-600 mt-1">Business Days</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-[#2563eb]">{Math.round(betweenResult.totalDays / 30.44)}</div>
                  <div className="text-sm text-gray-600 mt-1">Approx. Months</div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input type="date" value={addDate} onChange={(e) => setAddDate(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Operation</label>
                <div className="flex gap-2">
                  <button onClick={() => setAddOrSub("add")} className={`flex-1 py-3 rounded-lg text-sm font-medium transition ${addOrSub === "add" ? "bg-[#2563eb] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>Add</button>
                  <button onClick={() => setAddOrSub("subtract")} className={`flex-1 py-3 rounded-lg text-sm font-medium transition ${addOrSub === "subtract" ? "bg-[#2563eb] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>Subtract</button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Days</label>
                <input type="number" value={addDays} onChange={(e) => setAddDays(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]" placeholder="e.g. 90" />
              </div>
            </div>
            <button onClick={calculateAdd} className="w-full bg-[#2563eb] text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition">
              Calculate
            </button>
          </div>

          {addResult && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center mb-6">
              <div className="text-sm text-gray-600 mb-1">Result Date</div>
              <div className="text-3xl font-bold text-[#2563eb]">{addResult.resultDate}</div>
            </div>
          )}
        </>
      )}

      <div className="w-[300px] h-[250px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm mx-auto mt-8 rounded">
        Advertisement
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">How to Use</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Choose &quot;Days Between Dates&quot; to find the difference between two dates.</li>
          <li>Choose &quot;Add/Subtract Days&quot; to find a future or past date.</li>
          <li>For the between-dates mode, business days exclude Saturdays and Sundays.</li>
          <li>Click &quot;Calculate&quot; to see the results.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">How It Works</h2>
        <p className="text-gray-700">
          The &quot;Days Between Dates&quot; mode calculates the exact number of calendar days between two dates, then breaks it down into years, months, days, and weeks. Business days are calculated by counting only Monday through Friday. The &quot;Add/Subtract Days&quot; mode simply adds or removes the specified number of calendar days from the start date, accounting for month lengths and leap years.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">What Is a Date Calculator?</h2>
        <p className="text-gray-700 mb-3">
          A date calculator performs arithmetic with calendar dates — something that&apos;s surprisingly tricky to do in your head. Months have different lengths, leap years add an extra day to February, and business-day calculations need to skip weekends. This tool handles all of that automatically.
        </p>
        <p className="text-gray-700 mb-3">
          The &quot;Days Between Dates&quot; mode counts the exact number of calendar days between any two dates and breaks the result down into years, months, days, weeks, and business days. The &quot;Add/Subtract Days&quot; mode takes a starting date and moves it forward or backward by a specified number of days, giving you the resulting date.
        </p>
        <p className="text-gray-700">
          Whether you&apos;re calculating a project deadline, figuring out how many workdays remain until a milestone, or determining what date falls 90 days from now, this tool gives you instant, accurate results without any manual counting.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Frequently Asked Questions</h2>

        <h3 className="text-lg font-medium mt-4 mb-2">How are business days calculated?</h3>
        <p className="text-gray-700 mb-3">
          Business days count only Monday through Friday, excluding Saturdays and Sundays. This calculator does not account for public holidays, since those vary by country and region. For a precise business-day count including holidays, you would need to manually subtract the relevant holiday dates.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Does the order of dates matter in the &quot;between&quot; mode?</h3>
        <p className="text-gray-700 mb-3">
          No. The calculator automatically determines which date comes first and computes the absolute difference. You can enter the dates in any order and get the same result. The output always shows a positive number of days.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">How does it handle leap years?</h3>
        <p className="text-gray-700 mb-3">
          The calculator uses JavaScript&apos;s Date object, which correctly handles leap years (including century-year rules). If your date range spans February 29 in a leap year, that day is counted. When adding days, the result correctly accounts for the extra day in February.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Can I calculate dates far in the past or future?</h3>
        <p className="text-gray-700 mb-3">
          Yes. JavaScript&apos;s Date object supports dates from roughly 271,821 BCE to 275,760 CE, so you can calculate date differences across centuries. The accuracy is maintained regardless of how far apart the two dates are.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">What is the &quot;approximate months&quot; figure based on?</h3>
        <p className="text-gray-700 mb-3">
          The approximate months value divides the total number of days by 30.44, which is the average length of a month in the Gregorian calendar (365.25 days / 12 months). This gives a quick estimate that is close but may differ slightly from the exact years-months-days breakdown.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Common Use Cases</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Project deadlines</strong> — Calculate exactly how many workdays remain between today and a project due date.</li>
          <li><strong>Contract terms</strong> — Determine the end date of a 90-day, 6-month, or 1-year contract from the signing date.</li>
          <li><strong>Travel planning</strong> — Count the days between your booking date and departure to know how much prep time you have.</li>
          <li><strong>Legal deadlines</strong> — Many legal filings have strict day-count requirements (e.g., &quot;within 30 days of notice&quot;).</li>
          <li><strong>Personal milestones</strong> — Find out how many days until a wedding, graduation, retirement, or other significant event.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Related Tools</h2>
        <div className="flex flex-wrap gap-3">
          {RELATED_TOOLS.map((tool) => (
            <Link key={tool.href} href={tool.href} className="px-4 py-2 bg-blue-50 text-[#2563eb] rounded-lg hover:bg-blue-100 transition text-sm font-medium">
              {tool.name}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
