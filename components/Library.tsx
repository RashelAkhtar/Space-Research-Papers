"use client";

import { useMemo, useState } from "react";
import { Paper } from "@/lib/types";
import Sidebar from "@/components/Sidebar";
import PaperCard from "@/components/PaperCard";

type ViewFilter = "all" | "saved";

export default function Library({ initialPapers }: { initialPapers: Paper[] }) {
  const [papers] = useState(initialPapers);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState("");
  const [activeView, setActiveView] = useState<ViewFilter>("all");

  const savedCount = savedIds.size;

  const filtered = useMemo(() => {
    let list = papers;

    if (activeView === "saved") {
      list = list.filter((p) => savedIds.has(p.id));
    }

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((p) => {
        const haystack = `${p.title} ${p.abstract}`.toLowerCase();
        return haystack.includes(q);
      });
    }

    return list;
  }, [papers, savedIds, activeView, query]);

  function toggleSave(id: string) {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  const viewLabel = activeView === "saved" ? "Saved" : "All papers";

  return (
    <div className="min-h-screen md:flex">
      <Sidebar
        activeView={activeView}
        totalCount={papers.length}
        savedCount={savedCount}
        onSelectView={setActiveView}
      />

      <main className="flex-1 min-w-0">
        <header className="sticky top-0 z-10 bg-paper/95 backdrop-blur border-b border-rule px-6 md:px-10 py-5 flex items-center">
          <div className="relative flex-1 max-w-md">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-faint"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search title or abstract…"
              className="w-full pl-9 pr-3 py-2 rounded-md border border-rule bg-paper-raised text-sm placeholder:text-text-faint focus:outline-none focus:ring-2 focus:ring-ink/20 focus:border-ink-soft"
            />
          </div>
        </header>

        <div className="px-6 md:px-10 py-7">
          <div className="flex items-baseline justify-between mb-5">
            <h1 className="font-serif text-2xl text-text">{viewLabel}</h1>
            <span className="text-sm text-text-muted font-mono">
              {filtered.length} {filtered.length === 1 ? "paper" : "papers"}
            </span>
          </div>

          {filtered.length === 0 ? (
            <div className="border border-dashed border-rule rounded-lg py-16 text-center">
              <p className="text-text-muted text-sm">
                No papers match &ldquo;{query}&rdquo;. Try a different search.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filtered.map((paper) => (
                <PaperCard
                  key={paper.id}
                  paper={paper}
                  isSaved={savedIds.has(paper.id)}
                  onToggleSave={toggleSave}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}