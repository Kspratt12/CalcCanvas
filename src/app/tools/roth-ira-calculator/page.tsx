'use client';

import { useState } from 'react';
import Link from 'next/link';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Roth IRA Calculator',
  url: 'https://calcanvas.com/tools/roth-ira-calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'All',
  description:
    'Calculate your projected Roth IRA balance at retirement. Estimate tax-free growth, total contributions, and monthly retirement income using the 4% rule.',
};

type YearRow = { year: number; age: number; balance: number; contributions: number; growth: number };

export default function RothIraCalculator() {
  const [currentAge, setCurrentAge] = useState('');
  const [retirementAge, setRetirementAge] = useState('');
  const [currentBalance, setCurrentBalance] = useState('');
  const [annualContribution, setAnnualContribution] = useState('');
  const [expectedReturn, setExpectedReturn] = useState('');
  const [results, setResults] = useState<{
    totalBalance: number;
    totalContributions: number;
    totalGrowth: number;
    monthlyIncome: number;
    breakdown: YearRow[];
  } | null>(null);

  function calculate() {
    const age = parseInt(currentAge);
    const retAge = parseInt(retirementAge);
    const balance = parseFloat(currentBalance) || 0;
    const annual = parseFloat(annualContribution) || 0;
    const rate = parseFloat(expectedReturn) / 100;
    if (!age || !retAge || retAge <= age || !rate) return;

    const yearsToRetirement = retAge - age;
    const breakdown: YearRow[] = [];
    let currentBal = balance;
    let totalContrib = balance;
    const monthlyRate = rate / 12;

    for (let y = 1; y <= yearsToRetirement; y++) {
      const currentYear = age + y;
      // Determine contribution limit based on age at start of year
      const ageThisYear = age + y - 1;
      const catchUp = ageThisYear >= 50;
      const maxContrib = catchUp ? 8000 : 7000;
      const contrib = Math.min(annual, maxContrib);
      const monthlyContrib = contrib / 12;

      for (let m = 0; m < 12; m++) {
        currentBal += monthlyContrib;
        totalContrib += monthlyContrib;
        currentBal *= 1 + monthlyRate;
      }

      breakdown.push({
        year: y,
        age: currentYear,
        balance: currentBal,
        contributions: totalContrib,
        growth: currentBal - totalContrib,
      });
    }

    const monthlyIncome = (currentBal * 0.04) / 12;

    setResults({
      totalBalance: currentBal,
      totalContributions: totalContrib,
      totalGrowth: currentBal - totalContrib,
      monthlyIncome,
      breakdown,
    });
  }

  function reset() {
    setCurrentAge('');
    setRetirementAge('');
    setCurrentBalance('');
    setAnnualContribution('');
    setExpectedReturn('');
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
                "name": "What is a Roth IRA and how does it work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A Roth IRA is a retirement account where you contribute after-tax dollars. Your money grows tax-free, and qualified withdrawals in retirement are completely tax-free. This makes it one of the most powerful retirement savings vehicles available."
                }
              },
              {
                "@type": "Question",
                "name": "What are the Roth IRA contribution limits for 2024?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "For 2024, the Roth IRA contribution limit is $7,000 per year if you are under age 50. If you are 50 or older, you can contribute up to $8,000 per year thanks to the $1,000 catch-up contribution allowance."
                }
              },
              {
                "@type": "Question",
                "name": "What is the 4% rule for retirement income?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The 4% rule is a widely used guideline suggesting you can withdraw 4% of your retirement portfolio in the first year of retirement, then adjust for inflation each year. This withdrawal rate has historically sustained portfolios for 30 or more years."
                }
              },
              {
                "@type": "Question",
                "name": "Can I withdraw my Roth IRA contributions early?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. You can withdraw your original Roth IRA contributions at any time without taxes or penalties. However, withdrawing earnings before age 59½ and before the account has been open for five years may result in taxes and a 10% penalty."
                }
              },
              {
                "@type": "Question",
                "name": "Is a Roth IRA better than a traditional IRA?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "It depends on your tax situation. A Roth IRA is generally better if you expect to be in a higher tax bracket in retirement, since withdrawals are tax-free. A traditional IRA gives you a tax deduction now but you pay taxes on withdrawals. Younger earners often benefit more from a Roth IRA."
                }
              }
            ]
          })
        }}
      />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Roth IRA Calculator
      </h1>
      <p className="text-gray-600 mb-6">
        Estimate how much your Roth IRA could grow by retirement with tax-free
        compounding. See your projected balance, total contributions, tax-free
        growth, and estimated monthly retirement income.
      </p>


      <div className="mt-8 space-y-4">
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
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Roth IRA Balance ($)
          </label>
          <input
            type="number"
            value={currentBalance}
            onChange={(e) => setCurrentBalance(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            placeholder="5000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Annual Contribution ($)
          </label>
          <input
            type="number"
            value={annualContribution}
            onChange={(e) => setAnnualContribution(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            placeholder="7000"
          />
          <p className="text-xs text-gray-500 mt-1">
            2024 limit: $7,000/year (under 50) or $8,000/year (50+). Contributions exceeding the limit will be capped automatically.
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expected Annual Return (%)
          </label>
          <input
            type="number"
            step="0.01"
            value={expectedReturn}
            onChange={(e) => setExpectedReturn(e.target.value)}
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
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-500">Total Balance at Retirement</p>
              <p className="text-2xl font-bold text-[#2563eb]">
                {fmt(results.totalBalance)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Contributions</p>
              <p className="text-2xl font-bold text-gray-900">
                {fmt(results.totalContributions)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Tax-Free Growth</p>
              <p className="text-2xl font-bold text-gray-900">
                {fmt(results.totalGrowth)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Est. Monthly Income (4% Rule)</p>
              <p className="text-2xl font-bold text-[#2563eb]">
                {fmt(results.monthlyIncome)}
              </p>
            </div>
          </div>

          {results.breakdown.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Year-by-Year Breakdown
              </h3>
              <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 sticky top-0">
                    <tr>
                      <th className="px-3 py-2 text-left">Year</th>
                      <th className="px-3 py-2 text-left">Age</th>
                      <th className="px-3 py-2 text-right">Balance</th>
                      <th className="px-3 py-2 text-right">Contributions</th>
                      <th className="px-3 py-2 text-right">Growth</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.breakdown.map((row) => (
                      <tr key={row.year} className="border-t border-gray-100">
                        <td className="px-3 py-2">{row.year}</td>
                        <td className="px-3 py-2">{row.age}</td>
                        <td className="px-3 py-2 text-right">
                          {fmt(row.balance)}
                        </td>
                        <td className="px-3 py-2 text-right">
                          {fmt(row.contributions)}
                        </td>
                        <td className="px-3 py-2 text-right">
                          {fmt(row.growth)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
<section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          How to use this calculator
        </h2>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>Enter your current age and the age you plan to retire.</li>
          <li>Input your existing Roth IRA balance, if any.</li>
          <li>Set your planned annual contribution (the calculator caps it at the IRS limit for each year based on your age).</li>
          <li>Enter your expected annual rate of return, then hit Calculate.</li>
          <li>Review your projected balance, tax-free growth, and estimated monthly retirement income based on the 4% withdrawal rule.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          How it works
        </h2>
        <p className="text-gray-600">
          This Roth IRA calculator projects your account growth by compounding
          monthly contributions at your expected annual return rate. Each year,
          your contribution is capped at the 2024 IRS limit &mdash; $7,000 if
          you&apos;re under 50, or $8,000 if you&apos;re 50 or older (including the
          $1,000 catch-up contribution). Your monthly retirement income estimate
          uses the 4% rule, which divides your final balance by 25 and then by
          12 to give a sustainable monthly withdrawal amount.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          What Is a Roth IRA?
        </h2>
        <p className="text-gray-600 mb-3">
          A Roth IRA (Individual Retirement Account) is a tax-advantaged retirement savings account established by the Taxpayer Relief Act of 1997. Unlike a traditional IRA where contributions may be tax-deductible, Roth IRA contributions are made with after-tax dollars. The major benefit is that your investments grow completely tax-free, and qualified withdrawals in retirement are also tax-free.
        </p>
        <p className="text-gray-600 mb-3">
          This makes the Roth IRA one of the most powerful wealth-building tools available to individual investors. If you contribute $7,000 per year starting at age 25 and earn a 7% average annual return, you could have over $1 million by age 65 &mdash; and every dollar of that growth is tax-free. That&apos;s decades of compounding without the IRS taking a cut.
        </p>
        <p className="text-gray-600">
          Roth IRAs also offer unique flexibility. You can withdraw your contributions (not earnings) at any time without penalty, making it a partial emergency fund backup. There are no required minimum distributions (RMDs) during your lifetime, so you can let the money grow as long as you like. For younger earners in lower tax brackets, a Roth IRA is almost always the smarter choice over a traditional IRA.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Roth IRA Contribution Limits and Eligibility
        </h2>
        <p className="text-gray-600 mb-3">
          For 2024, you can contribute up to $7,000 per year to a Roth IRA if you are under 50. If you are 50 or older, the limit increases to $8,000 thanks to a $1,000 catch-up contribution. These limits apply across all your IRA accounts combined &mdash; traditional and Roth.
        </p>
        <p className="text-gray-600 mb-3">
          There are income limits for Roth IRA eligibility. For 2024, single filers can make full contributions if their modified adjusted gross income (MAGI) is under $146,000. The ability to contribute phases out between $146,000 and $161,000. For married couples filing jointly, the phase-out range is $230,000 to $240,000. If you earn above these thresholds, you may still be able to use a backdoor Roth IRA strategy.
        </p>
        <p className="text-gray-600">
          The contribution deadline for each tax year is the tax filing deadline of the following year &mdash; typically April 15. This means you can make 2024 contributions up until April 15, 2025, giving you extra time to maximize your retirement savings.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Roth IRA vs. Traditional IRA
        </h2>
        <p className="text-gray-600 mb-3">
          The primary difference between a Roth IRA and a traditional IRA is when you pay taxes. With a traditional IRA, contributions may be tax-deductible in the year you make them, but you pay income tax on withdrawals in retirement. With a Roth IRA, you pay taxes on contributions upfront, but withdrawals are completely tax-free.
        </p>
        <p className="text-gray-600">
          If you believe your tax rate will be higher in retirement than it is now &mdash; which is common for younger earners early in their careers &mdash; a Roth IRA is typically the better choice. You lock in today&apos;s lower tax rate and let decades of growth accumulate tax-free. A traditional IRA may be better if you&apos;re in a high tax bracket now and expect to be in a lower one during retirement.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Frequently Asked Questions
        </h2>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          What is a Roth IRA and how does it work?
        </h3>
        <p className="text-gray-600 mb-4">
          A Roth IRA is a retirement account where you contribute after-tax dollars. Your money grows tax-free, and qualified withdrawals in retirement are completely tax-free. You must have earned income to contribute, and there are income limits that may reduce or eliminate your ability to contribute directly.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          What are the Roth IRA contribution limits for 2024?
        </h3>
        <p className="text-gray-600 mb-4">
          For 2024, the Roth IRA contribution limit is $7,000 per year if you are under age 50. If you are 50 or older, you can contribute up to $8,000 per year thanks to the $1,000 catch-up contribution allowance. These limits are set by the IRS and may be adjusted for inflation in future years.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          What is the 4% rule for retirement income?
        </h3>
        <p className="text-gray-600 mb-4">
          The 4% rule is a widely used guideline suggesting you can withdraw 4% of your retirement portfolio in the first year of retirement, then adjust for inflation each year after that. Research by financial planner William Bengen found this withdrawal rate has historically sustained portfolios for 30 or more years, making it a useful starting point for retirement income planning.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          Can I withdraw my Roth IRA contributions early?
        </h3>
        <p className="text-gray-600 mb-4">
          Yes. You can withdraw your original Roth IRA contributions at any time, at any age, without paying taxes or penalties. However, withdrawing earnings before age 59&frac12; and before the account has been open for at least five years may result in income taxes and a 10% early withdrawal penalty.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          Is a Roth IRA better than a traditional IRA?
        </h3>
        <p className="text-gray-600">
          It depends on your current and expected future tax situation. A Roth IRA is generally better if you expect to be in a higher tax bracket in retirement, since withdrawals are tax-free. A traditional IRA gives you a tax deduction now but you pay taxes on withdrawals later. Younger earners in lower tax brackets often benefit more from a Roth IRA because they lock in a low tax rate on contributions and enjoy decades of tax-free growth.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Example Calculation
        </h2>
        <p className="text-gray-600 mb-3">
          Let&apos;s say you are 30 years old, plan to retire at 65, have $5,000 already saved in a Roth IRA, contribute $7,000 per year, and earn an average 7% annual return. Here&apos;s what the numbers look like:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-1 mb-3">
          <li>Years to retirement: 35</li>
          <li>Total contributions: approximately $255,000 ($5,000 initial + $7,000/year for 20 years + $8,000/year for 15 years with catch-up after age 50)</li>
          <li>Total tax-free growth: approximately $835,000</li>
          <li>Projected Roth IRA balance: approximately $1,090,000</li>
          <li>Estimated monthly income (4% rule): approximately $3,633</li>
        </ul>
        <p className="text-gray-600">
          Notice that the tax-free growth is more than three times the amount you contributed out of pocket. That&apos;s the power of tax-free compounding over a long time horizon. Starting just five years earlier or contributing the maximum each year can dramatically increase your final balance. Every dollar of this growth is yours to keep &mdash; no taxes owed on qualified withdrawals.
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
            <Link href="/tools/net-worth-calculator" className="text-[#2563eb] hover:underline">
              Net Worth Calculator
            </Link>
          </li>
          <li>
            <Link href="/tools/salary-calculator" className="text-[#2563eb] hover:underline">
              Salary Calculator
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
