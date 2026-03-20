'use client';

import { useState } from 'react';
import Link from 'next/link';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'CD Calculator',
  url: 'https://calcanvas.com/tools/cd-calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'All',
  description:
    'Calculate how much your certificate of deposit (CD) will earn at maturity. Enter your deposit, APY, term, and compounding frequency to see total interest and final value.',
};

export default function CDCalculator() {
  const [deposit, setDeposit] = useState('');
  const [apy, setApy] = useState('');
  const [termMonths, setTermMonths] = useState('');
  const [compounding, setCompounding] = useState('365');
  const [results, setResults] = useState<{
    maturityValue: number;
    totalInterest: number;
    effectiveAPY: number;
    nominalRate: number;
  } | null>(null);

  function calculate() {
    const P = parseFloat(deposit) || 0;
    const apyDecimal = parseFloat(apy) / 100;
    const months = parseInt(termMonths);
    const n = parseInt(compounding);
    if (!P || !apyDecimal || !months) return;

    const t = months / 12;

    // Convert APY to nominal (APR) rate: APR = n * [(1 + APY)^(1/n) - 1]
    const nominalRate = n * (Math.pow(1 + apyDecimal, 1 / n) - 1);

    // Compound interest formula: A = P(1 + r/n)^(nt)
    const maturityValue = P * Math.pow(1 + nominalRate / n, n * t);
    const totalInterest = maturityValue - P;

    // Effective APY (should match input APY, serves as verification)
    const effectiveAPY = (Math.pow(1 + nominalRate / n, n) - 1) * 100;

    setResults({
      maturityValue,
      totalInterest,
      effectiveAPY,
      nominalRate: nominalRate * 100,
    });
  }

  function reset() {
    setDeposit('');
    setApy('');
    setTermMonths('');
    setCompounding('365');
    setResults(null);
  }

  const fmt = (v: number) =>
    v.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  const pct = (v: number) => v.toFixed(3) + '%';

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
                "name": "What is a certificate of deposit (CD)?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A certificate of deposit is a savings product offered by banks and credit unions where you deposit a fixed amount of money for a set period of time (the term) in exchange for a guaranteed interest rate. CDs typically offer higher rates than regular savings accounts because your money is locked in for the full term."
                }
              },
              {
                "@type": "Question",
                "name": "What is the difference between APY and APR on a CD?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "APY (Annual Percentage Yield) reflects the total amount of interest you earn in one year including compounding. APR (Annual Percentage Rate) is the nominal rate before compounding is factored in. APY is always equal to or higher than APR. Banks are required to advertise the APY so consumers can easily compare rates."
                }
              },
              {
                "@type": "Question",
                "name": "What happens if I withdraw money from a CD early?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Most CDs charge an early withdrawal penalty if you take your money out before the term ends. The penalty is usually a certain number of months of interest, which can range from 3 months for short-term CDs to 12 months or more for longer terms. Some banks offer no-penalty CDs, but these typically come with lower rates."
                }
              },
              {
                "@type": "Question",
                "name": "Are CDs FDIC insured?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. CDs held at FDIC-insured banks are protected up to $250,000 per depositor, per institution. Credit union CDs (called share certificates) are similarly insured through the NCUA. This makes CDs one of the safest places to park money you cannot afford to lose."
                }
              },
              {
                "@type": "Question",
                "name": "How does compounding frequency affect my CD earnings?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "More frequent compounding means you earn interest on your interest more often, which slightly increases your total return. Daily compounding will earn marginally more than monthly or quarterly compounding at the same APR. However, when banks advertise APY, compounding is already factored in, so the APY you see is what you actually earn regardless of frequency."
                }
              }
            ]
          })
        }}
      />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        CD Calculator
      </h1>
      <p className="text-gray-600 mb-6">
        Calculate how much your certificate of deposit will be worth at
        maturity. Enter your deposit amount, APY, term, and compounding
        frequency to see your total interest earned and final balance.
      </p>


      <div className="mt-8 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Initial Deposit ($)
          </label>
          <input
            type="number"
            value={deposit}
            onChange={(e) => setDeposit(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            placeholder="10000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Annual Percentage Yield — APY (%)
          </label>
          <input
            type="number"
            step="0.01"
            value={apy}
            onChange={(e) => setApy(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            placeholder="5.00"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Term Length (months)
          </label>
          <input
            type="number"
            value={termMonths}
            onChange={(e) => setTermMonths(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            placeholder="12"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Compounding Frequency
          </label>
          <select
            value={compounding}
            onChange={(e) => setCompounding(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
          >
            <option value="365">Daily</option>
            <option value="12">Monthly</option>
            <option value="4">Quarterly</option>
            <option value="1">Annually</option>
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
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-500">Value at Maturity</p>
              <p className="text-2xl font-bold text-[#2563eb]">
                {fmt(results.maturityValue)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Interest Earned</p>
              <p className="text-2xl font-bold text-[#2563eb]">
                {fmt(results.totalInterest)}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center mt-2">
            <div>
              <p className="text-sm text-gray-500">APY (Annual Percentage Yield)</p>
              <p className="text-lg font-bold text-gray-900">
                {pct(results.effectiveAPY)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">APR (Nominal Rate)</p>
              <p className="text-lg font-bold text-gray-900">
                {pct(results.nominalRate)}
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">
            APY includes the effect of compounding. APR is the base rate before compounding. Banks advertise APY so you can compare offers directly.
          </p>
        </div>
      )}
<section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          How to use this calculator
        </h2>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>Enter the amount you plan to deposit into the CD.</li>
          <li>Type the APY (annual percentage yield) offered by your bank.</li>
          <li>Set the CD term length in months (common terms: 3, 6, 12, 24, 36, 60).</li>
          <li>Choose the compounding frequency &mdash; most banks compound daily.</li>
          <li>Click Calculate to see your maturity value and total interest earned.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          How it works
        </h2>
        <p className="text-gray-600">
          This CD calculator uses the standard compound interest formula
          A&nbsp;=&nbsp;P(1&nbsp;+&nbsp;r/n)<sup>nt</sup> to determine how much
          your deposit will grow over the term. It first converts the APY you
          enter into the equivalent nominal rate (APR) based on your chosen
          compounding frequency, then applies compound interest to arrive at the
          maturity value. The difference between the maturity value and your
          original deposit is the total interest earned.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          What Is a Certificate of Deposit (CD)?
        </h2>
        <p className="text-gray-600 mb-3">
          A certificate of deposit is a type of savings account that holds a fixed amount of money for a fixed period of time &mdash; anywhere from a few months to several years. In exchange for locking up your funds, the bank pays a higher interest rate than a standard savings or money market account. When the CD matures, you get your original deposit back plus all the interest it earned.
        </p>
        <p className="text-gray-600 mb-3">
          CDs are issued by banks and credit unions and are among the safest investments available. At FDIC-insured banks, your deposits are protected up to $250,000 per depositor. This guarantee, combined with a fixed rate of return, makes CDs popular with risk-averse savers, retirees, and anyone who wants a predictable return on money they won&apos;t need for a set period.
        </p>
        <p className="text-gray-600">
          The trade-off is liquidity. If you need to withdraw your money before the CD matures, you&apos;ll typically pay an early withdrawal penalty &mdash; often several months of interest. That&apos;s why it&apos;s important to use a CD calculator before you commit, so you can see exactly what you&apos;ll earn and whether the term length fits your financial timeline.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          APY vs. APR: What&apos;s the Difference?
        </h2>
        <p className="text-gray-600 mb-3">
          APY (Annual Percentage Yield) and APR (Annual Percentage Rate) both describe interest rates, but they are not the same thing. APR is the nominal interest rate without factoring in compounding. APY takes compounding into account and reflects the actual amount of interest you earn over one year.
        </p>
        <p className="text-gray-600 mb-3">
          For example, a CD with a 4.90% APR compounded daily has an APY of roughly 5.02%. The more frequently interest compounds, the larger the gap between APR and APY. Banks are legally required to disclose the APY, which makes it easier for consumers to do apples-to-apples comparisons across different CD offers.
        </p>
        <p className="text-gray-600">
          This calculator accepts APY as input and converts it to the equivalent APR internally. Both values are displayed in the results so you can see the relationship between them for your specific CD.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          CD Laddering Strategy
        </h2>
        <p className="text-gray-600 mb-3">
          CD laddering is a popular strategy where you split your savings across multiple CDs with staggered maturity dates. For example, instead of putting $25,000 into a single 5-year CD, you could open five CDs of $5,000 each with terms of 1, 2, 3, 4, and 5 years. As each CD matures, you either use the funds or reinvest into a new 5-year CD.
        </p>
        <p className="text-gray-600">
          This approach balances the higher rates of longer-term CDs with regular access to a portion of your money. It also protects against interest rate risk &mdash; if rates rise, your shorter-term CDs mature sooner and can be reinvested at the new higher rate. Use this calculator to model each rung of your CD ladder and estimate your overall return.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Frequently Asked Questions
        </h2>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          What is a certificate of deposit (CD)?
        </h3>
        <p className="text-gray-600 mb-4">
          A certificate of deposit is a savings product offered by banks and credit unions where you deposit a fixed amount of money for a set period of time (the term) in exchange for a guaranteed interest rate. CDs typically offer higher rates than regular savings accounts because your money is locked in for the full term.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          What is the difference between APY and APR on a CD?
        </h3>
        <p className="text-gray-600 mb-4">
          APY (Annual Percentage Yield) reflects the total amount of interest you earn in one year including compounding. APR (Annual Percentage Rate) is the nominal rate before compounding is factored in. APY is always equal to or higher than APR. Banks are required to advertise the APY so consumers can easily compare rates across institutions.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          What happens if I withdraw money from a CD early?
        </h3>
        <p className="text-gray-600 mb-4">
          Most CDs charge an early withdrawal penalty if you take your money out before the term ends. The penalty is usually a certain number of months of interest, which can range from 3 months for short-term CDs to 12 months or more for longer terms. Some banks offer no-penalty CDs, but these typically come with lower rates.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          Are CDs FDIC insured?
        </h3>
        <p className="text-gray-600 mb-4">
          Yes. CDs held at FDIC-insured banks are protected up to $250,000 per depositor, per institution. Credit union CDs (called share certificates) are similarly insured through the NCUA. This makes CDs one of the safest places to park money you cannot afford to lose.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          How does compounding frequency affect my CD earnings?
        </h3>
        <p className="text-gray-600">
          More frequent compounding means you earn interest on your interest more often, which slightly increases your total return at the same APR. Daily compounding earns marginally more than monthly or quarterly compounding. However, when banks advertise APY, compounding is already factored in, so the APY you see is what you actually earn regardless of how often it compounds.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Example Calculation
        </h2>
        <p className="text-gray-600 mb-3">
          Suppose you deposit $10,000 into a 12-month CD with a 5.00% APY and daily compounding. Here&apos;s what you&apos;d earn:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-1 mb-3">
          <li>Initial deposit: $10,000</li>
          <li>APY: 5.00% (equivalent APR: ~4.879%)</li>
          <li>Term: 12 months</li>
          <li>Compounding: Daily (365 times per year)</li>
          <li>Interest earned: $500.00</li>
          <li>Value at maturity: $10,500.00</li>
        </ul>
        <p className="text-gray-600">
          If you chose a longer 36-month term at the same rate, your $10,000 would grow to approximately $11,576.25 &mdash; earning $1,576.25 in interest. The longer the term, the more compounding works in your favor. Use the calculator above to test different deposit amounts, rates, and terms to find the right CD for your savings goals.
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
            <Link href="/tools/savings-calculator" className="text-[#2563eb] hover:underline">
              Savings Calculator
            </Link>
          </li>
          <li>
            <Link href="/tools/retirement-calculator" className="text-[#2563eb] hover:underline">
              Retirement Calculator
            </Link>
          </li>
          <li>
            <Link href="/tools/inflation-calculator" className="text-[#2563eb] hover:underline">
              Inflation Calculator
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
