"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const RELATED_TOOLS = [
  { name: "Age Calculator", href: "/tools/age-calculator" },
  { name: "Date Calculator", href: "/tools/date-calculator" },
  { name: "Unit Converter", href: "/tools/unit-converter" },
];

export default function CountdownTimerPage() {
  const [mode, setMode] = useState<"date" | "timer">("timer");

  // Timer mode
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("5");
  const [seconds, setSeconds] = useState("0");

  // Date mode
  const [targetDate, setTargetDate] = useState("");

  // Countdown state
  const [remaining, setRemaining] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const start = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    let totalMs: number;

    if (mode === "timer") {
      totalMs =
        (parseInt(hours) || 0) * 3600000 +
        (parseInt(minutes) || 0) * 60000 +
        (parseInt(seconds) || 0) * 1000;
    } else {
      if (!targetDate) return;
      totalMs = new Date(targetDate).getTime() - Date.now();
    }

    if (totalMs <= 0) return;

    setRemaining(totalMs);
    setRunning(true);

    const endTime = Date.now() + totalMs;
    intervalRef.current = setInterval(() => {
      const left = endTime - Date.now();
      if (left <= 0) {
        setRemaining(0);
        setRunning(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
      } else {
        setRemaining(left);
      }
    }, 100);
  };

  const pause = () => {
    setRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const reset = () => {
    setRunning(false);
    setRemaining(null);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const formatTime = (ms: number) => {
    const totalSecs = Math.ceil(ms / 1000);
    const d = Math.floor(totalSecs / 86400);
    const h = Math.floor((totalSecs % 86400) / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = totalSecs % 60;

    if (d > 0) {
      return { days: d, hours: h, minutes: m, seconds: s };
    }
    return { days: 0, hours: h, minutes: m, seconds: s };
  };

  const display = remaining !== null ? formatTime(remaining) : null;

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Countdown Timer</h1>
      <p className="text-gray-600 mb-6">
        Set a countdown to any future date or a specific duration.
      </p>

      <div className="w-full max-w-[728px] h-[90px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm mx-auto mb-8 rounded">
        Advertisement
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        {/* Mode toggle */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => { setMode("timer"); reset(); }}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
              mode === "timer"
                ? "bg-[#2563eb] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Timer
          </button>
          <button
            onClick={() => { setMode("date"); reset(); }}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
              mode === "date"
                ? "bg-[#2563eb] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Count to Date
          </button>
        </div>

        {mode === "timer" ? (
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hours</label>
              <input
                type="number"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                min="0"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Minutes</label>
              <input
                type="number"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                min="0"
                max="59"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Seconds</label>
              <input
                type="number"
                value={seconds}
                onChange={(e) => setSeconds(e.target.value)}
                min="0"
                max="59"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
              />
            </div>
          </div>
        ) : (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Target Date & Time</label>
            <input
              type="datetime-local"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
            />
          </div>
        )}

        <div className="flex gap-3">
          {!running ? (
            <button
              onClick={start}
              className="flex-1 bg-[#2563eb] text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Start
            </button>
          ) : (
            <button
              onClick={pause}
              className="flex-1 bg-yellow-500 text-white py-3 rounded-lg font-medium hover:bg-yellow-600 transition"
            >
              Pause
            </button>
          )}
          <button
            onClick={reset}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Display */}
      {display !== null && (
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: "Days", value: display.days },
            { label: "Hours", value: display.hours },
            { label: "Minutes", value: display.minutes },
            { label: "Seconds", value: display.seconds },
          ].map((unit) => (
            <div
              key={unit.label}
              className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center"
            >
              <div className="text-3xl sm:text-4xl font-bold text-[#2563eb] tabular-nums">
                {String(unit.value).padStart(2, "0")}
              </div>
              <div className="text-sm text-gray-600 mt-1">{unit.label}</div>
            </div>
          ))}
        </div>
      )}

      {remaining === 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center mb-6">
          <div className="text-2xl font-bold text-green-600">Time&apos;s up!</div>
        </div>
      )}

      <div className="w-[300px] h-[250px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm mx-auto mt-8 rounded">
        Advertisement
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">How to Use</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Choose &quot;Timer&quot; mode to count down from a specific duration.</li>
          <li>Choose &quot;Count to Date&quot; to count down to a specific date and time.</li>
          <li>Click &quot;Start&quot; to begin the countdown.</li>
          <li>Use &quot;Pause&quot; and &quot;Reset&quot; to control the timer.</li>
        </ul>
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
