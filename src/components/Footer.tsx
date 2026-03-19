import Link from "next/link";

const categories = [
  { label: "Financial Calculators", href: "/#financial" },
  { label: "Health & Fitness", href: "/#health" },
  { label: "Math Calculators", href: "/#math" },
  { label: "Text Tools", href: "/#text" },
  { label: "Developer Tools", href: "/#developer" },
  { label: "Everyday Tools", href: "/#everyday" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div>
            <Link href="/" className="text-lg font-bold text-slate-900">
              Calc<span className="text-primary">Canvas</span>
            </Link>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Free online calculators and tools for everyday use. Fast, accurate,
              and easy to use — no sign-up required.
            </p>
          </div>

          {/* Tool Categories */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Tool Categories</h3>
            <ul className="mt-3 space-y-2">
              {categories.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-500 hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Company</h3>
            <ul className="mt-3 space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-500 hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tools */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Popular Tools</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/tools/mortgage-calculator" className="text-sm text-slate-500 hover:text-primary">
                  Mortgage Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/bmi-calculator" className="text-sm text-slate-500 hover:text-primary">
                  BMI Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/word-counter" className="text-sm text-slate-500 hover:text-primary">
                  Word Counter
                </Link>
              </li>
              <li>
                <Link href="/tools/json-formatter" className="text-sm text-slate-500 hover:text-primary">
                  JSON Formatter
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-center text-sm text-slate-400">
          &copy; 2025 CalcCanvas. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
