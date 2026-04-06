"use client";

import { useState, useTransition, useMemo, useRef, useEffect } from "react";
import { markIdeaRead, markIdeaUnread, deleteIdea } from "@/actions/ideas";
import { exportIdeasCSV } from "@/actions/waitlist";
import { useDeleteConfirm } from "@/hooks/use-delete-confirm";
import { downloadCsv } from "@/lib/download-csv";

interface Idea {
  id: string;
  name: string | null;
  email: string | null;
  category: string | null;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

type Filter = "all" | "unread" | "read";

export function IdeasClient({ ideas }: { ideas: Idea[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Idea | null>(null);
  const [isPending, startTransition] = useTransition();
  const { confirmId: deleteConfirm, request: requestDelete, clear: clearDelete } = useDeleteConfirm();
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (selected) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      modalRef.current?.focus();
    } else {
      previousFocusRef.current?.focus();
    }
  }, [selected]);

  const filtered = useMemo(() => {
    return ideas.filter((i) => {
      const matchFilter =
        filter === "all" || (filter === "unread" ? !i.isRead : i.isRead);
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        i.message.toLowerCase().includes(q) ||
        (i.name ?? "").toLowerCase().includes(q) ||
        (i.email ?? "").toLowerCase().includes(q) ||
        (i.category ?? "").toLowerCase().includes(q);
      return matchFilter && matchSearch;
    });
  }, [ideas, filter, search]);

  const handleSelect = (idea: Idea) => {
    setSelected(idea);
    if (!idea.isRead) {
      startTransition(() => markIdeaRead(idea.id));
    }
  };

  const handleDelete = (id: string) => {
    if (deleteConfirm === id) {
      startTransition(() => deleteIdea(id));
      setSelected(null);
      clearDelete();
    } else {
      requestDelete(id);
    }
  };

