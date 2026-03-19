"use client";

import { useState } from "react";
import Link from "next/link";

interface Tool {
  title: string;
  description: string;
  href: string;
  icon: string;
  category: string;
}

export default function SearchBar({ tools }: { tools: Tool[] }) {
  const [query, setQuery] = useState("");

  const filtered =
    query.length >= 2
      ? tools.filter(
          (t) =>
            t.title.toLowerCase().includes(query.toLowerCase()) ||
            t.category.toLowerCase().includes(query.toLowerCase())
        )
      : [];

  return (
    <div className="relative mx-auto max-w-xl">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search tools... (e.g. mortgage, BMI, JSON)"
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
      {filtered.length > 0 && (
        <div className="absolute left-0 right-0 z-10 mt-1 max-h-72 overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-lg">
          {filtered.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50"
              onClick={() => setQuery("")}
            >
              <span className="text-lg">{tool.icon}</span>
              <div>
                <div className="text-sm font-medium text-slate-900">
                  {tool.title}
                </div>
                <div className="text-xs text-slate-400">{tool.category}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
