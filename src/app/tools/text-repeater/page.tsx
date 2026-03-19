"use client";
import { useState } from "react";

export default function TextRepeaterPage() {
  const [text, setText] = useState("");
  const [times, setTimes] = useState(5);
  const [separator, setSeparator] = useState("newline");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const sep = separator === "newline" ? "\n" : separator === "space" ? " " : separator === "comma" ? ", " : " ";
    setOutput(Array(Math.min(times, 500)).fill(text).join(sep));
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Text Repeater</h1>
      <p className="text-gray-600 mb-6">Repeat any text multiple times with a custom separator.</p>
      <div className="bg-gray-100 text-center py-3 text-sm text-gray-400 rounded mb-6">Advertisement</div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Text to repeat</label>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500 mb-4" placeholder="Enter text..." />

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Repeat count</label>
            <input type="number" min={1} max={500} value={times} onChange={(e) => setTimes(Math.max(1, Math.min(500, Number(e.target.value))))} className="w-full border border-gray-300 rounded-lg p-2 text-gray-900" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Separator</label>
            <select value={separator} onChange={(e) => setSeparator(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 text-gray-900">
              <option value="newline">New Line</option>
              <option value="space">Space</option>
              <option value="comma">Comma</option>
            </select>
          </div>
        </div>

        <button onClick={generate} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium mb-4">Repeat Text</button>

        {output && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex justify-end mb-2">
              <button onClick={copy} className="text-sm text-blue-600 hover:text-blue-800">{copied ? "Copied!" : "Copy"}</button>
            </div>
            <textarea readOnly value={output} rows={8} className="w-full bg-transparent text-gray-800 text-sm resize-none" />
          </div>
        )}
      </div>

      <div className="bg-gray-100 text-center py-3 text-sm text-gray-400 rounded mb-6" style={{maxWidth:300,margin:"0 auto 24px"}}>Advertisement</div>

      <div className="prose max-w-none mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">How to Use</h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          <li>Enter the text you want to repeat</li>
          <li>Set how many times to repeat (1-500)</li>
          <li>Choose a separator between repetitions</li>
          <li>Click &quot;Repeat Text&quot; and copy the result</li>
        </ul>
      </div>
      <div className="prose max-w-none mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">About This Tool</h2>
        <p className="text-gray-700">The Text Repeater duplicates any text string a specified number of times. Useful for testing, creating sample data, filling forms, or generating repeated patterns for design work.</p>
      </div>
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Related Tools</h3>
        <div className="flex flex-wrap gap-3">
          {[["Lorem Ipsum Generator", "/tools/lorem-ipsum-generator"], ["Word Counter", "/tools/word-counter"], ["Case Converter", "/tools/case-converter"]].map(([name, href]) => (
            <a key={href} href={href} className="text-blue-600 hover:text-blue-800 text-sm">{name} →</a>
          ))}
        </div>
      </div>
    </div>
  );
}
