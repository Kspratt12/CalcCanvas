"use client";

import { useState } from "react";
import Link from "next/link";

const RELATED_TOOLS = [
  { name: "Word Counter", href: "/tools/word-counter" },
  { name: "Case Converter", href: "/tools/case-converter" },
  { name: "Text Repeater", href: "/tools/text-repeater" },
  { name: "Slug Generator", href: "/tools/slug-generator" },
];

export default function CharacterCounterPage() {
  const [text, setText] = useState("");
  const [maxChars, setMaxChars] = useState<number | "">("");

  const totalChars = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lines = text ? text.split("\n").length : 0;
  const limit = typeof maxChars === "number" ? maxChars : null;
  const overLimit = limit !== null && totalChars > limit;

  const stats = [
    { label: "Total Characters", value: totalChars },
    { label: "Characters (no spaces)", value: charsNoSpaces },
    { label: "Words", value: words },
    { label: "Lines", value: lines },
  ];

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Character Counter</h1>
      <p className="text-gray-600 mb-6">
        Count characters, words, and lines in your text with an optional
        character limit.
      </p>

      <div className="w-full max-w-[728px] h-[90px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm mx-auto mb-8 rounded">
        Advertisement
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-center"
          >
            <div className="text-2xl font-bold text-[#2563eb]">{s.value}</div>
            <div className="text-sm text-gray-600 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Character limit */}
      <div className="flex items-center gap-3 mb-4">
        <label className="text-sm font-medium text-gray-700">
          Character Limit (optional):
        </label>
        <input
          type="number"
          min={1}
          className="w-28 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
          placeholder="e.g. 280"
          value={maxChars}
          onChange={(e) =>
            setMaxChars(e.target.value ? parseInt(e.target.value) : "")
          }
        />
        {limit !== null && (
          <span
            className={`text-sm font-medium ${overLimit ? "text-red-600" : "text-green-600"}`}
          >
            {totalChars}/{limit} {overLimit ? "(over limit!)" : ""}
          </span>
        )}
      </div>

      <textarea
        className={`w-full h-64 border rounded-lg p-4 text-base focus:outline-none focus:ring-2 resize-y ${
          overLimit
            ? "border-red-400 focus:ring-red-400"
            : "border-gray-300 focus:ring-[#2563eb]"
        }`}
        placeholder="Start typing or paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="w-[300px] h-[250px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm mx-auto mt-8 rounded">
        Advertisement
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">How to Use</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Type or paste your text into the textarea.</li>
          <li>View real-time character, word, and line counts above.</li>
          <li>Optionally set a character limit to track how close you are.</li>
        </ol>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">About This Tool</h2>
        <p className="text-gray-700">
          The Character Counter tool counts total characters, characters without
          spaces, words, and lines in real time. It also includes an optional
          character limit checker, perfect for social media posts, SMS messages,
          or any text with length restrictions.
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
