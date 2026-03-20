'use client';

import { useState } from 'react';
import Link from 'next/link';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Debt to Income Ratio Calculator',
  url: 'https://calcanvas.com/tools/debt-to-income-calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'All',
  description:
    'Calculate your debt to income ratio (DTI) to see where you stand. Check front-end and back-end DTI ratios and find out if you qualify for a mortgage.',
};

export default function DebtToIncomeCalculator() {
  const [grossIncome, setGrossIncome] = useState('');
  const [mortgage, setMortgage] = useState('');
  const [carPayment, setCarPayment] = useState('');
  const [studentLoans, setStudentLoans] = useState('');
  const [creditCards, setCreditCards] = useState('');
  const [otherDebts, setOtherDebts] = useState('');
  const [results, setResults] = useState<{
    frontEndDTI: number;
    backEndDTI: number;
    totalDebt: number;
    housingDebt: number;
    rating: 'good' | 'fair' | 'high';
    conventionalQualified: boolean;
    fhaQualified: boolean;
  } | null>(null);

  function calculate() {
    const income = parseFloat(grossIncome);
    if (!income || income <= 0) return;

    const housing = parseFloat(mortgage) || 0;
    const car = parseFloat(carPayment) || 0;
    const student = parseFloat(studentLoans) || 0;
    const credit = parseFloat(creditCards) || 0;
    const other = parseFloat(otherDebts) || 0;

    const totalDebt = housing + car + student + credit + other;
    const frontEndDTI = (housing / income) * 100;
    const backEndDTI = (totalDebt / income) * 100;

    let rating: 'good' | 'fair' | 'high';
    if (backEndDTI < 36) {
      rating = 'good';
    } else if (backEndDTI <= 43) {
      rating = 'fair';
    } else {
      rating = 'high';
    }

    setResults({
      frontEndDTI,
      backEndDTI,
      totalDebt,
      housingDebt: housing,
      rating,
      conventionalQualified: backEndDTI <= 36 && frontEndDTI <= 28,
      fhaQualified: backEndDTI <= 43 && frontEndDTI <= 31,
    });
  }

  function reset() {
    setGrossIncome('');
    setMortgage('');
    setCarPayment('');
    setStudentLoans('');
    setCreditCards('');
    setOtherDebts('');
    setResults(null);
  }

  const totalDebtDisplay =
    (parseFloat(mortgage) || 0) +
    (parseFloat(carPayment) || 0) +
    (parseFloat(studentLoans) || 0) +
    (parseFloat(creditCards) || 0) +
    (parseFloat(otherDebts) || 0);

  const ratingColor = {
    good: 'text-green-600',
    fair: 'text-yellow-600',
    high: 'text-red-600',
  };

  const ratingLabel = {
    good: 'Good',
    fair: 'Acceptable',
    high: 'Too High',
  };

  const ratingBg = {
    good: 'bg-green-100 border-green-300',
    fair: 'bg-yellow-100 border-yellow-300',
    high: 'bg-red-100 border-red-300',
  };

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
                "name": "What is a good debt to income ratio?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A DTI ratio below 36% is generally considered good by most lenders. A ratio between 36% and 43% is acceptable for some loan programs, especially FHA loans. Anything above 43% makes it difficult to qualify for most mortgages."
                }
              },
              {
                "@type": "Question",
                "name": "What is the difference between front-end and back-end DTI?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Front-end DTI (also called the housing ratio) only includes your housing costs like mortgage or rent payments. Back-end DTI includes all monthly debt obligations — housing, car payments, student loans, credit cards, and other debts. Lenders look at both numbers when evaluating your application."
                }
              },
              {
                "@type": "Question",
                "name": "Does DTI affect my credit score?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Your DTI ratio does not directly affect your credit score. Credit scores are based on payment history, credit utilization, length of credit history, and other factors. However, a high DTI can lead to missed payments if you're stretched too thin, which would hurt your score."
                }
              },
              {
                "@type": "Question",
                "name": "How can I lower my debt to income ratio?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can lower your DTI by paying down existing debts, avoiding new debt, increasing your income through raises or side work, or refinancing loans to lower monthly payments. Even small reductions in monthly obligations can improve your ratio significantly."
                }
              },
              {
                "@type": "Question",
                "name": "What DTI do I need for a conventional mortgage?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Most conventional mortgage lenders prefer a front-end DTI of 28% or less and a back-end DTI of 36% or less. Some lenders will go up to 45% for borrowers with strong credit scores and significant cash reserves, but 36% is the standard benchmark."
                }
              }
            ]
          })
        }}
      />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Debt to Income Ratio Calculator
      </h1>
      <p className="text-gray-600 mb-6">
        Calculate your debt to income ratio (DTI) to see how lenders view your
        finances. Enter your gross monthly income and individual debt payments to
        get your front-end and back-end DTI ratios instantly.
      </p>


      <div className="mt-8 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gross Monthly Income ($)
          </label>
          <input
            type="number"
            value={grossIncome}
            onChange={(e) => setGrossIncome(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            placeholder="5000"
          />
        </div>

        <div className="border border-gray-200 rounded-lg p-4 space-y-3">
          <p className="text-sm font-semibold text-gray-800">
            Monthly Debt Payments
          </p>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mortgage / Rent ($)
            </label>
            <input
              type="number"
              value={mortgage}
              onChange={(e) => setMortgage(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
              placeholder="1200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Car Payment ($)
            </label>
            <input
              type="number"
              value={carPayment}
              onChange={(e) => setCarPayment(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
              placeholder="350"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Student Loans ($)
            </label>
            <input
              type="number"
              value={studentLoans}
              onChange={(e) => setStudentLoans(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
              placeholder="250"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Credit Card Minimum Payments ($)
            </label>
            <input
              type="number"
              value={creditCards}
              onChange={(e) => setCreditCards(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
              placeholder="150"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Other Monthly Debts ($)
              <span className="text-gray-400 font-normal"> — personal loans, alimony, etc.</span>
            </label>
            <input
              type="number"
              value={otherDebts}
              onChange={(e) => setOtherDebts(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
              placeholder="0"
            />
          </div>
          <div className="pt-1 text-sm text-gray-500">
            Total Monthly Debts:{' '}
            <span className="font-semibold text-gray-800">
              ${totalDebtDisplay.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
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
          <h2 className="text-lg font-semibold text-gray-900">Your DTI Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-500">Front-End DTI (Housing)</p>
              <p className="text-2xl font-bold text-[#2563eb]">
                {results.frontEndDTI.toFixed(1)}%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Back-End DTI (All Debts)</p>
              <p className="text-2xl font-bold text-[#2563eb]">
                {results.backEndDTI.toFixed(1)}%
              </p>
            </div>
          </div>

          <div className={`rounded-lg border p-3 text-center ${ratingBg[results.rating]}`}>
            <p className="text-sm text-gray-600">DTI Rating</p>
            <p className={`text-xl font-bold ${ratingColor[results.rating]}`}>
              {ratingLabel[results.rating]}
              {results.rating === 'good' && ' — You are in great shape'}
              {results.rating === 'fair' && ' — May qualify for FHA loans'}
              {results.rating === 'high' && ' — Consider reducing debts'}
            </p>
          </div>

          <div className="border-t border-blue-200 pt-4 mt-4">
            <h3 className="text-md font-semibold text-gray-800 mb-3">
              Loan Qualification Estimates
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-500">Conventional Loan</p>
                <p className={`text-lg font-bold ${results.conventionalQualified ? 'text-green-600' : 'text-red-600'}`}>
                  {results.conventionalQualified ? 'Likely Qualified' : 'May Not Qualify'}
                </p>
                <p className="text-xs text-gray-400 mt-1">Front-end &le; 28%, Back-end &le; 36%</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">FHA Loan</p>
                <p className={`text-lg font-bold ${results.fhaQualified ? 'text-green-600' : 'text-red-600'}`}>
                  {results.fhaQualified ? 'Likely Qualified' : 'May Not Qualify'}
                </p>
                <p className="text-xs text-gray-400 mt-1">Front-end &le; 31%, Back-end &le; 43%</p>
              </div>
            </div>
          </div>

          <div className="border-t border-blue-200 pt-4 mt-4">
            <h3 className="text-md font-semibold text-gray-800 mb-2">Breakdown</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex justify-between">
                <span>Gross Monthly Income</span>
                <span className="font-medium">${parseFloat(grossIncome).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between">
                <span>Housing Payment</span>
                <span className="font-medium">${results.housingDebt.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Monthly Debts</span>
                <span className="font-medium">${results.totalDebt.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between">
                <span>Remaining After Debts</span>
                <span className="font-medium">${(parseFloat(grossIncome) - results.totalDebt).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
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
          <li>Enter your gross monthly income (before taxes and deductions).</li>
          <li>Fill in each debt category with your minimum monthly payment amounts.</li>
          <li>The calculator auto-totals your debts as you type.</li>
          <li>Click Calculate to see your front-end DTI, back-end DTI, and loan qualification status.</li>
          <li>Use the results to understand where you stand before applying for a mortgage or loan.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          How it works
        </h2>
        <p className="text-gray-600">
          Your debt to income ratio is calculated by dividing your total monthly
          debt payments by your gross monthly income and multiplying by 100.
          Front-end DTI only considers housing costs (mortgage or rent), while
          back-end DTI includes all recurring debts. Lenders use both numbers to
          determine how much of your income is already committed to debt and
          whether you can comfortably handle additional payments.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          What Is a Debt to Income Ratio?
        </h2>
        <p className="text-gray-600 mb-3">
          Your debt to income ratio (DTI) is one of the most important numbers lenders look at when you apply for a mortgage, auto loan, or personal loan. It measures what percentage of your gross monthly income goes toward paying debts. A lower DTI signals to lenders that you have a healthy balance between debt and income, making you a less risky borrower.
        </p>
        <p className="text-gray-600 mb-3">
          There are two types of DTI ratios. The front-end ratio (sometimes called the housing ratio) only counts your housing-related expenses &mdash; your mortgage payment, property taxes, homeowners insurance, and HOA dues. The back-end ratio includes everything: housing costs plus car loans, student loans, credit card minimums, personal loans, child support, and any other recurring monthly obligations.
        </p>
        <p className="text-gray-600 mb-3">
          Most conventional mortgage lenders follow the 28/36 rule: they want your front-end DTI at or below 28% and your back-end DTI at or below 36%. FHA loans are more lenient, allowing a front-end ratio up to 31% and a back-end ratio up to 43%. Some lenders will approve borrowers with ratios up to 50% in exceptional cases, but the interest rate and terms will likely be less favorable.
        </p>
        <p className="text-gray-600">
          Understanding your DTI before you start house hunting or apply for a loan gives you a realistic picture of what you can afford. If your ratio is too high, you can take steps to pay down debt or increase income before applying, which can save you thousands of dollars in interest over the life of a loan.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          DTI Ratio Ranges and What They Mean
        </h2>
        <p className="text-gray-600 mb-3">
          Lenders generally categorize DTI ratios into three tiers. Understanding where you fall helps you set expectations before applying for credit.
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-2 mb-3">
          <li>
            <strong>Below 36% (Good):</strong> You are in a strong position. Most lenders will view you favorably, and you are likely to qualify for the best interest rates and loan terms available.
          </li>
          <li>
            <strong>36% to 43% (Acceptable):</strong> You may still qualify for a mortgage, particularly through FHA or VA loan programs. However, conventional lenders may scrutinize your application more closely or require compensating factors like a higher credit score or larger down payment.
          </li>
          <li>
            <strong>Above 43% (High):</strong> Most lenders will be reluctant to approve a new loan at this level. The Consumer Financial Protection Bureau (CFPB) uses 43% as the general cutoff for qualified mortgages. You should focus on paying down debt before applying.
          </li>
        </ul>
        <p className="text-gray-600">
          Keep in mind that DTI is just one factor. Lenders also consider your credit score, employment history, savings, and the size of your down payment. A borrower with a 40% DTI but an 800 credit score and six months of reserves may still get approved where someone with a 35% DTI and a 620 score might not.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          How to Lower Your Debt to Income Ratio
        </h2>
        <p className="text-gray-600 mb-3">
          If your DTI is higher than you would like, there are several practical strategies to bring it down:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-1 mb-3">
          <li>Pay off small debts entirely to eliminate monthly payments from your ratio.</li>
          <li>Make extra payments on high-balance debts to reduce minimum payment amounts over time.</li>
          <li>Avoid taking on new debt, especially in the months before a mortgage application.</li>
          <li>Increase your income through overtime, a raise, freelance work, or a side business.</li>
          <li>Refinance existing loans at a lower rate to reduce monthly payments.</li>
          <li>Consolidate multiple debts into a single lower-payment loan.</li>
        </ul>
        <p className="text-gray-600">
          Even modest changes can make a meaningful difference. Paying off a $200 per month car loan drops a $5,000 earner&apos;s DTI by 4 percentage points. That alone could move you from the &quot;acceptable&quot; range into the &quot;good&quot; range and unlock better mortgage terms.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Frequently Asked Questions
        </h2>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          What is a good debt to income ratio?
        </h3>
        <p className="text-gray-600 mb-4">
          A DTI ratio below 36% is generally considered good by most lenders. A ratio between 36% and 43% is acceptable for some loan programs, especially FHA loans. Anything above 43% makes it difficult to qualify for most mortgages. The lower your DTI, the better your chances of getting approved with favorable terms.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          What is the difference between front-end and back-end DTI?
        </h3>
        <p className="text-gray-600 mb-4">
          Front-end DTI (also called the housing ratio) only includes your housing costs like mortgage or rent payments. Back-end DTI includes all monthly debt obligations &mdash; housing, car payments, student loans, credit cards, and other debts. Lenders look at both numbers when evaluating your application, but the back-end ratio is usually the more important one.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          Does DTI affect my credit score?
        </h3>
        <p className="text-gray-600 mb-4">
          Your DTI ratio does not directly affect your credit score. Credit scores are based on payment history, credit utilization, length of credit history, and other factors. However, a high DTI can lead to missed payments if you are stretched too thin financially, which would hurt your credit score indirectly.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          How can I lower my debt to income ratio quickly?
        </h3>
        <p className="text-gray-600 mb-4">
          The fastest ways to lower your DTI are to pay off small debts entirely (eliminating their monthly payments), increase your gross income, or refinance existing loans to reduce monthly obligations. Avoid taking on new debt in the months leading up to a loan application.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          What DTI do I need for a conventional mortgage?
        </h3>
        <p className="text-gray-600">
          Most conventional mortgage lenders prefer a front-end DTI of 28% or less and a back-end DTI of 36% or less. This is known as the 28/36 rule. Some lenders will go up to 45% for borrowers with strong credit scores and significant cash reserves, but 36% is the standard benchmark that gives you the best rates.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Example Calculation
        </h2>
        <p className="text-gray-600 mb-3">
          Suppose you earn $6,000 per month before taxes and have the following monthly debts:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-1 mb-3">
          <li>Mortgage / Rent: $1,400</li>
          <li>Car payment: $350</li>
          <li>Student loans: $200</li>
          <li>Credit card minimums: $100</li>
          <li>Other debts: $0</li>
        </ul>
        <p className="text-gray-600 mb-3">
          Here is how the numbers work out:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-1 mb-3">
          <li>Total monthly debts: $2,050</li>
          <li>Front-end DTI (housing only): $1,400 / $6,000 = 23.3%</li>
          <li>Back-end DTI (all debts): $2,050 / $6,000 = 34.2%</li>
          <li>Rating: Good (under 36%)</li>
          <li>Conventional loan: Likely qualified (front-end under 28%, back-end under 36%)</li>
          <li>FHA loan: Likely qualified (front-end under 31%, back-end under 43%)</li>
        </ul>
        <p className="text-gray-600">
          This borrower is in a strong position. Their DTI is below the conventional 28/36 thresholds, meaning they would likely qualify for the best mortgage rates available. If the car payment were $500 instead of $350, the back-end DTI would rise to 36.7%, pushing them out of the conventional sweet spot but still within FHA limits.
        </p>
      </section>

      <section className="mt-8 pb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Related Tools
        </h2>
        <ul className="space-y-1">
          <li><Link href="/tools/mortgage-calculator" className="text-[#2563eb] hover:underline">Mortgage Calculator</Link></li>
          <li><Link href="/tools/loan-payoff-calculator" className="text-[#2563eb] hover:underline">Loan Payoff Calculator</Link></li>
          <li><Link href="/tools/auto-loan-calculator" className="text-[#2563eb] hover:underline">Auto Loan Calculator</Link></li>
          <li><Link href="/tools/net-worth-calculator" className="text-[#2563eb] hover:underline">Net Worth Calculator</Link></li>
          <li><Link href="/tools/income-tax-calculator" className="text-[#2563eb] hover:underline">Income Tax Calculator</Link></li>
        </ul>
      </section>
    </main>
  );
}
