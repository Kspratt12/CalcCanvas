'use client';

import { useState } from 'react';
import Link from 'next/link';

const RELATED_TOOLS = [
  { name: 'Base64 Encoder/Decoder', href: '/tools/base64-encoder-decoder' },
  { name: 'Hash Generator', href: '/tools/hash-generator' },
  { name: 'UUID Generator', href: '/tools/uuid-generator' },
  { name: 'Character Counter', href: '/tools/character-counter' },
];

export default function JsonFormatterPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  function format() {
    setError('');
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Invalid JSON';
      setError(msg);
      setOutput('');
    }
  }

  function minify() {
    setError('');
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Invalid JSON';
      setError(msg);
      setOutput('');
    }
  }

  function validate() {
    try {
      JSON.parse(input);
      setError('');
      setOutput('Valid JSON!');
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Invalid JSON';
      setError(msg);
      setOutput('');
    }
  }

  function copyOutput() {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

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
                "name": "What does \"minify\" mean for JSON?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Minifying JSON removes all unnecessary whitespace, line breaks, and indentation from the data. The result is a single compact line that contains exactly the same information. This is useful when you need to reduce payload size for network requests or storage."
                }
              },
              {
                "@type": "Question",
                "name": "Is my data safe when I use this tool?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. All formatting, minifying, and validation happens locally in your browser. No data is transmitted to any server. You can even use this tool while offline once the page has loaded."
                }
              },
              {
                "@type": "Question",
                "name": "What causes \"Invalid JSON\" errors?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The most common culprits are trailing commas after the last item in an array or object, single quotes instead of double quotes around strings, and unquoted property names. JSON is stricter than JavaScript object syntax."
                }
              },
              {
                "@type": "Question",
                "name": "Can I format JSON with tabs instead of spaces?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "This tool uses 2-space indentation by default, which is the most common convention for JSON. If you need tab-based indentation, you can copy the formatted output and do a find-and-replace in your text editor."
                }
              }
            ]
          })
        }}
      />
      <h1 className="text-3xl font-bold mb-2">JSON Formatter & Validator</h1>
      <p className="text-gray-600 mb-6">
        Prettify, minify, and validate JSON data instantly in your browser. No
        data is sent to any server.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Input JSON
          </label>
          <textarea
            className="w-full h-52 border border-gray-300 rounded-lg p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] resize-y"
            placeholder='{"name": "example", "value": 42}'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={format}
            className="flex-1 bg-[#2563eb] text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Format
          </button>
          <button
            onClick={minify}
            className="flex-1 bg-[#2563eb] text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Minify
          </button>
          <button
            onClick={validate}
            className="flex-1 border border-[#2563eb] text-[#2563eb] font-semibold py-3 rounded-lg hover:bg-blue-50 transition"
          >
            Validate
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm">
            <strong>Error:</strong> {error}
          </div>
        )}

        {output && (
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">
                Output
              </label>
              <button
                onClick={copyOutput}
                className="text-sm text-[#2563eb] hover:underline font-medium"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <textarea
              className="w-full h-52 border border-gray-300 rounded-lg p-4 font-mono text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#2563eb] resize-y"
              value={output}
              readOnly
            />
          </div>
        )}
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">How to Use</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Paste your raw JSON into the input textarea.</li>
          <li>Click <strong>Format</strong> to prettify with 2-space indentation.</li>
          <li>Click <strong>Minify</strong> to remove all whitespace.</li>
          <li>Click <strong>Validate</strong> to check whether the JSON is valid.</li>
          <li>Use the Copy button to copy the output to your clipboard.</li>
        </ol>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">About This Tool</h2>
        <p className="text-gray-700">
          The JSON Formatter takes raw or minified JSON and formats it with
          proper indentation for readability. It can also minify formatted JSON
          to reduce file size, and validate JSON syntax to help you catch errors
          quickly. All processing happens locally in your browser.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">What Is a JSON Formatter?</h2>
        <p className="text-gray-700 mb-3">
          JSON (JavaScript Object Notation) is a lightweight data format that both humans and machines can read and write. A JSON formatter takes compressed or messy JSON data and adds consistent indentation, line breaks, and spacing so you can actually see the structure at a glance. Think of it like turning a wall of text into a neatly organized outline.
        </p>
        <p className="text-gray-700 mb-3">
          When APIs return data or when you&apos;re debugging a configuration file, the raw JSON is often crammed into a single line. That makes it nearly impossible to spot a missing bracket or a misplaced comma. A good formatter not only prettifies the data but also validates it, catching syntax errors before they cause problems in production.
        </p>
        <p className="text-gray-700">
          This tool runs entirely in your browser using JavaScript&apos;s built-in <code>JSON.parse()</code> and <code>JSON.stringify()</code> methods. Your data never leaves your machine, making it safe to use with sensitive payloads like API keys or user records.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Frequently Asked Questions</h2>

        <h3 className="text-lg font-medium mt-4 mb-2">What does &quot;minify&quot; mean for JSON?</h3>
        <p className="text-gray-700 mb-3">
          Minifying JSON removes all unnecessary whitespace, line breaks, and indentation from the data. The result is a single compact line that contains exactly the same information. This is useful when you need to reduce payload size for network requests or storage.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Is my data safe when I use this tool?</h3>
        <p className="text-gray-700 mb-3">
          Yes. All formatting, minifying, and validation happens locally in your browser. No data is transmitted to any server. You can even use this tool while offline once the page has loaded.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">What causes &quot;Invalid JSON&quot; errors?</h3>
        <p className="text-gray-700 mb-3">
          The most common culprits are trailing commas after the last item in an array or object, single quotes instead of double quotes around strings, and unquoted property names. JSON is stricter than JavaScript object syntax, so these mistakes will trigger a parse error.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Can I format JSON with tabs instead of spaces?</h3>
        <p className="text-gray-700 mb-3">
          This tool uses 2-space indentation by default, which is the most common convention for JSON. If you need tab-based indentation, you can copy the formatted output and do a find-and-replace in your text editor.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">What is the maximum size of JSON I can format here?</h3>
        <p className="text-gray-700 mb-3">
          Since processing happens in your browser, the limit depends on your device&apos;s available memory. In practice, this tool handles files up to several megabytes without any issues. For extremely large files, a command-line tool like <code>jq</code> may be more appropriate.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Common Use Cases</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>API debugging</strong> — Paste a raw API response to inspect nested objects and find the data you need.</li>
          <li><strong>Configuration files</strong> — Format <code>package.json</code>, <code>tsconfig.json</code>, or any config file before committing to version control.</li>
          <li><strong>Data validation</strong> — Quickly check whether a JSON payload is syntactically correct before sending it to an endpoint.</li>
          <li><strong>Documentation</strong> — Prettify example JSON snippets for technical documentation or tutorials.</li>
          <li><strong>Reducing file size</strong> — Minify JSON data before embedding it in HTML or storing it in a database field.</li>
        </ul>
      </section>

      <section className="mt-8 pb-10">
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
