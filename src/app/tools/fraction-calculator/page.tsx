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
