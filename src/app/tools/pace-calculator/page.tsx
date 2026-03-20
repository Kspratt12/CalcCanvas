"use client";

import { useState } from "react";
import Link from "next/link";


const RELATED_TOOLS = [
  { name: "Calorie Calculator", href: "/tools/calorie-calculator" },
  { name: "BMI Calculator", href: "/tools/bmi-calculator" },
  { name: "BMR Calculator", href: "/tools/bmr-calculator" },
  { name: "Age Calculator", href: "/tools/age-calculator" },
];

const RACE_DISTANCES_MI = [
  { name: "5K", miles: 3.10686 },
  { name: "10K", miles: 6.21371 },
  { name: "Half Marathon", miles: 13.1094 },
  { name: "Marathon", miles: 26.2188 },
];

const RACE_DISTANCES_KM = [
  { name: "5K", km: 5 },
  { name: "10K", km: 10 },
  { name: "Half Marathon", km: 21.0975 },
  { name: "Marathon", km: 42.195 },
];

function formatTime(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.round(totalSeconds % 60);
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

type CalcMode = "pace" | "time" | "distance";

export default function PaceCalculatorPage() {
  const [mode, setMode] = useState<CalcMode>("pace");
  const [distUnit, setDistUnit] = useState<"miles" | "km">("miles");
  const [distance, setDistance] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [paceMin, setPaceMin] = useState("");
  const [paceSec, setPaceSec] = useState("");
  const [result, setResult] = useState<{
    pace: string;
    totalTime: string;
    distance: string;
    raceEstimates: { name: string; time: string }[];
  } | null>(null);

  const calculate = () => {
    const dist = parseFloat(distance) || 0;
    const totalTimeSec = (parseFloat(hours) || 0) * 3600 + (parseFloat(minutes) || 0) * 60 + (parseFloat(seconds) || 0);
    const pacePerUnitSec = (parseFloat(paceMin) || 0) * 60 + (parseFloat(paceSec) || 0);

    let computedPace: number; // seconds per unit
    let computedTime: number; // total seconds
    let computedDist: number; // distance

    if (mode === "pace") {
      if (!dist || !totalTimeSec) return;
      computedDist = dist;
      computedTime = totalTimeSec;
      computedPace = totalTimeSec / dist;
    } else if (mode === "time") {
      if (!dist || !pacePerUnitSec) return;
      computedDist = dist;
      computedPace = pacePerUnitSec;
      computedTime = pacePerUnitSec * dist;
    } else {
      if (!totalTimeSec || !pacePerUnitSec) return;
      computedPace = pacePerUnitSec;
      computedTime = totalTimeSec;
      computedDist = totalTimeSec / pacePerUnitSec;
    }

    const races = distUnit === "miles" ? RACE_DISTANCES_MI : RACE_DISTANCES_KM;
    const raceEstimates = races.map((r) => {
      const d = distUnit === "miles" ? (r as { name: string; miles: number }).miles : (r as { name: string; km: number }).km;
      return { name: r.name, time: formatTime(computedPace * d) };
    });

    setResult({
      pace: formatTime(computedPace) + ` / ${distUnit === "miles" ? "mi" : "km"}`,
      totalTime: formatTime(computedTime),
      distance: computedDist.toFixed(2) + ` ${distUnit}`,
      raceEstimates,
    });
  };

  const unitLabel = distUnit === "miles" ? "mi" : "km";

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
                "name": "What is a good running pace for beginners?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Most beginner runners start at a pace of 10 to 13 minutes per mile (6:15 to 8:00 per kilometer). The right pace for you is one where you can hold a conversation without gasping for breath."
                }
              },
              {
                "@type": "Question",
                "name": "How do I convert pace to speed?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "To convert pace (minutes per mile) to speed (miles per hour), divide 60 by your pace in minutes. For example, a 10-minute mile pace equals 6.0 miles per hour."
                }
              },
              {
                "@type": "Question",
                "name": "Why do the race estimates assume constant pace?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Constant pace is the simplest and most useful assumption for planning purposes. In reality, most runners experience positive splits, meaning they slow down in the second half of a race. The constant pace estimate gives you a solid baseline to plan around."
                }
              },
              {
                "@type": "Question",
                "name": "How can I improve my pace?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Incorporate a mix of easy runs, tempo runs, and interval training into your weekly schedule. Most coaches recommend keeping about 80 percent of your weekly mileage at an easy, conversational pace."
                }
              }
            ]
          })
        }}
      />
      <h1 className="text-3xl font-bold mb-2">Pace Calculator</h1>
      <p className="text-gray-600 mb-6">
        Calculate your running pace, finish time, or distance. Get estimated finish times for popular race distances.
      </p>

      <div className="w-full max-w-[728px] h-[90px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm mx-auto mb-8 rounded">
        Advertisement
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        {/* Unit toggle */}
        <div className="flex gap-2 mb-4">
          <button onClick={() => setDistUnit("miles")} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${distUnit === "miles" ? "bg-[#2563eb] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>Miles</button>
          <button onClick={() => setDistUnit("km")} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${distUnit === "km" ? "bg-[#2563eb] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>Kilometers</button>
        </div>

        {/* Mode toggle */}
        <div className="flex gap-2 mb-6">
          {[
            { key: "pace" as const, label: "Calculate Pace" },
            { key: "time" as const, label: "Calculate Time" },
            { key: "distance" as const, label: "Calculate Distance" },
          ].map((m) => (
            <button key={m.key} onClick={() => setMode(m.key)} className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${mode === m.key ? "bg-[#2563eb] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
              {m.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {mode !== "distance" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Distance ({unitLabel})</label>
              <input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]" placeholder={`e.g. ${distUnit === "miles" ? "3.1" : "5"}`} />
            </div>
          )}

          {mode !== "time" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <div className="flex gap-1">
                <input type="number" value={hours} onChange={(e) => setHours(e.target.value)} className="w-1/3 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]" placeholder="hr" />
                <input type="number" value={minutes} onChange={(e) => setMinutes(e.target.value)} className="w-1/3 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]" placeholder="min" />
                <input type="number" value={seconds} onChange={(e) => setSeconds(e.target.value)} className="w-1/3 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]" placeholder="sec" />
              </div>
            </div>
          )}

          {mode !== "pace" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pace (per {unitLabel})</label>
              <div className="flex gap-1">
                <input type="number" value={paceMin} onChange={(e) => setPaceMin(e.target.value)} className="w-1/2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]" placeholder="min" />
                <input type="number" value={paceSec} onChange={(e) => setPaceSec(e.target.value)} className="w-1/2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]" placeholder="sec" />
              </div>
            </div>
          )}
        </div>

        <button onClick={calculate} className="w-full bg-[#2563eb] text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition">
          Calculate
        </button>
      </div>

      {result && (
        <>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-[#2563eb]">{result.pace}</div>
              <div className="text-sm text-gray-600 mt-1">Pace</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-[#2563eb]">{result.totalTime}</div>
              <div className="text-sm text-gray-600 mt-1">Time</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-[#2563eb]">{result.distance}</div>
              <div className="text-sm text-gray-600 mt-1">Distance</div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-3">Estimated Race Finish Times</h3>
            <div className="space-y-2">
              {result.raceEstimates.map((r) => (
                <div key={r.name} className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="text-gray-700">{r.name}</span>
                  <span className="text-[#2563eb] font-bold">{r.time}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="w-[300px] h-[250px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm mx-auto mt-8 rounded">
        Advertisement
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">How to Use</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Choose miles or kilometers, then select what you want to calculate.</li>
          <li>Enter the known values (distance and/or time and/or pace).</li>
          <li>Click &quot;Calculate&quot; to see results and race time estimates.</li>
          <li>Race estimates assume you maintain the same pace throughout.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">How It Works</h2>
        <p className="text-gray-700">
          Pace = Time / Distance. Time = Pace &times; Distance. Distance = Time / Pace. The calculator divides your total time by distance to get your pace per mile or kilometer. Estimated race times are calculated by multiplying your pace by the standard race distance (5K = 3.107 mi, 10K = 6.214 mi, Half Marathon = 13.109 mi, Marathon = 26.219 mi).
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">What Is a Pace Calculator?</h2>
        <p className="text-gray-700 mb-4">
          A pace calculator is a tool that helps runners and walkers figure out the relationship between distance, time, and speed. If you know any two of these three values, you can calculate the third. Pace is typically expressed as minutes per mile or minutes per kilometer, and it tells you how fast you&apos;re covering ground. Unlike speed (which measures distance per hour), pace is more intuitive for runners because it directly relates to the effort you feel during each mile or kilometer.
        </p>
        <p className="text-gray-700 mb-4">
          Whether you&apos;re training for your first 5K, chasing a personal record in the marathon, or simply trying to understand your fitness level, knowing your pace is essential. It helps you plan race strategies, set training zones, and track improvement over time. This calculator also provides estimated finish times for popular race distances so you can set realistic goals. Keep in mind that maintaining a steady pace throughout a longer race is difficult, and most runners slow down in the later miles. The estimates here assume a constant pace, so real-world times may vary slightly.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Frequently Asked Questions</h2>

        <h3 className="text-lg font-medium mt-4 mb-2">What is a good running pace for beginners?</h3>
        <p className="text-gray-700 mb-4">
          Most beginner runners start at a pace of 10 to 13 minutes per mile (6:15 to 8:00 per kilometer). The right pace for you is one where you can hold a conversation without gasping for breath. Don&apos;t worry about speed when you&apos;re starting out — consistency and building endurance matter far more in the early stages.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">How do I convert pace to speed?</h3>
        <p className="text-gray-700 mb-4">
          To convert pace (minutes per mile) to speed (miles per hour), divide 60 by your pace in minutes. For example, a 10-minute mile pace equals 6.0 miles per hour. For kilometers, divide 60 by your pace in minutes per kilometer. A 5-minute per kilometer pace equals 12 kilometers per hour.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Why do the race estimates assume constant pace?</h3>
        <p className="text-gray-700 mb-4">
          Constant pace is the simplest and most useful assumption for planning purposes. In reality, most runners experience &quot;positive splits,&quot; meaning they slow down in the second half of a race. Elite runners sometimes run &quot;negative splits,&quot; getting faster as the race progresses. The constant pace estimate gives you a solid baseline to plan around.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">How can I improve my pace?</h3>
        <p className="text-gray-700 mb-4">
          Incorporate a mix of easy runs, tempo runs, and interval training into your weekly schedule. Easy runs build your aerobic base, tempo runs improve your lactate threshold, and intervals boost your top-end speed. Most coaches recommend keeping about 80 percent of your weekly mileage at an easy, conversational pace.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Should I train at my goal race pace?</h3>
        <p className="text-gray-700 mb-4">
          Goal race pace workouts are valuable, but they should be only a small portion of your training. Running too fast too often leads to overtraining and injury. One or two race-pace sessions per week, combined with easy runs and rest days, is a balanced approach that builds fitness safely.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Example Calculation</h2>
        <p className="text-gray-700 mb-4">
          Suppose you ran 3.1 miles (a 5K) in 27 minutes and 30 seconds. Your pace is 27:30 / 3.1 = <strong>8:52 per mile</strong>. At that same pace, your estimated finish times would be: <strong>10K</strong>: 55:03, <strong>Half Marathon</strong>: 1:56:12, <strong>Marathon</strong>: 3:52:24. These estimates help you set goals for future races. For instance, if you want to break 25 minutes in the 5K, you would need to run at about an 8:04 per mile pace.
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
