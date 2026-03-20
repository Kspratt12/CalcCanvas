'use client';

import { useState } from 'react';
import AdPlacement from '@/components/AdPlacement';
import Link from 'next/link';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Mortgage Calculator',
  url: 'https://calcanvas.com/tools/mortgage-calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'All',
  description:
    'Calculate your monthly mortgage payment, total interest, and total cost based on home price, down payment, interest rate, and loan term.',
};

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [downPaymentPercent, setDownPaymentPercent] = useState('20');
  const [usePercent, setUsePercent] = useState(true);
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('30');
  const [results, setResults] = useState<{
    monthlyPayment: number;
    totalInterest: number;
    totalCost: number;
  } | null>(null);

  function calculate() {
    const price = parseFloat(homePrice);
    const rate = parseFloat(interestRate) / 100 / 12;
    const n = parseInt(loanTerm) * 12;
    const dp = usePercent
      ? price * (parseFloat(downPaymentPercent) / 100)
      : parseFloat(downPayment);
    const principal = price - dp;

    if (!price || !rate || !n || principal <= 0) return;

    const monthlyPayment =
      (principal * (rate * Math.pow(1 + rate, n))) /
      (Math.pow(1 + rate, n) - 1);
    const totalCost = monthlyPayment * n;
    const totalInterest = totalCost - principal;

    setResults({ monthlyPayment, totalInterest, totalCost });
  }

  function reset() {
    setHomePrice('');
    setDownPayment('');
    setDownPaymentPercent('20');
    setInterestRate('');
    setLoanTerm('30');
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
                "name": "How much house can I afford?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A common guideline is to keep your monthly mortgage payment at or below 28% of your gross monthly income. Use this calculator to experiment with different price points until you find a comfortable range."
                }
              },
              {
                "@type": "Question",
                "name": "What is the difference between a 15-year and 30-year mortgage?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A 15-year mortgage has higher monthly payments but a significantly lower total interest cost. A 30-year mortgage spreads payments out, making each one more affordable, but you'll pay much more in interest over the full term."
                }
              },
              {
                "@type": "Question",
                "name": "Does this calculator include property taxes and insurance?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "This calculator focuses on principal and interest only. Your actual monthly payment will likely be higher once you add property taxes, homeowners insurance, and possibly private mortgage insurance (PMI)."
                }
              },
              {
                "@type": "Question",
                "name": "How does my down payment affect the loan?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A larger down payment reduces the amount you need to borrow, which lowers both your monthly payment and the total interest paid. Putting down at least 20% also typically lets you avoid PMI."
                }
              },
              {
                "@type": "Question",
                "name": "What interest rate should I use?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Use the rate your lender has quoted you, or check current average rates online for a general estimate. Even a small difference in rate can have a big impact over 30 years."
                }
              }
            ]
          })
        }}
      />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Mortgage Calculator
      </h1>
      <p className="text-gray-600 mb-6">
        Estimate your monthly mortgage payment, total interest paid, and overall
        loan cost based on your home price, down payment, rate, and term.
      </p>

      <AdPlacement format="leaderboard" />

      <div className="mt-8 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Home Price ($)
          </label>
          <input
            type="number"
            value={homePrice}
            onChange={(e) => setHomePrice(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            placeholder="350000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Down Payment
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={usePercent ? downPaymentPercent : downPayment}
              onChange={(e) =>
                usePercent
                  ? setDownPaymentPercent(e.target.value)
                  : setDownPayment(e.target.value)
              }
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
              placeholder={usePercent ? '20' : '70000'}
            />
            <button
              onClick={() => setUsePercent(!usePercent)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              {usePercent ? '%' : '$'}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Interest Rate (%)
          </label>
          <input
            type="number"
            step="0.01"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            placeholder="6.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Loan Term
          </label>
          <select
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
          >
            <option value="15">15 years</option>
            <option value="20">20 years</option>
            <option value="30">30 years</option>
          </select>
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
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6 space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-500">Monthly Payment</p>
              <p className="text-2xl font-bold text-[#2563eb]">
                {fmt(results.monthlyPayment)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Interest</p>
              <p className="text-2xl font-bold text-gray-900">
                {fmt(results.totalInterest)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Cost</p>
              <p className="text-2xl font-bold text-gray-900">
                {fmt(results.totalCost)}
              </p>
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
          <li>Enter the total home purchase price.</li>
          <li>Set your down payment as a dollar amount or percentage.</li>
          <li>Input the annual interest rate offered by your lender.</li>
          <li>Choose a loan term of 15, 20, or 30 years and hit Calculate.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          How it works
        </h2>
        <p className="text-gray-600">
          This calculator uses the standard amortization formula: M = P[r(1+r)^n]
          / [(1+r)^n - 1], where P is the loan principal, r is the monthly
          interest rate, and n is the total number of payments. The result gives
          you the fixed monthly payment over the life of the loan.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          What Is a Mortgage Calculator?
        </h2>
        <p className="text-gray-600 mb-3">
          A mortgage calculator is a financial tool that helps you estimate your monthly home loan payment before you commit to buying a property. It takes your home price, down payment, interest rate, and loan term and runs them through the standard amortization formula to give you a clear picture of what you&apos;ll owe each month.
        </p>
        <p className="text-gray-600 mb-3">
          Beyond the monthly payment, a good mortgage calculator also shows you the total interest you&apos;ll pay over the life of the loan and the overall cost of the home including financing. This is critical information because the sticker price of a house is only part of the story. On a 30-year mortgage, you can easily pay more in interest than the original loan amount.
        </p>
        <p className="text-gray-600">
          Whether you&apos;re a first-time homebuyer comparing neighborhoods or a current homeowner thinking about refinancing, running the numbers ahead of time helps you set a realistic budget and avoid surprises at the closing table.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Frequently Asked Questions
        </h2>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          How much house can I afford?
        </h3>
        <p className="text-gray-600 mb-4">
          A common guideline is to keep your monthly mortgage payment at or below 28% of your gross monthly income. For example, if your household earns $6,000 per month before taxes, you&apos;d want your payment to stay under roughly $1,680. Use this calculator to experiment with different price points until you find a comfortable range.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          What is the difference between a 15-year and 30-year mortgage?
        </h3>
        <p className="text-gray-600 mb-4">
          A 15-year mortgage has higher monthly payments but a significantly lower total interest cost. A 30-year mortgage spreads payments out, making each one more affordable, but you&apos;ll pay much more in interest over the full term. Try both options in the calculator to see the difference in dollars.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          Does this calculator include property taxes and insurance?
        </h3>
        <p className="text-gray-600 mb-4">
          This calculator focuses on principal and interest only. Your actual monthly payment will likely be higher once you add property taxes, homeowners insurance, and possibly private mortgage insurance (PMI) if your down payment is less than 20%. These vary widely by location and policy.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          How does my down payment affect the loan?
        </h3>
        <p className="text-gray-600 mb-4">
          A larger down payment reduces the amount you need to borrow, which lowers both your monthly payment and the total interest paid. Putting down at least 20% also typically lets you avoid PMI, saving you even more each month.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          What interest rate should I use?
        </h3>
        <p className="text-gray-600">
          Use the rate your lender has quoted you, or check current average rates online for a general estimate. Even a small difference in rate can have a big impact over 30 years. For example, the difference between 6% and 6.5% on a $300,000 loan adds up to tens of thousands of dollars in extra interest.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Example Calculation
        </h2>
        <p className="text-gray-600 mb-3">
          Suppose you&apos;re buying a home for $350,000 with a 20% down payment ($70,000), a 6.5% interest rate, and a 30-year term. Here&apos;s what the numbers look like:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-1 mb-3">
          <li>Loan amount: $280,000</li>
          <li>Monthly payment: approximately $1,770</li>
          <li>Total interest over 30 years: approximately $357,300</li>
          <li>Total cost (principal + interest): approximately $637,300</li>
        </ul>
        <p className="text-gray-600">
          That means you&apos;d pay more in interest than the original loan amount. Switching to a 15-year term would raise the monthly payment to about $2,441 but cut total interest to roughly $159,400 &mdash; saving you nearly $198,000.
        </p>
      </section>

      <section className="mt-8 pb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Related Tools
        </h2>
        <ul className="space-y-1">
          <li>
            <Link
              href="/tools/auto-loan-calculator"
              className="text-[#2563eb] hover:underline"
            >
              Auto Loan Calculator
            </Link>
          </li>
          <li>
            <Link
              href="/tools/compound-interest-calculator"
              className="text-[#2563eb] hover:underline"
            >
              Compound Interest Calculator
            </Link>
          </li>
          <li>
            <Link
              href="/tools/loan-payoff-calculator"
              className="text-[#2563eb] hover:underline"
            >
              Loan Payoff Calculator
            </Link>
          </li>
          <li>
            <Link
              href="/tools/retirement-calculator"
              className="text-[#2563eb] hover:underline"
            >
              Retirement Calculator
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
