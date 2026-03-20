'use client';

import { useState } from 'react';
import Link from 'next/link';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Auto Loan Calculator',
  url: 'https://calcanvas.com/tools/auto-loan-calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'All',
  description:
    'Calculate your monthly auto loan payment, total interest, and total cost for any vehicle purchase.',
};

export default function AutoLoanCalculator() {
  const [vehiclePrice, setVehiclePrice] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('60');
  const [results, setResults] = useState<{
    monthlyPayment: number;
    totalInterest: number;
    totalCost: number;
  } | null>(null);

  function calculate() {
    const price = parseFloat(vehiclePrice);
    const dp = parseFloat(downPayment) || 0;
    const r = parseFloat(interestRate) / 100 / 12;
    const n = parseInt(loanTerm);
    const principal = price - dp;

    if (!price || !r || !n || principal <= 0) return;

    const monthlyPayment =
      (principal * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
    const totalCost = monthlyPayment * n;
    const totalInterest = totalCost - principal;

    setResults({ monthlyPayment, totalInterest, totalCost });
  }

  function reset() {
    setVehiclePrice('');
    setDownPayment('');
    setInterestRate('');
    setLoanTerm('60');
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
                "name": "What is a good interest rate for a car loan?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Auto loan rates depend heavily on your credit score, the loan term, and whether the vehicle is new or used. As of recent years, buyers with excellent credit can get rates around 4-6% for new cars. Used car rates tend to be 1-2 percentage points higher. Check with your bank or credit union before accepting dealer financing."
                }
              },
              {
                "@type": "Question",
                "name": "How much should I put down on a car?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A common recommendation is at least 20% for a new car and 10% for a used car. A larger down payment reduces the loan amount, lowers your monthly payment, and helps you avoid being \"upside down\" on the loan — meaning you owe more than the car is worth."
                }
              },
              {
                "@type": "Question",
                "name": "Is a longer loan term better?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A longer term (60-84 months) lowers the monthly payment but increases total interest significantly. For example, stretching a $30,000 loan from 48 to 72 months could add over $2,000 in interest. Choose the shortest term you can comfortably afford to minimize total cost."
                }
              },
              {
                "@type": "Question",
                "name": "Should I include trade-in value in the down payment?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, your trade-in value effectively reduces the amount you need to finance. Enter the combined total of your cash down payment and trade-in value in the down payment field to get an accurate monthly estimate."
                }
              },
              {
                "@type": "Question",
                "name": "Does this calculator include fees and taxes?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "This calculator covers the vehicle price, down payment, and loan financing. Sales tax, registration fees, dealer fees, and extended warranties are not included. In many states, sales tax on a vehicle can add several thousand dollars to the total, so keep that in mind when budgeting."
                }
              }
            ]
          })
        }}
      />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Auto Loan Calculator
      </h1>
      <p className="text-gray-600 mb-6">
        Estimate your monthly car payment, total interest, and overall cost for
        any vehicle financing scenario.
      </p>


      <div className="mt-8 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Vehicle Price ($)
          </label>
          <input
            type="number"
            value={vehiclePrice}
            onChange={(e) => setVehiclePrice(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            placeholder="35000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Down Payment ($)
          </label>
          <input
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            placeholder="5000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Annual Interest Rate (%)
          </label>
          <input
            type="number"
            step="0.01"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            placeholder="5.9"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Loan Term (months)
          </label>
          <select
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
          >
            <option value="24">24 months (2 years)</option>
            <option value="36">36 months (3 years)</option>
            <option value="48">48 months (4 years)</option>
            <option value="60">60 months (5 years)</option>
            <option value="72">72 months (6 years)</option>
            <option value="84">84 months (7 years)</option>
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
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Results</h2>
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
<section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          How to use this calculator
        </h2>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>Enter the full vehicle purchase price.</li>
          <li>Input any down payment or trade-in value you are putting down.</li>
          <li>Set the annual interest rate from your lender or dealer.</li>
          <li>Choose a loan term between 24 and 84 months and hit Calculate.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          How it works
        </h2>
        <p className="text-gray-600">
          This calculator uses the standard amortization formula: M = P[r(1+r)^n]
          / [(1+r)^n - 1]. The principal (P) is the vehicle price minus your down
          payment, r is the monthly interest rate, and n is the number of monthly
          payments. A shorter term means higher payments but less total interest.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          What Is an Auto Loan Calculator?
        </h2>
        <p className="text-gray-600 mb-3">
          An auto loan calculator helps you estimate the monthly payment, total interest, and overall cost of financing a vehicle. Whether you&apos;re shopping for a new car, a used truck, or refinancing your current auto loan, this tool gives you the numbers before you step into a dealership.
        </p>
        <p className="text-gray-600 mb-3">
          Car purchases are the second-largest transactions most people make after buying a home. Yet many buyers focus only on the monthly payment without considering how much they&apos;ll pay in total. A $35,000 car financed at 6% for 72 months costs over $41,500 when you factor in interest. This calculator makes those hidden costs visible.
        </p>
        <p className="text-gray-600">
          You can experiment with different down payment amounts, loan terms, and interest rates to find the financing structure that fits your budget. Shorter loan terms mean higher monthly payments but significantly less interest paid overall.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Frequently Asked Questions
        </h2>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          What is a good interest rate for a car loan?
        </h3>
        <p className="text-gray-600 mb-4">
          Auto loan rates depend heavily on your credit score, the loan term, and whether the vehicle is new or used. As of recent years, buyers with excellent credit can get rates around 4-6% for new cars. Used car rates tend to be 1-2 percentage points higher. Check with your bank or credit union before accepting dealer financing.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          How much should I put down on a car?
        </h3>
        <p className="text-gray-600 mb-4">
          A common recommendation is at least 20% for a new car and 10% for a used car. A larger down payment reduces the loan amount, lowers your monthly payment, and helps you avoid being &quot;upside down&quot; on the loan &mdash; meaning you owe more than the car is worth.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          Is a longer loan term better?
        </h3>
        <p className="text-gray-600 mb-4">
          A longer term (60-84 months) lowers the monthly payment but increases total interest significantly. For example, stretching a $30,000 loan from 48 to 72 months could add over $2,000 in interest. Choose the shortest term you can comfortably afford to minimize total cost.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          Should I include trade-in value in the down payment?
        </h3>
        <p className="text-gray-600 mb-4">
          Yes, your trade-in value effectively reduces the amount you need to finance. Enter the combined total of your cash down payment and trade-in value in the down payment field to get an accurate monthly estimate.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          Does this calculator include fees and taxes?
        </h3>
        <p className="text-gray-600">
          This calculator covers the vehicle price, down payment, and loan financing. Sales tax, registration fees, dealer fees, and extended warranties are not included. In many states, sales tax on a vehicle can add several thousand dollars to the total, so keep that in mind when budgeting.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Example Calculation
        </h2>
        <p className="text-gray-600 mb-3">
          You&apos;re buying a car for $32,000 with a $5,000 down payment, a 5.9% interest rate, and a 60-month loan term. Here&apos;s the breakdown:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-1 mb-3">
          <li>Loan amount: $27,000</li>
          <li>Monthly payment: approximately $522</li>
          <li>Total interest over 60 months: approximately $4,320</li>
          <li>Total cost (principal + interest): approximately $31,320</li>
        </ul>
        <p className="text-gray-600">
          If you chose a 48-month term instead, the monthly payment rises to about $634, but total interest drops to around $3,420 &mdash; saving you roughly $900. On the other hand, extending to 72 months lowers the payment to about $446 but pushes total interest to approximately $5,130.
        </p>
      </section>

      <section className="mt-8 pb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Related Tools
        </h2>
        <ul className="space-y-1">
          <li><Link href="/tools/mortgage-calculator" className="text-[#2563eb] hover:underline">Mortgage Calculator</Link></li>
          <li><Link href="/tools/loan-payoff-calculator" className="text-[#2563eb] hover:underline">Loan Payoff Calculator</Link></li>
          <li><Link href="/tools/compound-interest-calculator" className="text-[#2563eb] hover:underline">Compound Interest Calculator</Link></li>
          <li><Link href="/tools/salary-to-hourly-converter" className="text-[#2563eb] hover:underline">Salary to Hourly Converter</Link></li>
        </ul>
      </section>
    </main>
  );
}
