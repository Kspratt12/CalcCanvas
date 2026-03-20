"use client";
import { useState } from "react";

export default function SlugGeneratorPage() {
  const [input, setInput] = useState("");
  const [separator, setSeparator] = useState("-");
  const [copied, setCopied] = useState(false);

  const slug = input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-_]/g, "")
    .replace(/[\s]+/g, separator)
    .replace(new RegExp(`[${separator}]+`, "g"), separator)
    .replace(new RegExp(`^${separator === "-" ? "-" : "_"}|${separator === "-" ? "-" : "_"}$`, "g"), "");

  const copy = () => {
    navigator.clipboard.writeText(slug);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Should I use hyphens or underscores in slugs?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Hyphens are the standard choice and are recommended by Google. Search engines treat hyphens as word separators, which helps them understand individual keywords in your URL."
                }
              },
              {
                "@type": "Question",
                "name": "How long should a URL slug be?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Aim for three to five words that capture the essence of the page. Shorter slugs are easier to read, share, and remember. Avoid including stop words like \"a,\" \"the,\" or \"and\" unless they are essential to the meaning."
                }
              },
              {
                "@type": "Question",
                "name": "Do slugs affect SEO?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, though they are a minor ranking factor compared to content quality and backlinks. Including relevant keywords in your slug helps search engines understand your page's topic. Clean, descriptive slugs also improve click-through rates."
                }
              },
              {
                "@type": "Question",
                "name": "Can I change a slug after publishing a page?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can, but you should set up a 301 redirect from the old URL to the new one. Changing a slug without a redirect will break existing links and lose any SEO value the original URL had accumulated."
                }
              }
            ]
          })
        }}
      />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Slug Generator</h1>
      <p className="text-gray-600 mb-6">Convert any text into a URL-friendly slug instantly.</p>
      <div className="bg-gray-100 text-center py-3 text-sm text-gray-400 rounded mb-6">Advertisement</div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Enter text</label>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 mb-4" placeholder="My Blog Post Title" />

        <div className="flex items-center gap-4 mb-4">
          <label className="text-sm font-medium text-gray-700">Separator:</label>
          <select value={separator} onChange={(e) => setSeparator(e.target.value)} className="border border-gray-300 rounded-lg p-2 text-gray-900">
            <option value="-">Hyphen (-)</option>
            <option value="_">Underscore (_)</option>
          </select>
        </div>

        {slug && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">Your slug</span>
              <button onClick={copy} className="text-sm text-blue-600 hover:text-blue-800">{copied ? "Copied!" : "Copy"}</button>
            </div>
            <p className="text-lg font-mono text-blue-900 break-all">{slug}</p>
          </div>
        )}
      </div>

      <div className="bg-gray-100 text-center py-3 text-sm text-gray-400 rounded mb-6" style={{maxWidth:300,margin:"0 auto 24px"}}>Advertisement</div>

      <div className="prose max-w-none mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">How to Use</h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          <li>Type or paste any text in the input field</li>
          <li>The slug is generated in real-time below</li>
          <li>Choose between hyphen or underscore separator</li>
          <li>Click &quot;Copy&quot; to copy the slug</li>
        </ul>
      </div>
      <div className="prose max-w-none mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">About This Tool</h2>
        <p className="text-gray-700">A slug is a URL-friendly version of a text string. It converts spaces to hyphens, removes special characters, and lowercases everything. Slugs are commonly used in blog post URLs, file names, and database identifiers.</p>
      </div>
      <div className="prose max-w-none mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">What Is a URL Slug?</h2>
        <p className="text-gray-700 mb-3">
          A URL slug is the part of a web address that identifies a specific page in a human-readable format. For example, in the URL &quot;example.com/blog/how-to-bake-bread,&quot; the slug is &quot;how-to-bake-bread.&quot; Slugs are created by converting a title or phrase into a URL-friendly string: spaces become hyphens, special characters are removed, and all letters are converted to lowercase.
        </p>
        <p className="text-gray-700">
          Good slugs are important for both SEO and usability. Search engines use the slug to understand what a page is about, and users can read a clean slug to know what to expect before clicking a link. A well-crafted slug is short, descriptive, and free of unnecessary words or characters. This generator takes any text and instantly converts it into a clean, properly formatted slug.
        </p>
      </div>

      <div className="prose max-w-none mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>

        <h3 className="text-lg font-medium mt-4 mb-2">Should I use hyphens or underscores in slugs?</h3>
        <p className="text-gray-700 mb-4">
          Hyphens are the standard choice and are recommended by Google. Search engines treat hyphens as word separators, which helps them understand individual keywords in your URL. Underscores, on the other hand, are treated as word joiners, meaning &quot;my_page&quot; is read as one word rather than two.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">How long should a URL slug be?</h3>
        <p className="text-gray-700 mb-4">
          Aim for three to five words that capture the essence of the page. Shorter slugs are easier to read, share, and remember. Avoid including stop words like &quot;a,&quot; &quot;the,&quot; or &quot;and&quot; unless they are essential to the meaning. For example, &quot;best-running-shoes&quot; is better than &quot;the-best-running-shoes-for-beginners-in-2024.&quot;
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">What characters are removed from slugs?</h3>
        <p className="text-gray-700 mb-4">
          This tool removes all special characters including punctuation marks, symbols, and accented letters. Only lowercase letters, numbers, and the chosen separator (hyphen or underscore) remain in the final slug. This ensures the URL works correctly across all browsers and servers.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Do slugs affect SEO?</h3>
        <p className="text-gray-700 mb-4">
          Yes, though they are a minor ranking factor compared to content quality and backlinks. Including relevant keywords in your slug helps search engines understand your page&apos;s topic. Clean, descriptive slugs also improve click-through rates because users are more likely to click a link they can understand.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Can I change a slug after publishing a page?</h3>
        <p className="text-gray-700 mb-4">
          You can, but you should set up a 301 redirect from the old URL to the new one. Changing a slug without a redirect will break existing links and lose any SEO value the original URL had accumulated. It&apos;s best to choose a good slug before publishing.
        </p>
      </div>

      <div className="prose max-w-none mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Use Cases</h2>
        <div className="space-y-3 text-gray-700">
          <p>
            <strong>Bloggers and content creators</strong> use the slug generator to create clean URLs for their posts. Instead of letting their CMS auto-generate a slug from the full title (which can be long and awkward), they can craft a concise, keyword-rich slug.
          </p>
          <p>
            <strong>Web developers</strong> use slug generation when building content management systems, e-commerce platforms, or any application where user-generated content needs URL-safe identifiers. This tool demonstrates the exact logic they might implement in code.
          </p>
          <p>
            <strong>SEO professionals</strong> generate slugs as part of their keyword strategy. By testing different phrasings and seeing the resulting slug, they can choose the most concise and search-friendly URL structure for new pages.
          </p>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Related Tools</h3>
        <div className="flex flex-wrap gap-3">
          {[["Case Converter", "/tools/case-converter"], ["Word Counter", "/tools/word-counter"], ["Lorem Ipsum Generator", "/tools/lorem-ipsum-generator"]].map(([name, href]) => (
            <a key={href} href={href} className="text-blue-600 hover:text-blue-800 text-sm">{name} →</a>
          ))}
        </div>
      </div>
    </div>
  );
}
