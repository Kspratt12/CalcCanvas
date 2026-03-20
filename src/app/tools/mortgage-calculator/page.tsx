'use client';

import { useState } from 'react';
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

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Understanding Mortgage Payments
        </h2>
        <p className="text-gray-700 mb-3">
          Your monthly mortgage payment is often referred to as PITI, which stands for Principal, Interest, Taxes, and Insurance. The calculator above covers the first two components &mdash; principal and interest &mdash; but understanding all four is essential for budgeting accurately.
        </p>
        <p className="text-gray-700 mb-3">
          <strong>Principal</strong> is the portion of your payment that goes toward paying down the actual loan balance. <strong>Interest</strong> is what the lender charges you for borrowing the money. <strong>Taxes</strong> refers to property taxes, which your lender typically collects monthly and holds in an escrow account. <strong>Insurance</strong> includes homeowners insurance and, if your down payment is under 20%, private mortgage insurance (PMI).
        </p>
        <p className="text-gray-700 mb-3">
          What surprises many first-time buyers is how the split between principal and interest changes over time. In the early years of a mortgage, the vast majority of each payment goes toward interest. As the loan matures, the balance shifts and more of your payment chips away at the principal. This is called amortization.
        </p>
        <p className="text-gray-700 mb-3">
          Here&apos;s a concrete example using a $280,000 loan at 6.5% over 30 years (monthly payment of about $1,770):
        </p>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-3">
          <div className="grid grid-cols-4 gap-2 text-sm font-semibold text-gray-900 border-b border-gray-300 pb-2 mb-2">
            <div>Period</div>
            <div>To Interest</div>
            <div>To Principal</div>
            <div>Remaining Balance</div>
          </div>
          <div className="grid grid-cols-4 gap-2 text-sm text-gray-700 py-1">
            <div>Year 1 (Month 1)</div>
            <div>$1,517</div>
            <div>$253</div>
            <div>$279,747</div>
          </div>
          <div className="grid grid-cols-4 gap-2 text-sm text-gray-700 py-1">
            <div>Year 15 (Month 181)</div>
            <div>$1,088</div>
            <div>$682</div>
            <div>$199,870</div>
          </div>
          <div className="grid grid-cols-4 gap-2 text-sm text-gray-700 py-1">
            <div>Year 30 (Month 360)</div>
            <div>$10</div>
            <div>$1,760</div>
            <div>$0</div>
          </div>
        </div>
        <p className="text-gray-700">
          Notice how in Month 1, roughly 86% of your payment goes to interest. By the halfway point, the split is closer to 60/40. And in the final year, nearly every dollar goes toward paying off principal. This is why making extra payments early in the loan has such a dramatic effect on total interest paid.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          15-Year vs 20-Year vs 30-Year Mortgages
        </h2>
        <p className="text-gray-700 mb-3">
          Choosing the right loan term is one of the biggest financial decisions you&apos;ll make. A shorter term means higher monthly payments but dramatically less interest over the life of the loan. Here&apos;s a side-by-side comparison using a $350,000 home with 20% down ($280,000 loan) at a 6.5% interest rate:
        </p>
        <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden mb-4">
          <div className="grid grid-cols-4 gap-0 text-sm font-semibold text-gray-900 bg-gray-100 border-b border-gray-300">
            <div className="p-3"></div>
            <div className="p-3 text-center">15-Year</div>
            <div className="p-3 text-center">20-Year</div>
            <div className="p-3 text-center">30-Year</div>
          </div>
          <div className="grid grid-cols-4 gap-0 text-sm text-gray-700 border-b border-gray-200">
            <div className="p-3 font-medium">Monthly Payment</div>
            <div className="p-3 text-center">$2,441</div>
            <div className="p-3 text-center">$2,089</div>
            <div className="p-3 text-center">$1,770</div>
          </div>
          <div className="grid grid-cols-4 gap-0 text-sm text-gray-700 border-b border-gray-200">
            <div className="p-3 font-medium">Total Interest</div>
            <div className="p-3 text-center">$159,400</div>
            <div className="p-3 text-center">$221,360</div>
            <div className="p-3 text-center">$357,300</div>
          </div>
          <div className="grid grid-cols-4 gap-0 text-sm text-gray-700">
            <div className="p-3 font-medium">Total Cost</div>
            <div className="p-3 text-center">$439,400</div>
            <div className="p-3 text-center">$501,360</div>
            <div className="p-3 text-center">$637,300</div>
          </div>
        </div>
        <p className="text-gray-700 mb-3">
          The difference is staggering. Choosing a 15-year term over a 30-year term saves you nearly <strong>$198,000</strong> in interest &mdash; but your monthly payment jumps by about $671. The 20-year term offers a middle ground, saving you $136,000 in interest compared to the 30-year option while keeping payments more manageable.
        </p>
        <p className="text-gray-700 mb-3">
          <strong>A 30-year mortgage makes sense</strong> if you want the lowest monthly payment for cash flow flexibility, you&apos;re investing the difference elsewhere, or you&apos;re buying near the top of your budget. <strong>A 15-year mortgage works well</strong> if you have a high income relative to the home price, you&apos;re close to retirement and want to be debt-free, or you simply want to build equity faster. <strong>The 20-year term</strong> is a smart compromise if the 15-year payment feels tight but you don&apos;t want to pay 30 years of interest.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          How to Get a Lower Mortgage Rate
        </h2>
        <p className="text-gray-700 mb-3">
          Even a small reduction in your interest rate can save you tens of thousands of dollars. Here are the most effective ways to secure a lower rate:
        </p>
        <p className="text-gray-700 mb-3">
          <strong>Improve your credit score.</strong> Lenders reserve their best rates for borrowers with scores above 740. Paying down credit card balances, avoiding new credit inquiries before applying, and correcting any errors on your credit report can all bump your score. A 50-point improvement could shave 0.25% to 0.5% off your rate.
        </p>
        <p className="text-gray-700 mb-3">
          <strong>Make a larger down payment.</strong> Putting down 20% or more not only eliminates PMI but also signals lower risk to lenders, often resulting in a better rate. If you can stretch to 25% or even 30% down, you may qualify for an even more favorable rate tier.
        </p>
        <p className="text-gray-700 mb-3">
          <strong>Shop around aggressively.</strong> Rates vary between lenders more than most people realize. Get quotes from at least three to five lenders, including banks, credit unions, and online mortgage companies. Multiple inquiries within a 45-day window count as a single hard pull on your credit report.
        </p>
        <p className="text-gray-700 mb-3">
          <strong>Consider paying points.</strong> A mortgage point costs 1% of the loan amount and typically lowers your rate by about 0.25%. On a $280,000 loan, one point costs $2,800. If it reduces your rate from 6.5% to 6.25%, you&apos;d save roughly $52 per month &mdash; paying for itself in about 54 months.
        </p>
        <p className="text-gray-700">
          <strong>Evaluate ARM vs. fixed.</strong> Adjustable-rate mortgages (ARMs) often start with lower rates than fixed-rate loans. A 5/1 ARM could save you money if you plan to sell or refinance within the first five years. Just make sure you understand the risk of rate increases after the initial fixed period ends.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Hidden Costs of Homeownership
        </h2>
        <p className="text-gray-700 mb-3">
          The purchase price and mortgage payment are just the starting point. Several ongoing costs catch new homeowners off guard, so it&apos;s important to factor them into your budget from the beginning.
        </p>
        <p className="text-gray-700 mb-3">
          <strong>Property taxes</strong> typically range from 1% to 2% of your home&apos;s assessed value per year. On a $350,000 home, that&apos;s $3,500 to $7,000 annually, or roughly $290 to $583 per month added to your housing cost.
        </p>
        <p className="text-gray-700 mb-3">
          <strong>Homeowners insurance</strong> usually runs $1,200 to $2,500 per year depending on your location, home size, and coverage level. This is required by every mortgage lender.
        </p>
        <p className="text-gray-700 mb-3">
          <strong>Private mortgage insurance (PMI)</strong> applies when your down payment is less than 20%. It typically costs 0.5% to 1% of the loan amount per year. On a $315,000 loan (10% down on $350,000), that&apos;s an extra $131 to $263 per month until you reach 20% equity.
        </p>
        <p className="text-gray-700 mb-3">
          <strong>HOA fees</strong> are common in condos, townhouses, and planned communities. They can range from $100 to $500 or more per month and typically cover exterior maintenance, amenities, and community insurance.
        </p>
        <p className="text-gray-700 mb-3">
          <strong>Maintenance and repairs</strong> are the cost most buyers underestimate. The general rule of thumb is to budget 1% of your home&apos;s value per year for upkeep. That&apos;s $3,500 per year on a $350,000 home for things like HVAC servicing, roof repairs, plumbing fixes, and appliance replacements.
        </p>
        <p className="text-gray-700">
          <strong>Closing costs</strong> at the time of purchase typically run 2% to 5% of the loan amount. On a $280,000 mortgage, expect to pay $5,600 to $14,000 in lender fees, appraisal costs, title insurance, and other charges.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Mortgage Prepayment Strategies
        </h2>
        <p className="text-gray-700 mb-3">
          Paying off your mortgage early can save you a massive amount of interest. Here are the most popular prepayment approaches and how they stack up:
        </p>
        <p className="text-gray-700 mb-3">
          <strong>Extra monthly payments.</strong> Adding even a modest amount to your monthly payment goes directly toward principal, reducing your balance faster and cutting the total interest you owe. For example, adding just $100 per month to a $300,000 mortgage at 6.5% over 30 years saves you roughly <strong>$43,000 in interest</strong> and pays off the loan about 4 years early.
        </p>
        <p className="text-gray-700 mb-3">
          <strong>Biweekly payments.</strong> Instead of making 12 monthly payments, you pay half the monthly amount every two weeks. Because there are 52 weeks in a year, this results in 26 half-payments &mdash; the equivalent of 13 full payments. That one extra payment per year can shave 4 to 5 years off a 30-year mortgage.
        </p>
        <p className="text-gray-700 mb-3">
          <strong>Lump sum payments.</strong> Applying a tax refund, bonus, or inheritance directly to your mortgage principal can make a big dent. A one-time $5,000 payment in Year 5 of a $300,000 loan at 6.5% saves you roughly $13,000 in interest over the remaining term.
        </p>
        <p className="text-gray-700 mb-3">
          <strong>Refinancing to a shorter term.</strong> If rates have dropped since you took out your mortgage, refinancing from a 30-year to a 15-year loan locks in a lower rate and forces faster payoff. Just make sure the closing costs on the new loan don&apos;t eat up the savings.
        </p>
        <p className="text-gray-700">
          Before prepaying, check that your lender doesn&apos;t charge a prepayment penalty. Most conventional loans don&apos;t, but it&apos;s always worth confirming. Also consider whether the money might earn a higher return invested elsewhere &mdash; if your mortgage rate is 3.5% but your investments average 8%, the math may favor investing instead.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Mortgage Glossary
        </h2>
        <p className="text-gray-700 mb-3">
          Mortgage paperwork is full of jargon. Here are the key terms you&apos;ll encounter during the homebuying process:
        </p>
        <div className="space-y-2">
          <p className="text-gray-700"><strong>APR (Annual Percentage Rate):</strong> The total yearly cost of a loan expressed as a percentage, including interest and lender fees &mdash; gives a more complete picture than the interest rate alone.</p>
          <p className="text-gray-700"><strong>Amortization:</strong> The process of spreading loan payments over time so each installment covers both interest and principal, gradually reducing the balance to zero.</p>
          <p className="text-gray-700"><strong>ARM (Adjustable-Rate Mortgage):</strong> A mortgage with an interest rate that stays fixed for an initial period (e.g., 5 years) then adjusts periodically based on market conditions.</p>
          <p className="text-gray-700"><strong>Closing Costs:</strong> Fees paid at the finalization of a real estate transaction, including lender charges, appraisal fees, title insurance, and attorney costs.</p>
          <p className="text-gray-700"><strong>DTI (Debt-to-Income Ratio):</strong> The percentage of your gross monthly income that goes toward debt payments; lenders typically prefer a DTI below 43%.</p>
          <p className="text-gray-700"><strong>Escrow:</strong> An account managed by your lender that holds funds for property taxes and insurance, paid from a portion of your monthly mortgage payment.</p>
          <p className="text-gray-700"><strong>Fixed-Rate Mortgage:</strong> A loan with an interest rate that remains the same for the entire term, providing predictable monthly payments.</p>
          <p className="text-gray-700"><strong>LTV (Loan-to-Value Ratio):</strong> The ratio of your loan amount to the appraised value of the property; an LTV above 80% typically triggers PMI requirements.</p>
          <p className="text-gray-700"><strong>PMI (Private Mortgage Insurance):</strong> Insurance required by lenders when your down payment is less than 20%, protecting them if you default on the loan.</p>
          <p className="text-gray-700"><strong>Points:</strong> Upfront fees paid to the lender at closing to reduce your interest rate; one point equals 1% of the loan amount.</p>
          <p className="text-gray-700"><strong>Principal:</strong> The original amount of money borrowed, not including interest or other charges.</p>
          <p className="text-gray-700"><strong>Refinance:</strong> Replacing your existing mortgage with a new loan, typically to secure a lower interest rate, change the loan term, or access home equity.</p>
        </div>
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
