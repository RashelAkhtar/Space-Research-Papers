"use client";

type ViewFilter = "all" | "saved";

interface SidebarProps {
  activeView: ViewFilter;
  totalCount: number;
  savedCount: number;
  onSelectView: (view: ViewFilter) => void;
}

export default function Sidebar({
  activeView,
  totalCount,
  savedCount,
  onSelectView,
}: SidebarProps) {
  return (
    <aside className="bg-ink text-paper/90 w-full md:w-64 md:min-h-screen md:shrink-0 flex flex-col">
      <div className="px-6 pt-8 pb-6 border-b border-white/10">
        <p className="font-serif text-2xl text-paper tracking-tight">Stacks</p>
        <p className="text-xs text-paper/50 mt-1 tracking-wide">
          a working paper library
        </p>
      </div>

      <nav className="px-3 pt-5 flex-1">
        <ViewLink
          label="All papers"
          count={totalCount}
          active={activeView === "all"}
          onClick={() => onSelectView("all")}
        />
        <ViewLink
          label="Saved"
          count={savedCount}
          active={activeView === "saved"}
          onClick={() => onSelectView("saved")}
        />
      </nav>

      <div className="px-6 py-5 border-t border-white/10 text-xs text-paper/40">
        {totalCount} papers catalogued
      </div>
    </aside>
  );
}

function ViewLink({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm mb-0.5 transition-colors cursor-pointer ${
        active
          ? "bg-white/10 text-paper"
          : "text-paper/70 hover:bg-white/5 hover:text-paper"
      }`}
    >
      <span>{label}</span>
      <span className="font-mono text-xs text-paper/40">{count}</span>
    </button>
  );
}