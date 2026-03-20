'use client';

import { useState } from 'react';
import Link from 'next/link';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Tip Calculator',
  url: 'https://calcanvas.com/tools/tip-calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'All',
  description:
    'Calculate tip amount, total bill, and per-person split. Preset tip percentages for quick calculations.',
};

const presets = [15, 18, 20, 25];

export default function TipCalculator() {
  const [billAmount, setBillAmount] = useState('');
  const [tipPercent, setTipPercent] = useState('20');
  const [numPeople, setNumPeople] = useState('1');
  const [results, setResults] = useState<{
    tipAmount: number;
    totalBill: number;
    totalPerPerson: number;
    tipPerPerson: number;
  } | null>(null);

  function calculate() {
    const bill = parseFloat(billAmount);
    const tip = parseFloat(tipPercent);
    const people = parseInt(numPeople);
    if (!bill || !tip || !people || people < 1) return;

    const tipAmount = bill * (tip / 100);
    const totalBill = bill + tipAmount;

    setResults({
      tipAmount,
      totalBill,
      totalPerPerson: totalBill / people,
      tipPerPerson: tipAmount / people,
    });
  }

  function reset() {
    setBillAmount('');
    setTipPercent('20');
    setNumPeople('1');
    setResults(null);
  }

  const fmt = (v: number) =>
    v.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How much should I tip at a restaurant?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "In the United States, 15-20% of the pre-tax bill is standard for sit-down dining. For exceptional service, 25% or more is a generous gesture. For takeout orders, 10-15% is common."
                }
              },
              {
                "@type": "Question",
                "name": "Should I tip on the pre-tax or post-tax amount?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Traditionally, tips are calculated on the pre-tax subtotal. However, many people tip on the total bill including tax for simplicity. The difference is usually small."
                }
              },
              {
                "@type": "Question",
                "name": "How do I split the bill fairly?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The simplest approach is to divide the total (including tip) equally by the number of people. This calculator does that automatically. If people ordered items at very different price points, you may want to calculate individual shares separately."
                }
              },
              {
                "@type": "Question",
                "name": "Do I tip on alcohol?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, standard practice is to include drinks in the total when calculating your tip. Your server or bartender provides the same level of service regardless of whether you ordered food or beverages."
                }
              },
              {
                "@type": "Question",
                "name": "What about delivery and rideshare tips?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "For food delivery, 15-20% or at least $3-5 is recommended, especially for longer distances. For rideshare services, 10-20% is common."
                }
              }
            ]
          })
        }}
      />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Tip Calculator</h1>
      <p className="text-gray-600 mb-6">
        Quickly calculate how much to tip and split the bill evenly among your
        group.
      </p>


      <div className="mt-8 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bill Amount ($)
          </label>
          <input
            type="number"
            value={billAmount}
            onChange={(e) => setBillAmount(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            placeholder="85.50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tip Percentage (%)
          </label>
          <div className="flex gap-2 mb-2">
            {presets.map((p) => (
              <button
                key={p}
                onClick={() => setTipPercent(String(p))}
                className={`flex-1 py-2 rounded-lg text-sm font-medium border transition ${
                  tipPercent === String(p)
                    ? 'bg-[#2563eb] text-white border-[#2563eb]'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {p}%
              </button>
            ))}
          </div>
          <input
            type="number"
            value={tipPercent}
            onChange={(e) => setTipPercent(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            placeholder="20"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of People
          </label>
          <input
            type="number"
            min="1"
            value={numPeople}
            onChange={(e) => setNumPeople(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            placeholder="1"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={calculate}
            className="flex-1 bg-[#2563eb] text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Calculate
          </button>
          <button
            onClick={reset}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition"
          >
            Reset
          </button>
        </div>
      </div>

      {results && (
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Results</h2>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-500">Tip Amount</p>
              <p className="text-2xl font-bold text-[#2563eb]">
                {fmt(results.tipAmount)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Bill</p>
              <p className="text-2xl font-bold text-gray-900">
                {fmt(results.totalBill)}
              </p>
            </div>
            {parseInt(numPeople) > 1 && (
              <>
                <div>
                  <p className="text-sm text-gray-500">Tip per Person</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {fmt(results.tipPerPerson)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total per Person</p>
                  <p className="text-2xl font-bold text-[#2563eb]">
                    {fmt(results.totalPerPerson)}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
<section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          How to use this calculator
        </h2>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>Enter the total bill amount before tip.</li>
          <li>Select a preset tip percentage or type a custom one.</li>
          <li>Set the number of people splitting the bill.</li>
          <li>Hit Calculate to see the tip and per-person totals.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          How it works
        </h2>
        <p className="text-gray-600">
          The tip is calculated as: Tip = Bill Amount x (Tip Percentage / 100).
          The total bill is the original amount plus the tip. When splitting,
          each person&apos;s share is the total divided by the number of people.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          What Is a Tip Calculator?
        </h2>
        <p className="text-gray-600 mb-3">
          A tip calculator is a quick tool that figures out exactly how much to leave as a gratuity at restaurants, coffee shops, salons, and anywhere else tipping is customary. Instead of doing mental math or rounding awkwardly, you enter your bill total, choose a tip percentage, and get an instant answer.
        </p>
        <p className="text-gray-600 mb-3">
          This tool also handles bill splitting, which is where things usually get complicated in real life. When you&apos;re out with a group, it divides both the tip and the total evenly so everyone knows exactly what they owe. No more fumbling with phone calculators at the table.
        </p>
        <p className="text-gray-600">
          Tipping norms vary by country and service type, but in the United States, 15-20% is standard for sit-down restaurants. Many people now tip 20% as a baseline for good service. This calculator includes preset buttons for the most common percentages so you can calculate with a single click.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Frequently Asked Questions
        </h2>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          How much should I tip at a restaurant?
        </h3>
        <p className="text-gray-600 mb-4">
          In the United States, 15-20% of the pre-tax bill is standard for sit-down dining. For exceptional service, 25% or more is a generous gesture. For takeout orders, 10-15% is common, though not always expected.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          Should I tip on the pre-tax or post-tax amount?
        </h3>
        <p className="text-gray-600 mb-4">
          Traditionally, tips are calculated on the pre-tax subtotal. However, many people tip on the total bill including tax for simplicity. The difference is usually small &mdash; on a $100 bill with 8% tax, tipping 20% pre-tax is $20.00 versus $21.60 post-tax.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          How do I split the bill fairly?
        </h3>
        <p className="text-gray-600 mb-4">
          The simplest approach is to divide the total (including tip) equally by the number of people. This calculator does that automatically. If people ordered items at very different price points, you may want to calculate individual shares separately.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          Do I tip on alcohol?
        </h3>
        <p className="text-gray-600 mb-4">
          Yes, standard practice is to include drinks in the total when calculating your tip. Your server or bartender provides the same level of service regardless of whether you ordered food or beverages.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          What about delivery and rideshare tips?
        </h3>
        <p className="text-gray-600">
          For food delivery, 15-20% or at least $3-5 is recommended, especially for longer distances. For rideshare services, 10-20% is common. Many apps now prompt for a tip, making it easy to add one at the time of payment.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Example Calculation
        </h2>
        <p className="text-gray-600 mb-3">
          You and three friends have dinner with a bill of $120. You decide on a 20% tip. Here&apos;s the breakdown:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-1 mb-3">
          <li>Tip amount: $24.00</li>
          <li>Total bill: $144.00</li>
          <li>Tip per person: $6.00</li>
          <li>Total per person: $36.00</li>
        </ul>
        <p className="text-gray-600">
          Each person pays $36.00 and the tip is handled fairly. If someone suggests bumping the tip to 25% for great service, the total per person goes up to $37.50 &mdash; only $1.50 more each, but a meaningful difference for the server.
        </p>
      </section>

      <section className="mt-8 pb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Related Tools
        </h2>
        <ul className="space-y-1">
          <li><Link href="/tools/salary-to-hourly-converter" className="text-[#2563eb] hover:underline">Salary to Hourly Converter</Link></li>
          <li><Link href="/tools/net-worth-calculator" className="text-[#2563eb] hover:underline">Net Worth Calculator</Link></li>
          <li><Link href="/tools/mortgage-calculator" className="text-[#2563eb] hover:underline">Mortgage Calculator</Link></li>
        </ul>
      </section>
    </main>
  );
}
