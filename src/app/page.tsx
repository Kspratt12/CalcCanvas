import ToolCard from "@/components/ToolCard";
import AdPlacement from "@/components/AdPlacement";
import SearchBar from "@/components/SearchBar";
import Calculator from "@/components/Calculator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CalcCanvas — Free Online Calculator | Finance, Health, Math Tools",
  description:
    "Free online calculator with 47 tools for finance, health, math, text, and development. Use our scientific calculator, mortgage calculator, BMI calculator, and more — no sign-up required.",
  keywords: "online calculator, free calculator, scientific calculator, mortgage calculator, BMI calculator, percentage calculator, word counter, JSON formatter, unit converter, compound interest calculator",
};

/* ------------------------------------------------------------------ */
/*  Tool data                                                         */
/* ------------------------------------------------------------------ */

interface Tool {
  title: string;
  description: string;
  href: string;
  icon: string;
  category: string;
}

const categories = [
  { name: "Financial Calculators", slug: "financial", desc: "Mortgage, loans, interest, retirement, and salary tools" },
  { name: "Health & Fitness", slug: "health", desc: "BMI, calories, body fat, ideal weight, and pace tools" },
  { name: "Math Calculators", slug: "math", desc: "Percentages, fractions, averages, and statistics tools" },
  { name: "Text Tools", slug: "text", desc: "Word counter, case converter, lorem ipsum, and slug tools" },
  { name: "Developer Tools", slug: "developer", desc: "JSON formatter, Base64, passwords, UUIDs, and hashes" },
  { name: "Everyday Tools", slug: "everyday", desc: "Age, date, countdown, QR codes, and unit conversion" },
];

