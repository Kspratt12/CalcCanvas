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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Are UUIDs truly unique?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "In practice, yes. With 122 random bits, the chance of generating two identical v4 UUIDs is about 1 in 2^122. You would need to generate about a billion UUIDs per second for 85 years to have a 50% chance of a single collision."
                }
              },
              {
                "@type": "Question",
                "name": "What is the difference between UUID versions?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Version 1 UUIDs use the current timestamp and the device's MAC address. Version 4 (generated here) uses random numbers. Version 5 uses a namespace and name hashed with SHA-1. Version 7 combines a Unix timestamp with random data for sortable IDs."
                }
              },
              {
                "@type": "Question",
                "name": "Can I use UUIDs as database primary keys?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, and many applications do. UUIDs work well as primary keys because they can be generated client-side without database coordination. However, random v4 UUIDs can cause index fragmentation in B-tree indexes."
                }
              },
              {
                "@type": "Question",
                "name": "Should UUIDs be uppercase or lowercase?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "RFC 4122 states that UUIDs should be treated as case-insensitive. However, lowercase is the most common convention and what most libraries produce by default. This tool gives you a toggle to choose."
                }
              }
            ]
          })
        }}
      />
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

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">What Is a UUID?</h2>
        <p className="text-gray-700 mb-3">
          A UUID (Universally Unique Identifier) is a 128-bit number used to identify information in computer systems. Written as 32 hexadecimal digits separated by hyphens in five groups (like <code>550e8400-e29b-41d4-a716-446655440000</code>), UUIDs are designed to be unique across space and time without requiring a central authority to issue them.
        </p>
        <p className="text-gray-700 mb-3">
          Version 4 UUIDs, which this tool generates, are created using random or pseudo-random numbers. Out of the 128 bits, 6 are reserved to indicate the version and variant, leaving 122 random bits. This gives roughly 5.3 x 10^36 possible values — so the probability of generating a duplicate is astronomically small, even if you generate billions of them.
        </p>
        <p className="text-gray-700">
          UUIDs are defined by RFC 4122 and are a foundational building block in distributed systems. Unlike auto-incrementing database IDs, UUIDs can be generated independently by multiple systems without any risk of collision, making them ideal for microservices, event sourcing, and offline-capable applications.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Frequently Asked Questions</h2>

        <h3 className="text-lg font-medium mt-4 mb-2">Are UUIDs truly unique?</h3>
        <p className="text-gray-700 mb-3">
          In practice, yes. With 122 random bits, the chance of generating two identical v4 UUIDs is about 1 in 2^122 (roughly 5.3 x 10^36). You would need to generate about a billion UUIDs per second for 85 years to have a 50% chance of a single collision. For all practical purposes, they are unique.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">What is the difference between UUID versions?</h3>
        <p className="text-gray-700 mb-3">
          Version 1 UUIDs use the current timestamp and the device&apos;s MAC address. Version 4 (generated here) uses random numbers. Version 5 uses a namespace and name hashed with SHA-1. Version 7 (newer) combines a Unix timestamp with random data for sortable IDs. Each version serves different needs.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Can I use UUIDs as database primary keys?</h3>
        <p className="text-gray-700 mb-3">
          Yes, and many applications do. UUIDs work well as primary keys because they can be generated client-side without database coordination. However, random v4 UUIDs can cause index fragmentation in B-tree indexes. If this is a concern, consider UUIDv7, which is time-sorted and more index-friendly.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Should UUIDs be uppercase or lowercase?</h3>
        <p className="text-gray-700 mb-3">
          RFC 4122 states that UUIDs should be treated as case-insensitive. However, lowercase is the most common convention and what most libraries produce by default. This tool gives you a toggle to choose whichever format your project requires.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Common Use Cases</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Database primary keys</strong> — Use UUIDs instead of auto-incrementing integers for globally unique row identifiers.</li>
          <li><strong>Distributed systems</strong> — Generate IDs independently across multiple services without a central ID server.</li>
          <li><strong>Session tokens</strong> — Create unique session identifiers for user authentication and tracking.</li>
          <li><strong>File naming</strong> — Assign unique names to uploaded files to prevent overwrites and collisions.</li>
          <li><strong>Correlation IDs</strong> — Trace requests across microservices by attaching a UUID to each transaction.</li>
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
