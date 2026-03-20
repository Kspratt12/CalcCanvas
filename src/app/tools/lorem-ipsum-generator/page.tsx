"use client";
import { useState } from "react";

const LOREM = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
  "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
  "Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque.",
  "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus.",
  "Ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
];

export default function LoremIpsumPage() {
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const paragraphs: string[] = [];
    for (let i = 0; i < count; i++) {
      paragraphs.push(LOREM[i % LOREM.length]);
    }
    setOutput(paragraphs.join("\n\n"));
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
                "name": "Why use Lorem Ipsum instead of real text?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Real text can distract reviewers from evaluating a design's visual elements. When people see readable content, they naturally start reading and critiquing the words instead of focusing on layout, typography, and spacing. Lorem Ipsum solves this problem by providing text that looks natural but doesn't convey meaning."
                }
              },
              {
                "@type": "Question",
                "name": "Is Lorem Ipsum actually Latin?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "It's derived from Latin, but it's not proper Latin. The original text was scrambled and modified from Cicero's work, so many of the words are altered, truncated, or rearranged."
                }
              },
              {
                "@type": "Question",
                "name": "How many paragraphs should I generate?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "It depends on your project. For a single content block or card, one or two paragraphs usually suffice. For a full blog post mockup, five to eight paragraphs give a realistic feel. This tool supports up to 20 paragraphs at a time."
                }
              },
              {
                "@type": "Question",
                "name": "Can I use Lorem Ipsum in production websites?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can, but you shouldn't. Lorem Ipsum is strictly for design and development purposes. Shipping a site with placeholder text looks unprofessional and can hurt your SEO."
                }
              }
            ]
          })
        }}
      />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Lorem Ipsum Generator</h1>
      <p className="text-gray-600 mb-6">Generate placeholder text for your designs, mockups, and layouts.</p>
      <div className="bg-gray-100 text-center py-3 text-sm text-gray-400 rounded mb-6">Advertisement</div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex items-end gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Paragraphs</label>
            <input type="number" min={1} max={20} value={count} onChange={(e) => setCount(Math.max(1, Math.min(20, Number(e.target.value))))} className="w-24 border border-gray-300 rounded-lg p-2 text-gray-900" />
          </div>
          <button onClick={generate} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">Generate</button>
        </div>

        {output && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex justify-end mb-2">
              <button onClick={copy} className="text-sm text-blue-600 hover:text-blue-800">{copied ? "Copied!" : "Copy"}</button>
            </div>
            <div className="text-gray-800 whitespace-pre-wrap text-sm leading-relaxed">{output}</div>
          </div>
        )}
      </div>

      <div className="bg-gray-100 text-center py-3 text-sm text-gray-400 rounded mb-6" style={{maxWidth:300,margin:"0 auto 24px"}}>Advertisement</div>

      <div className="prose max-w-none mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">How to Use</h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          <li>Choose the number of paragraphs you need (1-20)</li>
          <li>Click &quot;Generate&quot; to create the placeholder text</li>
          <li>Click &quot;Copy&quot; to copy it to your clipboard</li>
        </ul>
      </div>
      <div className="prose max-w-none mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">About This Tool</h2>
        <p className="text-gray-700">Lorem Ipsum is dummy text used in the printing and typesetting industry since the 1500s. It is used as placeholder text to demonstrate the visual form of a document without relying on meaningful content. This generator creates standard Lorem Ipsum paragraphs instantly.</p>
      </div>
      <div className="prose max-w-none mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">What Is Lorem Ipsum?</h2>
        <p className="text-gray-700 mb-3">
          Lorem Ipsum is placeholder text that has been the standard dummy text of the printing and typesetting industry since the 1500s. It originates from a scrambled passage of &quot;De Finibus Bonorum et Malorum&quot; (On the Ends of Good and Evil), a philosophical work by the Roman statesman Cicero, written in 45 BC. A typesetter in the 16th century scrambled parts of the text to create a specimen book, and it has survived for over five centuries.
        </p>
        <p className="text-gray-700">
          The beauty of Lorem Ipsum is that it looks like readable English text but carries no actual meaning. This allows designers and developers to focus on visual elements like typography, spacing, and layout without being distracted by the content itself. Unlike simply typing &quot;text here text here,&quot; Lorem Ipsum has a natural distribution of letters and word lengths that closely mimics real English prose.
        </p>
      </div>

      <div className="prose max-w-none mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>

        <h3 className="text-lg font-medium mt-4 mb-2">Why use Lorem Ipsum instead of real text?</h3>
        <p className="text-gray-700 mb-4">
          Real text can distract reviewers from evaluating a design&apos;s visual elements. When people see readable content, they naturally start reading and critiquing the words instead of focusing on layout, typography, and spacing. Lorem Ipsum solves this problem by providing text that looks natural but doesn&apos;t convey meaning.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Is Lorem Ipsum actually Latin?</h3>
        <p className="text-gray-700 mb-4">
          It&apos;s derived from Latin, but it&apos;s not proper Latin. The original text was scrambled and modified from Cicero&apos;s work, so many of the words are altered, truncated, or rearranged. A Latin scholar would recognize fragments but wouldn&apos;t be able to read it as coherent prose.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">How many paragraphs should I generate?</h3>
        <p className="text-gray-700 mb-4">
          It depends on your project. For a single content block or card, one or two paragraphs usually suffice. For a full blog post mockup, five to eight paragraphs give a realistic feel. This tool supports up to 20 paragraphs at a time.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Can I use Lorem Ipsum in production websites?</h3>
        <p className="text-gray-700 mb-4">
          You can, but you shouldn&apos;t. Lorem Ipsum is strictly for design and development purposes. Shipping a site with placeholder text looks unprofessional and can hurt your SEO since search engines may flag the content as low quality or spammy.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Is the generated text always the same?</h3>
        <p className="text-gray-700 mb-4">
          This generator uses a fixed set of standard Lorem Ipsum paragraphs and cycles through them based on how many you request. This ensures consistency and recognizability, which is what most designers prefer when using placeholder text.
        </p>
      </div>

      <div className="prose max-w-none mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Use Cases</h2>
        <div className="space-y-3 text-gray-700">
          <p>
            <strong>Web and graphic designers</strong> use Lorem Ipsum when building mockups, wireframes, and prototypes. It fills content areas realistically so clients can evaluate the overall design without getting sidetracked by unfinished copy.
          </p>
          <p>
            <strong>Front-end developers</strong> generate Lorem Ipsum to test how layouts handle different amounts of text. This helps identify overflow issues, responsive design problems, and CSS styling quirks before real content is available.
          </p>
          <p>
            <strong>Print designers</strong> have used Lorem Ipsum for centuries to preview how typesetting will look in books, magazines, brochures, and other printed materials. It remains a staple in InDesign, QuarkXPress, and other publishing software.
          </p>
          <p>
            <strong>Product managers and UX teams</strong> use placeholder text in user interface designs and clickable prototypes. It helps stakeholders visualize the final product during review meetings without waiting for finalized content.
          </p>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Related Tools</h3>
        <div className="flex flex-wrap gap-3">
          {[["Word Counter", "/tools/word-counter"], ["Case Converter", "/tools/case-converter"], ["Text Repeater", "/tools/text-repeater"]].map(([name, href]) => (
            <a key={href} href={href} className="text-blue-600 hover:text-blue-800 text-sm">{name} →</a>
          ))}
        </div>
      </div>
    </div>
  );
}
