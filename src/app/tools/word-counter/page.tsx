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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How does the word counter calculate words?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The tool splits your text by whitespace characters (spaces, tabs, and line breaks) and counts each resulting segment as a word. This is the same method used by most word processors like Microsoft Word and Google Docs."
                }
              },
              {
                "@type": "Question",
                "name": "Is my text stored or sent to a server?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. All processing happens entirely in your browser using JavaScript. Your text never leaves your device, and nothing is saved once you close the page."
                }
              },
              {
                "@type": "Question",
                "name": "How is reading time calculated?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Reading time is estimated using an average reading speed of 200 words per minute, which is the widely accepted benchmark for adult readers. The minimum displayed is always one minute."
                }
              },
              {
                "@type": "Question",
                "name": "Can I use this tool for languages other than English?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. The word counter works with any language that separates words with spaces, including Spanish, French, German, and many others. However, languages like Chinese or Japanese that don't use spaces between words may not produce accurate word counts."
                }
              }
            ]
          })
        }}
      />
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

      {/* What Is Word Counter */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">What Is a Word Counter?</h2>
        <p className="text-gray-700 mb-3">
          A word counter is a tool that analyzes a piece of text and tells you exactly how many words it contains. Beyond simple word counts, most modern word counters also track characters, sentences, paragraphs, and estimated reading time. This is particularly valuable when you&apos;re working within strict length requirements, such as college essays with a 500-word minimum or meta descriptions that need to stay under 160 characters.
        </p>
        <p className="text-gray-700">
          Word counting has been a fundamental part of writing for centuries. Journalists use word counts to meet column-inch requirements, students rely on them for assignment guidelines, and content creators track them to optimize articles for search engines. Our free online word counter gives you all of these metrics instantly, right in your browser, with no sign-up or software installation needed.
        </p>
      </section>

      {/* FAQ */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>

        <h3 className="text-lg font-medium mt-4 mb-2">How does the word counter calculate words?</h3>
        <p className="text-gray-700 mb-4">
          The tool splits your text by whitespace characters (spaces, tabs, and line breaks) and counts each resulting segment as a word. This is the same method used by most word processors like Microsoft Word and Google Docs, so the count should match what you see there.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Is my text stored or sent to a server?</h3>
        <p className="text-gray-700 mb-4">
          No. All processing happens entirely in your browser using JavaScript. Your text never leaves your device, and nothing is saved once you close the page. This makes it safe to use with sensitive or confidential content.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">How is reading time calculated?</h3>
        <p className="text-gray-700 mb-4">
          Reading time is estimated using an average reading speed of 200 words per minute, which is the widely accepted benchmark for adult readers. The minimum displayed is always one minute, even for very short texts.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Can I use this tool for languages other than English?</h3>
        <p className="text-gray-700 mb-4">
          Yes. The word counter works with any language that separates words with spaces, including Spanish, French, German, and many others. However, languages like Chinese or Japanese that don&apos;t use spaces between words may not produce accurate word counts.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">What&apos;s the difference between characters and characters without spaces?</h3>
        <p className="text-gray-700 mb-4">
          &quot;Characters&quot; counts every single keystroke including spaces, while &quot;Characters (no spaces)&quot; excludes all whitespace. The no-spaces count is useful for platforms like Twitter that count characters differently, or for SMS messages where every character matters.
        </p>
      </section>

      {/* Use Cases */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Who Uses This Tool?</h2>
        <div className="space-y-3 text-gray-700">
          <p>
            <strong>Students and academics</strong> use the word counter to meet essay and dissertation length requirements. Whether it&apos;s a 250-word abstract or a 10,000-word thesis, tracking your count in real time helps you stay on target without constant manual checks.
          </p>
          <p>
            <strong>Content writers and bloggers</strong> rely on word counts to optimize their articles for SEO. Search engines tend to favor in-depth content, and many SEO guidelines recommend specific word count ranges for different types of articles, from 300-word product descriptions to 2,000-word pillar pages.
          </p>
          <p>
            <strong>Social media managers</strong> use this tool to craft posts that fit platform character limits. From Twitter&apos;s 280-character cap to LinkedIn&apos;s 3,000-character limit for posts, knowing your exact count helps you write concise, impactful copy.
          </p>
          <p>
            <strong>Freelance writers</strong> often get paid by the word, making accurate word counts essential for invoicing. This tool provides a quick, reliable way to verify the length of any piece before submitting it to a client.
          </p>
        </div>
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
