"use client";

import { useState } from "react";
import Link from "next/link";

const RELATED_TOOLS = [
  { name: "Date Calculator", href: "/tools/date-calculator" },
  { name: "BMI Calculator", href: "/tools/bmi-calculator" },
  { name: "Calorie Calculator", href: "/tools/calorie-calculator" },
  { name: "Percentage Calculator", href: "/tools/percentage-calculator" },
];

const DAYS_OF_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function getZodiac(month: number, day: number): string {
  const signs = [
    { name: "Capricorn", end: [1, 19] },
    { name: "Aquarius", end: [2, 18] },
    { name: "Pisces", end: [3, 20] },
    { name: "Aries", end: [4, 19] },
    { name: "Taurus", end: [5, 20] },
    { name: "Gemini", end: [6, 20] },
    { name: "Cancer", end: [7, 22] },
    { name: "Leo", end: [8, 22] },
    { name: "Virgo", end: [9, 22] },
    { name: "Libra", end: [10, 22] },
    { name: "Scorpio", end: [11, 21] },
    { name: "Sagittarius", end: [12, 21] },
    { name: "Capricorn", end: [12, 31] },
  ];

  for (const sign of signs) {
    if (month < sign.end[0] || (month === sign.end[0] && day <= sign.end[1])) {
      return sign.name;
    }
  }
  return "Capricorn";
}

