"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

const RELATED_TOOLS = [
  { name: "Percentage Calculator", href: "/tools/percentage-calculator" },
  { name: "Square Root Calculator", href: "/tools/square-root-calculator" },
  { name: "Fraction Calculator", href: "/tools/fraction-calculator" },
  { name: "Unit Converter", href: "/tools/unit-converter" },
];

function factorial(n: number): number {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  if (n > 170) return Infinity;
  if (!Number.isInteger(n)) return NaN;
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

export default function ScientificCalculatorPage() {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [angleMode, setAngleMode] = useState<"DEG" | "RAD">("DEG");
  const [memory, setMemory] = useState(0);
  const [history, setHistory] = useState<{ expr: string; result: string }[]>(
    []
  );
  const [showHistory, setShowHistory] = useState(false);

  const toRad = useCallback(
    (val: number) => (angleMode === "DEG" ? (val * Math.PI) / 180 : val),
    [angleMode]
  );
  const fromRad = useCallback(
    (val: number) => (angleMode === "DEG" ? (val * 180) / Math.PI : val),
    [angleMode]
  );

  const appendToDisplay = (val: string) => {
    setDisplay((prev) => (prev === "0" && val !== "." ? val : prev + val));
  };

  const handleOperator = (op: string) => {
    setExpression((prev) => prev + display + " " + op + " ");
    setDisplay("0");
  };

  const handleEquals = () => {
    try {
      const fullExpr = expression + display;
      // Build a safe evaluation by replacing symbols
      let evalExpr = fullExpr
        .replace(/\u00d7/g, "*")
        .replace(/\u00f7/g, "/")
        .replace(/\u03c0/g, String(Math.PI))
        .replace(/e(?![xvl])/g, String(Math.E));

      // eslint-disable-next-line no-eval
      const result = Function(`"use strict"; return (${evalExpr})`)();
      const resultStr =
        typeof result === "number"
          ? Number.isInteger(result)
            ? result.toString()
            : parseFloat(result.toFixed(10)).toString()
          : String(result);

      setHistory((prev) => [
        { expr: fullExpr, result: resultStr },
        ...prev.slice(0, 19),
      ]);
      setDisplay(resultStr);
      setExpression("");
    } catch {
      setDisplay("Error");
      setExpression("");
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setExpression("");
  };

  const handleBackspace = () => {
    setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
  };

  const handleScientific = (fn: string) => {
    const val = parseFloat(display);
    if (isNaN(val) && fn !== "(" && fn !== ")") {
      setDisplay("Error");
      return;
    }
    let result: number;
    switch (fn) {
      case "sin":
        result = Math.sin(toRad(val));
        break;
      case "cos":
        result = Math.cos(toRad(val));
        break;
      case "tan":
        result = Math.tan(toRad(val));
        break;
      case "asin":
        result = fromRad(Math.asin(val));
        break;
      case "acos":
        result = fromRad(Math.acos(val));
        break;
      case "atan":
        result = fromRad(Math.atan(val));
        break;
      case "log":
        result = Math.log10(val);
        break;
      case "ln":
        result = Math.log(val);
        break;
      case "sqrt":
        result = Math.sqrt(val);
        break;
      case "cbrt":
        result = Math.cbrt(val);
        break;
      case "x2":
        result = val * val;
        break;
      case "x3":
        result = val * val * val;
        break;
      case "1/x":
        result = 1 / val;
        break;
      case "n!":
        result = factorial(val);
        break;
      case "abs":
        result = Math.abs(val);
        break;
      case "+/-":
        result = -val;
        break;
      case "%":
        result = val / 100;
        break;
      case "exp":
        result = Math.exp(val);
        break;
      case "10x":
        result = Math.pow(10, val);
        break;
      default:
        return;
    }
    const resultStr = Number.isInteger(result)
      ? result.toString()
      : parseFloat(result.toFixed(10)).toString();
    setDisplay(isNaN(result) || !isFinite(result) ? "Error" : resultStr);
  };

  const handleParenthesis = (p: string) => {
    if (p === "(") {
      setExpression((prev) => prev + (display !== "0" ? display + " \u00d7 " : "") + "( ");
      setDisplay("0");
    } else {
      setExpression((prev) => prev + display + " ) ");
      setDisplay("0");
    }
  };

  const handleConstant = (c: string) => {
    if (c === "pi") setDisplay(Math.PI.toFixed(10));
    if (c === "e") setDisplay(Math.E.toFixed(10));
  };

  const handlePower = () => {
    handleOperator("**");
  };

  const btnBase =
    "rounded-lg font-medium text-sm transition active:scale-95 flex items-center justify-center";
  const btnNum = `${btnBase} bg-white border border-gray-200 text-gray-800 hover:bg-gray-50 p-3`;
  const btnOp = `${btnBase} bg-blue-50 text-[#2563eb] hover:bg-blue-100 border border-blue-200 p-3`;
  const btnSci = `${btnBase} bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 p-2.5 text-xs`;
  const btnAction = `${btnBase} bg-[#2563eb] text-white hover:bg-blue-700 p-3`;

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is the difference between DEG and RAD mode?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "DEG mode interprets angles in degrees (a full circle is 360 degrees), while RAD mode uses radians (a full circle is 2\u03c0 radians). Most everyday calculations use degrees. Radians are the standard in higher mathematics and most programming languages. Always check which mode is active before computing trigonometric functions.",
                },
              },
              {
                "@type": "Question",
                name: "How do the memory functions work?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "MC clears the memory to zero. MR recalls the stored value and places it on the display. M+ adds the current display value to the memory. M- subtracts the current display value from the memory. Memory persists until you clear it or refresh the page.",
                },
              },
              {
                "@type": "Question",
                name: "What is the largest factorial this calculator can compute?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The calculator can compute factorials up to 170! (which is approximately 7.26 \u00d7 10\u00b3\u2070\u2076). Beyond that, the result exceeds the maximum value JavaScript can represent and returns Infinity.",
                },
              },
              {
                "@type": "Question",
                name: "Can I use parentheses for order of operations?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Use the ( and ) buttons to group sub-expressions. The calculator evaluates parenthesized expressions first, following standard mathematical order of operations (PEMDAS).",
                },
              },
              {
                "@type": "Question",
                name: "Is my calculation history saved permanently?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. The history is stored in your browser's session memory and is cleared when you refresh or close the page. Up to 20 recent calculations are kept during a single session.",
                },
              },
            ],
          }),
        }}
      />

      <h1 className="text-3xl font-bold mb-2">Scientific Calculator</h1>
      <p className="text-gray-600 mb-6">
        A full-featured scientific calculator with trigonometry, logarithms,
        exponents, memory functions, and calculation history.
      </p>

      <div className="w-full max-w-[728px] h-[90px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm mx-auto mb-8 rounded">
        Advertisement
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 mb-6 max-w-md mx-auto">
        {/* Mode + History toggle */}
        <div className="flex justify-between items-center mb-3">
          <button
            onClick={() =>
              setAngleMode((m) => (m === "DEG" ? "RAD" : "DEG"))
            }
            className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition border border-slate-200"
          >
            {angleMode}
          </button>
          <button
            onClick={() => setShowHistory((s) => !s)}
            className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 transition border border-slate-200"
          >
            {showHistory ? "Calculator" : "History"}
          </button>
        </div>

        {showHistory ? (
          <div className="min-h-[420px]">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Recent Calculations
            </h3>
            {history.length === 0 ? (
              <p className="text-gray-400 text-sm">No calculations yet.</p>
            ) : (
              <ul className="space-y-2 text-sm max-h-[380px] overflow-y-auto">
                {history.map((item, i) => (
                  <li
                    key={i}
                    className="bg-gray-50 rounded-lg p-3 cursor-pointer hover:bg-gray-100 transition"
                    onClick={() => {
                      setDisplay(item.result);
                      setExpression("");
                      setShowHistory(false);
                    }}
                  >
                    <div className="text-gray-500 text-xs truncate">
                      {item.expr}
                    </div>
                    <div className="text-gray-800 font-medium">
                      = {item.result}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <>
            {/* Display */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4 text-right">
              <div className="text-xs text-gray-400 h-5 truncate">
                {expression || "\u00a0"}
              </div>
              <div className="text-3xl font-bold text-gray-900 truncate">
                {display}
              </div>
            </div>

            {/* Memory row */}
            <div className="grid grid-cols-4 gap-2 mb-2">
              <button
                className={btnSci}
                onClick={() => setMemory(0)}
              >
                MC
              </button>
              <button
                className={btnSci}
                onClick={() => {
                  setDisplay(
                    Number.isInteger(memory)
                      ? memory.toString()
                      : parseFloat(memory.toFixed(10)).toString()
                  );
                }}
              >
                MR
              </button>
              <button
                className={btnSci}
                onClick={() =>
                  setMemory((m) => m + (parseFloat(display) || 0))
                }
              >
                M+
              </button>
              <button
                className={btnSci}
                onClick={() =>
                  setMemory((m) => m - (parseFloat(display) || 0))
                }
              >
                M&minus;
              </button>
            </div>

            {/* Scientific functions rows */}
            <div className="grid grid-cols-5 gap-2 mb-2">
              <button className={btnSci} onClick={() => handleScientific("sin")}>sin</button>
              <button className={btnSci} onClick={() => handleScientific("cos")}>cos</button>
              <button className={btnSci} onClick={() => handleScientific("tan")}>tan</button>
              <button className={btnSci} onClick={() => handleScientific("log")}>log</button>
              <button className={btnSci} onClick={() => handleScientific("ln")}>ln</button>
            </div>
            <div className="grid grid-cols-5 gap-2 mb-2">
              <button className={btnSci} onClick={() => handleScientific("asin")}>sin&sup1;</button>
              <button className={btnSci} onClick={() => handleScientific("acos")}>cos&sup1;</button>
              <button className={btnSci} onClick={() => handleScientific("atan")}>tan&sup1;</button>
              <button className={btnSci} onClick={() => handleScientific("exp")}>e&#x02E3;</button>
              <button className={btnSci} onClick={() => handleScientific("10x")}>10&#x02E3;</button>
            </div>
            <div className="grid grid-cols-5 gap-2 mb-3">
              <button className={btnSci} onClick={() => handleScientific("x2")}>x&sup2;</button>
              <button className={btnSci} onClick={() => handleScientific("x3")}>x&sup3;</button>
              <button className={btnSci} onClick={() => handleScientific("sqrt")}>&radic;</button>
              <button className={btnSci} onClick={() => handleScientific("cbrt")}>&sup3;&radic;</button>
              <button className={btnSci} onClick={() => handleScientific("n!")}>n!</button>
            </div>
            <div className="grid grid-cols-5 gap-2 mb-3">
              <button className={btnSci} onClick={() => handleParenthesis("(")}>(</button>
              <button className={btnSci} onClick={() => handleParenthesis(")")}>)</button>
              <button className={btnSci} onClick={() => handleConstant("pi")}>&pi;</button>
              <button className={btnSci} onClick={() => handleConstant("e")}>e</button>
              <button className={btnSci} onClick={handlePower}>x&#x02b8;</button>
            </div>

            {/* Main keypad */}
            <div className="grid grid-cols-4 gap-2">
              <button className={btnOp} onClick={handleClear}>AC</button>
              <button className={btnOp} onClick={() => handleScientific("+/-")}>+/&minus;</button>
              <button className={btnOp} onClick={() => handleScientific("%")}>%</button>
              <button className={btnOp} onClick={() => handleOperator("\u00f7")}>&divide;</button>

              <button className={btnNum} onClick={() => appendToDisplay("7")}>7</button>
              <button className={btnNum} onClick={() => appendToDisplay("8")}>8</button>
              <button className={btnNum} onClick={() => appendToDisplay("9")}>9</button>
              <button className={btnOp} onClick={() => handleOperator("\u00d7")}>&times;</button>

              <button className={btnNum} onClick={() => appendToDisplay("4")}>4</button>
              <button className={btnNum} onClick={() => appendToDisplay("5")}>5</button>
              <button className={btnNum} onClick={() => appendToDisplay("6")}>6</button>
              <button className={btnOp} onClick={() => handleOperator("-")}>&minus;</button>

              <button className={btnNum} onClick={() => appendToDisplay("1")}>1</button>
              <button className={btnNum} onClick={() => appendToDisplay("2")}>2</button>
              <button className={btnNum} onClick={() => appendToDisplay("3")}>3</button>
              <button className={btnOp} onClick={() => handleOperator("+")}>+</button>

              <button className={btnSci} onClick={() => handleScientific("1/x")}>1/x</button>
              <button className={btnNum} onClick={() => appendToDisplay("0")}>0</button>
              <button className={btnNum} onClick={() => appendToDisplay(".")}>.</button>
              <button className={btnAction} onClick={handleEquals}>=</button>
            </div>

            <button
              onClick={handleBackspace}
              className="w-full mt-2 bg-gray-100 text-gray-600 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
            >
              &larr; Backspace
            </button>
          </>
        )}
      </div>

      <div className="w-[300px] h-[250px] bg-gray-200 flex items-center justify-center text-gray-500 text-sm mx-auto mt-8 rounded">
        Advertisement
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">
          What Is a Scientific Calculator?
        </h2>
        <p className="text-gray-700 mb-3">
          A scientific calculator extends the basic four operations &mdash;
          addition, subtraction, multiplication, and division &mdash; with
          functions that students, engineers, and scientists use every day.
          These include trigonometric functions (sine, cosine, tangent and their
          inverses), logarithms (base-10 and natural), exponents, roots,
          factorials, and constants like &pi; and Euler&apos;s number e.
        </p>
        <p className="text-gray-700 mb-3">
          This online version also includes memory registers (MC, MR, M+, M&minus;)
          so you can store intermediate results, a DEG/RAD toggle for angle
          units, parentheses for controlling order of operations, and a scrollable
          history of your recent calculations. It is designed to feel like a
          physical scientific calculator while being accessible from any device
          with a browser.
        </p>
        <p className="text-gray-700">
          All computation runs locally in JavaScript. No data is sent to a
          server, and the calculator works offline once the page has loaded.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Example</h2>
        <p className="text-gray-700 mb-3">
          Suppose you need to find the hypotenuse of a right triangle with legs
          of 5 and 12. Enter &quot;5&quot;, press x&sup2; to get 25, then press
          &quot;+&quot;, enter &quot;12&quot;, press x&sup2; to get 144, then
          press &quot;=&quot; to get 169. Finally, press &radic; to get 13 &mdash;
          the hypotenuse. You can also compute sin(45&deg;) in DEG mode: enter
          &quot;45&quot; and press &quot;sin&quot; to get approximately 0.7071067812.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">
          Frequently Asked Questions
        </h2>

        <h3 className="text-lg font-medium mt-4 mb-2">
          What is the difference between DEG and RAD mode?
        </h3>
        <p className="text-gray-700 mb-3">
          DEG mode interprets angles in degrees (a full circle is 360&deg;),
          while RAD mode uses radians (a full circle is 2&pi;). Most everyday
          calculations use degrees. Radians are the standard in higher
          mathematics and most programming languages. Always check which mode is
          active before computing trigonometric functions.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">
          How do the memory functions work?
        </h3>
        <p className="text-gray-700 mb-3">
          MC clears the memory to zero. MR recalls the stored value and places
          it on the display. M+ adds the current display value to the memory.
          M&minus; subtracts the current display value from the memory. Memory
          persists until you clear it or refresh the page.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">
          What is the largest factorial this calculator can compute?
        </h3>
        <p className="text-gray-700 mb-3">
          The calculator can compute factorials up to 170! (approximately
          7.26 &times; 10&sup3;&deg;&sup6;). Beyond that, the result exceeds
          JavaScript&apos;s maximum representable number and returns Infinity.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">
          Can I use parentheses for order of operations?
        </h3>
        <p className="text-gray-700 mb-3">
          Yes. Use the ( and ) buttons to group sub-expressions. The calculator
          evaluates parenthesized expressions first, following standard
          mathematical order of operations (PEMDAS).
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">
          Is my calculation history saved permanently?
        </h3>
        <p className="text-gray-700 mb-3">
          No. The history is stored in your browser&apos;s session memory and is
          cleared when you refresh or close the page. Up to 20 recent
          calculations are kept during a single session.
        </p>
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
