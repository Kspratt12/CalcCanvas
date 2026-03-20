'use client';

import { useState } from 'react';
import AdPlacement from '@/components/AdPlacement';
import Link from 'next/link';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Income Tax Calculator',
  url: 'https://calcanvas.com/tools/income-tax-calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'All',
  description:
    'Estimate your 2024 US federal income tax using official tax brackets. Calculate total tax, effective rate, marginal rate, and take-home pay for any filing status.',
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the difference between marginal and effective tax rate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Your marginal tax rate is the rate applied to your last dollar of income — it is the highest bracket your income falls into. Your effective tax rate is your total tax divided by your total income, representing the average rate you actually pay across all brackets. The effective rate is always lower than the marginal rate because lower portions of your income are taxed at lower rates.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do tax brackets work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tax brackets are ranges of income taxed at specific rates. The US uses a progressive system where only the income within each bracket is taxed at that bracket rate. Moving into a higher bracket does not cause all of your income to be taxed at the higher rate — only the portion above the bracket threshold.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does this calculator include state income tax?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, this calculator only estimates federal income tax. State income tax varies widely — seven states have no income tax at all, while others charge up to 13.3%. You would need to add your state tax separately for a complete picture of your tax burden.',
      },
    },
    {
      '@type': 'Question',
      name: 'What filing status should I choose?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Choose Single if you are unmarried. Choose Married Filing Jointly if you are married and want to file a combined return, which usually results in the lowest tax. Choose Head of Household if you are unmarried but pay more than half the cost of maintaining a home for a qualifying dependent.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are these the 2024 tax brackets?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, this calculator uses the 2024 federal income tax brackets as published by the IRS. Bracket thresholds are adjusted annually for inflation. The rates themselves (10%, 12%, 22%, 24%, 32%, 35%, 37%) have remained the same since the Tax Cuts and Jobs Act of 2017.',
      },
    },
  ],
};

type FilingStatus = 'single' | 'married' | 'head';

type BracketRow = {
  rate: number;
  rangeLabel: string;
  taxableInBracket: number;
  taxForBracket: number;
};

const brackets: Record<FilingStatus, { min: number; max: number; rate: number }[]> = {
  single: [
    { min: 0, max: 11600, rate: 0.10 },
    { min: 11600, max: 47150, rate: 0.12 },
    { min: 47150, max: 100525, rate: 0.22 },
    { min: 100525, max: 191950, rate: 0.24 },
    { min: 191950, max: 243725, rate: 0.32 },
    { min: 243725, max: 609350, rate: 0.35 },
    { min: 609350, max: Infinity, rate: 0.37 },
  ],
  married: [
    { min: 0, max: 23200, rate: 0.10 },
    { min: 23200, max: 94300, rate: 0.12 },
    { min: 94300, max: 201050, rate: 0.22 },
    { min: 201050, max: 383900, rate: 0.24 },
    { min: 383900, max: 487450, rate: 0.32 },
    { min: 487450, max: 731200, rate: 0.35 },
    { min: 731200, max: Infinity, rate: 0.37 },
  ],
  head: [
    { min: 0, max: 16550, rate: 0.10 },
    { min: 16550, max: 63100, rate: 0.12 },
    { min: 63100, max: 100500, rate: 0.22 },
    { min: 100500, max: 191950, rate: 0.24 },
    { min: 191950, max: 243725, rate: 0.32 },
    { min: 243725, max: 609350, rate: 0.35 },
    { min: 609350, max: Infinity, rate: 0.37 },
  ],
};

const standardDeduction: Record<FilingStatus, number> = {
  single: 14600,
  married: 29200,
  head: 21900,
};

