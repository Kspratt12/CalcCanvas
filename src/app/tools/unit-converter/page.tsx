"use client";

import { useState } from "react";
import Link from "next/link";

const RELATED_TOOLS = [
  { name: "BMI Calculator", href: "/tools/bmi-calculator" },
  { name: "Percentage Calculator", href: "/tools/percentage-calculator" },
  { name: "Salary to Hourly Converter", href: "/tools/salary-to-hourly-converter" },
  { name: "Pace Calculator", href: "/tools/pace-calculator" },
];

type Category = "length" | "weight" | "temperature" | "volume" | "speed" | "area";

const units: Record<Category, { name: string; toBase: (v: number) => number; fromBase: (v: number) => number }[]> = {
  length: [
    { name: "Meters", toBase: (v) => v, fromBase: (v) => v },
    { name: "Kilometers", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    { name: "Centimeters", toBase: (v) => v / 100, fromBase: (v) => v * 100 },
    { name: "Millimeters", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    { name: "Miles", toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
    { name: "Yards", toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
    { name: "Feet", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
    { name: "Inches", toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
  ],
  weight: [
    { name: "Kilograms", toBase: (v) => v, fromBase: (v) => v },
    { name: "Grams", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    { name: "Milligrams", toBase: (v) => v / 1e6, fromBase: (v) => v * 1e6 },
    { name: "Pounds", toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
    { name: "Ounces", toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
    { name: "Metric Tons", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
  ],
  temperature: [
    { name: "Celsius", toBase: (v) => v, fromBase: (v) => v },
    { name: "Fahrenheit", toBase: (v) => (v - 32) * (5 / 9), fromBase: (v) => v * (9 / 5) + 32 },
    { name: "Kelvin", toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
  ],
  volume: [
    { name: "Liters", toBase: (v) => v, fromBase: (v) => v },
    { name: "Milliliters", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    { name: "Gallons (US)", toBase: (v) => v * 3.78541, fromBase: (v) => v / 3.78541 },
    { name: "Quarts (US)", toBase: (v) => v * 0.946353, fromBase: (v) => v / 0.946353 },
    { name: "Cups (US)", toBase: (v) => v * 0.236588, fromBase: (v) => v / 0.236588 },
    { name: "Fluid Ounces (US)", toBase: (v) => v * 0.0295735, fromBase: (v) => v / 0.0295735 },
    { name: "Tablespoons", toBase: (v) => v * 0.0147868, fromBase: (v) => v / 0.0147868 },
  ],
  speed: [
    { name: "m/s", toBase: (v) => v, fromBase: (v) => v },
    { name: "km/h", toBase: (v) => v / 3.6, fromBase: (v) => v * 3.6 },
    { name: "mph", toBase: (v) => v * 0.44704, fromBase: (v) => v / 0.44704 },
    { name: "knots", toBase: (v) => v * 0.514444, fromBase: (v) => v / 0.514444 },
    { name: "ft/s", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
  ],
  area: [
    { name: "sq meters", toBase: (v) => v, fromBase: (v) => v },
    { name: "sq kilometers", toBase: (v) => v * 1e6, fromBase: (v) => v / 1e6 },
    { name: "sq feet", toBase: (v) => v * 0.092903, fromBase: (v) => v / 0.092903 },
    { name: "sq yards", toBase: (v) => v * 0.836127, fromBase: (v) => v / 0.836127 },
    { name: "sq miles", toBase: (v) => v * 2.59e6, fromBase: (v) => v / 2.59e6 },
    { name: "Acres", toBase: (v) => v * 4046.86, fromBase: (v) => v / 4046.86 },
    { name: "Hectares", toBase: (v) => v * 10000, fromBase: (v) => v / 10000 },
  ],
};

const categoryLabels: Record<Category, string> = {
  length: "Length",
  weight: "Weight",
  temperature: "Temperature",
  volume: "Volume",
  speed: "Speed",
  area: "Area",
};

export default function UnitConverterPage() {
  const [category, setCategory] = useState<Category>("length");
  const [fromUnit, setFromUnit] = useState(0);
  const [toUnit, setToUnit] = useState(1);
  const [value, setValue] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const convert = () => {
    const num = parseFloat(value);
    if (isNaN(num)) return;

    const from = units[category][fromUnit];
    const to = units[category][toUnit];
    const baseValue = from.toBase(num);
    const converted = to.fromBase(baseValue);
    setResult(
      (Math.round(converted * 1000000) / 1000000).toString()
    );
  };

  const swap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setResult(null);
  };

  const handleCategoryChange = (cat: Category) => {
    setCategory(cat);
    setFromUnit(0);
    setToUnit(1);
    setValue("");
    setResult(null);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What unit categories does this converter support?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "This converter supports six categories: Length (meters, km, miles, feet, inches), Weight (kg, grams, pounds, ounces), Temperature (Celsius, Fahrenheit, Kelvin), Volume (liters, gallons, cups), Speed (m/s, km/h, mph, knots), and Area (sq meters, sq feet, acres, hectares)."
                }
              },
              {
                "@type": "Question",
                "name": "How accurate are the conversions?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Results are rounded to 6 decimal places, which provides more than enough precision for everyday use. The conversion factors used are the standard internationally recognized values."
                }
              },
              {
                "@type": "Question",
                "name": "How does temperature conversion work differently from other units?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Temperature conversions use formulas rather than simple multiplication. Fahrenheit to Celsius uses (F-32) x 5/9, while Kelvin is Celsius + 273.15. Other unit types use straightforward multiplication factors."
                }
              },
              {
                "@type": "Question",
                "name": "Can I swap the conversion direction?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Click the \"Swap\" button to instantly reverse the \"From\" and \"To\" units. This lets you quickly convert in the opposite direction without manually changing the dropdowns."
                }
              }
            ]
          })
        }}
      />
      <h1 className="text-3xl font-bold mb-2">Unit Converter</h1>
      <p className="text-gray-600 mb-6">
        Convert between units of length, weight, temperature, volume, speed, and area.
      </p>

      <div className="w-full max-w-[728px] h-[90px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm mx-auto mb-8 rounded">
        Advertisement
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(Object.keys(units) as Category[]).map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                category === cat
                  ? "bg-[#2563eb] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
            <select
              value={fromUnit}
              onChange={(e) => { setFromUnit(parseInt(e.target.value)); setResult(null); }}
              className="w-full border border-gray-300 rounded-lg p-3 mb-2 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
            >
              {units[category].map((u, i) => (
                <option key={u.name} value={i}>{u.name}</option>
              ))}
            </select>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
              placeholder="Enter value"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
            <select
              value={toUnit}
              onChange={(e) => { setToUnit(parseInt(e.target.value)); setResult(null); }}
              className="w-full border border-gray-300 rounded-lg p-3 mb-2 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
            >
              {units[category].map((u, i) => (
                <option key={u.name} value={i}>{u.name}</option>
              ))}
            </select>
            {result !== null && (
              <div className="w-full border border-blue-200 bg-blue-50 rounded-lg p-3 text-lg font-semibold text-[#2563eb]">
                {result}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={convert}
            className="flex-1 bg-[#2563eb] text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Convert
          </button>
          <button
            onClick={swap}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
          >
            Swap
          </button>
        </div>
      </div>

      <div className="w-[300px] h-[250px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm mx-auto mt-8 rounded">
        Advertisement
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">How to Use</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Select a category (length, weight, temperature, etc.).</li>
          <li>Choose your &quot;From&quot; and &quot;To&quot; units.</li>
          <li>Enter a value and click &quot;Convert&quot;.</li>
          <li>Use &quot;Swap&quot; to quickly reverse the conversion direction.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Supported Categories</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Length</strong> — meters, km, miles, feet, inches, and more.</li>
          <li><strong>Weight</strong> — kg, grams, pounds, ounces, metric tons.</li>
          <li><strong>Temperature</strong> — Celsius, Fahrenheit, Kelvin.</li>
          <li><strong>Volume</strong> — liters, gallons, cups, fluid ounces.</li>
          <li><strong>Speed</strong> — m/s, km/h, mph, knots.</li>
          <li><strong>Area</strong> — sq meters, sq feet, acres, hectares.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">What Is a Unit Converter?</h2>
        <p className="text-gray-700 mb-3">
          A unit converter translates a measurement from one unit to another within the same category. For example, converting 5 miles to kilometers or 72 degrees Fahrenheit to Celsius. While the underlying quantity stays the same, different regions, industries, and applications use different units to express it.
        </p>
        <p className="text-gray-700 mb-3">
          The metric system (meters, kilograms, liters) is used by most of the world, while the imperial system (feet, pounds, gallons) remains standard in the United States and a few other countries. Scientists often work in SI units, cooks use cups and tablespoons, and sailors measure speed in knots. A reliable converter bridges all these systems instantly.
        </p>
        <p className="text-gray-700">
          This tool covers six major categories: length, weight, temperature, volume, speed, and area. Each conversion uses precise mathematical ratios (or formulas, in the case of temperature) to give you accurate results to six decimal places. All calculations run locally in your browser.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Frequently Asked Questions</h2>

        <h3 className="text-lg font-medium mt-4 mb-2">How accurate are these conversions?</h3>
        <p className="text-gray-700 mb-3">
          The conversions use standard mathematical ratios defined by international measurement standards. Results are rounded to six decimal places, which is more than sufficient for everyday use. For scientific applications requiring extreme precision, you may want to verify against NIST or ISO reference values.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Why does temperature conversion use a formula instead of a ratio?</h3>
        <p className="text-gray-700 mb-3">
          Unlike length or weight where zero means &quot;nothing,&quot; temperature scales have different zero points. Zero degrees Celsius is 32 degrees Fahrenheit and 273.15 Kelvin. Because the starting points differ, you need a formula (with both multiplication and addition) rather than a simple ratio.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">What is the difference between US and Imperial gallons?</h3>
        <p className="text-gray-700 mb-3">
          A US gallon is approximately 3.785 liters, while an Imperial (UK) gallon is approximately 4.546 liters. This tool uses US gallons, which is the more common standard in online references. If you need Imperial gallon conversions, multiply the US gallon result by 0.832.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Can I convert between categories (like length to weight)?</h3>
        <p className="text-gray-700 mb-3">
          No. Length, weight, temperature, and other categories measure fundamentally different physical quantities. You can only convert between units within the same category — for example, meters to feet (both length) or pounds to kilograms (both weight).
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">What does the &quot;Swap&quot; button do?</h3>
        <p className="text-gray-700 mb-3">
          The Swap button reverses the &quot;From&quot; and &quot;To&quot; units. If you were converting meters to feet, clicking Swap changes it to feet to meters. This is a quick way to do the reverse conversion without manually changing both dropdown menus.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Common Use Cases</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Cooking and recipes</strong> — Convert between cups, tablespoons, milliliters, and fluid ounces when following recipes from different countries.</li>
          <li><strong>Travel</strong> — Convert miles to kilometers, Fahrenheit to Celsius, or pounds to kilograms when visiting countries that use different units.</li>
          <li><strong>Fitness and health</strong> — Switch between pounds and kilograms for weight tracking, or miles and kilometers for running distances.</li>
          <li><strong>Home improvement</strong> — Convert between feet, inches, meters, and centimeters when working with building materials or furniture dimensions.</li>
          <li><strong>Science and engineering</strong> — Convert SI units to imperial or vice versa when working with specifications, data sheets, or research papers.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Related Tools</h2>
        <div className="flex flex-wrap gap-3">
          {RELATED_TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="px-4 py-2 bg-blue-50 text-[#2563eb] rounded-lg hover:bg-blue-100 transition text-sm font-medium"
            >
              {tool.name}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