  const handleExport = async () => {
    const result = await exportIdeasCSV();
    if (result.csv) {
      downloadCsv(result.csv, `idees-${new Date().toISOString().split("T")[0]}.csv`);
    }
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex gap-2">
          {(["all", "unread", "read"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-[#00e5a0]/10 text-[#00e5a0] border border-[#00e5a0]/30"
                  : "text-[#6a8a7a] hover:text-white bg-[#0f1a14] border border-white/10"
              }`}
            >
              {f === "all" ? "Toutes" : f === "unread" ? "Non lues" : "Lues"}{" "}
              <span className="text-xs opacity-60">
                ({f === "all" ? ideas.length : f === "unread" ? ideas.filter(i => !i.isRead).length : ideas.filter(i => i.isRead).length})
              </span>
            </button>
          ))}
        </div>
        <div className="flex gap-2 sm:ml-auto">
          {/* Search */}
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6a8a7a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Rechercher..."
              aria-label="Rechercher"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-lg bg-[#0f1a14] border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#00e5a0]/40 w-40"
            />
          </div>
          {/* Export */}
          <button
            onClick={handleExport}
            title="Exporter en CSV"
            className="px-3 py-1.5 rounded-lg bg-[#0f1a14] border border-white/10 text-[#6a8a7a] hover:text-[#00e5a0] hover:border-[#00e5a0]/30 text-sm transition-colors flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            CSV
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="p-12 rounded-xl bg-[#0f1a14] border border-white/10 text-center">
          <p className="text-[#6a8a7a]">{search ? "Aucun résultat" : "Aucune idée"}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((idea) => (
            <div
              key={idea.id}
              role="button"
              tabIndex={0}
              onClick={() => handleSelect(idea)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleSelect(idea); } }}
              className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all border ${
                selected?.id === idea.id
                  ? "bg-[#00e5a0]/5 border-[#00e5a0]/30"
                  : "bg-[#0f1a14] border-white/10 hover:border-white/20"
              }`}
            >
              {!idea.isRead && (
                <div className="mt-1.5 w-2 h-2 rounded-full bg-[#00e5a0] shrink-0" />
              )}
              <div className={`flex-1 min-w-0 ${idea.isRead ? "pl-6" : ""}`}>
                <div className="flex items-center gap-2 mb-1">
                  {idea.category && (
                    <span className="px-2 py-0.5 rounded-full bg-[#00e5a0]/10 text-[#00e5a0] text-xs font-medium">
                      {idea.category}
                    </span>
                  )}
                  <span className="text-[#6a8a7a] text-xs">
                    {idea.name || "Anonyme"} · {new Date(idea.createdAt).toLocaleDateString("fr-FR")}
                  </span>
                </div>
                <p className="text-[#6a8a7a] text-sm truncate">{idea.message}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                {idea.email && (
                  <a
                    href={`mailto:${idea.email}?subject=Re: Votre idée SquamaTracker`}
                    title="Répondre par email"
                    className="p-1.5 rounded-lg text-[#6a8a7a] hover:text-[#00e5a0] hover:bg-[#00e5a0]/10 transition-colors focus-visible:ring-2 focus-visible:ring-[#00e5a0] focus-visible:ring-offset-1 focus-visible:ring-offset-[#0f1a14]"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                  </a>
                )}
                <button
                  onClick={() =>
                    startTransition(() =>
                      idea.isRead ? markIdeaUnread(idea.id) : markIdeaRead(idea.id)
                    )
                  }
                  disabled={isPending}
                  title={idea.isRead ? "Marquer non lu" : "Marquer lu"}
                  className="p-1.5 rounded-lg text-[#6a8a7a] hover:text-[#00e5a0] hover:bg-[#00e5a0]/10 transition-colors focus-visible:ring-2 focus-visible:ring-[#00e5a0] focus-visible:ring-offset-1 focus-visible:ring-offset-[#0f1a14]"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={idea.isRead ? "M3 8l7.89 5.26a2 2 0 002.22 0L21 8" : "M5 13l4 4L19 7"} />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(idea.id)}
                  title={deleteConfirm === idea.id ? "Confirmer" : "Supprimer"}
                  className={`p-1.5 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-[#0f1a14] ${
                    deleteConfirm === idea.id
                      ? "text-red-400 bg-red-400/10 focus-visible:ring-red-400"
                      : "text-[#6a8a7a] hover:text-red-400 hover:bg-red-400/10 focus-visible:ring-[#00e5a0]"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail panel */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelected(null)} onKeyDown={(e) => { if (e.key === "Escape") setSelected(null); }}>
          <div ref={modalRef} role="dialog" aria-modal="true" aria-label="Détail" tabIndex={-1} className="w-full max-w-lg bg-[#0f1a14] rounded-2xl border border-white/10 p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                {selected.category && (
                  <span className="inline-block px-2 py-0.5 rounded-full bg-[#00e5a0]/10 text-[#00e5a0] text-xs font-medium mb-2">
                    {selected.category}
                  </span>
                )}
                <p className="text-[#6a8a7a] text-sm">
                  De : <span className="text-white">{selected.name || "Anonyme"}</span>
                  {selected.email && <span className="text-[#6a8a7a]"> · {selected.email}</span>}
                </p>
                <p className="text-[#6a8a7a] text-xs mt-0.5">
                  {new Date(selected.createdAt).toLocaleDateString("fr-FR", { dateStyle: "long" })}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {selected.email && (
                  <a
                    href={`mailto:${selected.email}?subject=Re: Votre idée SquamaTracker`}
                    className="px-3 py-1.5 rounded-lg bg-[#00e5a0]/10 border border-[#00e5a0]/30 text-[#00e5a0] text-sm font-medium hover:bg-[#00e5a0]/20 transition-colors focus-visible:ring-2 focus-visible:ring-[#00e5a0] focus-visible:ring-offset-1 focus-visible:ring-offset-[#0f1a14]"
                  >
                    Répondre
                  </a>
                )}
                <button onClick={() => setSelected(null)} className="text-[#6a8a7a] hover:text-white p-1 focus-visible:ring-2 focus-visible:ring-[#00e5a0] focus-visible:ring-offset-1 focus-visible:ring-offset-[#0f1a14]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <p className="text-white leading-relaxed whitespace-pre-wrap bg-[#0a0f0d] rounded-xl p-4 text-sm">
              {selected.message}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
