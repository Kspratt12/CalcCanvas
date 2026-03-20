'use client';

import { useState } from 'react';
import Link from 'next/link';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '401k Calculator',
  url: 'https://calcanvas.com/tools/401k-calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'All',
  description:
    'Estimate your 401k balance at retirement with employer match, salary growth, and compound interest. See a full breakdown of contributions, employer match, and investment growth.',
};

export default function FourOhOneKCalculator() {
  const [currentAge, setCurrentAge] = useState('');
  const [retirementAge, setRetirementAge] = useState('');
  const [currentBalance, setCurrentBalance] = useState('');
  const [annualSalary, setAnnualSalary] = useState('');
  const [contributionPct, setContributionPct] = useState('');
  const [employerMatchPct, setEmployerMatchPct] = useState('');
  const [employerMatchLimit, setEmployerMatchLimit] = useState('');
  const [annualReturn, setAnnualReturn] = useState('');
  const [salaryIncrease, setSalaryIncrease] = useState('');

  const [results, setResults] = useState<{
    totalBalance: number;
    yourContributions: number;
    employerContributions: number;
    investmentGrowth: number;
    monthlyRetirementIncome: number;
  } | null>(null);

  function calculate() {
    const age = parseInt(currentAge);
    const retAge = parseInt(retirementAge);
    const balance = parseFloat(currentBalance) || 0;
    const salary = parseFloat(annualSalary);
    const contribPct = parseFloat(contributionPct) / 100;
    const matchPct = parseFloat(employerMatchPct) / 100;
    const matchLimit = parseFloat(employerMatchLimit) / 100;
    const returnRate = parseFloat(annualReturn) / 100;
    const salaryGrowth = parseFloat(salaryIncrease) / 100 || 0;

    if (!age || !retAge || !salary || !contribPct) return;
    if (retAge <= age) {
      alert('Retirement age must be greater than your current age.');
      return;
    }

    const years = retAge - age;
    const monthlyReturn = returnRate / 12;
    let totalBalance = balance;
    let totalYourContrib = 0;
    let totalEmployerContrib = 0;
    let currentSalary = salary;

    for (let y = 0; y < years; y++) {
      const monthlyContrib = (currentSalary * contribPct) / 12;
      // Employer matches your contribution % up to the match limit % of salary
      const matchableContribPct = Math.min(contribPct, matchLimit);
      const monthlyMatch = (currentSalary * matchableContribPct * matchPct) / 12;

      for (let m = 0; m < 12; m++) {
        totalBalance = totalBalance * (1 + monthlyReturn) + monthlyContrib + monthlyMatch;
        totalYourContrib += monthlyContrib;
        totalEmployerContrib += monthlyMatch;
      }

      currentSalary *= (1 + salaryGrowth);
    }

    const investmentGrowth = totalBalance - balance - totalYourContrib - totalEmployerContrib;
    const monthlyRetirementIncome = (totalBalance * 0.04) / 12;

    setResults({
      totalBalance,
      yourContributions: totalYourContrib,
      employerContributions: totalEmployerContrib,
      investmentGrowth,
      monthlyRetirementIncome,
    });
  }

  function reset() {
    setCurrentAge('');
    setRetirementAge('');
    setCurrentBalance('');
    setAnnualSalary('');
    setContributionPct('');
    setEmployerMatchPct('');
    setEmployerMatchLimit('');
    setAnnualReturn('');
    setSalaryIncrease('');
    setResults(null);
  }

  const fmt = (v: number) =>
    v.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

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
                "name": "How much should I contribute to my 401k?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Financial advisors generally recommend contributing at least enough to get your full employer match, since that is essentially free money. Beyond that, aim for 10-15% of your gross salary if possible. The IRS allows up to $23,500 in employee contributions for 2025, with an additional $7,500 catch-up contribution if you are 50 or older."
                }
              },
              {
                "@type": "Question",
                "name": "What is an employer 401k match?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "An employer match means your company contributes money to your 401k based on how much you contribute. A common formula is a 50% match on the first 6% of your salary. So if you earn $80,000 and contribute 6% ($4,800), your employer adds $2,400. Not taking advantage of the full match is like leaving part of your salary on the table."
                }
              },
              {
                "@type": "Question",
                "name": "What is the 4% rule for retirement withdrawals?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The 4% rule is a guideline that says you can withdraw 4% of your retirement savings in your first year of retirement, then adjust for inflation each year after. This approach is designed to make your money last roughly 30 years. For example, a $1,000,000 401k balance would provide about $40,000 per year or $3,333 per month."
                }
              },
              {
                "@type": "Question",
                "name": "Should I choose a traditional 401k or Roth 401k?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A traditional 401k reduces your taxable income now, and you pay taxes when you withdraw in retirement. A Roth 401k uses after-tax dollars, but withdrawals in retirement are tax-free. If you expect to be in a higher tax bracket in retirement, a Roth may be better. If you expect a lower bracket, traditional is usually the better choice."
                }
              },
              {
                "@type": "Question",
                "name": "How does compound interest affect my 401k?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Compound interest means your investment earnings generate their own earnings over time. In a 401k, this effect is powerful because of the long time horizon. Someone who starts contributing $500 per month at age 25 with a 7% return will have significantly more at 65 than someone who starts the same contributions at 35, even though the difference in total contributions is only 10 years' worth."
                }
              }
            ]
          })
        }}
      />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        401k Calculator
      </h1>
      <p className="text-gray-600 mb-6">
        Estimate how much your 401k will be worth at retirement. Enter your salary, contribution rate, employer match, and expected return to see your projected balance, total contributions, and estimated monthly retirement income.
      </p>


      <div className="mt-8 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            Current 401k Balance ($)
          </label>
          <input
            type="number"
            value={currentBalance}
            onChange={(e) => setCurrentBalance(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            placeholder="25000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Annual Salary ($)
          </label>
          <input
            type="number"
            value={annualSalary}
            onChange={(e) => setAnnualSalary(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            placeholder="75000"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Contribution (%)
            </label>
            <input
              type="number"
              step="0.5"
              value={contributionPct}
              onChange={(e) => setContributionPct(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
              placeholder="10"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Employer Match (%)
            </label>
            <input
              type="number"
              step="0.5"
              value={employerMatchPct}
              onChange={(e) => setEmployerMatchPct(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
              placeholder="50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Match Limit (%)
            </label>
            <input
              type="number"
              step="0.5"
              value={employerMatchLimit}
              onChange={(e) => setEmployerMatchLimit(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
              placeholder="6"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expected Annual Return (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={annualReturn}
              onChange={(e) => setAnnualReturn(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
              placeholder="7"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Annual Salary Increase (%)
              <span className="text-gray-400 font-normal"> — optional</span>
            </label>
            <input
              type="number"
              step="0.1"
              value={salaryIncrease}
              onChange={(e) => setSalaryIncrease(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
              placeholder="3"
            />
          </div>
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
              <p className="text-sm text-gray-500">Total 401k Balance at Retirement</p>
              <p className="text-2xl font-bold text-[#2563eb]">
                {fmt(results.totalBalance)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Monthly Retirement Income (4% Rule)</p>
              <p className="text-2xl font-bold text-[#2563eb]">
                {fmt(results.monthlyRetirementIncome)}
              </p>
            </div>
          </div>

          <div className="border-t border-blue-200 pt-4 mt-4">
            <h3 className="text-md font-semibold text-gray-800 mb-3">
              Balance Breakdown
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-500">Your Contributions</p>
                <p className="text-xl font-bold text-gray-900">
                  {fmt(results.yourContributions)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Employer Match</p>
                <p className="text-xl font-bold text-green-600">
                  {fmt(results.employerContributions)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Investment Growth</p>
                <p className="text-xl font-bold text-green-600">
                  {fmt(results.investmentGrowth)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
<section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          How to use this calculator
        </h2>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>Enter your current age and the age you plan to retire.</li>
          <li>Input your current 401k balance (enter 0 if you are just starting).</li>
          <li>Enter your annual salary and the percentage you contribute each paycheck.</li>
          <li>Add your employer&apos;s match percentage and the salary limit they match up to.</li>
          <li>Set your expected annual investment return (7% is a common historical average).</li>
          <li>Optionally enter an annual salary increase to model raises over time.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          How it works
        </h2>
        <p className="text-gray-600">
          The calculator simulates your 401k growth year by year from your current age to retirement. Each month, your contribution and employer match are added to the balance, and the entire balance grows at your expected rate of return. Salary increases are applied annually, which means your contributions and employer match grow over time too. The final monthly retirement income is estimated using the 4% rule &mdash; withdrawing 4% of your total balance per year, divided by 12.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          What Is a 401k Calculator?
        </h2>
        <p className="text-gray-600 mb-3">
          A 401k calculator is a retirement planning tool that projects how much money you will have in your employer-sponsored 401k plan by the time you retire. It factors in your current savings, ongoing contributions, employer matching, investment returns, and salary growth to give you a realistic picture of your retirement nest egg.
        </p>
        <p className="text-gray-600 mb-3">
          The power of a 401k comes from three sources working together: your contributions, your employer&apos;s matching contributions, and compound investment growth over decades. Even small changes to your contribution rate can have an enormous impact over 20 or 30 years. For example, increasing your contribution from 6% to 10% of a $75,000 salary adds just $250 per month out of pocket, but over 35 years at a 7% return, that difference can grow to over $400,000 in additional retirement savings.
        </p>
        <p className="text-gray-600 mb-3">
          Many workers leave free money on the table by not contributing enough to capture their full employer match. If your employer matches 50% of contributions up to 6% of your salary, you need to contribute at least 6% to get the maximum benefit. Anything less means you are giving up guaranteed, tax-advantaged returns that no investment can replicate.
        </p>
        <p className="text-gray-600">
          This calculator also accounts for salary increases over time, which is important because most people earn more as they advance in their careers. A 3% annual raise compounds on itself, and since your 401k contributions are a percentage of your salary, your contributions naturally increase each year too. This accelerating contribution effect is one reason why starting early is so valuable &mdash; you capture more years of both compound growth and rising contributions.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Understanding Employer 401k Matching
        </h2>
        <p className="text-gray-600 mb-3">
          Employer matching is one of the most valuable benefits in any compensation package. The most common match formula is a percentage of your contribution, up to a certain limit of your salary. For example, &quot;50% match on the first 6%&quot; means if you contribute 6% of your salary, your employer adds an amount equal to 3% of your salary.
        </p>
        <p className="text-gray-600 mb-3">
          Some employers offer a dollar-for-dollar match (100%) up to a lower limit like 3% or 4%. Others offer more complex tiered structures. Regardless of the formula, the principle is the same: the employer match is an immediate, risk-free return on your money. A 50% match is an instant 50% return before any market gains.
        </p>
        <p className="text-gray-600">
          Keep in mind that employer contributions may be subject to a vesting schedule. This means you might need to work at the company for a certain number of years before you fully own the matched funds. Common vesting schedules range from immediate vesting to 6-year graded vesting. Check with your HR department to understand your specific plan.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Frequently Asked Questions
        </h2>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          How much should I contribute to my 401k?
        </h3>
        <p className="text-gray-600 mb-4">
          At a minimum, contribute enough to get your full employer match &mdash; anything less is leaving free money on the table. Financial advisors generally recommend saving 10-15% of your gross income for retirement, including the employer match. The IRS allows up to $23,500 in employee 401k contributions for 2025, with an additional $7,500 catch-up contribution if you are 50 or older.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          What is an employer 401k match?
        </h3>
        <p className="text-gray-600 mb-4">
          An employer match means your company contributes money to your 401k based on how much you contribute. A typical formula is a 50% match on the first 6% of your salary. So if you earn $80,000 and contribute 6% ($4,800 per year), your employer adds $2,400. That is an instant 50% return on your contributed dollars.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          What is the 4% rule for retirement withdrawals?
        </h3>
        <p className="text-gray-600 mb-4">
          The 4% rule is a widely used guideline suggesting you can safely withdraw 4% of your retirement portfolio in the first year of retirement, then adjust that amount for inflation each subsequent year. This strategy is designed to make your savings last approximately 30 years. A $1,000,000 balance would provide about $40,000 per year, or roughly $3,333 per month.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          Should I choose a traditional 401k or Roth 401k?
        </h3>
        <p className="text-gray-600 mb-4">
          With a traditional 401k, your contributions are pre-tax, lowering your taxable income now, but you pay income tax on withdrawals in retirement. With a Roth 401k, you contribute after-tax dollars, but withdrawals in retirement are completely tax-free. If you expect to be in a higher tax bracket in retirement, a Roth 401k may save you more in the long run. If you expect a lower bracket, traditional is usually the better choice.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          How does compound interest affect my 401k?
        </h3>
        <p className="text-gray-600">
          Compound interest means your investment returns generate their own returns over time. In a 401k with a long time horizon, this effect is dramatic. Someone contributing $500 per month starting at age 25 with a 7% average annual return would have about $1.2 million by age 65. Starting the same contributions at age 35 would yield only about $567,000 &mdash; roughly half as much, even though the total contribution difference is only $60,000.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Example Calculation
        </h2>
        <p className="text-gray-600 mb-3">
          Let&apos;s say you are 30 years old, plan to retire at 65, and currently have $25,000 in your 401k. You earn $75,000 per year, contribute 10% of your salary, your employer matches 50% up to 6% of your salary, and you expect a 7% annual return with 3% salary increases.
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-1 mb-3">
          <li>Your monthly contribution: $625 (10% of $75,000 / 12)</li>
          <li>Employer monthly match: $187.50 (50% of 6% of $75,000 / 12)</li>
          <li>Combined monthly addition: $812.50 (growing each year with raises)</li>
        </ul>
        <p className="text-gray-600 mb-3">
          After 35 years of contributions and compound growth:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-1 mb-3">
          <li>Estimated total balance: approximately $1,800,000</li>
          <li>Your total contributions: approximately $475,000</li>
          <li>Employer total match: approximately $142,000</li>
          <li>Investment growth: approximately $1,183,000</li>
          <li>Monthly retirement income (4% rule): approximately $6,000</li>
        </ul>
        <p className="text-gray-600">
          Notice that investment growth makes up the largest portion of the final balance. That is the power of compound returns over a multi-decade time horizon. Even the employer match, while modest on a monthly basis, adds up to over $142,000 in this scenario.
        </p>
      </section>

      <section className="mt-8 pb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Related Tools
        </h2>
        <ul className="space-y-1">
          <li><Link href="/tools/retirement-calculator" className="text-[#2563eb] hover:underline">Retirement Calculator</Link></li>
          <li><Link href="/tools/compound-interest-calculator" className="text-[#2563eb] hover:underline">Compound Interest Calculator</Link></li>
          <li><Link href="/tools/investment-calculator" className="text-[#2563eb] hover:underline">Investment Calculator</Link></li>
          <li><Link href="/tools/salary-calculator" className="text-[#2563eb] hover:underline">Salary Calculator</Link></li>
          <li><Link href="/tools/loan-payoff-calculator" className="text-[#2563eb] hover:underline">Loan Payoff Calculator</Link></li>
        </ul>
      </section>
    </main>
  );
}
