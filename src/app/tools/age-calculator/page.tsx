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
