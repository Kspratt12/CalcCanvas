"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const RELATED_TOOLS = [
  { name: "Password Generator", href: "/tools/password-generator" },
  { name: "UUID Generator", href: "/tools/uuid-generator" },
  { name: "Slug Generator", href: "/tools/slug-generator" },
  { name: "Base64 Encoder/Decoder", href: "/tools/base64-encoder-decoder" },
];

// Simple QR code generation using Canvas API with a Google Charts fallback
export default function QRCodeGeneratorPage() {
  const [text, setText] = useState("");
  const [size, setSize] = useState("200");
  const [generated, setGenerated] = useState(false);
  const [qrUrl, setQrUrl] = useState("");
  const imgRef = useRef<HTMLImageElement>(null);

  const generate = () => {
    if (!text.trim()) return;
    const s = parseInt(size) || 200;
    // Using a public QR code API that requires no key
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=${s}x${s}&data=${encodeURIComponent(text)}`;
    setQrUrl(url);
    setGenerated(true);
  };

  const download = () => {
    if (!qrUrl) return;
    const a = document.createElement("a");
    a.href = qrUrl;
    a.download = "qrcode.png";
    a.target = "_blank";
    a.click();
  };

  const reset = () => {
    setText("");
    setGenerated(false);
    setQrUrl("");
  };

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
                "name": "What can I encode in a QR code?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can encode URLs, plain text, phone numbers (prefix with tel:), email addresses (prefix with mailto:), and Wi-Fi credentials using the WIFI: format. QR codes can hold up to several thousand characters."
                }
              },
              {
                "@type": "Question",
                "name": "What size QR code should I use?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "For digital use (websites, emails), 200x200 pixels is usually sufficient. For printed materials, choose a larger size like 400x400 or 500x500 to ensure the code remains scannable at a distance."
                }
              },
              {
                "@type": "Question",
                "name": "Can I download the QR code?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. After generating a QR code, click the \"Download PNG\" button to save the image to your device. You can then use it in any document, website, or printed material."
                }
              },
              {
                "@type": "Question",
                "name": "Do QR codes expire?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Static QR codes like the ones this tool generates never expire. The data is encoded directly in the image. As long as the encoded URL or content is still valid, the QR code will work indefinitely."
                }
              }
            ]
          })
        }}
      />
      <h1 className="text-3xl font-bold mb-2">QR Code Generator</h1>
      <p className="text-gray-600 mb-6">
        Create QR codes for URLs, text, phone numbers, and more — instantly and free.
      </p>

      <div className="w-full max-w-[728px] h-[90px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm mx-auto mb-8 rounded">
        Advertisement
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Text or URL
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-24 border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#2563eb] resize-y"
          placeholder="Enter a URL, text, phone number, or email..."
        />

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Size (px)
          </label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
          >
            <option value="150">150 x 150</option>
            <option value="200">200 x 200</option>
            <option value="300">300 x 300</option>
            <option value="400">400 x 400</option>
            <option value="500">500 x 500</option>
          </select>
        </div>

        <div className="flex gap-3">
          <button
            onClick={generate}
            className="flex-1 bg-[#2563eb] text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Generate QR Code
          </button>
          <button
            onClick={reset}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
          >
            Reset
          </button>
        </div>
      </div>

      {generated && qrUrl && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 text-center">
          <img
            ref={imgRef}
            src={qrUrl}
            alt="Generated QR Code"
            className="mx-auto border border-gray-200 rounded"
          />
          <button
            onClick={download}
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition text-sm"
          >
            Download PNG
          </button>
        </div>
      )}

      <div className="w-[300px] h-[250px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm mx-auto mt-8 rounded">
        Advertisement
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">How to Use</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Enter any text, URL, phone number, or email address.</li>
          <li>Choose your desired QR code size.</li>
          <li>Click &quot;Generate QR Code&quot; to create the code.</li>
          <li>Click &quot;Download PNG&quot; to save the image.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">What Can You Encode?</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>URLs</strong> — Link to any website or webpage.</li>
          <li><strong>Plain text</strong> — Any message or note.</li>
          <li><strong>Phone numbers</strong> — Prefix with &quot;tel:&quot; (e.g. tel:+1234567890).</li>
          <li><strong>Email</strong> — Prefix with &quot;mailto:&quot; (e.g. mailto:hello@example.com).</li>
          <li><strong>Wi-Fi</strong> — Use format WIFI:T:WPA;S:NetworkName;P:Password;;</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">What Is a QR Code?</h2>
        <p className="text-gray-700 mb-3">
          A QR code (Quick Response code) is a two-dimensional barcode that stores information in a grid of black and white squares. Originally invented in 1994 by Denso Wave for tracking automotive parts, QR codes have become ubiquitous in everyday life — from restaurant menus and payment systems to event tickets and product packaging.
        </p>
        <p className="text-gray-700 mb-3">
          Unlike traditional barcodes that can only hold about 20 characters, QR codes can store up to 4,296 alphanumeric characters or 7,089 numeric characters. They also include built-in error correction, meaning the code can still be scanned correctly even if up to 30% of it is damaged or obscured.
        </p>
        <p className="text-gray-700">
          This generator creates standard QR codes that any smartphone camera or QR scanning app can read. The codes are generated as PNG images that you can download and use in print materials, websites, business cards, or anywhere else you need a scannable link or message.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Frequently Asked Questions</h2>

        <h3 className="text-lg font-medium mt-4 mb-2">Do QR codes expire?</h3>
        <p className="text-gray-700 mb-3">
          Static QR codes (like the ones this tool generates) never expire. The information is encoded directly in the pattern of squares, so the code will work as long as the printed or displayed image remains scannable. However, if the code links to a URL and that URL goes down, the QR code will still scan but the link won&apos;t work.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">What size should I use for printing?</h3>
        <p className="text-gray-700 mb-3">
          For general use, 200x200 pixels works well for on-screen display and small prints. For larger print materials like posters or banners, choose 400x400 or 500x500 to ensure the code remains crisp and scannable from a distance. As a rule of thumb, the QR code should be at least 1 inch (2.5 cm) square for reliable scanning.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Can I encode more than just URLs?</h3>
        <p className="text-gray-700 mb-3">
          Absolutely. QR codes can encode plain text, phone numbers (using the tel: prefix), email addresses (using mailto:), Wi-Fi credentials, calendar events, and more. The data format determines what happens when someone scans the code — a URL opens the browser, a phone number offers to dial, and so on.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Is there a limit to how much text I can encode?</h3>
        <p className="text-gray-700 mb-3">
          Yes. QR codes can hold up to about 4,296 characters of text. However, longer content creates denser, more complex codes that are harder to scan. For best results, keep your content concise — a short URL or brief message works much better than a long paragraph.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Common Use Cases</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Business cards</strong> — Add a QR code linking to your portfolio, LinkedIn profile, or vCard contact info.</li>
          <li><strong>Marketing materials</strong> — Print QR codes on flyers, posters, or packaging to drive traffic to landing pages.</li>
          <li><strong>Wi-Fi sharing</strong> — Create a QR code with your network credentials so guests can connect without typing the password.</li>
          <li><strong>Event check-in</strong> — Generate unique QR codes for tickets or registrations that can be scanned at the door.</li>
          <li><strong>Product labels</strong> — Link to instruction manuals, warranty registration pages, or product information from physical products.</li>
        </ul>
      </section>

      <section className="mt-8">
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
