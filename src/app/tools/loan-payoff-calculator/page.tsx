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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How much can I save with extra payments?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The savings depend on your balance, rate, and how much extra you pay. On a $25,000 loan at 6% with a $500 monthly payment, adding $100 per month can save you over $1,500 in interest and pay off the loan about 10 months early."
                }
              },
              {
                "@type": "Question",
                "name": "Should I pay off my loan early or invest the extra money?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "It depends on the interest rate. If your loan charges 7% or more, paying it off early gives you a guaranteed \"return\" at that rate. If the rate is low (under 4-5%), investing might yield better long-term results, though it comes with market risk."
                }
              },
              {
                "@type": "Question",
                "name": "Does my loan have a prepayment penalty?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Some loans charge a fee for paying off the balance early. Check your loan agreement or call your lender before making extra payments. Most personal loans and auto loans do not have prepayment penalties, but some mortgages and private loans do."
                }
              },
              {
                "@type": "Question",
                "name": "Can I use this for credit card debt?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Enter your current balance, the card's APR, and your planned monthly payment. Credit cards have variable rates, so the actual payoff may differ slightly, but this gives you a solid estimate."
                }
              }
            ]
          })
        }}
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

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          What Is a Loan Payoff Calculator?
        </h2>
        <p className="text-gray-600 mb-3">
          A loan payoff calculator shows you exactly when your loan will be fully paid off and how much total interest you&apos;ll pay along the way. It simulates the month-by-month repayment process, applying interest to the remaining balance and subtracting each payment until the debt reaches zero.
        </p>
        <p className="text-gray-600 mb-3">
          What makes this tool especially useful is the extra payment feature. By entering an additional monthly amount &mdash; even just $50 or $100 &mdash; you can see how many months or years you&apos;ll shave off your loan and how much interest you&apos;ll save. The results can be surprisingly dramatic, especially on longer-term loans.
        </p>
        <p className="text-gray-600">
          This calculator works for any type of fixed-rate loan: personal loans, student loans, auto loans, or credit card debt. If you&apos;re trying to decide between paying off a loan faster or investing extra money, seeing the concrete savings from accelerated payments can help you make that decision.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Frequently Asked Questions
        </h2>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          How much can I save with extra payments?
        </h3>
        <p className="text-gray-600 mb-4">
          The savings depend on your balance, rate, and how much extra you pay. On a $25,000 loan at 6% with a $500 monthly payment, adding $100 per month can save you over $1,500 in interest and pay off the loan about 10 months early. Higher interest rates amplify the benefit even more.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          Should I pay off my loan early or invest the extra money?
        </h3>
        <p className="text-gray-600 mb-4">
          It depends on the interest rate. If your loan charges 7% or more, paying it off early gives you a guaranteed &quot;return&quot; at that rate. If the rate is low (under 4-5%), investing might yield better long-term results, though it comes with market risk. Many people choose a hybrid approach.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          Does my loan have a prepayment penalty?
        </h3>
        <p className="text-gray-600 mb-4">
          Some loans charge a fee for paying off the balance early. Check your loan agreement or call your lender before making extra payments. Most personal loans and auto loans do not have prepayment penalties, but some mortgages and private loans do.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          What if my payment doesn&apos;t cover the interest?
        </h3>
        <p className="text-gray-600 mb-4">
          If your monthly payment is less than the monthly interest charge, your balance will actually grow over time. This is called negative amortization. The calculator will alert you if your payment is too low to make progress on the principal.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          Can I use this for credit card debt?
        </h3>
        <p className="text-gray-600">
          Yes. Enter your current balance, the card&apos;s APR, and your planned monthly payment. Credit cards have variable rates, so the actual payoff may differ slightly, but this gives you a solid estimate. Seeing how long it takes to pay off a credit card with minimum payments can be a powerful motivator to pay more.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Example Calculation
        </h2>
        <p className="text-gray-600 mb-3">
          Suppose you have a $20,000 personal loan at 7% interest and you&apos;re paying $400 per month. Here are the results:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-1 mb-3">
          <li>Time to payoff: 4 years, 10 months (58 months)</li>
          <li>Total interest paid: approximately $3,160</li>
        </ul>
        <p className="text-gray-600 mb-3">
          Now add an extra $100 per month ($500 total):
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-1 mb-3">
          <li>New payoff time: 3 years, 9 months (45 months)</li>
          <li>Total interest paid: approximately $2,380</li>
          <li>Time saved: 13 months</li>
          <li>Interest saved: approximately $780</li>
        </ul>
        <p className="text-gray-600">
          That extra $100 per month costs you $4,500 over the payoff period but saves you $780 in interest and gets you debt-free more than a year sooner.
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