const tools: Tool[] = [
  // Financial
  { title: "Mortgage Calculator", description: "Estimate monthly mortgage payments, interest, and amortization schedules.", href: "/tools/mortgage-calculator", icon: "\uD83C\uDFE0", category: "Financial Calculators" },
  { title: "Compound Interest Calculator", description: "See how your investments grow over time with compound interest.", href: "/tools/compound-interest-calculator", icon: "\uD83D\uDCC8", category: "Financial Calculators" },
  { title: "Salary to Hourly Converter", description: "Convert annual salary to hourly rate and vice versa.", href: "/tools/salary-to-hourly-converter", icon: "\uD83D\uDCB5", category: "Financial Calculators" },
  { title: "Tip Calculator", description: "Quickly calculate tips and split the bill between friends.", href: "/tools/tip-calculator", icon: "\uD83E\uDDFE", category: "Financial Calculators" },
  { title: "Loan Payoff Calculator", description: "Find out how long it takes to pay off a loan with extra payments.", href: "/tools/loan-payoff-calculator", icon: "\uD83C\uDFE6", category: "Financial Calculators" },
  { title: "Auto Loan Calculator", description: "Estimate monthly car payments and total interest costs.", href: "/tools/auto-loan-calculator", icon: "\uD83D\uDE97", category: "Financial Calculators" },
  { title: "Retirement Calculator", description: "Plan your retirement savings and see if you are on track.", href: "/tools/retirement-calculator", icon: "\uD83C\uDFD6\uFE0F", category: "Financial Calculators" },
  { title: "Net Worth Calculator", description: "Calculate your total net worth by listing assets and liabilities.", href: "/tools/net-worth-calculator", icon: "\uD83D\uDCCA", category: "Financial Calculators" },
  { title: "Sales Tax Calculator", description: "Calculate sales tax and total price for any US state.", href: "/tools/sales-tax-calculator", icon: "\uD83D\uDCB2", category: "Financial Calculators" },
  { title: "Income Tax Calculator", description: "Estimate your 2024 federal income tax and take-home pay.", href: "/tools/income-tax-calculator", icon: "\uD83C\uDFDB\uFE0F", category: "Financial Calculators" },
  { title: "Investment Calculator", description: "Calculate future value of investments with monthly contributions.", href: "/tools/investment-calculator", icon: "\uD83D\uDCB9", category: "Financial Calculators" },
  { title: "Inflation Calculator", description: "See how inflation affects purchasing power over time.", href: "/tools/inflation-calculator", icon: "\uD83D\uDCC0", category: "Financial Calculators" },

  // Health & Fitness
  { title: "BMI Calculator", description: "Calculate your Body Mass Index and see where you stand.", href: "/tools/bmi-calculator", icon: "\u2696\uFE0F", category: "Health & Fitness" },
  { title: "Calorie Calculator", description: "Estimate daily calorie needs based on your activity level.", href: "/tools/calorie-calculator", icon: "\uD83C\uDF4E", category: "Health & Fitness" },
  { title: "Body Fat Calculator", description: "Estimate your body fat percentage using simple measurements.", href: "/tools/body-fat-calculator", icon: "\uD83D\uDCCF", category: "Health & Fitness" },
  { title: "Ideal Weight Calculator", description: "Find your ideal weight range based on height and frame.", href: "/tools/ideal-weight-calculator", icon: "\uD83C\uDFAF", category: "Health & Fitness" },
  { title: "BMR Calculator", description: "Calculate your Basal Metabolic Rate to understand resting calorie burn.", href: "/tools/bmr-calculator", icon: "\uD83D\uDD25", category: "Health & Fitness" },
  { title: "Pace Calculator", description: "Calculate running or walking pace, time, and distance.", href: "/tools/pace-calculator", icon: "\uD83C\uDFC3", category: "Health & Fitness" },
  { title: "Due Date Calculator", description: "Calculate your estimated due date and pregnancy timeline.", href: "/tools/due-date-calculator", icon: "\uD83D\uDC76", category: "Health & Fitness" },

  // Math
  { title: "Percentage Calculator", description: "Calculate percentages, percentage change, and more.", href: "/tools/percentage-calculator", icon: "\uFF05", category: "Math Calculators" },
  { title: "Fraction Calculator", description: "Add, subtract, multiply, and divide fractions easily.", href: "/tools/fraction-calculator", icon: "\u00BD", category: "Math Calculators" },
  { title: "Random Number Generator", description: "Generate random numbers within any range you specify.", href: "/tools/random-number-generator", icon: "\uD83C\uDFB2", category: "Math Calculators" },
  { title: "Standard Deviation Calculator", description: "Calculate standard deviation, variance, and mean of a data set.", href: "/tools/standard-deviation-calculator", icon: "\uD83D\uDCC9", category: "Math Calculators" },
  { title: "Average Calculator", description: "Find the mean, median, and mode of a set of numbers.", href: "/tools/average-calculator", icon: "\u2795", category: "Math Calculators" },
  { title: "Square Root Calculator", description: "Calculate square roots instantly for any number.", href: "/tools/square-root-calculator", icon: "\u221A", category: "Math Calculators" },
  { title: "Scientific Calculator", description: "Full scientific calculator with trig, logs, and advanced functions.", href: "/tools/scientific-calculator", icon: "\uD83E\uDDEE", category: "Math Calculators" },
  { title: "GPA Calculator", description: "Calculate your weighted GPA on a 4.0 scale.", href: "/tools/gpa-calculator", icon: "\uD83C\uDF93", category: "Math Calculators" },
  { title: "Grade Calculator", description: "Calculate weighted grades and what you need on your final.", href: "/tools/grade-calculator", icon: "\uD83D\uDCDD", category: "Math Calculators" },

  // Text Tools
  { title: "Word Counter", description: "Count words, characters, sentences, and paragraphs in your text.", href: "/tools/word-counter", icon: "\uD83D\uDCDD", category: "Text Tools" },
  { title: "Character Counter", description: "Count characters with and without spaces in real time.", href: "/tools/character-counter", icon: "\uD83D\uDD24", category: "Text Tools" },
  { title: "Lorem Ipsum Generator", description: "Generate placeholder text for your designs and layouts.", href: "/tools/lorem-ipsum-generator", icon: "\uD83D\uDCC4", category: "Text Tools" },
  { title: "Case Converter", description: "Convert text between uppercase, lowercase, title case, and more.", href: "/tools/case-converter", icon: "\uD83D\uDD20", category: "Text Tools" },
  { title: "Slug Generator", description: "Convert any text into a URL-friendly slug.", href: "/tools/slug-generator", icon: "\uD83D\uDD17", category: "Text Tools" },
  { title: "Text Repeater", description: "Repeat any text string a specified number of times.", href: "/tools/text-repeater", icon: "\uD83D\uDD01", category: "Text Tools" },

  // Developer Tools
  { title: "JSON Formatter", description: "Format, validate, and beautify JSON data instantly.", href: "/tools/json-formatter", icon: "\uD83D\uDCC2", category: "Developer Tools" },
  { title: "Base64 Encoder/Decoder", description: "Encode or decode strings and files using Base64.", href: "/tools/base64-encoder-decoder", icon: "\uD83D\uDD10", category: "Developer Tools" },
  { title: "Color Hex to RGB", description: "Convert color values between Hex, RGB, and HSL formats.", href: "/tools/color-hex-to-rgb", icon: "\uD83C\uDFA8", category: "Developer Tools" },
  { title: "Password Generator", description: "Generate strong, secure, random passwords.", href: "/tools/password-generator", icon: "\uD83D\uDD12", category: "Developer Tools" },
  { title: "UUID Generator", description: "Generate universally unique identifiers (UUIDs) instantly.", href: "/tools/uuid-generator", icon: "\uD83C\uDD94", category: "Developer Tools" },
  { title: "Hash Generator", description: "Generate MD5, SHA-1, SHA-256, and other hash values.", href: "/tools/hash-generator", icon: "#\uFE0F\u20E3", category: "Developer Tools" },

  // Everyday Tools
  { title: "Age Calculator", description: "Calculate your exact age in years, months, and days.", href: "/tools/age-calculator", icon: "\uD83C\uDF82", category: "Everyday Tools" },
  { title: "Date Calculator", description: "Find the difference between two dates or add/subtract days.", href: "/tools/date-calculator", icon: "\uD83D\uDCC5", category: "Everyday Tools" },
  { title: "Countdown Timer", description: "Set a countdown to any future date or event.", href: "/tools/countdown-timer", icon: "\u23F3", category: "Everyday Tools" },
  { title: "QR Code Generator", description: "Create QR codes for URLs, text, and contact info.", href: "/tools/qr-code-generator", icon: "\uD83D\uDCF1", category: "Everyday Tools" },
  { title: "Unit Converter", description: "Convert between units of length, weight, temperature, and more.", href: "/tools/unit-converter", icon: "\uD83D\uDD04", category: "Everyday Tools" },
  { title: "Time Calculator", description: "Add or subtract time, or find the duration between two times.", href: "/tools/time-calculator", icon: "\u23F0", category: "Everyday Tools" },
  { title: "Hours Calculator", description: "Calculate hours worked and pay from your weekly timesheet.", href: "/tools/hours-calculator", icon: "\uD83D\uDD52", category: "Everyday Tools" },
];

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <div>
      {/* Hero with Calculator */}
      <section className="bg-gradient-to-b from-white to-slate-50 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
            {/* Left: Title + Search */}
            <div className="text-center lg:text-left lg:pt-8">
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                Free Online Calculator
              </h1>
              <p className="mt-4 text-lg text-slate-500">
                Use our calculator below or explore 47 specialized tools for
                finance, health, math, text, and development. Fast, accurate, and
                private — all calculations happen in your browser.
              </p>
              <div className="mt-8 max-w-xl mx-auto lg:mx-0">
                <SearchBar tools={tools} />
              </div>
              <div className="mt-6 flex flex-wrap gap-3 justify-center lg:justify-start">
                <a href="#financial" className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:border-[#2563eb] hover:text-[#2563eb] transition">Financial</a>
                <a href="#health" className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:border-[#2563eb] hover:text-[#2563eb] transition">Health</a>
                <a href="#math" className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:border-[#2563eb] hover:text-[#2563eb] transition">Math</a>
                <a href="#text" className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:border-[#2563eb] hover:text-[#2563eb] transition">Text</a>
                <a href="#developer" className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:border-[#2563eb] hover:text-[#2563eb] transition">Developer</a>
                <a href="#everyday" className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:border-[#2563eb] hover:text-[#2563eb] transition">Everyday</a>
              </div>
            </div>

            {/* Right: Calculator Widget */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-lg p-5 sm:p-6">
              <Calculator />
            </div>
          </div>
        </div>
      </section>

      {/* Social proof bar */}
      <section className="border-y border-slate-200 bg-white py-6">
        <div className="mx-auto max-w-5xl px-4 flex flex-wrap items-center justify-center gap-8 sm:gap-12 text-center">
          <div>
            <div className="text-2xl font-bold text-slate-900">47+</div>
            <div className="text-xs text-slate-500 mt-1">Free Tools</div>
          </div>
          <div className="h-8 w-px bg-slate-200 hidden sm:block" />
          <div>
            <div className="text-2xl font-bold text-slate-900">6</div>
            <div className="text-xs text-slate-500 mt-1">Categories</div>
          </div>
          <div className="h-8 w-px bg-slate-200 hidden sm:block" />
          <div>
            <div className="text-2xl font-bold text-slate-900">100%</div>
            <div className="text-xs text-slate-500 mt-1">Free &amp; Private</div>
          </div>
          <div className="h-8 w-px bg-slate-200 hidden sm:block" />
          <div>
            <div className="text-2xl font-bold text-slate-900">0</div>
            <div className="text-xs text-slate-500 mt-1">Data Stored</div>
          </div>
          <div className="h-8 w-px bg-slate-200 hidden sm:block" />
          <div>
            <div className="text-2xl font-bold text-slate-900">Instant</div>
            <div className="text-xs text-slate-500 mt-1">Results</div>
          </div>
        </div>
      </section>

      {/* Popular Tools */}
      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900">Most Popular Tools</h2>
        <p className="mt-1 text-sm text-slate-500">Our most-used calculators and tools</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {[
            { title: "Mortgage Calculator", href: "/tools/mortgage-calculator", icon: "\uD83C\uDFE0" },
            { title: "BMI Calculator", href: "/tools/bmi-calculator", icon: "\u2696\uFE0F" },
            { title: "Percentage Calculator", href: "/tools/percentage-calculator", icon: "\uFF05" },
            { title: "Word Counter", href: "/tools/word-counter", icon: "\uD83D\uDCDD" },
            { title: "JSON Formatter", href: "/tools/json-formatter", icon: "\uD83D\uDCC2" },
            { title: "Unit Converter", href: "/tools/unit-converter", icon: "\uD83D\uDD04" },
          ].map((tool) => (
            <a
              key={tool.href}
              href={tool.href}
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 hover:border-[#2563eb]/30 hover:shadow-md transition"
            >
              <span className="text-2xl">{tool.icon}</span>
              <span className="text-sm font-semibold text-slate-900">{tool.title}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Tool categories */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {categories.map((cat, i) => {
          const catTools = tools.filter((t) => t.category === cat.name);
          return (
            <div key={cat.slug} id={cat.slug} className={i > 0 ? "pt-16" : ""}>
              <div className="mb-8 border-b border-slate-200 pb-6">
                <h2 className="text-2xl font-bold text-slate-900">
                  {cat.name}
                </h2>
                <p className="mt-2 text-sm text-slate-500">{cat.desc}</p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {catTools.map((tool) => (
                  <ToolCard
                    key={tool.href}
                    title={tool.title}
                    description={tool.description}
                    href={tool.href}
                    category={tool.category}
                    icon={tool.icon}
                  />
                ))}
              </div>

              {/* Ad between sections (skip after last) */}
              {i < categories.length - 1 && (
                <AdPlacement
                  slot={`home-${cat.slug}`}
                  format="rectangle"
                />
              )}
            </div>
          );
        })}
      </section>

      {/* SEO content — Why CalcCanvas */}
      <section className="border-t border-slate-200 bg-slate-50 py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-bold text-slate-900 text-center">
            Why Use CalcCanvas?
          </h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">100% Free, No Sign-Up</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Every calculator and tool on CalcCanvas is completely free to use.
                There are no accounts to create, no subscriptions, and no hidden
                fees. Just open the tool you need and start calculating.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Private &amp; Secure</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                All calculations happen directly in your browser. Your data is
                never sent to a server, never stored, and never shared with
                anyone. What you type stays on your device.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Fast &amp; Mobile-Friendly</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                CalcCanvas is built for speed. Pages load instantly with no
                bloated scripts or pop-ups. Every tool is fully responsive and
                works just as well on your phone as it does on your desktop.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Accurate Formulas</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Our financial calculators use standard amortization and compound
                interest formulas. Health tools follow established BMI, BMR, and
                body fat equations. Every tool is built with accuracy in mind.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">37 Tools in One Place</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                From mortgage payments and retirement planning to JSON formatting
                and password generation, CalcCanvas covers six categories of tools
                that people actually use every day.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">No Ads That Block Your Work</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Unlike many calculator sites, CalcCanvas keeps advertisements
                minimal and out of the way. You will never see a pop-up, overlay,
                or auto-playing video interrupting your calculation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO content — How it works */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-bold text-slate-900 text-center">
            How CalcCanvas Works
          </h2>
          <p className="mt-4 text-center text-sm leading-7 text-slate-500 max-w-2xl mx-auto">
            Using any CalcCanvas tool takes just a few seconds. Pick a category,
            open the tool, enter your numbers, and get instant results. Here is
            what makes each category useful:
          </p>
          <div className="mt-10 space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Financial Calculators</h3>
              <p className="mt-2 text-sm leading-7 text-slate-500">
                Planning a home purchase? Our mortgage calculator breaks down
                monthly payments, total interest, and overall loan cost using the
                standard amortization formula. The compound interest calculator
                shows how your savings or investments grow over time. Need to
                compare job offers? The salary-to-hourly converter makes it easy
                to see what you actually earn per hour. Other tools cover auto
                loans, loan payoff timelines, retirement savings projections, tip
                splitting, and net worth tracking.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Health &amp; Fitness Calculators</h3>
              <p className="mt-2 text-sm leading-7 text-slate-500">
                The BMI calculator tells you whether your weight is in a healthy
                range for your height, using the standard Body Mass Index formula.
                Our calorie calculator estimates your daily energy needs based on
                your age, sex, weight, height, and activity level. Additional
                tools calculate body fat percentage, ideal weight ranges, basal
                metabolic rate (BMR), and running or walking pace.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Math, Text &amp; Developer Tools</h3>
              <p className="mt-2 text-sm leading-7 text-slate-500">
                Students and professionals use our percentage, fraction, average,
                and standard deviation calculators for quick math. Writers rely on
                the word counter and case converter for content editing. Developers
                use the JSON formatter, Base64 encoder, hash generator, and
                password generator daily. Every tool processes your data locally in
                the browser — nothing is uploaded or stored.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ section for homepage SEO */}
      <section className="border-t border-slate-200 bg-slate-50 py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-2xl font-bold text-slate-900 text-center">
            Frequently Asked Questions
          </h2>
          <div className="mt-10 space-y-8">
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                Is CalcCanvas really free?
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-500">
                Yes. Every tool on CalcCanvas is 100% free with no account
                required. We support the site through non-intrusive advertising,
                so you never have to pay for access to any calculator or utility.
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                Is my data safe when I use these tools?
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-500">
                Absolutely. All calculations are performed directly in your web
                browser using JavaScript. Your inputs are never sent to our
                servers or stored anywhere. Once you close the page, your data is
                gone.
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                How accurate are the calculators?
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-500">
                Our tools use industry-standard formulas. Financial calculators
                use the same amortization and compound interest equations used by
                banks. Health calculators follow WHO and medical guidelines.
                However, results are estimates and should not replace professional
                financial or medical advice.
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                Do I need to download anything?
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-500">
                No. CalcCanvas runs entirely in your web browser. There is nothing
                to install or download. Just visit the site, pick a tool, and
                start using it on any device — desktop, tablet, or phone.
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                Can I use CalcCanvas on my phone?
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-500">
                Yes. Every tool is fully responsive and designed to work on mobile
                devices. The layout adapts to smaller screens, so you get the same
                functionality whether you are on a phone, tablet, or computer.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