export default function IncomeTaxCalculator() {
  const [income, setIncome] = useState('');
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');
  const [useStandardDeduction, setUseStandardDeduction] = useState(true);
  const [results, setResults] = useState<{
    grossIncome: number;
    deduction: number;
    taxableIncome: number;
    totalTax: number;
    effectiveRate: number;
    marginalRate: number;
    takeHomePay: number;
    bracketBreakdown: BracketRow[];
  } | null>(null);

  function calculate() {
    const gross = parseFloat(income) || 0;
    if (gross <= 0) return;

    const deduction = useStandardDeduction ? standardDeduction[filingStatus] : 0;
    const taxableIncome = Math.max(0, gross - deduction);
    const activeBrackets = brackets[filingStatus];

    let totalTax = 0;
    let marginalRate = 0.10;
    const bracketBreakdown: BracketRow[] = [];

    for (const bracket of activeBrackets) {
      if (taxableIncome <= bracket.min) break;

      const taxableInBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
      const taxForBracket = taxableInBracket * bracket.rate;
      totalTax += taxForBracket;
      marginalRate = bracket.rate;

      const maxLabel = bracket.max === Infinity
        ? '+'
        : `$${bracket.max.toLocaleString()}`;
      const rangeLabel = `$${bracket.min.toLocaleString()} – ${maxLabel}`;

      bracketBreakdown.push({
        rate: bracket.rate * 100,
        rangeLabel,
        taxableInBracket,
        taxForBracket,
      });
    }

    const effectiveRate = gross > 0 ? (totalTax / gross) * 100 : 0;

    setResults({
      grossIncome: gross,
      deduction,
      taxableIncome,
      totalTax,
      effectiveRate,
      marginalRate: marginalRate * 100,
      takeHomePay: gross - totalTax,
      bracketBreakdown,
    });
  }

  function reset() {
    setIncome('');
    setFilingStatus('single');
    setUseStandardDeduction(true);
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
        Income Tax Calculator
      </h1>
      <p className="text-gray-600 mb-6">
        Estimate your 2024 federal income tax using official US tax brackets.
        See your total tax, effective rate, and take-home pay.
      </p>

      <AdPlacement format="leaderboard" />

      <div className="mt-8 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Annual Gross Income ($)
          </label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            placeholder="75000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filing Status
          </label>
          <select
            value={filingStatus}
            onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
          >
            <option value="single">Single</option>
            <option value="married">Married Filing Jointly</option>
            <option value="head">Head of Household</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="standardDeduction"
            checked={useStandardDeduction}
            onChange={(e) => setUseStandardDeduction(e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-600"
          />
          <label htmlFor="standardDeduction" className="text-sm text-gray-700">
            Apply standard deduction ({fmt(standardDeduction[filingStatus])})
          </label>
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
              <p className="text-sm text-gray-500">Total Federal Tax</p>
              <p className="text-2xl font-bold text-[#2563eb]">
                {fmt(results.totalTax)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Take-Home Pay</p>
              <p className="text-2xl font-bold text-gray-900">
                {fmt(results.takeHomePay)}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center mt-2">
            <div>
              <p className="text-sm text-gray-500">Gross Income</p>
              <p className="text-lg font-semibold text-gray-900">
                {fmt(results.grossIncome)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Deduction</p>
              <p className="text-lg font-semibold text-gray-900">
                {fmt(results.deduction)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Effective Rate</p>
              <p className="text-lg font-semibold text-gray-900">
                {pct(results.effectiveRate)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Marginal Rate</p>
              <p className="text-lg font-semibold text-gray-900">
                {pct(results.marginalRate)}
              </p>
            </div>
          </div>

          {results.bracketBreakdown.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Tax Bracket Breakdown
              </h3>
              <div className="border border-gray-200 rounded-lg">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-3 py-2 text-left">Rate</th>
                      <th className="px-3 py-2 text-left">Bracket Range</th>
                      <th className="px-3 py-2 text-right">Taxable</th>
                      <th className="px-3 py-2 text-right">Tax</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.bracketBreakdown.map((row) => (
                      <tr key={row.rate} className="border-t border-gray-100">
                        <td className="px-3 py-2">{row.rate}%</td>
                        <td className="px-3 py-2">{row.rangeLabel}</td>
                        <td className="px-3 py-2 text-right">
                          {fmt(row.taxableInBracket)}
                        </td>
                        <td className="px-3 py-2 text-right">
                          {fmt(row.taxForBracket)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50 font-semibold">
                    <tr className="border-t border-gray-200">
                      <td className="px-3 py-2" colSpan={2}>Total</td>
                      <td className="px-3 py-2 text-right">
                        {fmt(results.taxableIncome)}
                      </td>
                      <td className="px-3 py-2 text-right">
                        {fmt(results.totalTax)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
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
          What Is an Income Tax Calculator?
        </h2>
        <p className="text-gray-600 mb-3">
          An income tax calculator estimates how much federal tax you owe based on your annual income and filing status. The United States uses a progressive tax system, meaning your income is divided into brackets, and each bracket is taxed at a different rate. Only the income within each bracket is taxed at that bracket&apos;s rate &mdash; not your entire income.
        </p>
        <p className="text-gray-600 mb-3">
          This calculator uses the official 2024 federal tax brackets published by the IRS. It applies the standard deduction by default, which reduces your taxable income before the bracket rates apply. For most taxpayers, the standard deduction is the best option unless your itemized deductions (mortgage interest, charitable donations, state taxes) exceed the standard amount.
        </p>
        <p className="text-gray-600">
          Understanding your tax bracket helps with financial planning, retirement contributions, and deciding whether to accelerate or defer income. Use this tool to see exactly how much of your income falls into each bracket and what your true effective tax rate is.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Frequently Asked Questions
        </h2>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          What is the difference between marginal and effective tax rate?
        </h3>
        <p className="text-gray-600 mb-4">
          Your marginal tax rate is the rate applied to your last dollar of income &mdash; the highest bracket your income reaches. Your effective tax rate is your total tax divided by your total income, representing the average rate you actually pay across all brackets. For example, a single filer earning $75,000 has a 22% marginal rate but pays an effective rate of only about 11-12%. The effective rate is always lower because lower portions of income are taxed at lower rates.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          How do tax brackets work?
        </h3>
        <p className="text-gray-600 mb-4">
          Tax brackets are ranges of income taxed at progressively higher rates. The US has seven brackets: 10%, 12%, 22%, 24%, 32%, 35%, and 37%. A common misconception is that moving into a higher bracket means all your income is taxed at the higher rate. In reality, only the income above the bracket threshold is taxed at the new rate. The bracket breakdown table above shows exactly how this works for your income.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          Does this calculator include state income tax?
        </h3>
        <p className="text-gray-600 mb-4">
          No, this calculator estimates federal income tax only. State income tax varies widely &mdash; seven states (Alaska, Florida, Nevada, South Dakota, Tennessee, Texas, Wyoming) have no state income tax, while California&apos;s top rate is 13.3%. You&apos;ll need to account for state tax separately for a complete picture of your total tax burden.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          What filing status should I choose?
        </h3>
        <p className="text-gray-600 mb-4">
          Choose Single if you are unmarried or legally separated. Choose Married Filing Jointly if you are married and want to combine incomes on one return, which typically results in the lowest tax bill. Choose Head of Household if you are unmarried but pay more than half the cost of maintaining a home for a qualifying dependent &mdash; this status offers wider brackets and a larger standard deduction than Single.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          Are these the 2024 tax brackets?
        </h3>
        <p className="text-gray-600">
          Yes, this calculator uses the 2024 federal income tax brackets as published by the IRS. The bracket thresholds are adjusted annually for inflation, though the rates themselves (10% through 37%) have remained unchanged since the Tax Cuts and Jobs Act of 2017. The standard deduction amounts are also updated each year &mdash; for 2024, they are $14,600 for Single, $29,200 for Married Filing Jointly, and $21,900 for Head of Household.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Example Calculation
        </h2>
        <p className="text-gray-600 mb-3">
          Let&apos;s calculate the federal income tax for a single filer earning $85,000 per year with the standard deduction:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-1 mb-3">
          <li>Gross income: $85,000</li>
          <li>Standard deduction: $14,600</li>
          <li>Taxable income: $70,400</li>
          <li>10% on first $11,600 = $1,160</li>
          <li>12% on $11,601 &ndash; $47,150 = $4,266</li>
          <li>22% on $47,151 &ndash; $70,400 = $5,115</li>
          <li>Total federal tax: $10,541</li>
          <li>Effective tax rate: 12.40%</li>
          <li>Marginal tax rate: 22%</li>
          <li>Take-home pay (federal only): $74,459</li>
        </ul>
        <p className="text-gray-600">
          Even though this person is in the 22% bracket, their effective rate is only 12.40% because the first $11,600 of taxable income is taxed at just 10% and the next $35,550 at 12%. This is why understanding the difference between marginal and effective tax rates is so important &mdash; your actual tax burden is almost always lower than your bracket suggests.
        </p>
      </section>

      <section className="mt-8 pb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Related Tools
        </h2>
        <ul className="space-y-1">
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
          <li>
            <Link href="/tools/percentage-calculator" className="text-[#2563eb] hover:underline">
              Percentage Calculator
            </Link>
          </li>
          <li>
            <Link href="/tools/retirement-calculator" className="text-[#2563eb] hover:underline">
              Retirement Calculator
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
