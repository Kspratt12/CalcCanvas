"use client";

import { useState } from "react";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [prev, setPrev] = useState<number | null>(null);
  const [op, setOp] = useState<string | null>(null);
  const [resetNext, setResetNext] = useState(false);
  const [memory, setMemory] = useState(0);
  const [mode, setMode] = useState<"basic" | "scientific">("basic");
  const [isDeg, setIsDeg] = useState(true);

  const handleNumber = (n: string) => {
    if (resetNext) {
      setDisplay(n);
      setResetNext(false);
    } else {
      setDisplay(display === "0" ? n : display + n);
    }
  };

  const handleDecimal = () => {
    if (resetNext) {
      setDisplay("0.");
      setResetNext(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const calculate = (a: number, operator: string, b: number): number => {
    switch (operator) {
      case "+": return a + b;
      case "-": return a - b;
      case "*": return a * b;
      case "/": return b === 0 ? NaN : a / b;
      case "^": return Math.pow(a, b);
      default: return b;
    }
  };

  const handleOperator = (nextOp: string) => {
    const current = parseFloat(display);
    if (prev !== null && op && !resetNext) {
      const result = calculate(prev, op, current);
      setPrev(result);
      setDisplay(String(parseFloat(result.toFixed(10))));
    } else {
      setPrev(current);
    }
    setOp(nextOp);
    setResetNext(true);
  };

  const handleEquals = () => {
    if (prev === null || !op) return;
    const current = parseFloat(display);
    const result = calculate(prev, op, current);
    setDisplay(isNaN(result) ? "Error" : String(parseFloat(result.toFixed(10))));
    setPrev(null);
    setOp(null);
    setResetNext(true);
  };

  const handleClear = () => {
    setDisplay("0");
    setPrev(null);
    setOp(null);
    setResetNext(false);
  };

  const handlePercent = () => {
    const val = parseFloat(display);
    setDisplay(String(parseFloat((val / 100).toFixed(10))));
    setResetNext(true);
  };

  const handleToggleSign = () => {
    setDisplay(String(parseFloat(display) * -1));
  };

  const handleBackspace = () => {
    if (display.length === 1 || (display.length === 2 && display.startsWith("-"))) {
      setDisplay("0");
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  // Scientific functions
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const toDeg = (rad: number) => (rad * 180) / Math.PI;

  const handleScientific = (fn: string) => {
    const val = parseFloat(display);
    let result: number;
    switch (fn) {
      case "sin": result = isDeg ? Math.sin(toRad(val)) : Math.sin(val); break;
      case "cos": result = isDeg ? Math.cos(toRad(val)) : Math.cos(val); break;
      case "tan": result = isDeg ? Math.tan(toRad(val)) : Math.tan(val); break;
      case "asin": result = isDeg ? toDeg(Math.asin(val)) : Math.asin(val); break;
      case "acos": result = isDeg ? toDeg(Math.acos(val)) : Math.acos(val); break;
      case "atan": result = isDeg ? toDeg(Math.atan(val)) : Math.atan(val); break;
      case "sqrt": result = Math.sqrt(val); break;
      case "cbrt": result = Math.cbrt(val); break;
      case "square": result = val * val; break;
      case "cube": result = val * val * val; break;
      case "ln": result = Math.log(val); break;
      case "log": result = Math.log10(val); break;
      case "exp": result = Math.exp(val); break;
      case "10x": result = Math.pow(10, val); break;
      case "1/x": result = 1 / val; break;
      case "fact": result = factorial(val); break;
      case "abs": result = Math.abs(val); break;
      case "pi": result = Math.PI; break;
      case "e": result = Math.E; break;
      default: result = val;
    }
    setDisplay(isNaN(result) || !isFinite(result) ? "Error" : String(parseFloat(result.toFixed(10))));
    setResetNext(true);
  };

  const factorial = (n: number): number => {
    if (n < 0 || !Number.isInteger(n)) return NaN;
    if (n <= 1) return 1;
    if (n > 170) return Infinity;
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
  };

  const btnBase = "flex items-center justify-center rounded-lg font-medium transition select-none active:scale-95 text-sm sm:text-base";
  const btnNum = `${btnBase} bg-white border border-slate-200 text-slate-900 hover:bg-slate-50 h-12 sm:h-14`;
  const btnOp = `${btnBase} bg-[#2563eb] text-white hover:bg-blue-700 h-12 sm:h-14`;
  const btnFunc = `${btnBase} bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 h-12 sm:h-14`;
  const btnSci = `${btnBase} bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 h-10 sm:h-12 text-xs sm:text-sm`;

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Mode toggle */}
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setMode("basic")}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
            mode === "basic" ? "bg-[#2563eb] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Basic
        </button>
        <button
          onClick={() => setMode("scientific")}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
            mode === "scientific" ? "bg-[#2563eb] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Scientific
        </button>
      </div>

      {/* Display */}
      <div className="bg-slate-900 rounded-xl p-4 mb-3">
        <div className="text-right text-xs text-slate-400 h-5">
          {prev !== null && op ? `${prev} ${op === "*" ? "\u00D7" : op === "/" ? "\u00F7" : op}` : ""}
        </div>
        <div className="text-right text-3xl sm:text-4xl font-mono text-white overflow-x-auto whitespace-nowrap">
          {display}
        </div>
      </div>

      {/* Scientific buttons */}
      {mode === "scientific" && (
        <div className="mb-2 space-y-1.5">
          <div className="flex gap-1.5 justify-end mb-1">
            <button
              onClick={() => setIsDeg(true)}
              className={`px-3 py-1 rounded text-xs font-medium transition ${isDeg ? "bg-[#2563eb] text-white" : "bg-slate-100 text-slate-600"}`}
            >
              DEG
            </button>
            <button
              onClick={() => setIsDeg(false)}
              className={`px-3 py-1 rounded text-xs font-medium transition ${!isDeg ? "bg-[#2563eb] text-white" : "bg-slate-100 text-slate-600"}`}
            >
              RAD
            </button>
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            <button onClick={() => handleScientific("sin")} className={btnSci}>sin</button>
            <button onClick={() => handleScientific("cos")} className={btnSci}>cos</button>
            <button onClick={() => handleScientific("tan")} className={btnSci}>tan</button>
            <button onClick={() => handleScientific("ln")} className={btnSci}>ln</button>
            <button onClick={() => handleScientific("log")} className={btnSci}>log</button>
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            <button onClick={() => handleScientific("asin")} className={btnSci}>sin⁻¹</button>
            <button onClick={() => handleScientific("acos")} className={btnSci}>cos⁻¹</button>
            <button onClick={() => handleScientific("atan")} className={btnSci}>tan⁻¹</button>
            <button onClick={() => handleScientific("exp")} className={btnSci}>eˣ</button>
            <button onClick={() => handleScientific("10x")} className={btnSci}>10ˣ</button>
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            <button onClick={() => handleScientific("square")} className={btnSci}>x²</button>
            <button onClick={() => handleScientific("cube")} className={btnSci}>x³</button>
            <button onClick={() => handleOperator("^")} className={btnSci}>xʸ</button>
            <button onClick={() => handleScientific("sqrt")} className={btnSci}>{"\u221A"}x</button>
            <button onClick={() => handleScientific("cbrt")} className={btnSci}>{"\u221B"}x</button>
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            <button onClick={() => handleScientific("pi")} className={btnSci}>{"\u03C0"}</button>
            <button onClick={() => handleScientific("e")} className={btnSci}>e</button>
            <button onClick={() => handleScientific("fact")} className={btnSci}>n!</button>
            <button onClick={() => handleScientific("abs")} className={btnSci}>|x|</button>
            <button onClick={() => handleScientific("1/x")} className={btnSci}>1/x</button>
          </div>
        </div>
      )}

      {/* Memory row */}
      <div className="grid grid-cols-4 gap-1.5 mb-1.5">
        <button onClick={() => setMemory(0)} className={`${btnSci} text-red-500`}>MC</button>
        <button onClick={() => { setDisplay(String(memory)); setResetNext(true); }} className={btnSci}>MR</button>
        <button onClick={() => setMemory(memory + parseFloat(display))} className={btnSci}>M+</button>
        <button onClick={() => setMemory(memory - parseFloat(display))} className={btnSci}>M-</button>
      </div>

      {/* Main buttons */}
      <div className="grid grid-cols-4 gap-1.5">
        <button onClick={handleClear} className={`${btnFunc} text-red-500 font-semibold`}>AC</button>
        <button onClick={handleToggleSign} className={btnFunc}>+/-</button>
        <button onClick={handlePercent} className={btnFunc}>%</button>
        <button onClick={() => handleOperator("/")} className={btnOp}>{"\u00F7"}</button>

        <button onClick={() => handleNumber("7")} className={btnNum}>7</button>
        <button onClick={() => handleNumber("8")} className={btnNum}>8</button>
        <button onClick={() => handleNumber("9")} className={btnNum}>9</button>
        <button onClick={() => handleOperator("*")} className={btnOp}>{"\u00D7"}</button>

        <button onClick={() => handleNumber("4")} className={btnNum}>4</button>
        <button onClick={() => handleNumber("5")} className={btnNum}>5</button>
        <button onClick={() => handleNumber("6")} className={btnNum}>6</button>
        <button onClick={() => handleOperator("-")} className={btnOp}>-</button>

        <button onClick={() => handleNumber("1")} className={btnNum}>1</button>
        <button onClick={() => handleNumber("2")} className={btnNum}>2</button>
        <button onClick={() => handleNumber("3")} className={btnNum}>3</button>
        <button onClick={() => handleOperator("+")} className={btnOp}>+</button>

        <button onClick={() => handleNumber("0")} className={`${btnNum} col-span-1`}>0</button>
        <button onClick={handleDecimal} className={btnNum}>.</button>
        <button onClick={handleBackspace} className={btnFunc}>{"\u232B"}</button>
        <button onClick={handleEquals} className={`${btnBase} bg-green-500 text-white hover:bg-green-600 h-12 sm:h-14 font-semibold`}>=</button>
      </div>
    </div>
  );
}
