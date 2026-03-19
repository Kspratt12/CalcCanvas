'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';

const RELATED_TOOLS = [
  { name: 'UUID Generator', href: '/tools/uuid-generator' },
  { name: 'Base64 Encoder/Decoder', href: '/tools/base64-encoder-decoder' },
  { name: 'Password Generator', href: '/tools/password-generator' },
  { name: 'JSON Formatter', href: '/tools/json-formatter' },
];

const ALGORITHMS = ['SHA-1', 'SHA-256', 'SHA-512'] as const;

async function computeHash(
  algorithm: string,
  text: string
): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export default function HashGeneratorPage() {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState('');
  const [loading, setLoading] = useState(false);

  const generateHashes = useCallback(
    async (text: string) => {
      if (!text) {
        setHashes({});
        return;
      }
      setLoading(true);
      try {
        const results: Record<string, string> = {};
        for (const algo of ALGORITHMS) {
          results[algo] = await computeHash(algo, text);
        }
        setHashes(results);
      } catch {
        setHashes({});
      }
      setLoading(false);
    },
    []
  );

  function handleInputChange(value: string) {
    setInput(value);
    generateHashes(value);
  }

  function copy(text: string, label: string) {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(''), 1500);
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Hash Generator</h1>
      <p className="text-gray-600 mb-6">
        Generate SHA-1, SHA-256, and SHA-512 hashes from any text using the
        browser&apos;s built-in Web Crypto API.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Input Text
          </label>
          <textarea
            className="w-full h-40 border border-gray-300 rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] resize-y"
            placeholder="Type or paste text here to generate hashes..."
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
          />
        </div>

        <button
          onClick={() => generateHashes(input)}
          className="w-full bg-[#2563eb] text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? 'Generating...' : 'Generate Hashes'}
        </button>

        {Object.keys(hashes).length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Hash Results
            </h2>
            {ALGORITHMS.map((algo) => (
              <div key={algo}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    {algo}
                  </span>
                  <button
                    onClick={() => copy(hashes[algo], algo)}
                    className="text-sm text-[#2563eb] hover:underline font-medium"
                  >
                    {copied === algo ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="bg-white rounded-lg px-4 py-3 border border-blue-100 font-mono text-xs break-all text-gray-900">
                  {hashes[algo]}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">How to Use</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Type or paste your text into the input area.</li>
          <li>Hashes are generated automatically as you type, or click <strong>Generate Hashes</strong>.</li>
          <li>View SHA-1, SHA-256, and SHA-512 hashes displayed as lowercase hex strings.</li>
          <li>Click <strong>Copy</strong> next to any hash to copy it to your clipboard.</li>
        </ol>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">About This Tool</h2>
        <p className="text-gray-700">
          A cryptographic hash function takes an input and produces a
          fixed-length string of characters. The same input always produces the
          same hash, but even a tiny change in the input produces a completely
          different output. SHA-256 and SHA-512 are part of the SHA-2 family and
          are widely used for data integrity verification, digital signatures,
          and password storage. SHA-1 is included for reference but is considered
          weak for security purposes. All hashing is performed locally in your
          browser using the Web Crypto API — no data is sent to any server.
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
