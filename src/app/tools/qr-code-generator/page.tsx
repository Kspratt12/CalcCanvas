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
