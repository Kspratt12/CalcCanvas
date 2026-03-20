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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is Title Case used for?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Title Case capitalizes the first letter of every word and is commonly used for headlines, book titles, article titles, and section headings. It gives text a formal, polished appearance."
                }
              },
              {
                "@type": "Question",
                "name": "When should I use Sentence case instead of Title Case?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sentence case capitalizes only the first word and proper nouns, just like a regular sentence. Many style guides recommend sentence case for UI elements like button labels, menu items, and form fields because it feels more natural and conversational."
                }
              },
              {
                "@type": "Question",
                "name": "Does the tool handle special characters and numbers?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Numbers, symbols, and punctuation are left unchanged during conversion. Only alphabetic characters are affected by case transformations."
                }
              },
              {
                "@type": "Question",
                "name": "Is my text processed securely?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "All case conversions happen locally in your browser using JavaScript. Your text is never sent to a server, stored in a database, or shared with any third party."
                }
              }
            ]
          })
        }}
      />
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

      {/* What Is Case Converter */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">What Is a Case Converter?</h2>
        <p className="text-gray-700 mb-3">
          A case converter is a tool that changes the capitalization of text from one format to another. In typography and computing, &quot;case&quot; refers to whether a letter is uppercase (capital) or lowercase (small). Different writing contexts require different capitalization styles, and manually retyping text in the correct case is tedious and error-prone.
        </p>
        <p className="text-gray-700">
          This tool supports four common case formats: UPPERCASE converts every letter to capitals, lowercase makes everything small, Title Case capitalizes the first letter of each word, and Sentence case capitalizes only the first letter after a period or at the beginning of text. These cover the vast majority of formatting needs for writers, designers, developers, and anyone working with text.
        </p>
      </section>

      {/* FAQ */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>

        <h3 className="text-lg font-medium mt-4 mb-2">What is Title Case used for?</h3>
        <p className="text-gray-700 mb-4">
          Title Case capitalizes the first letter of every word and is commonly used for headlines, book titles, article titles, and section headings. It gives text a formal, polished appearance and is the standard format for most English-language titles.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">When should I use Sentence case instead of Title Case?</h3>
        <p className="text-gray-700 mb-4">
          Sentence case capitalizes only the first word and proper nouns, just like a regular sentence. Many style guides, including Google&apos;s Material Design guidelines, recommend sentence case for UI elements like button labels, menu items, and form fields because it feels more natural and conversational.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Does the tool handle special characters and numbers?</h3>
        <p className="text-gray-700 mb-4">
          Yes. Numbers, symbols, and punctuation are left unchanged during conversion. Only alphabetic characters are affected by case transformations. This means your URLs, dates, and special formatting will remain intact.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Is my text processed securely?</h3>
        <p className="text-gray-700 mb-4">
          Absolutely. All case conversions happen locally in your browser using JavaScript. Your text is never sent to a server, stored in a database, or shared with any third party. You can safely convert confidential or sensitive text without worry.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Can I convert text that&apos;s already in mixed case?</h3>
        <p className="text-gray-700 mb-4">
          Yes. The tool works regardless of the current formatting of your text. Whether your input is all caps, all lowercase, or a random mix of both, the converter will apply the selected case format consistently across the entire text.
        </p>
      </section>

      {/* Use Cases */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Who Uses This Tool?</h2>
        <div className="space-y-3 text-gray-700">
          <p>
            <strong>Writers and editors</strong> use the case converter to quickly fix capitalization errors in manuscripts, articles, and blog posts. Instead of manually correcting each word, you can paste the text, click a button, and get properly formatted output instantly.
          </p>
          <p>
            <strong>Developers and data analysts</strong> often need to standardize text data for databases, APIs, or spreadsheets. Converting user-submitted text to a consistent case format helps prevent duplicate entries and improves data quality.
          </p>
          <p>
            <strong>Designers and marketers</strong> use case conversion when preparing text for social media graphics, email subject lines, and advertising copy. A quick case change can transform the tone and visual impact of a headline.
          </p>
          <p>
            <strong>Students</strong> use this tool to format bibliographies, citations, and paper titles according to their required style guide, whether that calls for title case, sentence case, or another format.
          </p>
        </div>
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
