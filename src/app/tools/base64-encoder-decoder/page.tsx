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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Why would I use Base64 instead of sending raw data?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Many protocols and formats (like email, JSON, and HTML) are designed to handle text, not raw binary. Base64 lets you embed binary content — such as images or file attachments — within these text-based formats without corrupting the data."
                }
              },
              {
                "@type": "Question",
                "name": "Is Base64 the same as encryption?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. Base64 is an encoding scheme, not an encryption method. Anyone with access to the encoded string can decode it instantly. If you need to protect sensitive data, use proper encryption algorithms like AES or RSA instead."
                }
              },
              {
                "@type": "Question",
                "name": "Why is the Base64 output longer than my input?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Base64 represents every 3 bytes of input as 4 characters of output. This means the encoded string is approximately 33% larger than the original. The trade-off is worth it when you need to embed binary data in a text-only context."
                }
              },
              {
                "@type": "Question",
                "name": "Does this tool support Unicode text?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. This tool handles full Unicode by first encoding the text as UTF-8 before applying Base64 encoding. This means you can safely encode and decode text in any language, including emoji and special characters."
                }
              }
            ]
          })
        }}
      />
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

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">What Is Base64 Encoding?</h2>
        <p className="text-gray-700 mb-3">
          Base64 is a way of representing binary data using only printable ASCII characters. It takes any sequence of bytes and converts it into a string made up of letters (A-Z, a-z), digits (0-9), plus signs (+), and forward slashes (/). The result is always about 33% larger than the original data, but it can safely travel through systems that only handle text.
        </p>
        <p className="text-gray-700 mb-3">
          The encoding works by taking groups of three bytes (24 bits) and splitting them into four 6-bit chunks. Each chunk maps to one of the 64 characters in the Base64 alphabet. If the input length isn&apos;t divisible by three, padding characters (=) are added at the end.
        </p>
        <p className="text-gray-700">
          Base64 is not encryption. It doesn&apos;t provide any security — anyone can decode a Base64 string. Its purpose is purely about safe data transport, not confidentiality.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Frequently Asked Questions</h2>

        <h3 className="text-lg font-medium mt-4 mb-2">Why would I use Base64 instead of sending raw data?</h3>
        <p className="text-gray-700 mb-3">
          Many protocols and formats (like email, JSON, and HTML) are designed to handle text, not raw binary. Base64 lets you embed binary content — such as images or file attachments — within these text-based formats without corrupting the data.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Is Base64 the same as encryption?</h3>
        <p className="text-gray-700 mb-3">
          No. Base64 is an encoding scheme, not an encryption method. Anyone with access to the encoded string can decode it instantly. If you need to protect sensitive data, use proper encryption algorithms like AES or RSA instead.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Why is the Base64 output longer than my input?</h3>
        <p className="text-gray-700 mb-3">
          Base64 represents every 3 bytes of input as 4 characters of output. This means the encoded string is approximately 33% larger than the original. The trade-off is worth it when you need to embed binary data in a text-only context.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Does this tool support Unicode text?</h3>
        <p className="text-gray-700 mb-3">
          Yes. This tool handles full Unicode by first encoding the text as UTF-8 before applying Base64 encoding. This means you can safely encode and decode text in any language, including emoji and special characters.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Common Use Cases</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Data URIs in CSS/HTML</strong> — Embed small images directly in stylesheets or HTML using <code>data:image/png;base64,...</code> to reduce HTTP requests.</li>
          <li><strong>Email attachments (MIME)</strong> — Email protocols use Base64 to encode file attachments within the message body.</li>
          <li><strong>API authentication</strong> — HTTP Basic Authentication encodes the username and password as a Base64 string in the Authorization header.</li>
          <li><strong>Storing binary in JSON</strong> — Since JSON doesn&apos;t support binary data natively, Base64 is the standard way to include files or images in JSON payloads.</li>
          <li><strong>JWT tokens</strong> — JSON Web Tokens use Base64url encoding (a URL-safe variant) for the header and payload sections.</li>
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
