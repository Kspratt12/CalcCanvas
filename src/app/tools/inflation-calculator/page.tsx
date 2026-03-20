'use client';

import { useState } from 'react';
import AdPlacement from '@/components/AdPlacement';
import Link from 'next/link';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Inflation Calculator',
  url: 'https://calcanvas.com/tools/inflation-calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'All',
  description:
    'Calculate how inflation affects your purchasing power over time. See what past dollars are worth today and how future costs compare to current prices.',
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the average US inflation rate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The historical average US inflation rate is roughly 3.2% per year, based on the Consumer Price Index (CPI) data going back to 1913. However, inflation fluctuates significantly from year to year. Recent years have seen rates well above this average.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does inflation affect purchasing power?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Inflation reduces the purchasing power of money over time. If inflation is 3% per year, something that costs $100 today would cost about $103 next year. Conversely, $100 next year would only buy what $97.09 buys today. Over decades, this effect compounds dramatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'What causes inflation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Inflation is caused by factors including increased money supply, rising production costs, strong consumer demand, and supply chain disruptions. Central banks like the Federal Reserve target around 2% annual inflation as a healthy rate for economic growth.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I protect my money from inflation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Common inflation hedges include investing in stocks, real estate, Treasury Inflation-Protected Securities (TIPS), commodities, and I Bonds. Keeping large amounts in a low-interest savings account means your purchasing power erodes over time.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is inflation always bad?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Moderate inflation (around 2%) is generally considered healthy for an economy. It encourages spending and investment rather than hoarding cash. Deflation, where prices fall, can actually be more damaging because it discourages spending and increases the real burden of debt.',
      },
    },
  ],
};

