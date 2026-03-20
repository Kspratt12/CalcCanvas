'use client';

import { useState } from 'react';
import AdPlacement from '@/components/AdPlacement';
import Link from 'next/link';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Sales Tax Calculator',
  url: 'https://calcanvas.com/tools/sales-tax-calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'All',
  description:
    'Calculate sales tax amount and total price for any purchase. Quick-select buttons for common US state tax rates.',
};

const stateTaxRates = [
  { state: 'CA', rate: 7.25 },
  { state: 'TX', rate: 6.25 },
  { state: 'NY', rate: 4.0 },
  { state: 'FL', rate: 6.0 },
  { state: 'IL', rate: 6.25 },
  { state: 'PA', rate: 6.0 },
  { state: 'OH', rate: 5.75 },
  { state: 'GA', rate: 4.0 },
  { state: 'WA', rate: 6.5 },
  { state: 'NJ', rate: 6.625 },
  { state: 'AZ', rate: 5.6 },
  { state: 'TN', rate: 7.0 },
];

export default function SalesTaxCalculator() {
  const [price, setPrice] = useState('');
  const [taxRate, setTaxRate] = useState('');
  const [results, setResults] = useState<{
    taxAmount: number;
    totalPrice: number;
  } | null>(null);

  function calculate() {
    const p = parseFloat(price);
    const r = parseFloat(taxRate);
    if (!p || isNaN(r) || r < 0) return;

    const taxAmount = p * (r / 100);
    const totalPrice = p + taxAmount;

    setResults({ taxAmount, totalPrice });
  }

  function reset() {
    setPrice('');
    setTaxRate('');
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
                "name": "How do I calculate sales tax?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Multiply the item price by the tax rate expressed as a decimal. For example, a $50 item at 7% tax: $50 x 0.07 = $3.50 in tax, for a total of $53.50."
                }
              },
              {
                "@type": "Question",
                "name": "Which US states have no sales tax?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Five states have no statewide sales tax: Alaska, Delaware, Montana, New Hampshire, and Oregon. However, Alaska allows local municipalities to levy their own sales taxes."
                }
              },
              {
                "@type": "Question",
                "name": "Do I pay sales tax on online purchases?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "In most cases, yes. After the 2018 Supreme Court ruling in South Dakota v. Wayfair, states can require online retailers to collect sales tax even if they have no physical presence in the state."
                }
              },
              {
                "@type": "Question",
                "name": "What is the difference between sales tax and use tax?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sales tax is collected by the seller at the point of sale. Use tax is owed by the buyer when sales tax was not collected, such as purchases from out-of-state sellers. The rates are typically the same."
                }
              },
              {
                "@type": "Question",
                "name": "Can sales tax rates change within a state?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Most states have a base state rate, but cities and counties can add their own local taxes on top. This means the total tax rate can vary significantly even within the same state."
                }
              }
            ]
          })
        }}
      />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Sales Tax Calculator</h1>
      <p className="text-gray-600 mb-6">
        Calculate sales tax amount and total price for any purchase. Select a common US state rate or enter your own.
      </p>

      <AdPlacement format="leaderboard" />

      <div className="mt-8 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price ($)
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            placeholder="49.99"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tax Rate (%)
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {stateTaxRates.map((s) => (
              <button
                key={s.state}
                onClick={() => setTaxRate(String(s.rate))}
                className={`px-3 py-2 rounded-lg text-sm font-medium border transition ${
                  taxRate === String(s.rate)
                    ? 'bg-[#2563eb] text-white border-[#2563eb]'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {s.state} {s.rate}%
              </button>
            ))}
          </div>
          <input
            type="number"
            value={taxRate}
            onChange={(e) => setTaxRate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
            placeholder="7.25"
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
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Results</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-500">Pre-Tax Price</p>
              <p className="text-2xl font-bold text-gray-900">
                {fmt(parseFloat(price))}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tax Amount</p>
              <p className="text-2xl font-bold text-[#2563eb]">
                {fmt(results.taxAmount)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Price</p>
              <p className="text-2xl font-bold text-gray-900">
                {fmt(results.totalPrice)}
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
          What Is a Sales Tax Calculator?
        </h2>
        <p className="text-gray-600 mb-3">
          A sales tax calculator helps you determine exactly how much tax you&apos;ll pay on a purchase and what the final price will be. It&apos;s especially useful when shopping across state lines or budgeting for large purchases where the tax difference can be significant.
        </p>
        <p className="text-gray-600 mb-3">
          Sales tax in the United States varies dramatically by location. While some states like Oregon and Delaware charge no sales tax at all, others like California and Tennessee have rates above 7%. On top of state rates, many cities and counties add their own local taxes, making the actual rate you pay depend heavily on where you shop.
        </p>
        <p className="text-gray-600">
          This calculator lets you quickly enter any price and tax rate to see the exact tax amount and total cost. The quick-select buttons show base state rates for the most populated US states, so you can compare costs across different locations with a single click.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Frequently Asked Questions
        </h2>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          How do I calculate sales tax?
        </h3>
        <p className="text-gray-600 mb-4">
          Multiply the item price by the tax rate expressed as a decimal. For example, a $50 item at 7% tax: $50 &times; 0.07 = $3.50 in tax, for a total of $53.50. This calculator handles the math for you automatically.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          Which US states have no sales tax?
        </h3>
        <p className="text-gray-600 mb-4">
          Five states have no statewide sales tax: Alaska, Delaware, Montana, New Hampshire, and Oregon. However, Alaska allows local municipalities to levy their own sales taxes, so some Alaskan cities do charge a local rate.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          Do I pay sales tax on online purchases?
        </h3>
        <p className="text-gray-600 mb-4">
          In most cases, yes. After the 2018 Supreme Court ruling in South Dakota v. Wayfair, states can require online retailers to collect sales tax even if they have no physical presence in the state. Most major online retailers now collect sales tax based on the shipping address.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          What is the difference between sales tax and use tax?
        </h3>
        <p className="text-gray-600 mb-4">
          Sales tax is collected by the seller at the point of sale. Use tax is owed by the buyer when sales tax was not collected, such as purchases from out-of-state sellers. The rates are typically identical, but enforcement mechanisms differ.
        </p>

        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
          Can sales tax rates change within a state?
        </h3>
        <p className="text-gray-600">
          Yes. Most states have a base state rate, but cities and counties can add their own local taxes on top. For example, California&apos;s state rate is 7.25%, but the combined rate in Los Angeles can reach 10.25% with local additions. Always check the total combined rate for your specific location.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Example Calculation
        </h2>
        <p className="text-gray-600 mb-3">
          You&apos;re buying a laptop priced at $999.99 in Texas, where the state sales tax rate is 6.25%. Here&apos;s the breakdown:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-1 mb-3">
          <li>Pre-tax price: $999.99</li>
          <li>Tax rate: 6.25%</li>
          <li>Tax amount: $999.99 &times; 0.0625 = $62.50</li>
          <li>Total price: $1,062.49</li>
        </ul>
        <p className="text-gray-600">
          If you bought the same laptop in Oregon (0% sales tax), you&apos;d save $62.50. For big-ticket purchases, comparing tax rates across states can lead to meaningful savings.
        </p>
      </section>

      <section className="mt-8 pb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          Related Tools
        </h2>
        <ul className="space-y-1">
          <li><Link href="/tools/tip-calculator" className="text-[#2563eb] hover:underline">Tip Calculator</Link></li>
          <li><Link href="/tools/percentage-calculator" className="text-[#2563eb] hover:underline">Percentage Calculator</Link></li>
          <li><Link href="/tools/salary-to-hourly-converter" className="text-[#2563eb] hover:underline">Salary to Hourly Converter</Link></li>
          <li><Link href="/tools/net-worth-calculator" className="text-[#2563eb] hover:underline">Net Worth Calculator</Link></li>
        </ul>
      </section>
    </main>
  );
}
