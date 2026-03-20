'use client';

import { useState } from 'react';
import Link from 'next/link';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Paycheck Calculator',
  url: 'https://calcanvas.com/tools/paycheck-calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'All',
  description:
    'Estimate your take-home pay after federal and state taxes, Social Security, Medicare, and pre-tax deductions like 401(k) and health insurance.',
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How is federal income tax calculated on my paycheck?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Federal income tax uses a progressive bracket system. In 2024 for a single filer, the first $11,600 is taxed at 10%, income from $11,601 to $47,150 at 12%, $47,151 to $100,525 at 22%, and so on up to 37% for income over $609,350. Only the income within each bracket is taxed at that rate.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between gross pay and net pay?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Gross pay is your total earnings before any deductions. Net pay (take-home pay) is what you actually receive after subtracting federal income tax, state income tax, Social Security tax (6.2%), Medicare tax (1.45%), and any pre-tax deductions like 401(k) contributions or health insurance premiums.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does Social Security and Medicare take from my paycheck?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Social Security tax is 6.2% of your gross pay up to the wage base limit of $168,600 in 2024. Medicare tax is 1.45% of all earnings with no cap. Combined, these FICA taxes total 7.65% of your paycheck for most workers.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do pre-tax deductions like 401(k) reduce my taxes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Traditional 401(k) contributions and health insurance premiums are deducted from your gross pay before federal and state income taxes are calculated, which lowers your taxable income. However, Social Security and Medicare taxes are still calculated on your full gross pay.',
      },
    },
    {
      '@type': 'Question',
      name: 'How accurate is this paycheck calculator?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This calculator provides a close estimate using 2024 federal tax brackets and standard deductions. Actual paycheck amounts may vary based on your W-4 elections, local taxes, additional withholdings, benefit costs, and your employer payroll system. Use it for planning purposes and consult a tax professional for exact figures.',
      },
    },
  ],
};

// 2024 federal tax brackets
const BRACKETS_SINGLE = [
  { min: 0, max: 11600, rate: 0.10 },
  { min: 11600, max: 47150, rate: 0.12 },
  { min: 47150, max: 100525, rate: 0.22 },
  { min: 100525, max: 191950, rate: 0.24 },
  { min: 191950, max: 243725, rate: 0.32 },
  { min: 243725, max: 609350, rate: 0.35 },
  { min: 609350, max: Infinity, rate: 0.37 },
];

const BRACKETS_MARRIED = [
  { min: 0, max: 23200, rate: 0.10 },
  { min: 23200, max: 94300, rate: 0.12 },
  { min: 94300, max: 201050, rate: 0.22 },
  { min: 201050, max: 383900, rate: 0.24 },
  { min: 383900, max: 487450, rate: 0.32 },
  { min: 487450, max: 731200, rate: 0.35 },
  { min: 731200, max: Infinity, rate: 0.37 },
];

const BRACKETS_HOH = [
  { min: 0, max: 16550, rate: 0.10 },
  { min: 16550, max: 63100, rate: 0.12 },
  { min: 63100, max: 100500, rate: 0.22 },
  { min: 100500, max: 191950, rate: 0.24 },
  { min: 191950, max: 243700, rate: 0.32 },
  { min: 243700, max: 609350, rate: 0.35 },
  { min: 609350, max: Infinity, rate: 0.37 },
];

const STANDARD_DEDUCTIONS: Record<string, number> = {
  single: 14600,
  married: 29200,
  hoh: 21900,
};

const SS_RATE = 0.062;
const SS_WAGE_BASE = 168600;
const MEDICARE_RATE = 0.0145;

const PAY_PERIODS: Record<string, number> = {
  weekly: 52,
  biweekly: 26,
  semimonthly: 24,
  monthly: 12,
};

function calcFederalTax(taxableIncome: number, brackets: { min: number; max: number; rate: number }[]) {
  let tax = 0;
  for (const b of brackets) {
    if (taxableIncome <= b.min) break;
    const amount = Math.min(taxableIncome, b.max) - b.min;
    tax += amount * b.rate;
  }
  return tax;
}

