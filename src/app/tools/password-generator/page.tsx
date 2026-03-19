"use client";
import { useState, useCallback } from "react";

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useDigits, setUseDigits] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    let chars = "";
    if (useUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useLower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (useDigits) chars += "0123456789";
    if (useSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";
    if (!chars) { setResult("Select at least one character type"); return; }
    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    setResult(Array.from(arr, (v) => chars[v % chars.length]).join(""));
  }, [length, useUpper, useLower, useDigits, useSymbols]);

  const strength = () => {
    let score = 0;
    if (length >= 12) score++;
    if (length >= 20) score++;
    if (useUpper && useLower) score++;
    if (useDigits) score++;
    if (useSymbols) score++;
    if (score <= 1) return { label: "Weak", color: "bg-red-500", width: "w-1/4" };
    if (score <= 2) return { label: "Fair", color: "bg-yellow-500", width: "w-2/4" };
    if (score <= 3) return { label: "Strong", color: "bg-blue-500", width: "w-3/4" };
    return { label: "Very Strong", color: "bg-green-500", width: "w-full" };
  };

  const s = strength();

  const copy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Secure String Generator</h1>
      <p className="text-gray-600 mb-6">Generate random, secure strings for any purpose. Customize length and character types.</p>
      <div className="bg-gray-100 text-center py-3 text-sm text-gray-400 rounded mb-6">Advertisement</div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Length: {length}</label>
          <input type="range" min={4} max={64} value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full" />
          <div className="flex justify-between text-xs text-gray-400"><span>4</span><span>64</span></div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            [useUpper, setUseUpper, "Uppercase (A-Z)"],
            [useLower, setUseLower, "Lowercase (a-z)"],
            [useDigits, setUseDigits, "Digits (0-9)"],
            [useSymbols, setUseSymbols, "Symbols (!@#$%)"],
          ].map(([val, setter, label], i) => (
            <label key={i} className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={val as boolean} onChange={(e) => (setter as (v: boolean) => void)(e.target.checked)} className="rounded" />
              {label as string}
            </label>
          ))}
        </div>

        <div className="mb-2">
          <div className="flex justify-between text-xs mb-1"><span className="text-gray-500">Strength</span><span className="font-medium">{s.label}</span></div>
          <div className="h-2 bg-gray-200 rounded-full"><div className={`h-2 rounded-full ${s.color} ${s.width} transition-all`} /></div>
        </div>

        <button onClick={generate} className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium mt-4">Generate</button>

        {result && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-4">
            <div className="flex justify-between items-center">
              <code className="text-lg break-all text-gray-900">{result}</code>
              <button onClick={copy} className="ml-3 text-sm text-blue-600 hover:text-blue-800 whitespace-nowrap">{copied ? "Copied!" : "Copy"}</button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-100 text-center py-3 text-sm text-gray-400 rounded mb-6" style={{maxWidth:300,margin:"0 auto 24px"}}>Advertisement</div>

      <div className="prose max-w-none mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">How to Use</h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          <li>Set your desired length using the slider</li>
          <li>Choose which character types to include</li>
          <li>Click &quot;Generate&quot; to create a random string</li>
          <li>Click &quot;Copy&quot; to copy it to your clipboard</li>
        </ul>
      </div>
      <div className="prose max-w-none mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">About This Tool</h2>
        <p className="text-gray-700">This generator uses the Web Crypto API to produce cryptographically random strings. Longer strings with more character variety are more secure. We recommend at least 16 characters with all character types enabled for maximum security.</p>
      </div>
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Related Tools</h3>
        <div className="flex flex-wrap gap-3">
          {[["UUID Generator", "/tools/uuid-generator"], ["Hash Generator", "/tools/hash-generator"], ["Base64 Encoder", "/tools/base64-encoder-decoder"]].map(([name, href]) => (
            <a key={href} href={href} className="text-blue-600 hover:text-blue-800 text-sm">{name} →</a>
          ))}
        </div>
      </div>
    </div>
  );
}
