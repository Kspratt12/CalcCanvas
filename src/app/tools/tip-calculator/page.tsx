'use client';

import { useState } from 'react';
import AdPlacement from '@/components/AdPlacement';
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
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Tip Calculator</h1>
      <p className="text-gray-600 mb-6">
        Quickly calculate how much to tip and split the bill evenly among your
        group.
      </p>

      <AdPlacement format="leaderboard" />

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

      <div className="mt-8">
        <AdPlacement format="rectangle" />
      </div>

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