interface Results {
  grossPay: number;
  annualGross: number;
  preTaxDeductions: number;
  federalTax: number;
  stateTax: number;
  socialSecurity: number;
  medicare: number;
  totalDeductions: number;
  netPay: number;
  effectiveRate: number;
}

export default function PaycheckCalculator() {
  const [grossPay, setGrossPay] = useState('');
  const [payFrequency, setPayFrequency] = useState('biweekly');
  const [filingStatus, setFilingStatus] = useState('single');
  const [stateTaxRate, setStateTaxRate] = useState('5');
  const [contribution401k, setContribution401k] = useState('');
  const [healthInsurance, setHealthInsurance] = useState('');
  const [otherPreTax, setOtherPreTax] = useState('');
  const [results, setResults] = useState<Results | null>(null);

  function calculate() {
    const gross = parseFloat(grossPay);
    if (!gross || gross <= 0) return;

    const periods = PAY_PERIODS[payFrequency];
    const annualGross = gross * periods;

    // Pre-tax deductions per period
    const k401 = parseFloat(contribution401k) || 0;
    const health = parseFloat(healthInsurance) || 0;
    const other = parseFloat(otherPreTax) || 0;
    const preTaxPerPeriod = k401 + health + other;
    const annualPreTax = preTaxPerPeriod * periods;

    // Taxable income for federal/state (after pre-tax deductions and standard deduction)
    const standardDeduction = STANDARD_DEDUCTIONS[filingStatus];
    const annualTaxableIncome = Math.max(0, annualGross - annualPreTax - standardDeduction);

    // Federal tax
    let brackets;
    if (filingStatus === 'married') brackets = BRACKETS_MARRIED;
    else if (filingStatus === 'hoh') brackets = BRACKETS_HOH;
    else brackets = BRACKETS_SINGLE;

    const annualFederalTax = calcFederalTax(annualTaxableIncome, brackets);
    const federalTaxPerPeriod = annualFederalTax / periods;

    // State tax (flat rate on taxable income after pre-tax deductions)
    const stateRate = (parseFloat(stateTaxRate) || 0) / 100;
    const annualStateTaxableIncome = Math.max(0, annualGross - annualPreTax);
    const annualStateTax = annualStateTaxableIncome * stateRate;
    const stateTaxPerPeriod = annualStateTax / periods;

    // Social Security (on gross pay, not reduced by pre-tax deductions for income tax)
    const annualSSWages = Math.min(annualGross, SS_WAGE_BASE);
    const annualSS = annualSSWages * SS_RATE;
    const ssPerPeriod = annualSS / periods;

    // Medicare (on full gross)
    const annualMedicare = annualGross * MEDICARE_RATE;
    const medicarePerPeriod = annualMedicare / periods;

    const totalDeductions = preTaxPerPeriod + federalTaxPerPeriod + stateTaxPerPeriod + ssPerPeriod + medicarePerPeriod;
    const netPay = gross - totalDeductions;
    const effectiveRate = gross > 0 ? ((gross - netPay) / gross) * 100 : 0;

    setResults({
      grossPay: gross,
      annualGross,
      preTaxDeductions: preTaxPerPeriod,
      federalTax: federalTaxPerPeriod,
      stateTax: stateTaxPerPeriod,
      socialSecurity: ssPerPeriod,
      medicare: medicarePerPeriod,
      totalDeductions,
      netPay,
      effectiveRate,
    });
  }

  function reset() {
    setGrossPay('');
    setPayFrequency('biweekly');
    setFilingStatus('single');
    setStateTaxRate('5');
    setContribution401k('');
    setHealthInsurance('');
    setOtherPreTax('');
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Paycheck Calculator
      </h1>
      <p className="text-gray-600 mb-6">
        Estimate your take-home pay after federal and state taxes, Social
        Security, Medicare, and pre-tax deductions. Uses 2024 federal tax
        brackets for accurate results.
      </p>


      <div className="mt-8 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gross Pay per Period ($)
          </label>
          <input
            type="number"
            value={grossPay}
            onChange={(e) => setGrossPay(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            placeholder="2500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pay Frequency
            </label>
            <select
              value={payFrequency}
              onChange={(e) => setPayFrequency(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            >
              <option value="weekly">Weekly (52/yr)</option>
              <option value="biweekly">Bi-weekly (26/yr)</option>
              <option value="semimonthly">Semi-monthly (24/yr)</option>
              <option value="monthly">Monthly (12/yr)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filing Status
            </label>
            <select
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            >
              <option value="single">Single</option>
              <option value="married">Married Filing Jointly</option>
              <option value="hoh">Head of Household</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State Income Tax Rate (%)
          </label>
          <input
            type="number"
            value={stateTaxRate}
            onChange={(e) => setStateTaxRate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            placeholder="5"
            step="0.1"
          />
          <p className="text-xs text-gray-400 mt-1">
            Enter 0 for states with no income tax (TX, FL, WA, NV, etc.)
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              401(k) per Period ($)
            </label>
            <input
              type="number"
              value={contribution401k}
              onChange={(e) => setContribution401k(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Health Ins. ($)
            </label>
            <input
              type="number"
              value={healthInsurance}
              onChange={(e) => setHealthInsurance(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Other Pre-Tax ($)
            </label>
            <input
              type="number"
              value={otherPreTax}
              onChange={(e) => setOtherPreTax(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
              placeholder="0"
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
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Paycheck Breakdown</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Gross Pay</span>
              <span className="text-xl font-bold text-gray-900">{fmt(results.grossPay)}</span>
            </div>
            {results.preTaxDeductions > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Pre-Tax Deductions</span>
                <span className="text-lg font-semibold text-gray-700">-{fmt(results.preTaxDeductions)}</span>
              </div>
            )}
            <hr className="border-blue-200" />
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Federal Income Tax</span>
              <span className="text-lg font-semibold text-gray-700">-{fmt(results.federalTax)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">State Income Tax</span>
              <span className="text-lg font-semibold text-gray-700">-{fmt(results.stateTax)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Social Security (6.2%)</span>
              <span className="text-lg font-semibold text-gray-700">-{fmt(results.socialSecurity)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Medicare (1.45%)</span>
              <span className="text-lg font-semibold text-gray-700">-{fmt(results.medicare)}</span>
            </div>
            <hr className="border-blue-200" />
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Deductions</span>
              <span className="text-lg font-bold text-red-600">-{fmt(results.totalDeductions)}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-gray-900 font-semibold">Net Take-Home Pay</span>
              <span className="text-2xl font-bold text-[#2563eb]">{fmt(results.netPay)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Effective Deduction Rate</span>
              <span className="text-lg font-semibold text-gray-700">{results.effectiveRate.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      )}
<section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          How to use this calculator
        </h2>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>Enter your gross pay for a single pay period (before any deductions).</li>
          <li>Select how often you get paid: weekly, bi-weekly, semi-monthly, or monthly.</li>
          <li>Choose your federal filing status (Single, Married Filing Jointly, or Head of Household).</li>
          <li>Enter your state income tax rate. Use 0% for no-income-tax states like Texas, Florida, and Washington.</li>
          <li>Optionally enter pre-tax deductions like 401(k) contributions, health insurance premiums, or other benefits.</li>
          <li>Click Calculate to see your estimated take-home pay and full deduction breakdown.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          How it works
        </h2>
        <p className="text-gray-600">
          This paycheck calculator estimates your net pay by applying 2024 federal income tax brackets
          to your annualized taxable income (gross pay minus pre-tax deductions and the standard deduction),
          then dividing back down to a per-period amount. State tax is applied as a flat percentage on
          income after pre-tax deductions. Social Security tax (6.2%) applies to gross wages up to the
          $168,600 wage base, and Medicare tax (1.45%) applies to all gross wages. The result gives you a
          realistic estimate of what lands in your bank account each pay period.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          What Is a Paycheck Calculator?
        </h2>
        <p className="text-gray-600 mb-3">
          A paycheck calculator is a financial tool that estimates your take-home pay after all
          taxes and deductions are subtracted from your gross earnings. When you receive a job
          offer quoting an annual salary or hourly rate, your actual paycheck will be significantly
          less than the gross amount due to federal income tax, state income tax, Social Security,
          Medicare, and voluntary pre-tax deductions like retirement contributions and health insurance.
        </p>
        <p className="text-gray-600 mb-3">
          Understanding your net pay is essential for building an accurate budget. Many people are
          surprised to find that 25-35% of their gross income goes toward taxes and mandatory
          deductions. By using a paycheck calculator before accepting a job offer or making financial
          commitments, you can plan your spending around the money you actually receive.
        </p>
        <p className="text-gray-600 mb-3">
          The federal income tax system in the United States is progressive, meaning different
          portions of your income are taxed at different rates. In 2024, there are seven tax brackets
          ranging from 10% to 37%. Your filing status (Single, Married Filing Jointly, or Head of
          Household) determines the income thresholds for each bracket. The standard deduction
          further reduces your taxable income before brackets are applied.
        </p>
        <p className="text-gray-600">
          Beyond income taxes, every W-2 employee pays FICA taxes: 6.2% for Social Security (up to
          a wage base of $168,600 in 2024) and 1.45% for Medicare with no cap. These are non-negotiable
          and come out of every paycheck. Pre-tax deductions like traditional 401(k) contributions
          and employer-sponsored health insurance premiums reduce your taxable income, which can
          meaningfully lower your tax bill each pay period.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          2024 Federal Income Tax Brackets
        </h2>
        <p className="text-gray-600 mb-3">
          Here are the 2024 federal income tax brackets used in this calculator. Remember, these are
          marginal rates, meaning only the income within each range is taxed at that rate.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600 border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 font-medium">Rate</th>
                <th className="px-4 py-2 font-medium">Single</th>
                <th className="px-4 py-2 font-medium">Married Filing Jointly</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t"><td className="px-4 py-2">10%</td><td className="px-4 py-2">$0 &ndash; $11,600</td><td className="px-4 py-2">$0 &ndash; $23,200</td></tr>
              <tr className="border-t"><td className="px-4 py-2">12%</td><td className="px-4 py-2">$11,601 &ndash; $47,150</td><td className="px-4 py-2">$23,201 &ndash; $94,300</td></tr>
              <tr className="border-t"><td className="px-4 py-2">22%</td><td className="px-4 py-2">$47,151 &ndash; $100,525</td><td className="px-4 py-2">$94,301 &ndash; $201,050</td></tr>
              <tr className="border-t"><td className="px-4 py-2">24%</td><td className="px-4 py-2">$100,526 &ndash; $191,950</td><td className="px-4 py-2">$201,051 &ndash; $383,900</td></tr>
              <tr className="border-t"><td className="px-4 py-2">32%</td><td className="px-4 py-2">$191,951 &ndash; $243,725</td><td className="px-4 py-2">$383,901 &ndash; $487,450</td></tr>
              <tr className="border-t"><td className="px-4 py-2">35%</td><td className="px-4 py-2">$243,726 &ndash; $609,350</td><td className="px-4 py-2">$487,451 &ndash; $731,200</td></tr>
              <tr className="border-t"><td className="px-4 py-2">37%</td><td className="px-4 py-2">Over $609,350</td><td className="px-4 py-2">Over $731,200</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Frequently Asked Questions
        </h2>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          How is federal income tax calculated on my paycheck?
        </h3>
        <p className="text-gray-600 mb-4">
          Federal income tax uses a progressive bracket system. Your gross annual income minus
          pre-tax deductions and the standard deduction gives your taxable income. That taxable
          income is then split across brackets: in 2024 for a single filer, the first $11,600 is
          taxed at 10%, income from $11,601 to $47,150 at 12%, $47,151 to $100,525 at 22%, and so
          on. The total annual tax is divided by the number of pay periods to get the per-paycheck amount.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          What is the difference between gross pay and net pay?
        </h3>
        <p className="text-gray-600 mb-4">
          Gross pay is your total earnings before any deductions &mdash; the number you see in your
          offer letter or hourly rate agreement. Net pay (also called take-home pay) is what actually
          hits your bank account after federal tax, state tax, Social Security (6.2%), Medicare (1.45%),
          and any pre-tax deductions are subtracted. For most workers, net pay is 65-80% of gross pay.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          How much does Social Security and Medicare take from my paycheck?
        </h3>
        <p className="text-gray-600 mb-4">
          Social Security tax is 6.2% of your gross pay up to the wage base limit of $168,600 in
          2024. Once you earn more than that in a calendar year, Social Security tax stops. Medicare
          tax is 1.45% of all earnings with no cap. Together, these FICA taxes take 7.65% out of
          every paycheck for most workers. High earners may also owe an additional 0.9% Medicare
          surtax on income above $200,000.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          Do pre-tax deductions like 401(k) reduce my taxes?
        </h3>
        <p className="text-gray-600 mb-4">
          Yes, traditional 401(k) contributions and employer-sponsored health insurance premiums are
          deducted from your pay before federal and state income taxes are calculated. This lowers
          your taxable income and reduces your tax bill. For example, contributing $200 per paycheck
          to a 401(k) on a $3,000 gross paycheck means only $2,800 is subject to income tax. Note
          that FICA taxes (Social Security and Medicare) are still calculated on your full gross pay.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          How accurate is this paycheck calculator?
        </h3>
        <p className="text-gray-600">
          This calculator provides a solid estimate using 2024 federal tax brackets, standard
          deductions, and current FICA rates. However, actual paycheck amounts can vary based on
          your specific W-4 elections, local and city taxes, additional Medicare surtax for high
          earners, post-tax deductions (Roth 401k, garnishments), and your employer&apos;s specific
          payroll processing. Use this tool for planning and budgeting, and consult a tax
          professional or your HR department for exact figures.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Example Calculation
        </h2>
        <p className="text-gray-600 mb-3">
          Let&apos;s say you earn $3,000 gross pay on a bi-weekly schedule, file as Single, live in a
          state with a 5% income tax rate, and contribute $150 per paycheck to your 401(k). Here&apos;s
          how the numbers break down:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-1 mb-3">
          <li>Annual gross income: $3,000 x 26 = $78,000</li>
          <li>Annual pre-tax deductions: $150 x 26 = $3,900</li>
          <li>Taxable income (federal): $78,000 - $3,900 - $14,600 = $59,500</li>
          <li>Federal tax per period: ~$316</li>
          <li>State tax per period (5%): ~$142</li>
          <li>Social Security (6.2%): $186</li>
          <li>Medicare (1.45%): $43.50</li>
          <li>Total deductions per paycheck: ~$838</li>
          <li>Net take-home pay: ~$2,162</li>
        </ul>
        <p className="text-gray-600">
          In this example, roughly 28% of the gross paycheck goes toward taxes and deductions.
          The 401(k) contribution saves about $33 per paycheck in federal tax compared to not
          contributing, while also building retirement savings.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Tips to Maximize Your Take-Home Pay
        </h2>
        <p className="text-gray-600 mb-3">
          While you can&apos;t avoid taxes entirely, there are legitimate strategies to keep more of
          your earnings:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>Contribute to a traditional 401(k) or 403(b) to reduce your taxable income now.</li>
          <li>Use a Health Savings Account (HSA) if eligible &mdash; contributions are pre-tax and withdrawals for medical expenses are tax-free.</li>
          <li>Take advantage of Flexible Spending Accounts (FSA) for healthcare and dependent care expenses.</li>
          <li>Review your W-4 annually to ensure you&apos;re not over-withholding (getting a large refund means you gave the IRS an interest-free loan).</li>
          <li>If you live near a state border, consider that some states have no income tax, which can significantly boost take-home pay.</li>
        </ul>
      </section>

      <section className="mt-8 pb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Related Tools
        </h2>
        <ul className="space-y-1">
          <li><Link href="/tools/salary-to-hourly-converter" className="text-[#2563eb] hover:underline">Salary to Hourly Converter</Link></li>
          <li><Link href="/tools/income-tax-calculator" className="text-[#2563eb] hover:underline">Income Tax Calculator</Link></li>
          <li><Link href="/tools/401k-calculator" className="text-[#2563eb] hover:underline">401(k) Calculator</Link></li>
          <li><Link href="/tools/retirement-calculator" className="text-[#2563eb] hover:underline">Retirement Calculator</Link></li>
          <li><Link href="/tools/net-worth-calculator" className="text-[#2563eb] hover:underline">Net Worth Calculator</Link></li>
        </ul>
      </section>
    </main>
  );
}
