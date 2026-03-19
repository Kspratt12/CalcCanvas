'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';

const RELATED_TOOLS = [
  { name: 'Random Number Generator', href: '/tools/random-number-generator' },
  { name: 'UUID Generator', href: '/tools/uuid-generator' },
  { name: 'Hash Generator', href: '/tools/hash-generator' },
  { name: 'Password Generator', href: '/tools/password-generator' },
];

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace(/^#/, '');
  let fullHex = clean;
  if (clean.length === 3) {
    fullHex = clean[0] + clean[0] + clean[1] + clean[1] + clean[2] + clean[2];
  }
  if (!/^[0-9a-fA-F]{6}$/.test(fullHex)) return null;
  return {
    r: parseInt(fullHex.slice(0, 2), 16),
    g: parseInt(fullHex.slice(2, 4), 16),
    b: parseInt(fullHex.slice(4, 6), 16),
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) =>
    Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function rgbToHsl(
  r: number,
  g: number,
  b: number
): { h: number; s: number; l: number } {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn:
        h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
        break;
      case gn:
        h = ((bn - rn) / d + 2) / 6;
        break;
      case bn:
        h = ((rn - gn) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export default function ColorHexToRgbPage() {
  const [hex, setHex] = useState('#2563eb');
  const [r, setR] = useState('37');
  const [g, setG] = useState('99');
  const [b, setB] = useState('235');
  const [copied, setCopied] = useState('');

  const rgb = hexToRgb(hex);
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;

  const updateFromHex = useCallback((value: string) => {
    setHex(value);
    const parsed = hexToRgb(value);
    if (parsed) {
      setR(String(parsed.r));
      setG(String(parsed.g));
      setB(String(parsed.b));
    }
  }, []);

  const updateFromRgb = useCallback(
    (rVal: string, gVal: string, bVal: string) => {
      setR(rVal);
      setG(gVal);
      setB(bVal);
      const rn = parseInt(rVal);
      const gn = parseInt(gVal);
      const bn = parseInt(bVal);
      if (!isNaN(rn) && !isNaN(gn) && !isNaN(bn)) {
        setHex(rgbToHex(rn, gn, bn));
      }
    },
    []
  );

  function copy(text: string, label: string) {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(''), 1500);
  }

  const hexStr = hex.startsWith('#') ? hex : `#${hex}`;
  const rgbStr = rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : '';
  const hslStr = hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : '';

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">Color Hex to RGB Converter</h1>
      <p className="text-gray-600 mb-6">
        Convert colors between hex, RGB, and HSL formats. Pick a color or type
        values manually.
      </p>

      <div className="space-y-6">
        {/* Color preview */}
        <div
          className="w-full h-32 rounded-xl border border-gray-200 shadow-inner"
          style={{ backgroundColor: rgb ? hexStr : '#ffffff' }}
        />

        {/* Hex input + color picker */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hex Color
          </label>
          <div className="flex gap-3 items-center">
            <input
              type="text"
              value={hex}
              onChange={(e) => updateFromHex(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
              placeholder="#2563eb"
            />
            <input
              type="color"
              value={rgb ? hexStr : '#000000'}
              onChange={(e) => updateFromHex(e.target.value)}
              className="w-12 h-10 rounded cursor-pointer border border-gray-300"
            />
          </div>
        </div>

        {/* RGB inputs */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            RGB Values
          </label>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-gray-500">R</label>
              <input
                type="number"
                min={0}
                max={255}
                value={r}
                onChange={(e) => updateFromRgb(e.target.value, g, b)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">G</label>
              <input
                type="number"
                min={0}
                max={255}
                value={g}
                onChange={(e) => updateFromRgb(r, e.target.value, b)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">B</label>
              <input
                type="number"
                min={0}
                max={255}
                value={b}
                onChange={(e) => updateFromRgb(r, g, e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        {rgb && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 space-y-3">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Color Values
            </h2>
            {[
              { label: 'Hex', value: hexStr },
              { label: 'RGB', value: rgbStr },
              { label: 'HSL', value: hslStr },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between bg-white rounded-lg px-4 py-3 border border-blue-100"
              >
                <div>
                  <span className="text-sm text-gray-500 mr-3">
                    {item.label}
                  </span>
                  <span className="font-mono text-gray-900">{item.value}</span>
                </div>
                <button
                  onClick={() => copy(item.value, item.label)}
                  className="text-sm text-[#2563eb] hover:underline font-medium"
                >
                  {copied === item.label ? 'Copied!' : 'Copy'}
                </button>
              </div>
            ))}
          </div>
        )}

        {!rgb && hex.length > 1 && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm">
            Invalid hex color. Use format like #2563eb or #fff.
          </div>
        )}
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">How to Use</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Enter a hex color code (e.g., #2563eb) or use the color picker.</li>
          <li>Or enter RGB values (0-255) to convert to hex.</li>
          <li>View the converted values in Hex, RGB, and HSL formats.</li>
          <li>Click <strong>Copy</strong> next to any value to copy it.</li>
        </ol>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">About This Tool</h2>
        <p className="text-gray-700">
          This color converter translates between hex, RGB, and HSL color
          formats used in web development and design. Hex colors are commonly
          used in CSS, while RGB values are used in many design tools. HSL
          (Hue, Saturation, Lightness) is often more intuitive for adjusting
          colors. All conversions happen instantly in your browser.
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
