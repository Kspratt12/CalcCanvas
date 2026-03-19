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
