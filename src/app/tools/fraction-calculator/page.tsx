"use client";

import { useState } from "react";
import Link from "next/link";


const RELATED_TOOLS = [
  { name: "Percentage Calculator", href: "/tools/percentage-calculator" },
  { name: "Average Calculator", href: "/tools/average-calculator" },
  { name: "Random Number Generator", href: "/tools/random-number-generator" },
  { name: "Tip Calculator", href: "/tools/tip-calculator" },
];

type Op = "+" | "-" | "×" | "÷";

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}

function simplify(num: number, den: number): [number, number] {
  if (den === 0) return [num, den];
  const g = gcd(num, den);
  let sNum = num / g;
  let sDen = den / g;
  if (sDen < 0) {
    sNum = -sNum;
    sDen = -sDen;
  }
  return [sNum, sDen];
}

export default function FractionCalculatorPage() {
  const [n1, setN1] = useState("");
  const [d1, setD1] = useState("");
  const [n2, setN2] = useState("");
  const [d2, setD2] = useState("");
  const [op, setOp] = useState<Op>("+");
  const [result, setResult] = useState<{
    num: number;
    den: number;
    decimal: string;
    steps: string[];
  } | null>(null);

  const calculate = () => {
    const num1 = parseInt(n1);
    const den1 = parseInt(d1);
    const num2 = parseInt(n2);
    const den2 = parseInt(d2);

    if (isNaN(num1) || isNaN(den1) || isNaN(num2) || isNaN(den2)) return;
    if (den1 === 0 || den2 === 0) return;

    let rNum: number, rDen: number;
    const steps: string[] = [];

    steps.push(`${num1}/${den1} ${op} ${num2}/${den2}`);

    if (op === "+" || op === "-") {
      const lcm = (den1 * den2) / gcd(den1, den2);
      const adj1 = num1 * (lcm / den1);
      const adj2 = num2 * (lcm / den2);
      steps.push(`= ${adj1}/${lcm} ${op} ${adj2}/${lcm}`);
      rNum = op === "+" ? adj1 + adj2 : adj1 - adj2;
      rDen = lcm;
      steps.push(`= ${rNum}/${rDen}`);
    } else if (op === "×") {
      rNum = num1 * num2;
      rDen = den1 * den2;
      steps.push(`= (${num1} × ${num2}) / (${den1} × ${den2})`);
      steps.push(`= ${rNum}/${rDen}`);
    } else {
      if (num2 === 0) return;
      rNum = num1 * den2;
      rDen = den1 * num2;
      steps.push(`= ${num1}/${den1} × ${den2}/${num2}`);
      steps.push(`= ${rNum}/${rDen}`);
    }

    const [sNum, sDen] = simplify(rNum, rDen);
    if (sNum !== rNum || sDen !== rDen) {
      steps.push(`= ${sNum}/${sDen} (simplified)`);
    }

    setResult({
      num: sNum,
      den: sDen,
      decimal: (sNum / sDen).toFixed(6).replace(/\.?0+$/, ""),
      steps,
    });
  };

  const ops: Op[] = ["+", "-", "×", "÷"];

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
                "name": "How do you add fractions with different denominators?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "First, find the least common multiple (LCM) of both denominators. Then convert each fraction so they share that common denominator. Finally, add the numerators and keep the common denominator."
                }
              },
              {
                "@type": "Question",
                "name": "What does it mean to simplify a fraction?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Simplifying a fraction means dividing both the numerator and denominator by their greatest common divisor (GCD) until no further reduction is possible. For example, 6/8 simplifies to 3/4 because both 6 and 8 are divisible by 2."
                }
              },
              {
                "@type": "Question",
                "name": "How do you divide one fraction by another?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Dividing by a fraction is the same as multiplying by its reciprocal. Flip the second fraction (swap numerator and denominator), then multiply straight across."
                }
              },
              {
                "@type": "Question",
                "name": "Can I enter negative fractions?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. You can enter a negative number for either the numerator or the denominator. The calculator will handle the sign correctly in all operations and display the negative sign on the numerator in the simplified result."
                }
              },
              {
                "@type": "Question",
                "name": "What happens if I enter zero as a denominator?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Division by zero is undefined in mathematics, so the calculator will not produce a result if either denominator is zero."
                }
              }
            ]
          })
        }}
      />
      <h1 className="text-3xl font-bold mb-2">Fraction Calculator</h1>
      <p className="text-gray-600 mb-6">
        Add, subtract, multiply, or divide fractions with step-by-step solutions and simplified results.
      </p>

      <div className="w-full max-w-[728px] h-[90px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm mx-auto mb-8 rounded">
        Advertisement
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-center gap-4 mb-6 flex-wrap">
          {/* Fraction 1 */}
          <div className="flex flex-col items-center gap-1">
            <input type="number" value={n1} onChange={(e) => setN1(e.target.value)} className="w-20 border border-gray-300 rounded-lg p-2 text-center focus:outline-none focus:ring-2 focus:ring-[#2563eb]" placeholder="num" />
            <div className="w-16 h-px bg-gray-800" />
            <input type="number" value={d1} onChange={(e) => setD1(e.target.value)} className="w-20 border border-gray-300 rounded-lg p-2 text-center focus:outline-none focus:ring-2 focus:ring-[#2563eb]" placeholder="den" />
          </div>

          {/* Operator */}
          <div className="flex gap-1">
            {ops.map((o) => (
              <button key={o} onClick={() => setOp(o)} className={`w-10 h-10 rounded-lg text-lg font-bold transition ${op === o ? "bg-[#2563eb] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                {o}
              </button>
            ))}
          </div>

          {/* Fraction 2 */}
          <div className="flex flex-col items-center gap-1">
            <input type="number" value={n2} onChange={(e) => setN2(e.target.value)} className="w-20 border border-gray-300 rounded-lg p-2 text-center focus:outline-none focus:ring-2 focus:ring-[#2563eb]" placeholder="num" />
            <div className="w-16 h-px bg-gray-800" />
            <input type="number" value={d2} onChange={(e) => setD2(e.target.value)} className="w-20 border border-gray-300 rounded-lg p-2 text-center focus:outline-none focus:ring-2 focus:ring-[#2563eb]" placeholder="den" />
          </div>
        </div>

        <button onClick={calculate} className="w-full bg-[#2563eb] text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition">
          Calculate
        </button>
      </div>

      {result && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <div className="text-center mb-4">
            <div className="text-sm text-gray-600 mb-1">Result</div>
            <div className="text-4xl font-bold text-[#2563eb]">{result.num}/{result.den}</div>
            <div className="text-lg text-gray-500 mt-1">= {result.decimal}</div>
          </div>
          <div className="border-t border-blue-200 pt-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Steps:</h3>
            <div className="space-y-1">
              {result.steps.map((step, i) => (
                <div key={i} className="text-gray-600 font-mono text-sm">{step}</div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="w-[300px] h-[250px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm mx-auto mt-8 rounded">
        Advertisement
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">How to Use</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Enter the numerator and denominator for each fraction.</li>
          <li>Select the operation: add, subtract, multiply, or divide.</li>
          <li>Click &quot;Calculate&quot; to see the result in simplified form.</li>
          <li>Review the step-by-step solution below the result.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">How It Works</h2>
        <p className="text-gray-700">
          <strong>Addition/Subtraction:</strong> Finds the Least Common Multiple (LCM) of denominators, converts fractions, then adds or subtracts numerators.
          <strong> Multiplication:</strong> Multiplies numerators together and denominators together.
          <strong> Division:</strong> Multiplies the first fraction by the reciprocal of the second.
          All results are simplified using the Greatest Common Divisor (GCD).
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">What Is a Fraction?</h2>
        <p className="text-gray-700 mb-4">
          A fraction represents a part of a whole. It consists of two numbers separated by a line: the numerator (top number) tells you how many parts you have, and the denominator (bottom number) tells you how many equal parts make up the whole. For instance, 3/4 means you have 3 out of 4 equal parts.
        </p>
        <p className="text-gray-700 mb-4">
          Fractions are fundamental in cooking, construction, music, and countless other fields. They allow us to express quantities that aren&apos;t whole numbers with perfect precision &mdash; unlike decimals, which sometimes require rounding. This calculator handles all four basic operations and automatically simplifies your answer by finding the greatest common divisor, so you always get the cleanest possible result.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Frequently Asked Questions</h2>

        <h3 className="text-lg font-medium mt-4 mb-2">How do you add fractions with different denominators?</h3>
        <p className="text-gray-700 mb-4">
          First, find the least common multiple (LCM) of both denominators. Then convert each fraction so they share that common denominator by multiplying both the numerator and denominator by the appropriate factor. Finally, add the numerators and keep the common denominator.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">What does it mean to simplify a fraction?</h3>
        <p className="text-gray-700 mb-4">
          Simplifying (or reducing) a fraction means dividing both the numerator and denominator by their greatest common divisor (GCD) until no further reduction is possible. For example, 6/8 simplifies to 3/4 because both 6 and 8 are divisible by 2. A simplified fraction is the same value expressed in its smallest terms.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">How do you divide one fraction by another?</h3>
        <p className="text-gray-700 mb-4">
          Dividing by a fraction is the same as multiplying by its reciprocal. Flip the second fraction (swap numerator and denominator), then multiply straight across. For example, (2/3) &divide; (4/5) becomes (2/3) &times; (5/4) = 10/12, which simplifies to 5/6.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Can I enter negative fractions?</h3>
        <p className="text-gray-700 mb-4">
          Yes. You can enter a negative number for either the numerator or the denominator. The calculator will handle the sign correctly in all operations and display the negative sign on the numerator in the simplified result.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">What happens if I enter zero as a denominator?</h3>
        <p className="text-gray-700 mb-4">
          Division by zero is undefined in mathematics, so the calculator will not produce a result if either denominator is zero. Similarly, dividing by a fraction with a numerator of zero (like 0/5) is not allowed since it would mean dividing by zero.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Example Calculation</h2>
        <p className="text-gray-700 mb-2">
          <strong>Scenario:</strong> A recipe calls for 2/3 cup of flour, but you want to make 1.5 times the recipe. You need to multiply 2/3 by 3/2.
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Step 1:</strong> Enter 2 as the first numerator and 3 as the first denominator. Select the multiplication (&times;) operator.
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Step 2:</strong> Enter 3 as the second numerator and 2 as the second denominator.
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Step 3:</strong> Click &quot;Calculate.&quot; The result is 6/6, which simplifies to <strong>1/1</strong> (or simply 1 cup of flour).
        </p>
        <p className="text-gray-700">
          The step-by-step breakdown shows: 2/3 &times; 3/2 = (2 &times; 3) / (3 &times; 2) = 6/6 = 1/1 (simplified). So you need exactly 1 cup of flour for 1.5 times the recipe.
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
