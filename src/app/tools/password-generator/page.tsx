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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How long should my password be?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Security experts generally recommend at least 12 characters, but 16 or more is better. Each additional character exponentially increases the number of possible combinations, making brute-force attacks impractical."
                }
              },
              {
                "@type": "Question",
                "name": "Should I include symbols in my password?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, when the service allows it. Adding symbols dramatically increases the character pool that an attacker would need to search through. However, some websites restrict which special characters are allowed."
                }
              },
              {
                "@type": "Question",
                "name": "Is it safe to generate passwords in a browser?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "This tool generates passwords entirely on your device using the Web Crypto API. No passwords are sent to any server or stored anywhere. Once you navigate away from the page, the generated password exists only in your clipboard or wherever you saved it."
                }
              },
              {
                "@type": "Question",
                "name": "Why shouldn't I reuse passwords across sites?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "If one site suffers a data breach, attackers will try those credentials on other services — a technique called credential stuffing. Using a unique password for every account means a single breach won't compromise your other accounts."
                }
              }
            ]
          })
        }}
      />
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
      <div className="prose max-w-none mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">What Is a Password Generator?</h2>
        <p className="text-gray-700 mb-3">
          A password generator creates random strings of characters that are difficult for attackers to guess or crack. Instead of relying on memorable words, dates, or patterns — which are predictable and vulnerable to dictionary attacks — a generator uses cryptographic randomness to produce truly unpredictable sequences.
        </p>
        <p className="text-gray-700 mb-3">
          The strength of a generated password depends on two factors: length and character variety. A 16-character password using uppercase letters, lowercase letters, digits, and symbols has roughly 105 bits of entropy, making it practically impossible to brute-force with current technology. Even the fastest supercomputers would need billions of years to try every combination.
        </p>
        <p className="text-gray-700">
          This tool uses the Web Crypto API (<code>crypto.getRandomValues()</code>), which provides cryptographically secure random numbers. Unlike <code>Math.random()</code>, which is predictable, the Web Crypto API draws from your operating system&apos;s entropy pool, ensuring each generated password is truly random.
        </p>
      </div>

      <div className="prose max-w-none mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Frequently Asked Questions</h2>

        <h3 className="text-lg font-medium mt-4 mb-2">How long should my password be?</h3>
        <p className="text-gray-700 mb-3">
          Security experts generally recommend at least 12 characters, but 16 or more is better. Each additional character exponentially increases the number of possible combinations, making brute-force attacks impractical. For high-security accounts, consider using 20+ characters.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Should I include symbols in my password?</h3>
        <p className="text-gray-700 mb-3">
          Yes, when the service allows it. Adding symbols dramatically increases the character pool that an attacker would need to search through. However, some websites restrict which special characters are allowed, so you may need to adjust your settings for those cases.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Is it safe to generate passwords in a browser?</h3>
        <p className="text-gray-700 mb-3">
          This tool generates passwords entirely on your device using the Web Crypto API. No passwords are sent to any server or stored anywhere. Once you navigate away from the page, the generated password exists only in your clipboard or wherever you saved it.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Why shouldn&apos;t I reuse passwords across sites?</h3>
        <p className="text-gray-700 mb-3">
          If one site suffers a data breach, attackers will try those credentials on other services — a technique called credential stuffing. Using a unique password for every account means a single breach won&apos;t compromise your other accounts. Pair this generator with a password manager for the best security.
        </p>
      </div>

      <div className="prose max-w-none mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Common Use Cases</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Account passwords</strong> — Generate unique, strong passwords for every online account you create.</li>
          <li><strong>API keys and secrets</strong> — Create random strings for application secrets, webhook tokens, or encryption keys.</li>
          <li><strong>Database seed data</strong> — Generate realistic random passwords for test users during development.</li>
          <li><strong>Wi-Fi passwords</strong> — Create a strong, random passphrase for your home or office network.</li>
          <li><strong>Temporary access codes</strong> — Generate one-time passwords for sharing temporary access with colleagues or guests.</li>
        </ul>
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
