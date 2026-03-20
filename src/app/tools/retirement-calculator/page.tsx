'use client';

import { useState } from 'react';
import Link from 'next/link';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Retirement Calculator',
  url: 'https://calcanvas.com/tools/retirement-calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'All',
  description:
    'Estimate how much you will have saved by retirement and your projected monthly income using the 4% safe withdrawal rule.',
};

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState('');
  const [retirementAge, setRetirementAge] = useState('');
  const [currentSavings, setCurrentSavings] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [returnRate, setReturnRate] = useState('');
  const [results, setResults] = useState<{
    totalSavings: number;
    monthlyIncome: number;
    totalContributions: number;
    totalGrowth: number;
    yearsToRetirement: number;
  } | null>(null);

  function calculate() {
    const age = parseInt(currentAge);
    const retAge = parseInt(retirementAge);
    const savings = parseFloat(currentSavings) || 0;
    const monthly = parseFloat(monthlyContribution) || 0;
    const rate = parseFloat(returnRate) / 100;

    if (!age || !retAge || retAge <= age || !rate) return;

    const years = retAge - age;
    const monthlyRate = rate / 12;
    const months = years * 12;

    // Future value of current savings
    const fvSavings = savings * Math.pow(1 + monthlyRate, months);

    // Future value of monthly contributions (annuity)
    const fvContributions =
      monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

    const totalSavings = fvSavings + fvContributions;
    const totalContributions = savings + monthly * months;
    const monthlyIncome = (totalSavings * 0.04) / 12; // 4% rule

    setResults({
      totalSavings,
      monthlyIncome,
      totalContributions,
      totalGrowth: totalSavings - totalContributions,
      yearsToRetirement: years,
    });
  }

  function reset() {
    setCurrentAge('');
    setRetirementAge('');
    setCurrentSavings('');
    setMonthlyContribution('');
    setReturnRate('');
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
                "name": "How much do I need to retire?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A common target is 25 times your expected annual expenses in retirement (the inverse of the 4% rule). If you plan to spend $50,000 per year, you'd need about $1.25 million saved."
                }
              },
              {
                "@type": "Question",
                "name": "What is the 4% rule?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The 4% rule comes from the Trinity Study, which found that withdrawing 4% of a diversified portfolio in the first year of retirement (and adjusting for inflation each year) has historically sustained the portfolio for at least 30 years."
                }
              },
              {
                "@type": "Question",
                "name": "What rate of return should I assume?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The historical average return for a diversified stock portfolio is about 10% before inflation, or roughly 7% after inflation. If you have a more conservative portfolio with bonds, 5-6% may be more appropriate."
                }
              },
              {
                "@type": "Question",
                "name": "Does this include Social Security?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No, this calculator only projects your personal savings and investments. Social Security, pensions, or other income sources would be in addition to the amounts shown."
                }
              },
              {
                "@type": "Question",
                "name": "What if I want to retire early?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Early retirement (before age 59 1/2) may limit access to certain retirement accounts without penalties. You'll also need your savings to last longer, which means you may want to use a lower withdrawal rate like 3-3.5%."
                }
              }
            ]
          })
        }}
      />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Retirement Calculator
      </h1>
      <p className="text-gray-600 mb-6">
        Estimate your retirement savings and projected monthly income based on
        your current savings, contributions, and expected investment returns.
      </p>


      <div className="mt-8 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Age
            </label>
            <input
              type="number"
              value={currentAge}
              onChange={(e) => setCurrentAge(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
              placeholder="30"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Retirement Age
            </label>
            <input
              type="number"
              value={retirementAge}
              onChange={(e) => setRetirementAge(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
              placeholder="65"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Savings ($)
          </label>
          <input
            type="number"
            value={currentSavings}
            onChange={(e) => setCurrentSavings(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            placeholder="50000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Monthly Contribution ($)
          </label>
          <input
            type="number"
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            placeholder="1000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expected Annual Return (%)
          </label>
          <input
            type="number"
            step="0.1"
            value={returnRate}
            onChange={(e) => setReturnRate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            placeholder="7"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-500">Retirement Savings</p>
              <p className="text-2xl font-bold text-[#2563eb]">
                {fmt(results.totalSavings)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Monthly Income (4% Rule)</p>
              <p className="text-2xl font-bold text-[#2563eb]">
                {fmt(results.monthlyIncome)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Contributions</p>
              <p className="text-xl font-bold text-gray-900">
                {fmt(results.totalContributions)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Investment Growth</p>
              <p className="text-xl font-bold text-gray-900">
                {fmt(results.totalGrowth)}
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-500 text-center mt-4">
            {results.yearsToRetirement} years until retirement
          </p>
        </div>
      )}
<section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          How to use this calculator
        </h2>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>Enter your current age and target retirement age.</li>
          <li>Input your existing retirement savings balance.</li>
          <li>Set how much you plan to contribute each month.</li>
          <li>Choose an expected annual return rate (7% is a common long-term average for stocks).</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          How it works
        </h2>
        <p className="text-gray-600">
          Your current savings grow using the compound interest formula
          FV&nbsp;=&nbsp;PV(1+r)^n. Monthly contributions accumulate as a future
          value of annuity. The monthly retirement income estimate uses the 4%
          safe withdrawal rule, which suggests you can withdraw 4% of your
          portfolio annually with low risk of running out over a 30-year
          retirement.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          What Is a Retirement Calculator?
        </h2>
        <p className="text-gray-600 mb-3">
          A retirement calculator estimates how much money you&apos;ll have saved by the time you retire, based on your current savings, monthly contributions, and expected investment returns. It then uses that total to project how much monthly income you can safely withdraw during retirement.
        </p>
        <p className="text-gray-600 mb-3">
          This calculator uses the widely-referenced 4% rule, which suggests that you can withdraw 4% of your portfolio in the first year of retirement and adjust for inflation each year after that, with a low probability of running out of money over a 30-year retirement. While no rule is perfect, it provides a reasonable starting point for planning.
        </p>
        <p className="text-gray-600">
          The key insight from running these numbers is that time matters more than amount. Starting to save at age 25 versus 35 can result in hundreds of thousands of dollars more at retirement, even with the same monthly contribution. This calculator makes that difference tangible so you can plan accordingly.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Frequently Asked Questions
        </h2>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          How much do I need to retire?
        </h3>
        <p className="text-gray-600 mb-4">
          A common target is 25 times your expected annual expenses in retirement (the inverse of the 4% rule). If you plan to spend $50,000 per year, you&apos;d need about $1.25 million saved. Your actual number depends on your lifestyle, healthcare costs, Social Security benefits, and other income sources.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          What is the 4% rule?
        </h3>
        <p className="text-gray-600 mb-4">
          The 4% rule comes from the Trinity Study, which found that withdrawing 4% of a diversified portfolio in the first year of retirement (and adjusting for inflation each year) has historically sustained the portfolio for at least 30 years. It&apos;s a guideline, not a guarantee, and some financial planners now suggest 3.5% for added safety.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          What rate of return should I assume?
        </h3>
        <p className="text-gray-600 mb-4">
          The historical average return for a diversified stock portfolio is about 10% before inflation, or roughly 7% after inflation. If you have a more conservative portfolio with bonds, 5-6% may be more appropriate. Use a rate that reflects your actual investment mix.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          Does this include Social Security?
        </h3>
        <p className="text-gray-600 mb-4">
          No, this calculator only projects your personal savings and investments. Social Security, pensions, or other income sources would be in addition to the amounts shown. You can check your estimated Social Security benefit at ssa.gov to get the full picture.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          What if I want to retire early?
        </h3>
        <p className="text-gray-600">
          Early retirement (before age 59 1/2) may limit access to certain retirement accounts without penalties. You&apos;ll also need your savings to last longer, which means you may want to use a lower withdrawal rate like 3-3.5%. Set your retirement age in this calculator to see how much more you need to save.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Example Calculation
        </h2>
        <p className="text-gray-600 mb-3">
          A 30-year-old with $50,000 in current savings contributes $1,000 per month and expects a 7% annual return, planning to retire at 65. Here are the projections:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-1 mb-3">
          <li>Years until retirement: 35</li>
          <li>Total contributions: $470,000 ($50,000 + $420,000 in monthly deposits)</li>
          <li>Investment growth: approximately $1,390,000</li>
          <li>Total retirement savings: approximately $1,860,000</li>
          <li>Estimated monthly income (4% rule): approximately $6,200</li>
        </ul>
        <p className="text-gray-600">
          That $1,000 per month turns into nearly $1.9 million thanks to 35 years of compound growth. If this same person waited until age 40 to start, the total would drop to roughly $920,000 &mdash; less than half &mdash; even with the same monthly contribution and rate of return.
        </p>
      </section>

      <section className="mt-8 pb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Related Tools
        </h2>
        <ul className="space-y-1">
          <li><Link href="/tools/compound-interest-calculator" className="text-[#2563eb] hover:underline">Compound Interest Calculator</Link></li>
          <li><Link href="/tools/net-worth-calculator" className="text-[#2563eb] hover:underline">Net Worth Calculator</Link></li>
          <li><Link href="/tools/salary-to-hourly-converter" className="text-[#2563eb] hover:underline">Salary to Hourly Converter</Link></li>
          <li><Link href="/tools/mortgage-calculator" className="text-[#2563eb] hover:underline">Mortgage Calculator</Link></li>
        </ul>
      </section>
    </main>
  );
}
