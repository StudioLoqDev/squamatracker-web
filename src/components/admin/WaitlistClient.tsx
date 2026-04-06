"use client";

import { useState, useTransition, useMemo } from "react";
import { deleteWaitlistEntry, exportWaitlistCSV } from "@/actions/waitlist";
import { useDeleteConfirm } from "@/hooks/use-delete-confirm";
import { downloadCsv } from "@/lib/download-csv";

interface WaitlistEntry {
  id: string;
  email: string;
  createdAt: Date;
}

export function WaitlistClient({ entries }: { entries: WaitlistEntry[] }) {
  const [search, setSearch] = useState("");
  const [isPending, startTransition] = useTransition();
  const { confirmId: deleteConfirm, request: requestDelete, clear: clearDelete } = useDeleteConfirm();

  const filtered = useMemo(
    () =>
      entries.filter((e) =>
        !search || e.email.toLowerCase().includes(search.toLowerCase())
      ),
    [entries, search]
  );

  const handleDelete = (id: string) => {
    if (deleteConfirm === id) {
      startTransition(async () => {
        await deleteWaitlistEntry(id);
        clearDelete();
      });
    } else {
      requestDelete(id);
    }
  };

  const handleExport = async () => {
    const result = await exportWaitlistCSV();
    if (result.csv) {
      downloadCsv(result.csv, `waitlist-${new Date().toISOString().split("T")[0]}.csv`);
    }
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-xs">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6a8a7a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Rechercher un email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#0f1a14] border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#00e5a0]/40"
          />
        </div>
        <button
          onClick={handleExport}
          className="ml-auto px-4 py-1.5 rounded-lg bg-[#00e5a0]/10 border border-[#00e5a0]/30 text-[#00e5a0] text-sm font-medium hover:bg-[#00e5a0]/20 transition-colors flex items-center gap-2"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
          Exporter CSV ({entries.length})
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="p-12 rounded-xl bg-[#0f1a14] border border-white/10 text-center">
          <p className="text-[#6a8a7a]">{search ? "Aucun résultat" : "Aucune inscription"}</p>
        </div>
      ) : (
        <div className="rounded-xl bg-[#0f1a14] border border-white/10 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-[#6a8a7a] text-xs font-medium uppercase tracking-widest px-4 py-3">Email</th>
                <th className="text-left text-[#6a8a7a] text-xs font-medium uppercase tracking-widest px-4 py-3 hidden sm:table-cell">Inscrit le</th>
                <th className="text-right text-[#6a8a7a] text-xs font-medium uppercase tracking-widest px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((entry) => (
                <tr key={entry.id} className="hover:bg-white/2 transition-colors">
                  <td className="px-4 py-3">
                    <span className="text-white text-sm">{entry.email}</span>
                  </td>
                  <td className="px-4 py-3 text-[#6a8a7a] text-xs hidden sm:table-cell">
                    {new Date(entry.createdAt).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleDelete(entry.id)}
                      disabled={isPending}
                      title={deleteConfirm === entry.id ? "Confirmer" : "Supprimer"}
                      className={`p-1.5 rounded-lg transition-colors ${
                        deleteConfirm === entry.id
                          ? "text-red-400 bg-red-400/10"
                          : "text-[#6a8a7a] hover:text-red-400 hover:bg-red-400/10"
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
