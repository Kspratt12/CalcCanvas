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
