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
    "random-number-generator",
    "retirement-calculator",
    "salary-to-hourly-converter",
    "slug-generator",
    "text-repeater",
    "tip-calculator",
    "uuid-generator",
    "word-counter",
  ];

  const toolPages: MetadataRoute.Sitemap = toolSlugs.map((slug) => ({
    url: `${baseUrl}/tools/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...toolPages,
  ];
}
