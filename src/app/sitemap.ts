import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://calccanvas.com";

  const toolSlugs = [
    "age-calculator",
    "auto-loan-calculator",
    "average-calculator",
    "base64-encoder-decoder",
    "bmi-calculator",
    "bmr-calculator",
    "body-fat-calculator",
    "calorie-calculator",
    "case-converter",
    "character-counter",
    "color-hex-to-rgb",
    "compound-interest-calculator",
    "countdown-timer",
    "date-calculator",
    "fraction-calculator",
    "hash-generator",
    "ideal-weight-calculator",
    "json-formatter",
    "loan-payoff-calculator",
    "lorem-ipsum-generator",
    "mortgage-calculator",
    "net-worth-calculator",
    "pace-calculator",
    "password-generator",
    "percentage-calculator",
    "qr-code-generator",
    "random-number-generator",
    "retirement-calculator",
    "salary-to-hourly-converter",
    "slug-generator",
    "square-root-calculator",
    "standard-deviation-calculator",
    "text-repeater",
    "tip-calculator",
    "unit-converter",
    "uuid-generator",
    "word-counter",
    "sales-tax-calculator",
    "gpa-calculator",
    "grade-calculator",
    "due-date-calculator",
    "time-calculator",
    "hours-calculator",
    "scientific-calculator",
    "inflation-calculator",
    "investment-calculator",
    "income-tax-calculator",
  ];

  const toolPages: MetadataRoute.Sitemap = toolSlugs.map((slug) => ({
    url: `${baseUrl}/tools/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogSlugs = [
    "how-mortgage-interest-works",
    "compound-interest-explained",
    "what-is-bmi",
    "how-to-calculate-calories",
    "percentage-calculation-guide",
    "salary-vs-hourly-which-is-better",
    "how-much-to-save-for-retirement",
    "standard-deviation-explained",
    "body-fat-percentage-guide",
    "json-formatting-guide",
  ];

  const blogPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...blogSlugs.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...toolPages,
    ...blogPages,
    ...staticPages,
  ];
}
