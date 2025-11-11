"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { JetBrains_Mono } from "next/font/google";
import type { Experience } from "@/constants";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-editor",
});

type Props = {
  experiences: Experience[];
};

function buildCode(exp: Experience): string {
  const stackList = exp.stack?.join(", ") ?? "";
  
  // Remove trailing empty/whitespace-only strings from bullets
  const bulletLines = [...exp.bullets];
  while (bulletLines.length > 0) {
    const last = bulletLines[bulletLines.length - 1];
    if (last.trim() === "" || last.trim() === "---") {
      bulletLines.pop();
    } else {
      break;
    }
  }
  
  const lines: string[] = [];
  lines.push(`import { ${stackList} }  # key tech`);
  lines.push(`from datetime import date`);
  lines.push(`class Experience:`);
  lines.push(`    company = "${exp.company}"`);
  lines.push(`    role    = "${exp.role}"`);
  lines.push(`    period  = "${exp.start} - ${exp.end}"`);
  if (exp.location) {
    lines.push(`    location = "${exp.location}"`);
  }
  if (exp.url) {
    lines.push(`    link    = "${exp.url}"`);
  }
  lines.push(`def impact():`);
  lines.push(`    bullets = [`);
  for (const b of bulletLines) {
    const trimmed = b.trim();
    if (trimmed === "" || trimmed === "---") {
      lines.push(`        `);
    } else {
      lines.push(`        "${b.replace(/"/g, '\\"')}",`);
    }
  }
  
  lines.push(`    ]`);
  lines.push(`    return bullets`);
  
  // Remove all trailing blank lines - this ensures no trailing newlines in final string
  while (lines.length > 0 && lines[lines.length - 1].trim() === "") {
    lines.pop();
  }
  
  return lines.join("\n");
}

// Lightweight tokenizer for our controlled Python-like strings
function tokenize(line: string): Array<{ type: string; value: string }> {
  const tokens: Array<{ type: string; value: string }> = [];
  let i = 0;
  const push = (type: string, value: string) => tokens.push({ type, value });

  while (i < line.length) {
    const rest = line.slice(i);

    // Comments
    if (rest.startsWith("#")) {
      push("comment", rest);
      break;
    }

    // Strings (single or double quotes)
    if (rest[0] === '"' || rest[0] === "'") {
      const quote = rest[0];
      let j = 1;
      let val = quote;
      while (i + j < line.length) {
        const ch = line[i + j];
        val += ch;
        if (ch === "\\") {
          j += 1; // skip next char escaping
          if (i + j < line.length) {
            val += line[i + j];
          }
        } else if (ch === quote) {
          j += 1;
          break;
        }
        j += 1;
      }
      push("string", val);
      i += val.length;
      continue;
    }

    // Keywords
    const keywordMatch = rest.match(/^(import|from|class|def|return)\b/);
    if (keywordMatch) {
      push("keyword", keywordMatch[0]);
      i += keywordMatch[0].length;
      continue;
    }

    // Numbers
    const numberMatch = rest.match(/^\b\d+(?:_\d+)*(?:\.\d+)?\b/);
    if (numberMatch) {
      push("number", numberMatch[0]);
      i += numberMatch[0].length;
      continue;
    }

    // Punctuation / braces
    const puncMatch = rest.match(/^[\[\]\(\)\{\}\.,:=]/);
    if (puncMatch) {
      push("punc", puncMatch[0]);
      i += puncMatch[0].length;
      continue;
    }

    // Identifier / whitespace fallback (consume one char at a time to preserve spacing)
    push("text", rest[0]);
    i += 1;
  }

  return tokens;
}

function useKeyboardTabs(ids: string[], activeId: string, setActiveId: (id: string) => void) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        const idx = ids.indexOf(activeId);
        if (idx === -1) return;
        const next = e.key === "ArrowRight" ? (idx + 1) % ids.length : (idx - 1 + ids.length) % ids.length;
        setActiveId(ids[next]);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [ids, activeId, setActiveId]);
}

