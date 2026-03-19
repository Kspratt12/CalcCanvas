'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';

const RELATED_TOOLS = [
  { name: 'Hash Generator', href: '/tools/hash-generator' },
  { name: 'Password Generator', href: '/tools/password-generator' },
  { name: 'Random Number Generator', href: '/tools/random-number-generator' },
  { name: 'Base64 Encoder/Decoder', href: '/tools/base64-encoder-decoder' },
];

function generateUUID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback manual v4 UUID
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function UuidGeneratorPage() {
  const [count, setCount] = useState('1');
  const [uppercase, setUppercase] = useState(false);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const generate = useCallback(() => {
    const num = Math.max(1, Math.min(50, parseInt(count) || 1));
    const list: string[] = [];
    for (let i = 0; i < num; i++) {
      const uuid = generateUUID();
      list.push(uppercase ? uuid.toUpperCase() : uuid.toLowerCase());
    }
    setUuids(list);
  }, [count, uppercase]);

  function copyOne(index: number) {
    navigator.clipboard.writeText(uuids[index]);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  }

  function copyAll() {
    navigator.clipboard.writeText(uuids.join('\n'));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 1500);
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">UUID Generator</h1>
      <p className="text-gray-600 mb-6">
        Generate random v4 UUIDs instantly. Create one or up to 50 at a time.
      </p>

      <div className="space-y-4">
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              How many UUIDs (1-50)
            </label>
            <input
              type="number"
              min={1}
              max={50}
              value={count}
              onChange={(e) => setCount(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
            />
          </div>
          <div className="flex items-center gap-2 pb-1">
            <label className="text-sm font-medium text-gray-700">
              Uppercase
            </label>
            <button
              onClick={() => setUppercase(!uppercase)}
              className={`w-12 h-6 rounded-full transition relative ${
                uppercase ? 'bg-[#2563eb]' : 'bg-gray-300'
              }`}
            >
              <span
                className={`block w-5 h-5 bg-white rounded-full shadow absolute top-0.5 transition-transform ${
                  uppercase ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>

        <button
          onClick={generate}
          className="w-full bg-[#2563eb] text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Generate
        </button>

        {uuids.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Generated UUIDs
              </h2>
              <button
                onClick={copyAll}
                className="text-sm text-[#2563eb] hover:underline font-medium"
              >
                {copiedAll ? 'Copied all!' : 'Copy All'}
              </button>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-2 max-h-96 overflow-y-auto">
              {uuids.map((uuid, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between bg-white rounded-lg px-4 py-2 border border-blue-100"
                >
                  <code className="font-mono text-sm text-gray-900 break-all">
                    {uuid}
                  </code>
                  <button
                    onClick={() => copyOne(i)}
                    className="text-sm text-[#2563eb] hover:underline font-medium ml-3 whitespace-nowrap"
                  >
                    {copiedIndex === i ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">How to Use</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Set how many UUIDs you want to generate (1 to 50).</li>
          <li>Toggle uppercase if you prefer capital letters.</li>
          <li>Click <strong>Generate</strong> to create the UUIDs.</li>
          <li>Click <strong>Copy</strong> on any UUID, or <strong>Copy All</strong> for the full list.</li>
        </ol>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">About This Tool</h2>
        <p className="text-gray-700">
          A UUID (Universally Unique Identifier) is a 128-bit identifier that is
          practically guaranteed to be unique. Version 4 UUIDs are generated
          using random or pseudo-random numbers. They are widely used as database
          primary keys, session tokens, correlation IDs, and anywhere a unique
          identifier is needed without coordination between systems. This tool
          uses the browser&apos;s built-in crypto.randomUUID() when available for
          cryptographically strong randomness.
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
