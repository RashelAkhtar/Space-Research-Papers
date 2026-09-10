"use client";

import { Paper } from "@/lib/types";

interface PaperCardProps {
  paper: Paper;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export default function PaperCard({ paper, isSaved, onToggleSave }: PaperCardProps) {
  return (
    <article className="group bg-paper-raised border border-rule rounded-lg pl-5 pr-5 py-5 flex flex-col gap-3 hover:border-rule-strong transition-colors">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-serif text-lg leading-snug text-text">
          {paper.url ? (
            <a
              href={paper.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brick transition-colors"
            >
              {paper.title}
            </a>
          ) : (
            paper.title
          )}
        </h3>

        <button
          onClick={() => onToggleSave(paper.id)}
          aria-pressed={isSaved}
          aria-label={isSaved ? "Remove from saved" : "Save paper"}
          className={`shrink-0 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
            isSaved
              ? "bg-brick/10 border-brick/30 text-brick"
              : "border-rule text-text-muted hover:border-rule-strong hover:text-text"
          }`}
        >
          {isSaved ? "Saved" : "Save"}
        </button>
      </div>

      <p className="text-sm text-text-muted leading-relaxed line-clamp-2">
        {paper.abstract}
      </p>

      {paper.url && (
        <div className="flex justify-end pt-1">
          <a
            href={paper.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-ink-soft hover:text-brick transition-colors whitespace-nowrap"
          >
            Read paper &#8599;
          </a>
        </div>
      )}
    </article>
  );
}