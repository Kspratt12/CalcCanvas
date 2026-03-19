'use client';

import { useState } from 'react';
import AdPlacement from '@/components/AdPlacement';
import Link from 'next/link';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Loan Payoff Calculator',
  url: 'https://calcanvas.com/tools/loan-payoff-calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'All',
  description:
    'Find out how long it will take to pay off your loan and how much interest you will pay. See how extra payments can save you time and money.',
};

export default function LoanPayoffCalculator() {
  const [balance, setBalance] = useState('');
  const [rate, setRate] = useState('');
  const [payment, setPayment] = useState('');
  const [extraPayment, setExtraPayment] = useState('');
  const [results, setResults] = useState<{
    months: number;
    totalInterest: number;
    payoffDate: string;
    monthsWithExtra?: number;
    totalInterestWithExtra?: number;
    payoffDateWithExtra?: string;
    timeSaved?: number;
    interestSaved?: number;
  } | null>(null);

  function simulate(bal: number, monthlyRate: number, pmt: number) {
    let remaining = bal;
    let totalInt = 0;
    let months = 0;
    const maxMonths = 1200;

    while (remaining > 0.01 && months < maxMonths) {
      const interest = remaining * monthlyRate;
      totalInt += interest;
      const principal = Math.min(pmt - interest, remaining);
      if (principal <= 0) return { months: -1, totalInterest: -1 }; // payment too low
      remaining -= principal;
      months++;
    }

    return { months, totalInterest: totalInt };
  }

  function calculate() {
    const bal = parseFloat(balance);
    const r = parseFloat(rate) / 100 / 12;
    const pmt = parseFloat(payment);
    const extra = parseFloat(extraPayment) || 0;

    if (!bal || !r || !pmt) return;
    if (pmt <= bal * r) {
      alert('Monthly payment is too low to cover interest. Please increase it.');
      return;
    }

    const base = simulate(bal, r, pmt);
    if (base.months < 0) return;

    const now = new Date();
    const payoffDate = new Date(now);
    payoffDate.setMonth(payoffDate.getMonth() + base.months);

    const result: typeof results = {
      months: base.months,
      totalInterest: base.totalInterest,
      payoffDate: payoffDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    };

    if (extra > 0) {
      const withExtra = simulate(bal, r, pmt + extra);
      if (withExtra.months > 0) {
        const payoffDateExtra = new Date(now);
        payoffDateExtra.setMonth(payoffDateExtra.getMonth() + withExtra.months);
        result.monthsWithExtra = withExtra.months;
        result.totalInterestWithExtra = withExtra.totalInterest;
        result.payoffDateWithExtra = payoffDateExtra.toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric',
        });
        result.timeSaved = base.months - withExtra.months;
        result.interestSaved = base.totalInterest - withExtra.totalInterest;
      }
    }

    setResults(result);
  }

  function reset() {
    setBalance('');
    setRate('');
    setPayment('');
    setExtraPayment('');
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
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Loan Payoff Calculator
      </h1>
      <p className="text-gray-600 mb-6">
        Find out when you will pay off your loan and how much interest you will
        pay. Add extra payments to see how much time and money you can save.
      </p>

      <AdPlacement format="leaderboard" />

      <div className="mt-8 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Loan Balance ($)
          </label>
          <input
            type="number"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            placeholder="25000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Annual Interest Rate (%)
          </label>
          <input
            type="number"
            step="0.01"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            placeholder="5.5"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Monthly Payment ($)
          </label>
          <input
            type="number"
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            placeholder="500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Extra Monthly Payment ($)
            <span className="text-gray-400 font-normal"> — optional</span>
          </label>
          <input
            type="number"
            value={extraPayment}
            onChange={(e) => setExtraPayment(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            placeholder="100"
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
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-500">Time to Payoff</p>
              <p className="text-2xl font-bold text-[#2563eb]">
                {Math.floor(results.months / 12)}y {results.months % 12}m
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Interest</p>
              <p className="text-2xl font-bold text-gray-900">
                {fmt(results.totalInterest)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Payoff Date</p>
              <p className="text-2xl font-bold text-gray-900">
                {results.payoffDate}
              </p>
            </div>
          </div>

          {results.monthsWithExtra !== undefined && (
            <div className="border-t border-blue-200 pt-4 mt-4">
              <h3 className="text-md font-semibold text-gray-800 mb-3">
                With Extra Payments
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-500">New Payoff Time</p>
                  <p className="text-xl font-bold text-green-600">
                    {Math.floor(results.monthsWithExtra! / 12)}y{' '}
                    {results.monthsWithExtra! % 12}m
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Time Saved</p>
                  <p className="text-xl font-bold text-green-600">
                    {Math.floor(results.timeSaved! / 12)}y {results.timeSaved! % 12}m
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Interest Saved</p>
                  <p className="text-xl font-bold text-green-600">
                    {fmt(results.interestSaved!)}
                  </p>
                </div>
              </div>
            </div>
          )}
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
          <li>Enter your current loan balance.</li>
          <li>Input the annual interest rate on the loan.</li>
          <li>Set your regular monthly payment amount.</li>
          <li>Optionally add an extra monthly payment to see time and interest saved.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          How it works
        </h2>
        <p className="text-gray-600">
          The calculator simulates your loan month by month. Each month, interest
          accrues on the remaining balance, and your payment is applied to cover
          interest first, then principal. The process repeats until the balance
          reaches zero. Adding extra payments reduces the principal faster,
          cutting both the payoff time and total interest.
        </p>
      </section>

      <section className="mt-8 pb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Related Tools
        </h2>
        <ul className="space-y-1">
          <li><Link href="/tools/mortgage-calculator" className="text-[#2563eb] hover:underline">Mortgage Calculator</Link></li>
          <li><Link href="/tools/auto-loan-calculator" className="text-[#2563eb] hover:underline">Auto Loan Calculator</Link></li>
          <li><Link href="/tools/compound-interest-calculator" className="text-[#2563eb] hover:underline">Compound Interest Calculator</Link></li>
          <li><Link href="/tools/retirement-calculator" className="text-[#2563eb] hover:underline">Retirement Calculator</Link></li>
        </ul>
      </section>
    </main>
  );
}
