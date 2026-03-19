import ToolCard from "@/components/ToolCard";
import AdPlacement from "@/components/AdPlacement";
import SearchBar from "@/components/SearchBar";

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
  {
    name: "Financial Calculators",
    emoji: "\uD83D\uDCB0",
    slug: "financial",
  },
  {
    name: "Health & Fitness",
    emoji: "\uD83D\uDCAA",
    slug: "health",
  },
  {
    name: "Math Calculators",
    emoji: "\uD83D\uDCD0",
    slug: "math",
  },
  {
    name: "Text Tools",
    emoji: "\u270F\uFE0F",
    slug: "text",
  },
  {
    name: "Developer Tools",
    emoji: "\uD83D\uDCBB",
    slug: "developer",
  },
  {
    name: "Everyday Tools",
    emoji: "\uD83D\uDD27",
    slug: "everyday",
  },
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

  // Health & Fitness
  { title: "BMI Calculator", description: "Calculate your Body Mass Index and see where you stand.", href: "/tools/bmi-calculator", icon: "\u2696\uFE0F", category: "Health & Fitness" },
  { title: "Calorie Calculator", description: "Estimate daily calorie needs based on your activity level.", href: "/tools/calorie-calculator", icon: "\uD83C\uDF4E", category: "Health & Fitness" },
  { title: "Body Fat Calculator", description: "Estimate your body fat percentage using simple measurements.", href: "/tools/body-fat-calculator", icon: "\uD83D\uDCCF", category: "Health & Fitness" },
  { title: "Ideal Weight Calculator", description: "Find your ideal weight range based on height and frame.", href: "/tools/ideal-weight-calculator", icon: "\uD83C\uDFAF", category: "Health & Fitness" },
  { title: "BMR Calculator", description: "Calculate your Basal Metabolic Rate to understand resting calorie burn.", href: "/tools/bmr-calculator", icon: "\uD83D\uDD25", category: "Health & Fitness" },
  { title: "Pace Calculator", description: "Calculate running or walking pace, time, and distance.", href: "/tools/pace-calculator", icon: "\uD83C\uDFC3", category: "Health & Fitness" },

  // Math
  { title: "Percentage Calculator", description: "Calculate percentages, percentage change, and more.", href: "/tools/percentage-calculator", icon: "\uFF05", category: "Math Calculators" },
  { title: "Fraction Calculator", description: "Add, subtract, multiply, and divide fractions easily.", href: "/tools/fraction-calculator", icon: "\u00BD", category: "Math Calculators" },
  { title: "Random Number Generator", description: "Generate random numbers within any range you specify.", href: "/tools/random-number-generator", icon: "\uD83C\uDFB2", category: "Math Calculators" },
  { title: "Standard Deviation Calculator", description: "Calculate standard deviation, variance, and mean of a data set.", href: "/tools/standard-deviation-calculator", icon: "\uD83D\uDCC9", category: "Math Calculators" },
  { title: "Average Calculator", description: "Find the mean, median, and mode of a set of numbers.", href: "/tools/average-calculator", icon: "\u2795", category: "Math Calculators" },
  { title: "Square Root Calculator", description: "Calculate square roots instantly for any number.", href: "/tools/square-root-calculator", icon: "\u221A", category: "Math Calculators" },

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
];

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-white py-16 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Free Online Calculators &amp; Tools
          </h1>
          <p className="mt-4 text-lg text-slate-500">
            Fast, accurate, and easy-to-use tools for finance, health, math, and
            more.
          </p>
          <div className="mt-8">
            <SearchBar tools={tools} />
          </div>
        </div>
      </section>

      {/* Tool categories */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {categories.map((cat, i) => {
          const catTools = tools.filter((t) => t.category === cat.name);
          return (
            <div key={cat.slug} id={cat.slug}>
              <div className="mb-6 mt-10 first:mt-0">
                <h2 className="text-2xl font-bold text-slate-900">
                  <span className="mr-2">{cat.emoji}</span>
                  {cat.name}
                </h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

      {/* SEO text block */}
      <section className="border-t border-slate-200 bg-slate-50 py-12">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-xl font-semibold text-slate-900">
            Why CalcCanvas?
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-500">
            CalcCanvas provides a growing library of free online calculators and
            tools designed for everyday use. Whether you need to crunch numbers
            for a mortgage, track your fitness goals, format JSON, or generate a
            secure password, CalcCanvas has you covered. Every tool is built to
            be fast, mobile-friendly, and accurate — no sign-up or download
            required. Bookmark us and come back anytime you need a quick
            calculation.
          </p>
        </div>
      </section>
    </div>
  );
}
