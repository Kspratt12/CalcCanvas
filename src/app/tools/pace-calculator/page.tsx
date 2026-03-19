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
