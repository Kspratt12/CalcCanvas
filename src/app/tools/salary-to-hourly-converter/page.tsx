'use client';

import { useState } from 'react';
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How do I convert salary to hourly?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Divide your annual salary by the total number of working hours in a year. For a standard full-time schedule, that's 2,080 hours (40 hours per week times 52 weeks). So a $60,000 salary equals about $28.85 per hour."
                }
              },
              {
                "@type": "Question",
                "name": "Should I use 52 weeks or fewer?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "If you get paid time off (PTO), you're still earning during those weeks, so 52 is correct. If you take unpaid time off, reduce the weeks accordingly."
                }
              },
              {
                "@type": "Question",
                "name": "Does this account for taxes?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No, this shows your gross (pre-tax) earnings. Your actual take-home pay will be lower after federal income tax, state income tax, Social Security, Medicare, and any other deductions."
                }
              },
              {
                "@type": "Question",
                "name": "How do I compare a salaried job to a contract position?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "First convert the salary to hourly. Then factor in that salaried positions typically include benefits like health insurance, retirement contributions, and PTO. A general rule of thumb is that benefits add 20-30% to total compensation."
                }
              },
              {
                "@type": "Question",
                "name": "What if I work overtime?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "If you regularly work more than 40 hours per week, increase the hours per week field to get a more accurate effective hourly rate. Salaried exempt employees don't receive overtime pay, so working 50 hours per week on a $60,000 salary drops your effective rate from $28.85 to $23.08 per hour."
                }
              }
            ]
          })
        }}
      />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Salary to Hourly Converter
      </h1>
      <p className="text-gray-600 mb-6">
        Quickly convert between annual salary and hourly wage, with a full
        breakdown of your earnings by day, week, month, and year.
      </p>


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

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          What Is a Salary to Hourly Converter?
        </h2>
        <p className="text-gray-600 mb-3">
          A salary to hourly converter is a simple financial tool that translates between annual salary and hourly wage. If you&apos;re offered a job with a $75,000 annual salary, you might wonder what that works out to per hour. Conversely, if you&apos;re earning $25 per hour, you may want to know what that equals as a yearly salary.
        </p>
        <p className="text-gray-600 mb-3">
          The math is straightforward: your annual salary divided by the number of working hours in a year gives you the hourly rate. Most full-time jobs assume 40 hours per week and 52 weeks per year, totaling 2,080 work hours. But not everyone works a standard schedule, so this tool lets you customize both hours per week and weeks per year.
        </p>
        <p className="text-gray-600">
          This converter is especially useful when comparing job offers that use different pay structures, or when budgeting based on your actual take-home timing. Freelancers and contractors also find it helpful for setting competitive rates.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Frequently Asked Questions
        </h2>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          How do I convert salary to hourly?
        </h3>
        <p className="text-gray-600 mb-4">
          Divide your annual salary by the total number of working hours in a year. For a standard full-time schedule, that&apos;s 2,080 hours (40 hours per week times 52 weeks). So a $60,000 salary equals about $28.85 per hour.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          Should I use 52 weeks or fewer?
        </h3>
        <p className="text-gray-600 mb-4">
          If you get paid time off (PTO), you&apos;re still earning during those weeks, so 52 is correct. If you take unpaid time off, reduce the weeks accordingly. For example, two weeks of unpaid vacation means 50 working weeks, which gives a higher effective hourly rate for the same salary.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          Does this account for taxes?
        </h3>
        <p className="text-gray-600 mb-4">
          No, this shows your gross (pre-tax) earnings. Your actual take-home pay will be lower after federal income tax, state income tax, Social Security, Medicare, and any other deductions. The exact amount depends on your tax bracket and location.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          How do I compare a salaried job to a contract position?
        </h3>
        <p className="text-gray-600 mb-4">
          First convert the salary to hourly. Then factor in that salaried positions typically include benefits like health insurance, retirement contributions, and PTO. A general rule of thumb is that benefits add 20-30% to total compensation. So a $75,000 salary might be equivalent to $43-47 per hour in total value.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          What if I work overtime?
        </h3>
        <p className="text-gray-600">
          If you regularly work more than 40 hours per week, increase the hours per week field to get a more accurate effective hourly rate. Keep in mind that salaried exempt employees don&apos;t receive overtime pay, so working 50 hours per week on a $60,000 salary drops your effective rate from $28.85 to $23.08 per hour.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Example Calculation
        </h2>
        <p className="text-gray-600 mb-3">
          Say you&apos;re offered a job paying $85,000 per year. You work a standard 40-hour week for 52 weeks. Here&apos;s your earnings breakdown:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-1 mb-3">
          <li>Hourly rate: $40.87</li>
          <li>Daily earnings (8-hour day): $326.92</li>
          <li>Weekly earnings: $1,634.62</li>
          <li>Monthly earnings: $7,083.33</li>
          <li>Annual salary: $85,000.00</li>
        </ul>
        <p className="text-gray-600">
          Now suppose you&apos;re comparing that to a contract role offering $45 per hour. At 40 hours per week for 52 weeks, the contract position pays $93,600 annually &mdash; but without benefits. After accounting for self-employment tax and buying your own health insurance, the two offers may be closer than they appear.
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
