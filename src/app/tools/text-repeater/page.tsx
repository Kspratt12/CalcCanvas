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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is the maximum number of repetitions?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The tool supports up to 500 repetitions. This limit exists to keep your browser running smoothly. For most practical purposes, 500 repetitions is more than enough."
                }
              },
              {
                "@type": "Question",
                "name": "What separator options are available?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can choose from three separator options: New Line (each repetition on its own line), Space (all repetitions on one line separated by spaces), and Comma (repetitions separated by commas with a space)."
                }
              },
              {
                "@type": "Question",
                "name": "Can I repeat multiple words or sentences?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. The input field accepts any text string, whether it's a single character, a word, a full sentence, or even a paragraph. The entire input will be repeated as a single unit."
                }
              },
              {
                "@type": "Question",
                "name": "Does this work on mobile devices?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. The text repeater is fully responsive and works on phones, tablets, and desktop computers. The copy button works on all modern mobile browsers."
                }
              }
            ]
          })
        }}
      />
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
      <div className="prose max-w-none mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">What Is a Text Repeater?</h2>
        <p className="text-gray-700 mb-3">
          A text repeater is a simple but powerful utility that takes any string of text and duplicates it a specified number of times. You provide the text, choose how many times to repeat it, select a separator (new line, space, or comma), and the tool generates the output instantly. It saves you from the mind-numbing task of manually copying and pasting the same text over and over.
        </p>
        <p className="text-gray-700">
          While the concept is straightforward, text repetition has surprisingly many practical applications. Developers use it to generate test data, designers use it to fill layouts, teachers use it for creating practice worksheets, and everyday users find it helpful for any situation where the same text needs to appear multiple times. This tool handles up to 500 repetitions with your choice of separator.
        </p>
      </div>

      <div className="prose max-w-none mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>

        <h3 className="text-lg font-medium mt-4 mb-2">What is the maximum number of repetitions?</h3>
        <p className="text-gray-700 mb-4">
          The tool supports up to 500 repetitions. This limit exists to keep your browser running smoothly. For most practical purposes, 500 repetitions is more than enough, but if you need more, you can run the tool multiple times and combine the results.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">What separator options are available?</h3>
        <p className="text-gray-700 mb-4">
          You can choose from three separator options: New Line (each repetition on its own line), Space (all repetitions on one line separated by spaces), and Comma (repetitions separated by commas with a space). The separator you choose depends on how you plan to use the output.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Can I repeat multiple words or sentences?</h3>
        <p className="text-gray-700 mb-4">
          Yes. The input field accepts any text string, whether it&apos;s a single character, a word, a full sentence, or even a paragraph. The entire input will be repeated as a single unit the specified number of times.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Is there a way to add numbering to each repetition?</h3>
        <p className="text-gray-700 mb-4">
          The current version does not support automatic numbering. However, you can include a placeholder in your text and then use a find-and-replace tool afterwards to add sequential numbers to each line.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Does this work on mobile devices?</h3>
        <p className="text-gray-700 mb-4">
          Yes. The text repeater is fully responsive and works on phones, tablets, and desktop computers. The copy button works on all modern mobile browsers, making it easy to generate and copy repeated text on the go.
        </p>
      </div>

      <div className="prose max-w-none mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Use Cases</h2>
        <div className="space-y-3 text-gray-700">
          <p>
            <strong>Software developers and QA testers</strong> use the text repeater to generate test data for stress-testing input fields, databases, and APIs. Repeating a string 500 times quickly reveals how an application handles large inputs or long text.
          </p>
          <p>
            <strong>Social media users</strong> sometimes need to repeat emojis, hashtags, or phrases for creative posts, comments, or bios. Instead of tapping the same emoji dozens of times, this tool generates the repeated text in seconds.
          </p>
          <p>
            <strong>Teachers and educators</strong> create practice worksheets where students need to write a word or phrase multiple times. The tool generates the template text that can be pasted into a document and formatted for printing.
          </p>
          <p>
            <strong>Data entry professionals</strong> use text repetition when they need to populate spreadsheet cells, fill forms with placeholder data, or create template rows in a database. The comma separator option is particularly useful for generating CSV-compatible data.
          </p>
        </div>
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
