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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Will the timer keep running if I switch browser tabs?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. The timer calculates remaining time based on the system clock, not by counting individual seconds. If you switch tabs and come back, the displayed time will be correct."
                }
              },
              {
                "@type": "Question",
                "name": "Can I pause and resume the countdown?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Click \"Pause\" to stop the countdown at any point. When you click \"Start\" again, the timer resumes from where it left off. The \"Reset\" button clears the timer entirely."
                }
              },
              {
                "@type": "Question",
                "name": "What happens when the timer reaches zero?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The timer stops automatically and displays a \"Time's up!\" message. The countdown will not go into negative numbers. You can then reset the timer and start a new countdown."
                }
              },
              {
                "@type": "Question",
                "name": "What is the maximum duration I can set?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "In timer mode, you can set any combination of hours, minutes, and seconds. There is no practical upper limit. In date mode, you can count down to any future date and time supported by your browser's date picker."
                }
              }
            ]
          })
        }}
      />
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
        <h2 className="text-xl font-semibold mb-3">What Is a Countdown Timer?</h2>
        <p className="text-gray-700 mb-3">
          A countdown timer tracks the time remaining until a specific moment arrives. Unlike a stopwatch that counts up from zero, a countdown timer starts at a set duration or target date and ticks down to zero. When the timer reaches zero, you know that your designated time has elapsed or your target moment has arrived.
        </p>
        <p className="text-gray-700 mb-3">
          This tool offers two modes. The &quot;Timer&quot; mode lets you set a custom duration using hours, minutes, and seconds — perfect for cooking, workouts, study sessions, or any timed activity. The &quot;Count to Date&quot; mode calculates the remaining time until a specific date and time, which is useful for event countdowns, product launches, or deadlines.
        </p>
        <p className="text-gray-700">
          The timer runs in your browser using JavaScript intervals and calculates the remaining time against a fixed endpoint. This means it stays accurate even if the browser tab is briefly backgrounded, since it recalculates from the current time on each tick rather than simply subtracting seconds.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Frequently Asked Questions</h2>

        <h3 className="text-lg font-medium mt-4 mb-2">Will the timer keep running if I switch browser tabs?</h3>
        <p className="text-gray-700 mb-3">
          Yes. The timer calculates remaining time based on the system clock, not by counting individual seconds. If you switch tabs and come back, the displayed time will be correct. However, browsers may throttle intervals in background tabs, so the display might update less frequently until you return.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Can I pause and resume the countdown?</h3>
        <p className="text-gray-700 mb-3">
          Yes. Click &quot;Pause&quot; to stop the countdown at any point. When you click &quot;Start&quot; again, the timer resumes from where it left off. The &quot;Reset&quot; button clears the timer entirely and returns you to the input screen.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">What happens when the timer reaches zero?</h3>
        <p className="text-gray-700 mb-3">
          The timer stops automatically and displays a &quot;Time&apos;s up!&quot; message. The countdown will not go into negative numbers. You can then reset the timer and start a new countdown whenever you&apos;re ready.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">What is the maximum duration I can set?</h3>
        <p className="text-gray-700 mb-3">
          In timer mode, you can set any combination of hours, minutes, and seconds. There is no practical upper limit — you could set a timer for hundreds of hours if needed. In date mode, you can count down to any future date and time supported by your browser&apos;s date picker.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Common Use Cases</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Cooking and baking</strong> — Set a timer for recipes that require precise timing, like boiling eggs or proofing dough.</li>
          <li><strong>Study sessions</strong> — Use the Pomodoro technique by setting 25-minute focus sessions followed by 5-minute breaks.</li>
          <li><strong>Event countdowns</strong> — Count down to a birthday, holiday, product launch, or any important upcoming date.</li>
          <li><strong>Exercise intervals</strong> — Time workout sets, rest periods, or interval training segments.</li>
          <li><strong>Meeting and presentation timing</strong> — Keep track of how much time remains in a meeting, talk, or presentation slot.</li>
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
