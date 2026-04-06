"use client";

import { useState, useTransition } from "react";
import { createVipCode, toggleVipCode, deleteVipCode, generateVipCode } from "@/actions/vip-codes";
import { Button } from "@/components/ui/button";
import { useDeleteConfirm } from "@/hooks/use-delete-confirm";
import { COPY_TIMEOUT } from "@/lib/constants";

interface VipCode {
  id: string;
  code: string;
  note: string | null;
  isActive: boolean;
  usedAt: Date | null;
  createdAt: Date;
}

type Filter = "all" | "active" | "inactive";

export function VipCodesClient({ codes }: { codes: VipCode[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [showModal, setShowModal] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const { confirmId: deleteConfirm, request: requestDelete, clear: clearDelete } = useDeleteConfirm();
  const [isPending, startTransition] = useTransition();

  const filtered = codes.filter((c) => {
    if (filter === "active") return c.isActive;
    if (filter === "inactive") return !c.isActive;
    return true;
  });

  const handleGenerate = async () => {
    const code = await generateVipCode();
    setGeneratedCode(code);
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), COPY_TIMEOUT);
  };

  const handleToggle = (id: string, current: boolean) => {
    startTransition(() => toggleVipCode(id, !current));
  };

  const handleDelete = (id: string) => {
    if (deleteConfirm === id) {
      startTransition(async () => {
        await deleteVipCode(id);
        clearDelete();
      });
    } else {
      requestDelete(id);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          {(["all", "active", "inactive"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-[#00e5a0]/10 text-[#00e5a0] border border-[#00e5a0]/30"
                  : "text-[#6a8a7a] hover:text-white bg-[#0f1a14] border border-white/10"
              }`}
            >
              {f === "all" ? "Tous" : f === "active" ? "Actifs" : "Inactifs"}{" "}
              <span className="text-xs opacity-60">
                ({f === "all" ? codes.length : f === "active" ? codes.filter(c => c.isActive).length : codes.filter(c => !c.isActive).length})
              </span>
            </button>
          ))}
        </div>
        <Button size="sm" onClick={() => { setShowModal(true); handleGenerate(); }}>
          + Nouveau code
        </Button>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="p-12 rounded-xl bg-[#0f1a14] border border-white/10 text-center">
          <p className="text-[#6a8a7a]">Aucun code VIP</p>
        </div>
      ) : (
        <div className="rounded-xl bg-[#0f1a14] border border-white/10 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-[#6a8a7a] text-xs font-medium uppercase tracking-widest px-4 py-3">Code</th>
                <th className="text-left text-[#6a8a7a] text-xs font-medium uppercase tracking-widest px-4 py-3 hidden md:table-cell">Note</th>
                <th className="text-center text-[#6a8a7a] text-xs font-medium uppercase tracking-widest px-4 py-3">Actif</th>
                <th className="text-left text-[#6a8a7a] text-xs font-medium uppercase tracking-widest px-4 py-3 hidden lg:table-cell">Créé le</th>
                <th className="text-right text-[#6a8a7a] text-xs font-medium uppercase tracking-widest px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((code) => (
                <tr key={code.id} className="hover:bg-white/2 transition-colors">
                  <td className="px-4 py-3">
                    <code className="text-[#00e5a0] font-mono text-sm font-bold">{code.code}</code>
                  </td>
                  <td className="px-4 py-3 text-[#6a8a7a] text-sm hidden md:table-cell">
                    {code.note || <span className="opacity-30">—</span>}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleToggle(code.id, code.isActive)}
                      disabled={isPending}
                      className={`w-10 h-5 rounded-full transition-colors relative ${
                        code.isActive ? "bg-[#00e5a0]" : "bg-white/10"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${
                          code.isActive ? "left-5" : "left-0.5"
                        }`}
                      />
                    </button>
                  </td>
                  <td className="px-4 py-3 text-[#6a8a7a] text-xs hidden lg:table-cell">
                    {new Date(code.createdAt).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleCopy(code.code)}
                        title="Copier"
                        className="p-1.5 rounded-lg text-[#6a8a7a] hover:text-[#00e5a0] hover:bg-[#00e5a0]/10 transition-colors"
                      >
                        {copied === code.code ? (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(code.id)}
                        title={deleteConfirm === code.id ? "Cliquer pour confirmer" : "Supprimer"}
                        className={`p-1.5 rounded-lg transition-colors ${
                          deleteConfirm === code.id
                            ? "text-red-400 bg-red-400/10"
                            : "text-[#6a8a7a] hover:text-red-400 hover:bg-red-400/10"
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal création */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#0f1a14] rounded-2xl border border-white/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-bold text-lg">Nouveau code VIP</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-[#6a8a7a] hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form
              action={async (fd) => {
                await createVipCode(fd);
                setShowModal(false);
              }}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-[#6a8a7a]">Code</label>
                <div className="flex gap-2">
                  <input
                    name="code"
                    type="text"
                    value={generatedCode}
                    onChange={(e) => setGeneratedCode(e.target.value.toUpperCase())}
                    placeholder="CODE8CAR"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-[#0a0f0d] border border-white/10 text-white font-mono uppercase placeholder:text-white/20 focus:outline-none focus:border-[#00e5a0]/50 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={handleGenerate}
                    className="px-3 py-2 rounded-xl bg-[#00e5a0]/10 border border-[#00e5a0]/30 text-[#00e5a0] text-sm hover:bg-[#00e5a0]/20 transition-colors"
                  >
                    ↻
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-[#6a8a7a]">Note <span className="text-xs">(optionnel)</span></label>
                <input
                  name="note"
                  type="text"
                  placeholder="Ex: Testeur bêta #1"
                  className="px-4 py-2.5 rounded-xl bg-[#0a0f0d] border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#00e5a0]/50 transition-colors"
                />
              </div>
              <div className="flex gap-3 mt-2">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setShowModal(false)}>
                  Annuler
                </Button>
                <Button type="submit" className="flex-1">
                  Créer le code
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