export default function ExperienceIDE({ experiences }: Props) {
  const [activeId, setActiveId] = useState(experiences[0]?.id ?? "");
  const ids = useMemo(() => experiences.map((e) => e.id), [experiences]);
  useKeyboardTabs(ids, activeId, setActiveId);

  const active = useMemo(() => experiences.find((e) => e.id === activeId) ?? experiences[0], [experiences, activeId]);
  const code = useMemo(() => (active ? buildCode(active) : ""), [active]);
  const lines = useMemo(() => code.split("\n"), [code]);

  const prefersReduced = useRef<boolean>(false);
  useEffect(() => {
    prefersReduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const mounted = useRef<boolean>(false);
  const [animClass, setAnimClass] = useState<string>("");
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    const start = prefersReduced.current ? "opacity-0" : "opacity-0 translate-y-1";
    const end = prefersReduced.current ? "opacity-100" : "opacity-100 translate-y-0";
    setAnimClass(start);
    const raf = requestAnimationFrame(() => setAnimClass(end));
    return () => cancelAnimationFrame(raf);
  }, [activeId]);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
      alert("Failed to copy to clipboard. Please try again.");
    }
  }, [code]);

  return (
    <div className={`rounded-xl border shadow-md bg-[var(--editor-bg)] border-[var(--panel-border)] overflow-hidden ${jetbrainsMono.variable}`}>
      {/* Title bar */}
      <div className="relative flex items-center justify-between h-8 px-2 border-b border-[var(--panel-border)] bg-gradient-to-b from-[#10131a] to-[#0d1017]">
        <div className="flex items-center gap-2">
          <span className="inline-flex gap-1">
            <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
            <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
          </span>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 text-[10px] sm:text-xs text-[var(--text-default)]/80 font-medium tabular-nums pointer-events-none select-none">
          {active?.filename}
        </div>
        <div className="flex items-center">
          <button
            type="button"
            aria-label="Copy code"
            onClick={copy}
            className="group px-1.5 py-0.5 rounded-md text-[var(--text-default)]/70 hover:text-[var(--text-default)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[#5b9cff] focus-visible:ring-offset-[var(--editor-bg)]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="opacity-80 group-hover:opacity-100">
              <path d="M9 9h9v12H9z" stroke="currentColor" strokeWidth="1.5" />
              <path d="M6 3h9v3M6 3v12h3" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto snap-x snap-mandatory px-2 py-1 border-b border-[var(--panel-border)] bg-[#0e1118]" role="tablist" aria-label="Experience tabs">
        {experiences.map((e) => {
          const activeTab = e.id === active?.id;
          return (
            <button
              key={e.id}
              type="button"
              className={`tab ${activeTab ? "tab-active" : ""}`}
              onClick={() => setActiveId(e.id)}
              role="tab"
              aria-selected={activeTab}
            >
              <span className="truncate max-w-[40vw] sm:max-w-xs">{e.company} — {e.role}</span>
            </button>
          );
        })}
      </div>

      {/* Editor */}
      <div
        role="region"
        aria-label="Code editor"
        tabIndex={0}
        onKeyDown={(e) => {
          if ((e.metaKey || e.ctrlKey) && (e.key === "c" || e.key === "C")) {
            e.preventDefault();
            copy();
          }
        }}
        className={`editor font-[var(--font-editor),ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace] text-[11px] sm:text-[12px] leading-5 text-[var(--text-default)]`}
      >
        <div className="relative overflow-x-auto">
          <div className={`grid grid-cols-[auto_1fr] min-w-full transition-all duration-150 ease-out ${prefersReduced.current ? "" : "transform-gpu"} ${animClass}`}>
            {/* Gutter */}
            <div className="gutter select-none text-right pr-2 py-1.5 sm:py-2">
              {lines.map((_, idx) => (
                <div key={idx} className="tabular-nums text-[9px] sm:text-[11px] text-[var(--comment)]">
                  {idx + 1}
                </div>
              ))}
            </div>

            {/* Code */}
            <div className="py-1.5 sm:py-2 pr-2 sm:pr-3 min-w-0">
              {lines.map((line, idx) => (
                <div key={idx} className="whitespace-pre">
                  {tokenize(line).map((t, i) => {
                    if (t.type === "keyword") return <span key={i} className="tok-keyword">{t.value}</span>;
                    if (t.type === "string") {
                      const v = t.value;
                      const quote = v[0];
                      const inner = v.length >= 2 ? v.slice(1, -1) : v;
                      const isUrl = /^https?:\/\//.test(inner);
                      if (isUrl) {
                        return (
                          <span key={`url-${idx}-${i}`}>
                            <span className="tok-string">{quote}</span>
                            <a
                              href={inner}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="tok-string underline decoration-dotted hover:decoration-solid"
                            >
                              {inner}
                            </a>
                            <span className="tok-string">{quote}</span>
                          </span>
                        );
                      }
                      return <span key={i} className="tok-string">{t.value}</span>;
                    }
                    if (t.type === "number") return <span key={i} className="tok-number">{t.value}</span>;
                    if (t.type === "comment") return <span key={i} className="tok-comment">{t.value}</span>;
                    if (t.type === "punc") return <span key={i} className="tok-punc">{t.value}</span>;
                    return <span key={i}>{t.value}</span>;
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