function calcAge(dob: Date, today: Date) {
  let years = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth() - dob.getMonth();
  let days = today.getDate() - dob.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

export default function AgeCalculatorPage() {
  const [dob, setDob] = useState("");
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
    dayOfWeek: string;
    zodiac: string;
    daysUntilBirthday: number;
  } | null>(null);

  const calculate = () => {
    if (!dob) return;
    const dobDate = new Date(dob + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (dobDate > today) return;

    const age = calcAge(dobDate, today);
    const totalDays = Math.floor((today.getTime() - dobDate.getTime()) / (1000 * 60 * 60 * 24));
    const dayOfWeek = DAYS_OF_WEEK[dobDate.getDay()];
    const zodiac = getZodiac(dobDate.getMonth() + 1, dobDate.getDate());

    // Days until next birthday
    let nextBirthday = new Date(today.getFullYear(), dobDate.getMonth(), dobDate.getDate());
    if (nextBirthday <= today) {
      nextBirthday = new Date(today.getFullYear() + 1, dobDate.getMonth(), dobDate.getDate());
    }
    const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    setResult({
      ...age,
      totalDays,
      dayOfWeek,
      zodiac,
      daysUntilBirthday,
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
                "name": "How is age calculated when the birth day hasn't occurred yet this month?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "If today's date is before your birthday in the current month, the calculator borrows days from the previous month. For example, if you were born on the 25th and today is the 10th, the \"days\" component counts from the 25th of last month to the 10th of this month. This matches how most people intuitively think about age."
                }
              },
              {
                "@type": "Question",
                "name": "Does this calculator account for leap years?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. The underlying JavaScript Date object correctly handles leap years, including the rules for century years (divisible by 100 but not 400). If you were born on February 29, the calculator still works correctly for non-leap years."
                }
              },
              {
                "@type": "Question",
                "name": "How accurate is the zodiac sign calculation?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The zodiac signs are based on standard Western astrology date ranges. The dates are fixed boundaries that don't shift year to year in this implementation. For people born on the exact cusp between two signs, the assigned sign follows the most commonly used date cutoffs."
                }
              },
              {
                "@type": "Question",
                "name": "Can I calculate the age of someone who has passed away?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "This calculator computes age relative to today's date. To calculate someone's age at the time of their passing, you would need to use our Date Calculator tool to find the difference between two specific dates."
                }
              }
            ]
          })
        }}
      />
      <h1 className="text-3xl font-bold mb-2">Age Calculator</h1>
      <p className="text-gray-600 mb-6">
        Find your exact age in years, months, and days, along with fun facts about your birthdate.
      </p>

      <div className="w-full max-w-[728px] h-[90px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm mx-auto mb-8 rounded">
        Advertisement
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
          />
        </div>

        <button onClick={calculate} className="w-full bg-[#2563eb] text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition">
          Calculate Age
        </button>
      </div>

      {result && (
        <div className="mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center mb-4">
            <div className="text-sm text-gray-600 mb-1">Your Age</div>
            <div className="text-4xl font-bold text-[#2563eb]">
              {result.years} years, {result.months} months, {result.days} days
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-[#2563eb]">{result.totalDays.toLocaleString()}</div>
              <div className="text-sm text-gray-600 mt-1">Total Days Alive</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-[#2563eb]">{result.daysUntilBirthday}</div>
              <div className="text-sm text-gray-600 mt-1">Days to Birthday</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-[#2563eb]">{result.dayOfWeek}</div>
              <div className="text-sm text-gray-600 mt-1">Born On</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-[#2563eb]">{result.zodiac}</div>
              <div className="text-sm text-gray-600 mt-1">Zodiac Sign</div>
            </div>
          </div>
        </div>
      )}

      <div className="w-[300px] h-[250px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm mx-auto mt-8 rounded">
        Advertisement
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">How to Use</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Select your date of birth using the date picker.</li>
          <li>Click &quot;Calculate Age&quot; to see your exact age.</li>
          <li>View additional info: total days alive, days until your next birthday, day of the week you were born, and your zodiac sign.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">How It Works</h2>
        <p className="text-gray-700">
          The calculator computes the difference between your date of birth and today&apos;s date, breaking it down into years, months, and days. It accounts for varying month lengths and leap years. The zodiac sign is determined by standard Western astrology date ranges. Total days alive is calculated as the number of full days between your birth date and today.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">What Is an Age Calculator?</h2>
        <p className="text-gray-700 mb-3">
          An age calculator determines exactly how old someone is by computing the difference between their date of birth and today&apos;s date. While this sounds simple, accurate age calculation requires handling variable month lengths, leap years, and the quirks of our calendar system. For example, February has 28 or 29 days, and months range from 28 to 31 days long.
        </p>
        <p className="text-gray-700 mb-3">
          Beyond the basic years-months-days breakdown, this calculator also tells you the total number of days you&apos;ve been alive, what day of the week you were born on, your zodiac sign, and how many days remain until your next birthday. These details are surprisingly useful for everything from filling out official forms to planning birthday celebrations.
        </p>
        <p className="text-gray-700">
          The calculation runs entirely in your browser using JavaScript&apos;s Date object. No personal information is stored or transmitted — your birth date stays on your device.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Frequently Asked Questions</h2>

        <h3 className="text-lg font-medium mt-4 mb-2">How is age calculated when the birth day hasn&apos;t occurred yet this month?</h3>
        <p className="text-gray-700 mb-3">
          If today&apos;s date is before your birthday in the current month, the calculator borrows days from the previous month. For example, if you were born on the 25th and today is the 10th, the &quot;days&quot; component counts from the 25th of last month to the 10th of this month. This matches how most people intuitively think about age.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Does this calculator account for leap years?</h3>
        <p className="text-gray-700 mb-3">
          Yes. The underlying JavaScript Date object correctly handles leap years, including the rules for century years (divisible by 100 but not 400). If you were born on February 29, the calculator still works correctly for non-leap years.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">How accurate is the zodiac sign calculation?</h3>
        <p className="text-gray-700 mb-3">
          The zodiac signs are based on standard Western astrology date ranges. The dates are fixed boundaries that don&apos;t shift year to year in this implementation. For people born on the exact cusp between two signs, the assigned sign follows the most commonly used date cutoffs.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Can I calculate the age of someone who has passed away?</h3>
        <p className="text-gray-700 mb-3">
          This calculator computes age relative to today&apos;s date. To calculate someone&apos;s age at the time of their passing, you would need to use our Date Calculator tool to find the difference between two specific dates.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Common Use Cases</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Official documents</strong> — Quickly determine your exact age for visa applications, insurance forms, or government paperwork.</li>
          <li><strong>Age verification</strong> — Check if someone meets a minimum age requirement for services, competitions, or legal purposes.</li>
          <li><strong>Birthday planning</strong> — See exactly how many days until your next birthday to plan celebrations or count down milestones.</li>
          <li><strong>Health and fitness</strong> — Many health calculators (like BMI or metabolic rate) require your exact age for accurate results.</li>
          <li><strong>Trivia and curiosity</strong> — Find out what day of the week you were born on, or how many total days you&apos;ve been alive.</li>
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
