"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

const RELATED_TOOLS = [
  { name: "Character Counter", href: "/tools/character-counter" },
  { name: "Slug Generator", href: "/tools/slug-generator" },
  { name: "Text Repeater", href: "/tools/text-repeater" },
  { name: "Lorem Ipsum Generator", href: "/tools/lorem-ipsum-generator" },
];

type CaseType = "uppercase" | "lowercase" | "titlecase" | "sentencecase";

function toTitleCase(str: string): string {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
  );
}

function toSentenceCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/(^\s*|[.!?]\s+)([a-z])/g, (_match, sep, char) => sep + char.toUpperCase());
}

export default function CaseConverterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeType, setActiveType] = useState<CaseType | null>(null);

  const convert = useCallback(
    (type: CaseType) => {
      setActiveType(type);
      let result = input;
      switch (type) {
        case "uppercase":
          result = input.toUpperCase();
          break;
        case "lowercase":
          result = input.toLowerCase();
          break;
        case "titlecase":
          result = toTitleCase(input);
          break;
        case "sentencecase":
          result = toSentenceCase(input);
          break;
      }
      setOutput(result);
    },
    [input]
  );

  const copyToClipboard = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const buttons: { label: string; type: CaseType }[] = [
    { label: "UPPERCASE", type: "uppercase" },
    { label: "lowercase", type: "lowercase" },
    { label: "Title Case", type: "titlecase" },
    { label: "Sentence case", type: "sentencecase" },
  ];

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Case Converter</h1>
      <p className="text-gray-600 mb-6">
        Transform your text between different letter cases instantly. Supports
        UPPERCASE, lowercase, Title Case, and Sentence case.
      </p>

      <div className="w-full max-w-[728px] h-[90px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm mx-auto mb-8 rounded">
        Advertisement
      </div>

      {/* Input */}
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Input Text
      </label>
      <textarea
        className="w-full h-40 border border-gray-300 rounded-lg p-4 text-base focus:outline-none focus:ring-2 focus:ring-[#2563eb] resize-y mb-4"
        placeholder="Type or paste your text here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      {/* Conversion buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {buttons.map((btn) => (
          <button
            key={btn.type}
            onClick={() => convert(btn.type)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeType === btn.type
                ? "bg-[#2563eb] text-white"
                : "bg-blue-50 text-[#2563eb] hover:bg-blue-100"
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Output */}
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Output
      </label>
      <div className="relative">
        <textarea
          className="w-full h-40 border border-gray-300 rounded-lg p-4 text-base bg-gray-50 resize-y"
          readOnly
          value={output}
          placeholder="Converted text will appear here..."
        />
        <button
          onClick={copyToClipboard}
          disabled={!output}
          className="absolute top-2 right-2 px-3 py-1.5 bg-[#2563eb] text-white text-sm rounded hover:bg-blue-700 transition disabled:opacity-40"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <div className="w-[300px] h-[250px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm mx-auto mt-8 rounded">
        Advertisement
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">How to Use</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Type or paste your text into the input area above.</li>
          <li>Click one of the case conversion buttons to transform your text.</li>
          <li>Click the Copy button to copy the converted text to your clipboard.</li>
        </ol>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">About This Tool</h2>
        <p className="text-gray-700">
          The Case Converter tool allows you to quickly change the letter case of
          any text. Whether you need to convert text to uppercase for headings,
          title case for article titles, or sentence case for paragraphs, this
          tool handles it all with a single click. No data is sent to any
          server — all conversions happen right in your browser.
        </p>
      </section>

      <section className="mt-8 pb-10">
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
