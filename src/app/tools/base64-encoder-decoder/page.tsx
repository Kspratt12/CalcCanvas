'use client';

import { useState } from 'react';
import Link from 'next/link';

const RELATED_TOOLS = [
  { name: 'JSON Formatter', href: '/tools/json-formatter' },
  { name: 'Hash Generator', href: '/tools/hash-generator' },
  { name: 'UUID Generator', href: '/tools/uuid-generator' },
  { name: 'Password Generator', href: '/tools/password-generator' },
];

export default function Base64EncoderDecoderPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  function encode() {
    setError('');
    try {
      setOutput(btoa(unescape(encodeURIComponent(input))));
    } catch {
      setError('Failed to encode the input text.');
      setOutput('');
    }
  }

  function decode() {
    setError('');
    try {
      setOutput(decodeURIComponent(escape(atob(input))));
    } catch {
      setError('Invalid Base64 string. Please check your input.');
      setOutput('');
    }
  }

  function clear() {
    setInput('');
    setOutput('');
    setError('');
  }

  function copyOutput() {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Base64 Encoder / Decoder</h1>
      <p className="text-gray-600 mb-6">
        Encode text to Base64 or decode Base64 strings back to plain text.
        Everything runs locally in your browser.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Input
          </label>
          <textarea
            className="w-full h-40 border border-gray-300 rounded-lg p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] resize-y"
            placeholder="Enter text to encode, or Base64 string to decode..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={encode}
            className="flex-1 bg-[#2563eb] text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Encode
          </button>
          <button
            onClick={decode}
            className="flex-1 bg-[#2563eb] text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Decode
          </button>
          <button
            onClick={clear}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition"
          >
            Clear
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
              className="w-full h-40 border border-gray-300 rounded-lg p-4 font-mono text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#2563eb] resize-y"
              value={output}
              readOnly
            />
          </div>
        )}
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">How to Use</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Type or paste text into the input area.</li>
          <li>Click <strong>Encode</strong> to convert plain text to Base64.</li>
          <li>Click <strong>Decode</strong> to convert a Base64 string back to plain text.</li>
          <li>Use the <strong>Copy</strong> button to copy the result to your clipboard.</li>
          <li>Click <strong>Clear</strong> to reset both fields.</li>
        </ol>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">About This Tool</h2>
        <p className="text-gray-700">
          Base64 is a binary-to-text encoding scheme that represents binary data
          as an ASCII string. It is commonly used for embedding images in HTML/CSS,
          encoding email attachments, transmitting data in URLs, and storing
          complex data in JSON. This tool supports full Unicode text through
          UTF-8 encoding.
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
