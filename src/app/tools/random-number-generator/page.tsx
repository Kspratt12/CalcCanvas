"use client";

import { useState } from "react";
import Link from "next/link";


const RELATED_TOOLS = [
  { name: "Percentage Calculator", href: "/tools/percentage-calculator" },
  { name: "Average Calculator", href: "/tools/average-calculator" },
  { name: "Fraction Calculator", href: "/tools/fraction-calculator" },
  { name: "Password Generator", href: "/tools/password-generator" },
];

export default function RandomNumberGeneratorPage() {
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [count, setCount] = useState("10");
  const [allowDupes, setAllowDupes] = useState(true);
  const [numbers, setNumbers] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const lo = parseInt(min);
    const hi = parseInt(max);
    const qty = parseInt(count);

    if (isNaN(lo) || isNaN(hi) || isNaN(qty) || qty < 1 || lo > hi) return;

    if (!allowDupes && qty > hi - lo + 1) return;

    const result: number[] = [];

    if (allowDupes) {
      for (let i = 0; i < qty; i++) {
        result.push(Math.floor(Math.random() * (hi - lo + 1)) + lo);
      }
    } else {
      const pool: number[] = [];
      for (let i = lo; i <= hi; i++) pool.push(i);
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      result.push(...pool.slice(0, qty));
    }

    setNumbers(result);
    setCopied(false);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(numbers.join(", "));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
                "name": "Are these numbers truly random?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "They are pseudo-random, generated using JavaScript's built-in Math.random() function. This is perfectly suitable for games, drawings, educational exercises, and general-purpose randomization."
                }
              },
              {
                "@type": "Question",
                "name": "Why can't I generate more unique numbers than my range allows?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "If your range is 1 to 10, there are only 10 possible unique values. Asking for 15 unique numbers from that range is mathematically impossible. The tool prevents this when duplicates are disabled."
                }
              },
              {
                "@type": "Question",
                "name": "What is the Fisher-Yates shuffle algorithm?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Fisher-Yates is a well-known algorithm for generating a random permutation of a list. It walks through the array from the end to the beginning, swapping each element with a randomly chosen earlier element, guaranteeing every possible ordering is equally likely."
                }
              },
              {
                "@type": "Question",
                "name": "Can I use this for a lottery or raffle?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Set your range to match your ticket numbers, set the quantity to the number of winners, and turn off duplicates to ensure no ticket is picked twice. Keep in mind these are pseudo-random, not certified for official lottery use."
                }
              }
            ]
          })
        }}
      />
      <h1 className="text-3xl font-bold mb-2">Random Number Generator</h1>
      <p className="text-gray-600 mb-6">
        Generate random numbers within a custom range with options for quantity and duplicate control.
      </p>

      <div className="w-full max-w-[728px] h-[90px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm mx-auto mb-8 rounded">
        Advertisement
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Minimum</label>
            <input type="number" value={min} onChange={(e) => setMin(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Maximum</label>
            <input type="number" value={max} onChange={(e) => setMax(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">How Many</label>
            <input type="number" value={count} onChange={(e) => setCount(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]" />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={allowDupes} onChange={(e) => setAllowDupes(e.target.checked)} className="w-5 h-5 rounded text-[#2563eb] focus:ring-[#2563eb]" />
              <span className="text-sm text-gray-700">Allow duplicates</span>
            </label>
          </div>
        </div>

        <button onClick={generate} className="w-full bg-[#2563eb] text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition">
          Generate Numbers
        </button>
      </div>

      {numbers.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-600">{numbers.length} number{numbers.length !== 1 ? "s" : ""} generated</span>
            <button onClick={copyAll} className="px-4 py-2 bg-[#2563eb] text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
              {copied ? "Copied!" : "Copy All"}
            </button>
          </div>
          <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
            {numbers.map((n, i) => (
              <div key={i} className="bg-white border border-blue-200 rounded-lg p-2 text-center font-mono text-[#2563eb] font-bold">
                {n}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="w-[300px] h-[250px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm mx-auto mt-8 rounded">
        Advertisement
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">How to Use</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Set the minimum and maximum values for your range.</li>
          <li>Choose how many random numbers to generate.</li>
          <li>Toggle &quot;Allow duplicates&quot; on or off as needed.</li>
          <li>Click &quot;Generate Numbers&quot; and use &quot;Copy All&quot; to copy results.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">How It Works</h2>
        <p className="text-gray-700">
          This tool uses JavaScript&apos;s <code className="bg-gray-100 px-1 rounded">Math.random()</code> function to generate pseudo-random numbers within your specified range. When duplicates are disabled, it uses the Fisher-Yates shuffle algorithm on the complete range and selects the first N values, guaranteeing unique results. Note that without duplicates, the quantity cannot exceed the range size.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">What Is a Random Number Generator?</h2>
        <p className="text-gray-700 mb-4">
          A random number generator (RNG) produces numbers that lack any predictable pattern. In computing, most RNGs are &quot;pseudo-random&quot; &mdash; they use mathematical algorithms to produce sequences that appear random but are actually determined by an initial seed value. For everyday purposes like games, drawings, and simulations, pseudo-random numbers work perfectly well.
        </p>
        <p className="text-gray-700 mb-4">
          This tool lets you control exactly what kind of random output you need. You set the range (minimum and maximum), decide how many numbers to generate, and choose whether duplicates are allowed. When duplicates are turned off, the tool uses the Fisher-Yates shuffle algorithm to guarantee every number in your result is unique, making it ideal for raffles, lottery picks, and random sampling.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Frequently Asked Questions</h2>

        <h3 className="text-lg font-medium mt-4 mb-2">Are these numbers truly random?</h3>
        <p className="text-gray-700 mb-4">
          They are pseudo-random, generated using JavaScript&apos;s built-in Math.random() function. This is perfectly suitable for games, drawings, educational exercises, and general-purpose randomization. For cryptographic or security-sensitive applications, a cryptographically secure random number generator (CSPRNG) would be more appropriate.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Why can&apos;t I generate more unique numbers than my range allows?</h3>
        <p className="text-gray-700 mb-4">
          If your range is 1 to 10, there are only 10 possible unique values. Asking for 15 unique numbers from that range is mathematically impossible. The tool prevents this by requiring your quantity to be less than or equal to the range size when duplicates are disabled.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">What is the Fisher-Yates shuffle algorithm?</h3>
        <p className="text-gray-700 mb-4">
          Fisher-Yates is a well-known algorithm for generating a random permutation of a list. It walks through the array from the end to the beginning, swapping each element with a randomly chosen earlier element. This guarantees every possible ordering is equally likely, making it the gold standard for fair shuffling.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Can I generate decimal numbers?</h3>
        <p className="text-gray-700 mb-4">
          This tool generates whole numbers (integers) only. If you need random decimal values, you could generate a large range of integers and then divide by a power of 10 to get the precision you want. For example, generate numbers from 1 to 1000, then divide each by 100 for two decimal places.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Can I use this for a lottery or raffle?</h3>
        <p className="text-gray-700 mb-4">
          Absolutely. Set your range to match your ticket numbers, set the quantity to the number of winners you need, and turn off duplicates to ensure no ticket is picked twice. Click &quot;Generate Numbers&quot; and you have your winners. Just keep in mind these are pseudo-random, not certified for official lottery use.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Example Calculation</h2>
        <p className="text-gray-700 mb-2">
          <strong>Scenario:</strong> You&apos;re a teacher and need to randomly assign 5 students to present from a class of 30 students (numbered 1 through 30).
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Step 1:</strong> Set the minimum to 1 and maximum to 30 (matching your student numbers).
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Step 2:</strong> Set &quot;How Many&quot; to 5 and uncheck &quot;Allow duplicates&quot; so no student gets picked twice.
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Step 3:</strong> Click &quot;Generate Numbers.&quot; You might get results like: <strong>7, 22, 3, 18, 29</strong>.
        </p>
        <p className="text-gray-700">
          Each of the 30 students had an equal chance of being selected, and no student number appears more than once. Use &quot;Copy All&quot; to save the list for your records.
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
