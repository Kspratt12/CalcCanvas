"use client";

import { useState } from "react";
import Link from "next/link";

const RELATED_TOOLS = [
  { name: "Percentage Calculator", href: "/tools/percentage-calculator" },
  { name: "Average Calculator", href: "/tools/average-calculator" },
  { name: "Fraction Calculator", href: "/tools/fraction-calculator" },
  { name: "Standard Deviation Calculator", href: "/tools/standard-deviation-calculator" },
];

interface Result {
  input: number;
  squareRoot: number;
  isPerfectSquare: boolean;
  cubeRoot: number;
  squared: number;
}

export default function SquareRootPage() {
  const [input, setInput] = useState("");
  const [nthRoot, setNthRoot] = useState("2");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    const num = parseFloat(input);
    if (isNaN(num)) {
      setError("Please enter a valid number.");
      setResult(null);
      return;
    }
    if (num < 0) {
      setError("Square root of negative numbers is not supported.");
      setResult(null);
      return;
    }

    const sr = Math.sqrt(num);
    setResult({
      input: num,
      squareRoot: Math.round(sr * 100000) / 100000,
      isPerfectSquare: Number.isInteger(sr),
      cubeRoot: Math.round(Math.cbrt(num) * 100000) / 100000,
      squared: Math.round(num * num * 100000) / 100000,
    });
  };

  const nthRootResult = (() => {
    const num = parseFloat(input);
    const n = parseInt(nthRoot);
    if (isNaN(num) || isNaN(n) || n <= 0 || num < 0) return null;
    return Math.round(Math.pow(num, 1 / n) * 100000) / 100000;
  })();

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
                "name": "What is a perfect square?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A perfect square is a number whose square root is a whole number. Examples include 1, 4, 9, 16, 25, 36, 49, 64, 81, and 100. If you take the square root and get a decimal, the number is not a perfect square."
                }
              },
              {
                "@type": "Question",
                "name": "Can I calculate the square root of a negative number?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Not with this tool. The square root of a negative number involves imaginary numbers (denoted with \"i\"), which are part of the complex number system. This calculator works with real numbers only."
                }
              },
              {
                "@type": "Question",
                "name": "What is an nth root?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The nth root of a number x is the value that, when raised to the power n, equals x. A square root is a 2nd root, a cube root is a 3rd root, and so on. This calculator lets you compute any nth root."
                }
              },
              {
                "@type": "Question",
                "name": "How precise are the results?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Results are rounded to 5 decimal places, which provides more than enough precision for most practical applications. Many square roots are irrational numbers that go on forever without repeating, so some rounding is always necessary."
                }
              }
            ]
          })
        }}
      />
      <h1 className="text-3xl font-bold mb-2">Square Root Calculator</h1>
      <p className="text-gray-600 mb-6">
        Calculate square roots, cube roots, and nth roots of any number instantly.
      </p>

      <div className="w-full max-w-[728px] h-[90px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm mx-auto mb-8 rounded">
        Advertisement
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Enter a number
        </label>
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
          placeholder="e.g. 144"
        />

        <div className="flex gap-3 items-end mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nth root (optional)
            </label>
            <input
              type="number"
              value={nthRoot}
              onChange={(e) => setNthRoot(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
              min="1"
              placeholder="2"
            />
          </div>
        </div>

        {error && (
          <p className="text-red-600 text-sm mb-3">{error}</p>
        )}

        <button
          onClick={calculate}
          className="w-full bg-[#2563eb] text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Calculate
        </button>
      </div>

      {result && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-[#2563eb]">{result.squareRoot}</div>
            <div className="text-sm text-gray-600 mt-1">{"\u221A"}{result.input}</div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-[#2563eb]">{result.cubeRoot}</div>
            <div className="text-sm text-gray-600 mt-1">{"\u221B"}{result.input}</div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-[#2563eb]">{result.squared}</div>
            <div className="text-sm text-gray-600 mt-1">{result.input}{"\u00B2"}</div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-[#2563eb]">
              {result.isPerfectSquare ? "Yes" : "No"}
            </div>
            <div className="text-sm text-gray-600 mt-1">Perfect Square?</div>
          </div>
          {nthRootResult !== null && nthRoot !== "2" && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-[#2563eb]">{nthRootResult}</div>
              <div className="text-sm text-gray-600 mt-1">{nthRoot}th root of {result.input}</div>
            </div>
          )}
        </div>
      )}

      <div className="w-[300px] h-[250px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm mx-auto mt-8 rounded">
        Advertisement
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">How to Use</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Enter any non-negative number in the input field.</li>
          <li>Optionally change the nth root value (default is 2 for square root).</li>
          <li>Click &quot;Calculate&quot; to see the square root, cube root, and more.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">How It Works</h2>
        <p className="text-gray-700">
          The <strong>square root</strong> of a number x is the value that, when multiplied by itself, equals x.
          For example, {"\u221A"}144 = 12 because 12 {"\u00D7"} 12 = 144. A <strong>perfect square</strong> is
          a number whose square root is a whole number. The <strong>nth root</strong> generalizes this
          concept: the nth root of x is x raised to the power of 1/n.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">What Is a Square Root?</h2>
        <p className="text-gray-700 mb-4">
          The square root of a number is the value that, when multiplied by itself, produces the original number. For example, the square root of 49 is 7, because 7 &times; 7 = 49. The concept extends naturally to cube roots (what number multiplied by itself three times gives you the original?) and nth roots for any positive integer n.
        </p>
        <p className="text-gray-700 mb-4">
          Square roots come up constantly in geometry, physics, engineering, and finance. You need them to calculate distances (the Pythagorean theorem), find the side length of a square with a known area, compute standard deviations in statistics, and much more. This calculator gives you the square root, cube root, and any nth root you need, plus it tells you whether the input is a perfect square &mdash; all in one click.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Frequently Asked Questions</h2>

        <h3 className="text-lg font-medium mt-4 mb-2">What is a perfect square?</h3>
        <p className="text-gray-700 mb-4">
          A perfect square is a number whose square root is a whole number. Examples include 1, 4, 9, 16, 25, 36, 49, 64, 81, and 100. If you take the square root and get a decimal, the number is not a perfect square. This calculator automatically checks this for you.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Can I calculate the square root of a negative number?</h3>
        <p className="text-gray-700 mb-4">
          Not with this tool. The square root of a negative number involves imaginary numbers (denoted with &quot;i&quot;), which are part of the complex number system. For example, the square root of -9 is 3i. This calculator works with real numbers only, so it requires non-negative input.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">What is an nth root?</h3>
        <p className="text-gray-700 mb-4">
          The nth root of a number x is the value that, when raised to the power n, equals x. A square root is a 2nd root, a cube root is a 3rd root, and so on. Mathematically, the nth root of x equals x raised to the power of 1/n. This calculator lets you compute any nth root by changing the root value.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">How precise are the results?</h3>
        <p className="text-gray-700 mb-4">
          Results are rounded to 5 decimal places, which provides more than enough precision for most practical applications. Keep in mind that many square roots are irrational numbers (like the square root of 2 = 1.41421...) that go on forever without repeating, so some rounding is always necessary.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">What does the &quot;squared&quot; result show?</h3>
        <p className="text-gray-700 mb-4">
          The squared result shows your input number multiplied by itself. This is the inverse operation of a square root. It&apos;s included as a quick reference &mdash; for example, if you enter 12, you&apos;ll see that 12 squared is 144, which confirms that the square root of 144 is 12.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Example Calculation</h2>
        <p className="text-gray-700 mb-2">
          <strong>Scenario:</strong> You have a square garden with an area of 225 square feet and want to know the length of each side.
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Step 1:</strong> Enter 225 in the input field and click &quot;Calculate.&quot;
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Step 2:</strong> The square root result shows <strong>15</strong>, meaning each side of the garden is 15 feet long.
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Step 3:</strong> The calculator also confirms 225 is a &quot;Perfect Square&quot; (Yes), since 15 is a whole number.
        </p>
        <p className="text-gray-700">
          <strong>Bonus:</strong> The cube root of 225 is approximately 6.08252 (the side length of a cube with volume 225), and 225 squared is 50,625.
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
