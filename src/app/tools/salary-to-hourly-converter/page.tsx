'use client';

import { useState } from 'react';
import AdPlacement from '@/components/AdPlacement';
import Link from 'next/link';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Salary to Hourly Converter',
  url: 'https://calcanvas.com/tools/salary-to-hourly-converter',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'All',
  description:
    'Convert between annual salary and hourly wage. See your earnings broken down by hour, day, week, month, and year.',
};

export default function SalaryToHourlyConverter() {
  const [amount, setAmount] = useState('');
  const [direction, setDirection] = useState<'salary-to-hourly' | 'hourly-to-salary'>('salary-to-hourly');
  const [hoursPerWeek, setHoursPerWeek] = useState('40');
  const [weeksPerYear, setWeeksPerYear] = useState('52');
  const [results, setResults] = useState<{
    hourly: number;
    daily: number;
    weekly: number;
    monthly: number;
    yearly: number;
  } | null>(null);

  function calculate() {
    const val = parseFloat(amount);
    const hpw = parseFloat(hoursPerWeek);
    const wpy = parseFloat(weeksPerYear);
    if (!val || !hpw || !wpy) return;

    let yearly: number;
    if (direction === 'salary-to-hourly') {
      yearly = val;
    } else {
      yearly = val * hpw * wpy;
    }

    setResults({
      hourly: yearly / (hpw * wpy),
      daily: yearly / (wpy * 5),
      weekly: yearly / wpy,
      monthly: yearly / 12,
      yearly,
    });
  }

  function reset() {
    setAmount('');
    setHoursPerWeek('40');
    setWeeksPerYear('52');
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
        Salary to Hourly Converter
      </h1>
      <p className="text-gray-600 mb-6">
        Quickly convert between annual salary and hourly wage, with a full
        breakdown of your earnings by day, week, month, and year.
      </p>

      <AdPlacement format="leaderboard" />

      <div className="mt-8 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Conversion Direction
          </label>
          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value as 'salary-to-hourly' | 'hourly-to-salary')}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
          >
            <option value="salary-to-hourly">Annual Salary → Hourly Rate</option>
            <option value="hourly-to-salary">Hourly Rate → Annual Salary</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {direction === 'salary-to-hourly' ? 'Annual Salary ($)' : 'Hourly Rate ($)'}
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            placeholder={direction === 'salary-to-hourly' ? '75000' : '36'}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hours per Week
            </label>
            <input
              type="number"
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
              placeholder="40"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Weeks per Year
            </label>
            <input
              type="number"
              value={weeksPerYear}
              onChange={(e) => setWeeksPerYear(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
              placeholder="52"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={calculate}
            className="flex-1 bg-[#2563eb] text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Convert
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
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Earnings Breakdown</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Hourly</span>
              <span className="text-xl font-bold text-[#2563eb]">{fmt(results.hourly)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Daily (5-day week)</span>
              <span className="text-xl font-bold text-gray-900">{fmt(results.daily)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Weekly</span>
              <span className="text-xl font-bold text-gray-900">{fmt(results.weekly)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Monthly</span>
              <span className="text-xl font-bold text-gray-900">{fmt(results.monthly)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Yearly</span>
              <span className="text-xl font-bold text-gray-900">{fmt(results.yearly)}</span>
            </div>
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
          <li>Select whether you want to convert from salary to hourly or hourly to salary.</li>
          <li>Enter your annual salary or hourly rate.</li>
          <li>Adjust hours per week and weeks per year if needed (defaults: 40 hrs, 52 weeks).</li>
          <li>Click Convert to see your full earnings breakdown.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          How it works
        </h2>
        <p className="text-gray-600">
          The conversion is straightforward: Annual Salary = Hourly Rate x Hours
          per Week x Weeks per Year. This calculator divides or multiplies
          accordingly and breaks down your income across different time periods so
          you can compare offers or budget effectively.
        </p>
      </section>

      <section className="mt-8 pb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Related Tools
        </h2>
        <ul className="space-y-1">
          <li><Link href="/tools/tip-calculator" className="text-[#2563eb] hover:underline">Tip Calculator</Link></li>
          <li><Link href="/tools/net-worth-calculator" className="text-[#2563eb] hover:underline">Net Worth Calculator</Link></li>
          <li><Link href="/tools/retirement-calculator" className="text-[#2563eb] hover:underline">Retirement Calculator</Link></li>
          <li><Link href="/tools/compound-interest-calculator" className="text-[#2563eb] hover:underline">Compound Interest Calculator</Link></li>
        </ul>
      </section>
    </main>
  );
}
