import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "JSON Formatting Guide | CalcCanvas",
  description:
    "A developer-friendly guide to JSON syntax, common errors, pretty printing, validation, and useful formatting tools.",
};

export default function JsonFormattingGuide() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">
          JSON Formatting Guide: How to Read, Write, and Validate JSON
        </h1>
        <p className="mt-3 text-sm text-slate-400">
          May 22, 2025 &middot; By CalcCanvas Team
        </p>
      </header>

      <div className="mt-8 space-y-6 text-sm leading-7 text-slate-600">
        <p>
          JSON (JavaScript Object Notation) is the most widely used data format
          on the web. APIs return it, configuration files use it, and databases
          store it. Whether you are a front-end developer, back-end engineer, or
          just someone who needs to edit a config file, understanding JSON syntax
          and knowing how to format and validate it will save you time and
          frustration.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          What Is JSON?
        </h2>
        <p>
          JSON is a lightweight, text-based data format that is easy for both
          humans and machines to read and write. It was derived from JavaScript
          but is language-independent&mdash;virtually every programming language
          has built-in support for parsing and generating JSON.
        </p>
        <p>
          A JSON document is built from two structures: <strong>objects</strong>{" "}
          (collections of key-value pairs enclosed in curly braces) and{" "}
          <strong>arrays</strong> (ordered lists of values enclosed in square
          brackets). Values can be strings, numbers, booleans, null, objects, or
          arrays.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          JSON Syntax Rules
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Keys must be strings</strong> enclosed in double quotes.
            Single quotes are not valid JSON.
          </li>
          <li>
            <strong>Strings must use double quotes.</strong> This is the most
            common mistake for people coming from JavaScript, where single
            quotes are allowed.
          </li>
          <li>
            <strong>No trailing commas.</strong> The last item in an object or
            array must not have a comma after it.
          </li>
          <li>
            <strong>No comments.</strong> JSON does not support comments. If you
            need commented configuration, consider JSONC or YAML.
          </li>
          <li>
            <strong>Numbers cannot have leading zeros.</strong> Write 0.5, not
            .5 or 00.5.
          </li>
          <li>
            <strong>Boolean values are lowercase:</strong> true and false, not
            True or False.
          </li>
        </ul>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          A Valid JSON Example
        </h2>
        <pre className="overflow-x-auto rounded-lg bg-slate-100 p-4 text-xs leading-6 text-slate-700">
{`{
  "name": "CalcCanvas",
  "version": "1.0.0",
  "tools": 35,
  "categories": [
    "financial",
    "health",
    "math",
    "text",
    "developer"
  ],
  "isOpenSource": false,
  "pricing": null
}`}
        </pre>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          Common JSON Errors and How to Fix Them
        </h2>

        <h3 className="!mt-6 text-base font-semibold text-slate-800">
          1. Trailing Comma
        </h3>
        <p>
          Adding a comma after the last item is valid in JavaScript but invalid
          in JSON. Remove the comma after the final entry in every object and
          array.
        </p>

        <h3 className="!mt-6 text-base font-semibold text-slate-800">
          2. Single Quotes
        </h3>
        <p>
          JSON requires double quotes for both keys and string values. Replace
          all single quotes with double quotes.
        </p>

        <h3 className="!mt-6 text-base font-semibold text-slate-800">
          3. Unquoted Keys
        </h3>
        <p>
          In JavaScript objects, keys do not need quotes. In JSON, every key
          must be a quoted string.
        </p>

        <h3 className="!mt-6 text-base font-semibold text-slate-800">
          4. Missing or Extra Brackets
        </h3>
        <p>
          Mismatched curly braces or square brackets are easy to miss in large
          files. Use our{" "}
          <Link
            href="/tools/json-formatter"
            className="font-medium text-primary hover:underline"
          >
            JSON formatter
          </Link>{" "}
          to detect and highlight these errors automatically.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          Pretty Printing vs. Minifying
        </h2>
        <p>
          <strong>Pretty printing</strong> adds indentation and line breaks to
          make JSON human-readable. This is what you want when debugging or
          reviewing data.
        </p>
        <p>
          <strong>Minifying</strong> removes all unnecessary whitespace to
          reduce file size. This is preferred for production APIs and network
          transfers where every byte counts. A 100KB pretty-printed JSON file
          might shrink to 60KB when minified.
        </p>
        <p>
          Our{" "}
          <Link
            href="/tools/json-formatter"
            className="font-medium text-primary hover:underline"
          >
            JSON formatter
          </Link>{" "}
          supports both operations with a single click.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          JSON Validation
        </h2>
        <p>
          Validating JSON means checking that it conforms to the specification
          and can be parsed without errors. Common validators will tell you
          exactly where the problem is&mdash;the line number, character
          position, and type of error.
        </p>
        <p>
          Beyond syntax validation, <strong>JSON Schema</strong> lets you define
          the expected structure of your data (required fields, data types,
          value constraints) and validate documents against it. This is
          particularly useful for API contracts and configuration files.
        </p>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          Working with JSON in Different Languages
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>JavaScript:</strong> JSON.parse() and JSON.stringify() are
            built in.
          </li>
          <li>
            <strong>Python:</strong> The json module provides json.loads() and
            json.dumps().
          </li>
          <li>
            <strong>Java:</strong> Libraries like Jackson and Gson handle JSON
            serialization.
          </li>
          <li>
            <strong>Go:</strong> The encoding/json package provides Marshal and
            Unmarshal functions.
          </li>
        </ul>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          Related Developer Tools
        </h2>
        <p>
          When working with JSON and APIs, you may also find these CalcCanvas
          tools helpful:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <Link
              href="/tools/base64-encoder-decoder"
              className="font-medium text-primary hover:underline"
            >
              Base64 Encoder/Decoder
            </Link>{" "}
            &mdash; Encode or decode data for API payloads and tokens.
          </li>
          <li>
            <Link
              href="/tools/uuid-generator"
              className="font-medium text-primary hover:underline"
            >
              UUID Generator
            </Link>{" "}
            &mdash; Generate unique identifiers for JSON records.
          </li>
          <li>
            <Link
              href="/tools/hash-generator"
              className="font-medium text-primary hover:underline"
            >
              Hash Generator
            </Link>{" "}
            &mdash; Create MD5, SHA-1, or SHA-256 hashes for data integrity
            checks.
          </li>
        </ul>

        <div className="!mt-10 rounded-xl border border-primary/20 bg-primary/5 p-6 text-center">
          <p className="text-base font-semibold text-slate-900">
            Format and Validate JSON Instantly
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Paste your JSON, detect errors, pretty print, or minify in one
            click.
          </p>
          <Link
            href="/tools/json-formatter"
            className="mt-4 inline-flex items-center rounded-lg bg-[#2563eb] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#1d4ed8]"
          >
            Try Our JSON Formatter &rarr;
          </Link>
        </div>

        <h2 className="!mt-10 text-xl font-semibold text-slate-900">
          Key Takeaways
        </h2>
        <p>
          JSON is the universal data exchange format for modern development.
          Master the syntax rules (double quotes, no trailing commas, no
          comments), learn to spot common errors, and use a formatter/validator
          tool to save time. Whether you are debugging an API response, editing
          a configuration file, or building a data pipeline, clean and valid JSON
          is essential.
        </p>
      </div>

      <div className="mt-12">
        <Link
          href="/blog"
          className="text-sm font-medium text-primary hover:underline"
        >
          &larr; Back to Blog
        </Link>
      </div>
    </article>
  );
}
