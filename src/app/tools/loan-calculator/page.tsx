'use client';

import { useState } from 'react';
import Link from 'next/link';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Loan Calculator',
  url: 'https://calcanvas.com/tools/loan-calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'All',
  description:
    'Calculate your monthly loan payment, total interest paid, and view an amortization schedule for any type of loan including personal, auto, student, and business loans.',
};

interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [termUnit, setTermUnit] = useState<'years' | 'months'>('years');
  const [results, setResults] = useState<{
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
    amortization: AmortizationRow[];
  } | null>(null);

  function calculate() {
    const P = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate);
    const termValue = parseFloat(loanTerm);

    if (!P || P <= 0 || !annualRate || annualRate <= 0 || !termValue || termValue <= 0) return;

    const r = annualRate / 100 / 12;
    const n = termUnit === 'years' ? Math.round(termValue * 12) : Math.round(termValue);

    const monthlyPayment =
      (P * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - P;

    // Build amortization schedule
    const amortization: AmortizationRow[] = [];
    let balance = P;
    for (let i = 1; i <= n; i++) {
      const interestPortion = balance * r;
      const principalPortion = monthlyPayment - interestPortion;
      balance = Math.max(balance - principalPortion, 0);
      amortization.push({
        month: i,
        payment: monthlyPayment,
        principal: principalPortion,
        interest: interestPortion,
        balance,
      });
    }

    setResults({ monthlyPayment, totalPayment, totalInterest, amortization });
  }

  function reset() {
    setLoanAmount('');
    setInterestRate('');
    setLoanTerm('');
    setTermUnit('years');
    setResults(null);
  }

  const fmt = (v: number) =>
    v.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  // Pick summary rows for the amortization table: first 3, mid-point, last
  function getSummaryRows(rows: AmortizationRow[]): AmortizationRow[] {
    if (rows.length <= 6) return rows;
    const mid = Math.floor(rows.length / 2);
    const picks: AmortizationRow[] = [rows[0], rows[1], rows[2]];
    if (mid > 3 && mid < rows.length - 1) picks.push(rows[mid]);
    picks.push(rows[rows.length - 1]);
    return picks;
  }

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
                "name": "How is my monthly loan payment calculated?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Your monthly payment is calculated using the standard amortization formula: M = P[r(1+r)^n] / [(1+r)^n - 1], where P is the loan principal, r is the monthly interest rate, and n is the total number of payments. This produces a fixed payment that covers both principal and interest each month."
                }
              },
              {
                "@type": "Question",
                "name": "What types of loans can I calculate with this tool?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "This loan calculator works for any fixed-rate amortizing loan, including personal loans, auto loans, student loans, home improvement loans, business loans, and debt consolidation loans. It is not designed for interest-only or variable-rate loans."
                }
              },
              {
                "@type": "Question",
                "name": "How does loan term length affect total interest?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A longer loan term means lower monthly payments but significantly more total interest paid over the life of the loan. A shorter term raises your monthly payment but saves you a substantial amount in interest. For example, a $20,000 loan at 7% costs about $3,761 in interest over 5 years but $6,117 over 7 years."
                }
              },
              {
                "@type": "Question",
                "name": "Does this calculator include fees and taxes?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "This calculator computes principal and interest only. Origination fees, closing costs, taxes, and insurance are not included. Your actual cost of borrowing may be higher depending on these additional charges."
                }
              },
              {
                "@type": "Question",
                "name": "What is an amortization schedule?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "An amortization schedule is a table showing each monthly payment broken down into principal and interest portions along with the remaining loan balance. Early payments are mostly interest, while later payments are mostly principal. This schedule helps you understand exactly how your loan is paid off over time."
                }
              }
            ]
          })
        }}
      />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Loan Calculator
      </h1>
      <p className="text-gray-600 mb-6">
        Estimate your monthly loan payment, total interest, and amortization
        schedule for any fixed-rate loan. Works for personal loans, auto loans,
        student loans, and more.
      </p>


      <div className="mt-8 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Loan Amount ($)
          </label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
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
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            placeholder="7.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Loan Term
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
              placeholder={termUnit === 'years' ? '5' : '60'}
            />
            <button
              onClick={() => setTermUnit(termUnit === 'years' ? 'months' : 'years')}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              {termUnit === 'years' ? 'Years' : 'Months'}
            </button>
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
              <p className="text-sm text-gray-500">Total Payment</p>
              <p className="text-2xl font-bold text-gray-900">
                {fmt(results.totalPayment)}
              </p>
            </div>
          </div>

          {/* Amortization Summary Table */}
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">
              Amortization Summary
            </h3>
            <div className="bg-white border border-blue-200 rounded-lg overflow-hidden">
              <div className="grid grid-cols-5 gap-0 text-xs font-semibold text-gray-900 bg-blue-100 border-b border-blue-200">
                <div className="p-2 text-center">Month</div>
                <div className="p-2 text-center">Payment</div>
                <div className="p-2 text-center">Principal</div>
                <div className="p-2 text-center">Interest</div>
                <div className="p-2 text-center">Balance</div>
              </div>
              {getSummaryRows(results.amortization).map((row, idx, arr) => (
                <div key={row.month}>
                  {idx > 0 && arr[idx - 1].month !== row.month - 1 && (
                    <div className="grid grid-cols-5 gap-0 text-xs text-gray-400 text-center py-1 border-b border-blue-100">
                      <div className="p-1">...</div>
                      <div className="p-1">...</div>
                      <div className="p-1">...</div>
                      <div className="p-1">...</div>
                      <div className="p-1">...</div>
                    </div>
                  )}
                  <div className="grid grid-cols-5 gap-0 text-xs text-gray-700 border-b border-blue-100 last:border-b-0">
                    <div className="p-2 text-center">{row.month}</div>
                    <div className="p-2 text-center">{fmt(row.payment)}</div>
                    <div className="p-2 text-center">{fmt(row.principal)}</div>
                    <div className="p-2 text-center">{fmt(row.interest)}</div>
                    <div className="p-2 text-center">{fmt(row.balance)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
<section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          How to use this calculator
        </h2>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>Enter the total amount you plan to borrow.</li>
          <li>Input the annual interest rate offered by your lender.</li>
          <li>Set the loan term in years or toggle to months for shorter loans.</li>
          <li>Click Calculate to see your monthly payment, total interest, and amortization summary.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          How it works
        </h2>
        <p className="text-gray-600">
          This calculator uses the standard amortization formula: M = P[r(1+r)^n]
          / [(1+r)^n - 1], where P is the loan principal, r is the monthly
          interest rate (annual rate divided by 12), and n is the total number of
          monthly payments. The result gives you the fixed monthly payment that
          covers both principal and interest over the life of the loan.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          What Is a Loan Calculator?
        </h2>
        <p className="text-gray-600 mb-3">
          A loan calculator is a financial planning tool that estimates your monthly payment and total cost of borrowing before you sign any paperwork. Whether you&apos;re financing a car, consolidating credit card debt, funding a home renovation, or covering tuition, knowing the true cost of a loan helps you compare offers and avoid borrowing more than you can comfortably repay.
        </p>
        <p className="text-gray-600 mb-3">
          The monthly payment is only part of the picture. A good loan calculator also reveals the total interest you&apos;ll pay over the full term and shows an amortization schedule so you can see exactly how each payment is split between principal and interest. This transparency is critical because two loans with the same monthly payment can have drastically different total costs depending on the term length and interest rate.
        </p>
        <p className="text-gray-600">
          Use this calculator to run different scenarios: compare a 3-year term against a 5-year term, see how a lower rate from a credit union stacks up against a bank offer, or figure out whether paying a higher monthly amount makes sense to save on interest. The more scenarios you test, the better equipped you are to make a confident borrowing decision.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Understanding Loan Amortization
        </h2>
        <p className="text-gray-700 mb-3">
          Amortization is the process of paying off a loan through a series of fixed monthly payments. Each payment is divided into two parts: a portion that goes toward interest and a portion that reduces the principal balance. The split between these two portions changes every month.
        </p>
        <p className="text-gray-700 mb-3">
          In the early months of a loan, the majority of each payment goes toward interest because the outstanding balance is still high. As you make payments and the balance shrinks, less of each payment is needed for interest, so more goes toward principal. By the final months of the loan, nearly the entire payment reduces your balance.
        </p>
        <p className="text-gray-700 mb-3">
          Here&apos;s a concrete example using a $25,000 loan at 7.5% for 5 years (monthly payment of about $501):
        </p>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-3">
          <div className="grid grid-cols-4 gap-2 text-sm font-semibold text-gray-900 border-b border-gray-300 pb-2 mb-2">
            <div>Period</div>
            <div>To Interest</div>
            <div>To Principal</div>
            <div>Remaining Balance</div>
          </div>
          <div className="grid grid-cols-4 gap-2 text-sm text-gray-700 py-1">
            <div>Month 1</div>
            <div>$156</div>
            <div>$345</div>
            <div>$24,655</div>
          </div>
          <div className="grid grid-cols-4 gap-2 text-sm text-gray-700 py-1">
            <div>Month 30</div>
            <div>$84</div>
            <div>$417</div>
            <div>$13,060</div>
          </div>
          <div className="grid grid-cols-4 gap-2 text-sm text-gray-700 py-1">
            <div>Month 60</div>
            <div>$3</div>
            <div>$498</div>
            <div>$0</div>
          </div>
        </div>
        <p className="text-gray-700">
          In Month 1, about 31% of the payment goes to interest. By the midpoint, interest drops to roughly 17%. In the final month, nearly 100% of the payment goes to principal. This is why making extra payments early in the loan has the greatest impact on reducing total interest.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          How Loan Term Affects Your Cost
        </h2>
        <p className="text-gray-700 mb-3">
          The length of your loan has a major impact on both your monthly payment and the total amount you pay. Shorter terms mean higher monthly payments but significantly less interest over the life of the loan. Here&apos;s a comparison using a $25,000 loan at 7.5%:
        </p>
        <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden mb-4">
          <div className="grid grid-cols-4 gap-0 text-sm font-semibold text-gray-900 bg-gray-100 border-b border-gray-300">
            <div className="p-3"></div>
            <div className="p-3 text-center">3 Years</div>
            <div className="p-3 text-center">5 Years</div>
            <div className="p-3 text-center">7 Years</div>
          </div>
          <div className="grid grid-cols-4 gap-0 text-sm text-gray-700 border-b border-gray-200">
            <div className="p-3 font-medium">Monthly Payment</div>
            <div className="p-3 text-center">$777</div>
            <div className="p-3 text-center">$501</div>
            <div className="p-3 text-center">$383</div>
          </div>
          <div className="grid grid-cols-4 gap-0 text-sm text-gray-700 border-b border-gray-200">
            <div className="p-3 font-medium">Total Interest</div>
            <div className="p-3 text-center">$2,972</div>
            <div className="p-3 text-center">$5,058</div>
            <div className="p-3 text-center">$7,174</div>
          </div>
          <div className="grid grid-cols-4 gap-0 text-sm text-gray-700">
            <div className="p-3 font-medium">Total Cost</div>
            <div className="p-3 text-center">$27,972</div>
            <div className="p-3 text-center">$30,058</div>
            <div className="p-3 text-center">$32,174</div>
          </div>
        </div>
        <p className="text-gray-700 mb-3">
          Extending the loan from 3 years to 7 years drops the monthly payment by $394, but adds over <strong>$4,200 in extra interest</strong>. That&apos;s the trade-off: lower monthly payments cost more in the long run.
        </p>
        <p className="text-gray-700">
          The sweet spot depends on your budget. If you can afford the higher payment, a shorter term saves you money. If cash flow is tight, a longer term keeps payments manageable while you focus on other financial priorities. Either way, running the numbers here helps you see exactly what each option costs.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          How Interest Rate Affects Your Loan
        </h2>
        <p className="text-gray-700 mb-3">
          Your interest rate is one of the most important factors in the total cost of a loan. Even a small difference in rate can add up to hundreds or thousands of dollars over the loan term. Here&apos;s how different rates affect a $25,000 loan over 5 years:
        </p>
        <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden mb-4">
          <div className="grid grid-cols-4 gap-0 text-sm font-semibold text-gray-900 bg-gray-100 border-b border-gray-300">
            <div className="p-3">Rate</div>
            <div className="p-3 text-center">Monthly Payment</div>
            <div className="p-3 text-center">Total Interest</div>
            <div className="p-3 text-center">Total Cost</div>
          </div>
          <div className="grid grid-cols-4 gap-0 text-sm text-gray-700 border-b border-gray-200">
            <div className="p-3 font-medium">5.0%</div>
            <div className="p-3 text-center">$472</div>
            <div className="p-3 text-center">$3,307</div>
            <div className="p-3 text-center">$28,307</div>
          </div>
          <div className="grid grid-cols-4 gap-0 text-sm text-gray-700 border-b border-gray-200">
            <div className="p-3 font-medium">7.5%</div>
            <div className="p-3 text-center">$501</div>
            <div className="p-3 text-center">$5,058</div>
            <div className="p-3 text-center">$30,058</div>
          </div>
          <div className="grid grid-cols-4 gap-0 text-sm text-gray-700 border-b border-gray-200">
            <div className="p-3 font-medium">10.0%</div>
            <div className="p-3 text-center">$531</div>
            <div className="p-3 text-center">$6,873</div>
            <div className="p-3 text-center">$31,873</div>
          </div>
          <div className="grid grid-cols-4 gap-0 text-sm text-gray-700">
            <div className="p-3 font-medium">15.0%</div>
            <div className="p-3 text-center">$595</div>
            <div className="p-3 text-center">$10,681</div>
            <div className="p-3 text-center">$35,681</div>
          </div>
        </div>
        <p className="text-gray-700">
          Going from 5% to 15% more than triples the total interest paid. That&apos;s why it pays to shop around, improve your credit score before applying, and consider a secured loan or co-signer if it means qualifying for a significantly lower rate.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Tips for Getting a Lower Loan Rate
        </h2>
        <p className="text-gray-700 mb-3">
          The interest rate you receive depends on several factors, many of which you can improve before applying. Here are the most effective strategies:
        </p>
        <p className="text-gray-700 mb-3">
          <strong>Check and improve your credit score.</strong> Lenders use your credit score as a primary risk indicator. Scores above 740 typically qualify for the best rates. Pay down existing balances, avoid opening new accounts before applying, and dispute any errors on your credit report. Even a 30-point improvement can make a meaningful difference.
        </p>
        <p className="text-gray-700 mb-3">
          <strong>Compare multiple lenders.</strong> Banks, credit unions, and online lenders all offer different rates and terms. Get at least three to five quotes. Credit unions in particular often offer lower rates to members because they operate as nonprofits. Multiple loan inquiries within a 14-day window typically count as a single hard pull on your credit.
        </p>
        <p className="text-gray-700 mb-3">
          <strong>Consider a secured loan.</strong> If you can offer collateral such as a savings account, CD, or vehicle title, secured loans typically carry lower rates than unsecured personal loans because the lender&apos;s risk is reduced.
        </p>
        <p className="text-gray-700 mb-3">
          <strong>Choose a shorter term.</strong> Lenders often offer lower interest rates on shorter-term loans because they recover their money faster. A 3-year loan may have a rate 0.5% to 1.5% lower than a 7-year loan from the same lender.
        </p>
        <p className="text-gray-700">
          <strong>Use a co-signer.</strong> If your credit is thin or your score is below 670, adding a co-signer with strong credit can help you qualify for a much better rate. Just make sure both parties understand the responsibility involved.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Types of Loans This Calculator Covers
        </h2>
        <p className="text-gray-700 mb-3">
          This general-purpose loan calculator works for any fixed-rate, fully amortizing loan. Here are the most common types:
        </p>
        <p className="text-gray-700 mb-3">
          <strong>Personal loans</strong> are unsecured loans typically ranging from $1,000 to $50,000 with terms of 2 to 7 years. They&apos;re used for debt consolidation, home improvements, medical expenses, and large purchases. Rates vary from about 6% to 36% depending on creditworthiness.
        </p>
        <p className="text-gray-700 mb-3">
          <strong>Auto loans</strong> are secured by the vehicle you&apos;re purchasing. Terms usually range from 3 to 7 years, with rates from 4% to 15% depending on your credit, the vehicle age, and the lender. New car loans typically offer lower rates than used car loans.
        </p>
        <p className="text-gray-700 mb-3">
          <strong>Student loans</strong> help cover tuition, books, and living expenses. Federal student loans have fixed rates set by the government, while private student loans have variable or fixed rates based on creditworthiness. Terms range from 5 to 20 years.
        </p>
        <p className="text-gray-700 mb-3">
          <strong>Home improvement loans</strong> are personal loans earmarked for renovations. They&apos;re an alternative to HELOCs or home equity loans when you don&apos;t want to use your home as collateral. Typical amounts range from $5,000 to $100,000.
        </p>
        <p className="text-gray-700">
          <strong>Small business loans</strong> fund equipment, inventory, expansion, or working capital. SBA loans, term loans, and equipment financing all follow fixed amortization schedules that this calculator can model.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Loan Prepayment: Paying Off Your Loan Early
        </h2>
        <p className="text-gray-700 mb-3">
          Making extra payments toward your loan principal is one of the simplest ways to save money on interest. Because interest is calculated on the outstanding balance, every dollar of extra principal reduces the interest charged in all future months.
        </p>
        <p className="text-gray-700 mb-3">
          For example, on a $25,000 personal loan at 7.5% for 5 years, adding just $50 per month to your payment saves about <strong>$700 in interest</strong> and pays off the loan roughly 6 months early. Adding $100 per month saves about $1,300 and cuts a full year off the term.
        </p>
        <p className="text-gray-700 mb-3">
          Before making extra payments, check your loan agreement for <strong>prepayment penalties</strong>. Some lenders charge a fee for paying off a loan early, especially in the first year or two. Most personal loans and auto loans from major lenders do not have prepayment penalties, but it&apos;s always worth confirming.
        </p>
        <p className="text-gray-700">
          When making extra payments, always specify that the additional amount should be applied to <strong>principal, not future payments</strong>. Some lenders will apply extra funds toward your next month&apos;s payment instead, which doesn&apos;t reduce your interest savings. Contact your servicer or check your online portal to confirm how extra payments are applied.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Frequently Asked Questions
        </h2>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          How is my monthly loan payment calculated?
        </h3>
        <p className="text-gray-600 mb-4">
          Your monthly payment is calculated using the standard amortization formula: M = P[r(1+r)^n] / [(1+r)^n - 1]. P is the loan principal (amount borrowed), r is the monthly interest rate (annual rate divided by 12), and n is the total number of monthly payments. This formula produces a fixed payment amount that covers both principal and interest each month, ensuring the loan is fully paid off by the end of the term.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          What types of loans can I calculate with this tool?
        </h3>
        <p className="text-gray-600 mb-4">
          This loan calculator works for any fixed-rate, fully amortizing loan. That includes personal loans, auto loans, student loans, home improvement loans, business loans, and debt consolidation loans. It does not account for variable-rate loans, interest-only loans, or balloon payment structures.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          How does loan term length affect total interest?
        </h3>
        <p className="text-gray-600 mb-4">
          A longer loan term lowers your monthly payment but increases the total amount of interest you pay. For a $25,000 loan at 7.5%, a 3-year term costs about $2,972 in total interest while a 7-year term costs about $7,174. That&apos;s an extra $4,200 for the same loan, just stretched over more time.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          Does this calculator include fees and taxes?
        </h3>
        <p className="text-gray-600 mb-4">
          No, this calculator focuses on principal and interest only. Origination fees, closing costs, late fees, and any applicable taxes are not included. To get the full cost of borrowing, add any upfront fees your lender charges to the total interest shown in the results.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          What is an amortization schedule?
        </h3>
        <p className="text-gray-600">
          An amortization schedule is a month-by-month breakdown of each loan payment showing how much goes to interest, how much reduces the principal, and the remaining balance after each payment. Early in the loan, a larger share of each payment covers interest. Over time, the balance shifts and more goes toward principal. The summary table in the results above gives you a snapshot of this progression.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Example Calculation
        </h2>
        <p className="text-gray-600 mb-3">
          Suppose you&apos;re taking out a $25,000 personal loan at 7.5% interest for 5 years. Here&apos;s what the numbers look like:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-1 mb-3">
          <li>Loan amount: $25,000</li>
          <li>Monthly payment: approximately $501</li>
          <li>Total interest over 5 years: approximately $5,058</li>
          <li>Total amount paid: approximately $30,058</li>
        </ul>
        <p className="text-gray-600">
          That means you&apos;ll pay about 20% of the original loan amount in interest alone. If you shortened the term to 3 years, your monthly payment would jump to about $777, but you&apos;d save over $2,000 in interest. Alternatively, if a credit union offered you 5.0% instead of 7.5%, the same 5-year loan would cost only $3,307 in interest, saving you $1,751.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Loan Glossary
        </h2>
        <div className="space-y-2">
          <p className="text-gray-700"><strong>Principal:</strong> The original amount of money borrowed, not including interest or fees.</p>
          <p className="text-gray-700"><strong>Interest Rate:</strong> The annual percentage the lender charges you for borrowing the money, expressed as a percentage of the principal.</p>
          <p className="text-gray-700"><strong>APR (Annual Percentage Rate):</strong> The true yearly cost of a loan including interest and fees, giving a more complete picture than the interest rate alone.</p>
          <p className="text-gray-700"><strong>Amortization:</strong> The process of gradually paying off a loan through regular, scheduled payments that cover both interest and principal.</p>
          <p className="text-gray-700"><strong>Term:</strong> The length of time you have to repay the loan in full, typically expressed in months or years.</p>
          <p className="text-gray-700"><strong>Secured Loan:</strong> A loan backed by collateral (like a car or savings account) that the lender can claim if you default.</p>
          <p className="text-gray-700"><strong>Unsecured Loan:</strong> A loan not backed by collateral, relying on your creditworthiness. Personal loans are typically unsecured.</p>
          <p className="text-gray-700"><strong>Origination Fee:</strong> An upfront fee charged by some lenders for processing the loan, usually 1% to 8% of the loan amount.</p>
          <p className="text-gray-700"><strong>Prepayment Penalty:</strong> A fee some lenders charge if you pay off the loan before the scheduled end date.</p>
          <p className="text-gray-700"><strong>DTI (Debt-to-Income Ratio):</strong> The percentage of your gross monthly income that goes toward debt payments; lenders use this to assess your ability to repay.</p>
        </div>
      </section>

      <section className="mt-8 pb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Related Tools
        </h2>
        <ul className="space-y-1">
          <li>
            <Link
              href="/tools/mortgage-calculator"
              className="text-[#2563eb] hover:underline"
            >
              Mortgage Calculator
            </Link>
          </li>
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
              href="/tools/loan-payoff-calculator"
              className="text-[#2563eb] hover:underline"
            >
              Loan Payoff Calculator
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
              href="/tools/investment-calculator"
              className="text-[#2563eb] hover:underline"
            >
              Investment Calculator
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
