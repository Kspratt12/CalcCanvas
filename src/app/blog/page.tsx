import Link from "next/link";

const posts = [
  {
    slug: "how-mortgage-interest-works",
    title: "How Mortgage Interest Works: A Complete Guide for Homebuyers",
    description:
      "Understand fixed vs adjustable rates, how amortization works, APR vs interest rate, and practical ways to save thousands on interest.",
    date: "2025-06-15",
  },
  {
    slug: "compound-interest-explained",
    title: "Compound Interest Explained: How Your Money Grows Over Time",
    description:
      "Learn the difference between simple and compound interest, the Rule of 72, compounding frequency, and see real growth examples.",
    date: "2025-06-12",
  },
  {
    slug: "what-is-bmi",
    title: "What Is BMI and How Is It Calculated?",
    description:
      "Everything you need to know about Body Mass Index: the formula, weight categories, limitations, and better alternatives.",
    date: "2025-06-10",
  },
  {
    slug: "how-to-calculate-calories",
    title: "How to Calculate Your Daily Calorie Needs",
    description:
      "A practical guide to TDEE, BMR, activity multipliers, and calorie deficits or surpluses for weight management.",
    date: "2025-06-08",
  },
  {
    slug: "percentage-calculation-guide",
    title: "How to Calculate Percentages: The Complete Guide",
    description:
      "Master percentage calculations with clear examples: percentage of a number, percentage change, tips, discounts, and more.",
    date: "2025-06-05",
  },
  {
    slug: "salary-vs-hourly-which-is-better",
    title: "Salary vs Hourly: Which Pays Better?",
    description:
      "Compare salary and hourly pay side by side. Learn the conversion method, benefits trade-offs, overtime rules, and tax differences.",
    date: "2025-06-03",
  },
  {
    slug: "how-much-to-save-for-retirement",
    title: "How Much Should You Save for Retirement?",
    description:
      "A simple guide to retirement savings targets, the 4% rule, age-based milestones, and how compound growth works in your favor.",
    date: "2025-05-30",
  },
  {
    slug: "standard-deviation-explained",
    title: "Standard Deviation Explained Simply",
    description:
      "What standard deviation measures, how to calculate it step by step, population vs sample, and real-world interpretation.",
    date: "2025-05-28",
  },
  {
    slug: "body-fat-percentage-guide",
    title: "Body Fat Percentage: What&apos;s Healthy and How to Measure It",
    description:
      "Healthy body fat ranges by age and sex, measurement methods compared, and why body fat percentage matters more than weight alone.",
    date: "2025-05-25",
  },
  {
    slug: "json-formatting-guide",
    title: "JSON Formatting Guide: How to Read, Write, and Validate JSON",
    description:
      "A developer-friendly guide to JSON syntax, common errors, pretty printing, validation techniques, and useful tools.",
    date: "2025-05-22",
  },
];

export default function BlogIndex() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900">Blog</h1>
      <p className="mt-3 text-sm leading-7 text-slate-600">
        Guides, tutorials, and tips to help you get the most out of CalcCanvas
        tools.
      </p>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-primary hover:shadow-md"
          >
            <time className="text-xs font-medium text-slate-400">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <h2 className="mt-2 text-lg font-semibold text-slate-900 group-hover:text-primary">
              {post.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              {post.description}
            </p>
            <span className="mt-4 inline-block text-sm font-medium text-primary">
              Read more &rarr;
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
