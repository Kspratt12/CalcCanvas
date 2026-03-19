"use client";

import { useState } from "react";
import Link from "next/link";

const RELATED_TOOLS = [
  { name: "Character Counter", href: "/tools/character-counter" },
  { name: "Lorem Ipsum Generator", href: "/tools/lorem-ipsum-generator" },
  { name: "Case Converter", href: "/tools/case-converter" },
  { name: "Text Repeater", href: "/tools/text-repeater" },
];

export default function WordCounterPage() {
  const [text, setText] = useState("");

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  const sentences = text.trim()
    ? (text.match(/[.!?]+(\s|$)/g) || []).length || (text.trim().length > 0 ? 1 : 0)
    : 0;
  const paragraphs = text.trim()
    ? text.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length
    : 0;
  const readingTime = Math.max(1, Math.ceil(words / 200));

  const stats = [
    { label: "Words", value: words },
    { label: "Characters", value: characters },
    { label: "Characters (no spaces)", value: charactersNoSpaces },
    { label: "Sentences", value: sentences },
    { label: "Paragraphs", value: paragraphs },
    { label: "Reading Time", value: `${readingTime} min` },
  ];

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Word Counter</h1>
      <p className="text-gray-600 mb-6">
        Count words, characters, sentences, paragraphs, and estimate reading
        time in real time.
      </p>

      {/* Ad placeholder */}
      <div className="w-full max-w-[728px] h-[90px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm mx-auto mb-8 rounded">
        Advertisement
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
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

      <textarea
        className="w-full h-64 border border-gray-300 rounded-lg p-4 text-base focus:outline-none focus:ring-2 focus:ring-[#2563eb] resize-y"
        placeholder="Start typing or paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {/* Ad placeholder */}
      <div className="w-[300px] h-[250px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm mx-auto mt-8 rounded">
        Advertisement
      </div>

      {/* How to use */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">How to Use</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Type or paste your text into the textarea above.</li>
          <li>All statistics update in real time as you type.</li>
          <li>Use the word, character, and sentence counts for your writing needs.</li>
        </ol>
      </section>

      {/* About */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">About This Tool</h2>
        <p className="text-gray-700">
          The Word Counter tool provides instant statistics about your text
          including word count, character count (with and without spaces),
          sentence count, paragraph count, and an estimated reading time based on
          an average reading speed of 200 words per minute. Perfect for writers,
          students, and content creators.
        </p>
      </section>

      {/* Related tools */}
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
