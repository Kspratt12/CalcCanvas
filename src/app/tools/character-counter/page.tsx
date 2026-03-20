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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Do spaces count as characters?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, spaces are counted in the \"Total Characters\" figure. However, the tool also shows a separate \"Characters (no spaces)\" count for situations where you need to exclude whitespace."
                }
              },
              {
                "@type": "Question",
                "name": "What is the character limit feature for?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The optional character limit lets you set a maximum number of characters and see a live counter showing how close you are. When you exceed the limit, the counter turns red to alert you. This is handy for writing social media posts or meta descriptions."
                }
              },
              {
                "@type": "Question",
                "name": "Does this tool count special characters and emojis?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, every character is counted including punctuation, symbols, and emojis. Keep in mind that some emojis may count as more than one character in certain encoding systems."
                }
              },
              {
                "@type": "Question",
                "name": "Can I paste text from other applications?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely. You can paste text from Word documents, PDFs, emails, web pages, or any other source. The counter will immediately analyze the pasted content and display all relevant statistics."
                }
              }
            ]
          })
        }}
      />
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

      {/* What Is Character Counter */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">What Is a Character Counter?</h2>
        <p className="text-gray-700 mb-3">
          A character counter is a tool that counts every individual character in a piece of text, including letters, numbers, punctuation marks, and spaces. It gives you a precise measurement of text length that goes beyond simple word counting. This matters because many digital platforms impose strict character limits rather than word limits.
        </p>
        <p className="text-gray-700">
          Think about composing a tweet, writing an SMS, crafting a Google Ads headline, or filling out a form field with a maximum length. In all of these situations, you need to know your exact character count. Our character counter provides this information in real time as you type, and even lets you set a custom character limit so you can see at a glance whether your text fits within the allowed space.
        </p>
      </section>

      {/* FAQ */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>

        <h3 className="text-lg font-medium mt-4 mb-2">Do spaces count as characters?</h3>
        <p className="text-gray-700 mb-4">
          Yes, spaces are counted in the &quot;Total Characters&quot; figure. However, the tool also shows a separate &quot;Characters (no spaces)&quot; count for situations where you need to exclude whitespace. Most platforms like Twitter count spaces as characters, while some coding contexts do not.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">What is the character limit feature for?</h3>
        <p className="text-gray-700 mb-4">
          The optional character limit lets you set a maximum number of characters and see a live counter showing how close you are. When you exceed the limit, the counter turns red and the textarea border changes to alert you. This is especially handy for writing social media posts or meta descriptions.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Does this tool count special characters and emojis?</h3>
        <p className="text-gray-700 mb-4">
          Yes, every character is counted including punctuation, symbols, and emojis. Keep in mind that some emojis may count as more than one character in certain encoding systems, though the tool reports them as JavaScript measures string length.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Can I paste text from other applications?</h3>
        <p className="text-gray-700 mb-4">
          Absolutely. You can paste text from Word documents, PDFs, emails, web pages, or any other source. The counter will immediately analyze the pasted content and display all relevant statistics.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Is there a maximum text length this tool can handle?</h3>
        <p className="text-gray-700 mb-4">
          There&apos;s no hard limit built into the tool. It runs entirely in your browser, so it can handle very large texts as long as your device has enough memory. For most practical purposes, texts of any reasonable length will work perfectly.
        </p>
      </section>

      {/* Use Cases */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Who Uses This Tool?</h2>
        <div className="space-y-3 text-gray-700">
          <p>
            <strong>Social media marketers</strong> use the character counter daily to write posts that fit within platform limits. Twitter allows 280 characters, Instagram bios cap at 150, and Pinterest descriptions max out at 500. Knowing your exact count prevents awkward truncation.
          </p>
          <p>
            <strong>SEO professionals</strong> rely on character counts for meta titles (50-60 characters) and meta descriptions (150-160 characters). Staying within these ranges ensures your content displays properly in search engine results without getting cut off.
          </p>
          <p>
            <strong>Developers and UX writers</strong> use character counting when designing interfaces with fixed-width text fields. Button labels, error messages, and tooltips all need to fit within specific spaces, making precise character measurement essential.
          </p>
          <p>
            <strong>Students and job seekers</strong> use this tool for application forms, personal statements, and cover letters that have strict character limits. Many university and job applications specify maximum character counts rather than word counts.
          </p>
        </div>
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