export default function InflationCalculator() {
  const [amount, setAmount] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endYear, setEndYear] = useState('');
  const [inflationRate, setInflationRate] = useState('3.2');
  const [results, setResults] = useState<{
    adjustedAmount: number;
    totalInflation: number;
    purchasingPowerChange: number;
    years: number;
  } | null>(null);

  function calculate() {
    const amt = parseFloat(amount) || 0;
    const start = parseInt(startYear);
    const end = parseInt(endYear);
    const rate = parseFloat(inflationRate) / 100;
    if (!amt || !start || !end || !rate) return;

    const years = end - start;
    if (years === 0) return;

    const adjustedAmount = amt * Math.pow(1 + rate, years);
    const totalInflation = ((adjustedAmount - amt) / amt) * 100;
    const purchasingPowerChange = years > 0
      ? ((amt / adjustedAmount) - 1) * 100
      : ((adjustedAmount / amt) - 1) * 100;

    setResults({
      adjustedAmount,
      totalInflation,
      purchasingPowerChange,
      years: Math.abs(years),
    });
  }

  function reset() {
    setAmount('');
    setStartYear('');
    setEndYear('');
    setInflationRate('3.2');
    setResults(null);
  }

  const fmt = (v: number) =>
    v.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  const pct = (v: number) => v.toFixed(2) + '%';

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Inflation Calculator
      </h1>
      <p className="text-gray-600 mb-6">
        See how inflation changes the value of your money over time. Compare
        purchasing power between any two years.
      </p>

      <AdPlacement format="leaderboard" />

      <div className="mt-8 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dollar Amount ($)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            placeholder="1000"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Year
            </label>
            <input
              type="number"
              value={startYear}
              onChange={(e) => setStartYear(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
              placeholder="2000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Year
            </label>
            <input
              type="number"
              value={endYear}
              onChange={(e) => setEndYear(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
              placeholder="2024"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Average Annual Inflation Rate (%)
          </label>
          <input
            type="number"
            step="0.1"
            value={inflationRate}
            onChange={(e) => setInflationRate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            placeholder="3.2"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-500">Original Amount</p>
              <p className="text-2xl font-bold text-gray-900">
                {fmt(parseFloat(amount))}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Adjusted for Inflation</p>
              <p className="text-2xl font-bold text-[#2563eb]">
                {fmt(results.adjustedAmount)}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center mt-2">
            <div>
              <p className="text-sm text-gray-500">Time Span</p>
              <p className="text-lg font-semibold text-gray-900">
                {results.years} {results.years === 1 ? 'year' : 'years'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Cumulative Inflation</p>
              <p className="text-lg font-semibold text-gray-900">
                {pct(results.totalInflation)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Purchasing Power Change</p>
              <p className="text-lg font-semibold text-gray-900">
                {pct(results.purchasingPowerChange)}
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            {parseInt(endYear) > parseInt(startYear)
              ? `${fmt(parseFloat(amount))} in ${startYear} has the same buying power as ${fmt(results.adjustedAmount)} in ${endYear}.`
              : `${fmt(parseFloat(amount))} in ${startYear} had the same buying power as ${fmt(results.adjustedAmount)} in ${endYear}.`}
          </p>
        </div>
      )}

      <div className="mt-8">
        <AdPlacement format="rectangle" />
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          What Is Inflation?
        </h2>
        <p className="text-gray-600 mb-3">
          Inflation is the gradual increase in prices for goods and services over time. When inflation rises, each dollar you hold buys a little less than it did before. This erosion of purchasing power is why a gallon of milk or a movie ticket costs far more today than it did 30 years ago. The US Bureau of Labor Statistics tracks inflation through the Consumer Price Index (CPI), which measures the average price change for a basket of common goods and services.
        </p>
        <p className="text-gray-600 mb-3">
          Understanding inflation is essential for financial planning. If your savings account earns 1% interest but inflation runs at 3%, your money is actually losing value in real terms. This calculator helps you see exactly how much purchasing power changes between any two years, using a customizable average inflation rate. The default rate of 3.2% reflects the long-term US historical average, but you can adjust it to model different scenarios.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Frequently Asked Questions
        </h2>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          What is the average US inflation rate?
        </h3>
        <p className="text-gray-600 mb-4">
          The historical average US inflation rate is roughly 3.2% per year, based on Consumer Price Index (CPI) data going back to 1913. However, inflation fluctuates significantly from year to year. Some years see rates below 1%, while others &mdash; like 2022 &mdash; have exceeded 7%. This calculator uses 3.2% as the default, but you should adjust the rate to match the specific period you&apos;re analyzing.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          How does inflation affect purchasing power?
        </h3>
        <p className="text-gray-600 mb-4">
          Inflation reduces the purchasing power of money over time. If inflation averages 3% per year, something that costs $100 today would cost about $134 in ten years. Conversely, $100 ten years from now would only buy what roughly $74 buys today. Over decades, this compounding effect is dramatic &mdash; which is why long-term financial planning must account for inflation.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          What causes inflation?
        </h3>
        <p className="text-gray-600 mb-4">
          Inflation stems from several factors: increased money supply, rising production costs (cost-push inflation), strong consumer demand (demand-pull inflation), and supply chain disruptions. Central banks like the Federal Reserve aim for about 2% annual inflation as a healthy target, using interest rate adjustments and other monetary policy tools to keep prices stable.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          How can I protect my money from inflation?
        </h3>
        <p className="text-gray-600 mb-4">
          Common inflation hedges include investing in stocks, real estate, Treasury Inflation-Protected Securities (TIPS), commodities, and Series I Savings Bonds. A diversified investment portfolio historically outpaces inflation over long periods. Keeping large amounts of cash in a low-interest savings account means your purchasing power erodes year after year.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          Is inflation always bad?
        </h3>
        <p className="text-gray-600">
          Moderate inflation around 2% is generally considered healthy for an economy. It encourages spending and investment rather than hoarding cash, and it allows wages to adjust gradually. Deflation &mdash; where prices fall &mdash; can actually be more damaging because it discourages spending and increases the real burden of existing debt, potentially triggering economic downturns.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Example Calculation
        </h2>
        <p className="text-gray-600 mb-3">
          Suppose you want to know what $1,000 from the year 2000 is worth in 2024, using the average US inflation rate of 3.2%. Here&apos;s the breakdown:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-1 mb-3">
          <li>Original amount: $1,000 in 2000</li>
          <li>Time span: 24 years</li>
          <li>Cumulative inflation: approximately 112.7%</li>
          <li>Equivalent value in 2024: approximately $2,127</li>
        </ul>
        <p className="text-gray-600">
          This means you&apos;d need about $2,127 today to have the same buying power as $1,000 in the year 2000. If you had put that $1,000 in a savings account earning 1% per year, you&apos;d only have about $1,270 &mdash; meaning you actually lost purchasing power despite earning interest. This illustrates why investing at rates above inflation is critical for preserving and growing wealth.
        </p>
      </section>

      <section className="mt-8 pb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Related Tools
        </h2>
        <ul className="space-y-1">
          <li>
            <Link href="/tools/compound-interest-calculator" className="text-[#2563eb] hover:underline">
              Compound Interest Calculator
            </Link>
          </li>
          <li>
            <Link href="/tools/retirement-calculator" className="text-[#2563eb] hover:underline">
              Retirement Calculator
            </Link>
          </li>
          <li>
            <Link href="/tools/salary-to-hourly-converter" className="text-[#2563eb] hover:underline">
              Salary to Hourly Converter
            </Link>
          </li>
          <li>
            <Link href="/tools/net-worth-calculator" className="text-[#2563eb] hover:underline">
              Net Worth Calculator
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
