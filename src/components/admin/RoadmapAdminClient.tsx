"use client";

import { useState, useTransition, useActionState, useEffect, useCallback } from "react";
import { CONFIRM_TIMEOUT } from "@/lib/constants";
import { useRouter } from "next/navigation";
import {
  deleteRoadmapItem,
  moveRoadmapItem,
  createRoadmapItem,
  updateRoadmapItem,
  seedDefaultRoadmap,
} from "@/actions/roadmap";

interface RoadmapItem {
  id: string;
  status: string;
  quarter: string;
  title: string;
  description: string;
  icon: string;
  order: number;
}

const STATUS_OPTIONS = [
  { value: "done", label: "✅ Terminé" },
  { value: "in-progress", label: "🚧 En cours" },
  { value: "planned", label: "🔮 Planifié" },
  { value: "considering", label: "💭 En réflexion" },
];

const STATUS_ICON: Record<string, string> = {
  done: "✅",
  "in-progress": "🚧",
  planned: "🔮",
  considering: "💭",
};

const statusColor: Record<string, string> = {
  done: "bg-[#00e5a0]/10 text-[#00e5a0] border-[#00e5a0]/20",
  "in-progress": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  planned: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  considering: "bg-white/5 text-[#6a8a7a] border-white/10",
};
const statusLabel: Record<string, string> = {
  done: "Terminé",
  "in-progress": "En cours",
  planned: "Planifié",
  considering: "En réflexion",
};

function ItemForm({
  item,
  onClose,
}: {
  item?: RoadmapItem;
  onClose: () => void;
}) {
  const router = useRouter();
  const action = item ? updateRoadmapItem : createRoadmapItem;
  const [state, formAction, isPending] = useActionState(action, null);
  const [icon, setIcon] = useState(item?.icon ?? "🔮");

  const handleStatusChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setIcon(STATUS_ICON[e.target.value] ?? "🔮");
  }, []);

  useEffect(() => {
    if (state?.success) {
      router.refresh();
      onClose();
    }
  }, [state?.success]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#0f1a14] rounded-2xl border border-white/10 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-white font-semibold mb-5">
          {item ? "Modifier l'élément" : "Ajouter un élément"}
        </h2>
        <form action={formAction} className="flex flex-col gap-4">
          {item && <input type="hidden" name="id" value={item.id} />}

          {/* Status + Quarter */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#6a8a7a] text-xs mb-1.5 uppercase tracking-widest">
                Statut
              </label>
              <select
                name="status"
                defaultValue={item?.status ?? "planned"}
                onChange={handleStatusChange}
                className="w-full px-3 py-2 rounded-lg bg-[#0a0f0d] border border-white/10 text-white text-sm focus:outline-none focus:border-[#00e5a0]/40"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[#6a8a7a] text-xs mb-1.5 uppercase tracking-widest">
                Période
              </label>
              <input
                type="text"
                name="quarter"
                defaultValue={item?.quarter ?? ""}
                placeholder="Q2 2026"
                className="w-full px-3 py-2 rounded-lg bg-[#0a0f0d] border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#00e5a0]/40"
              />
            </div>
          </div>

          {/* Title + Icon */}
          <div className="grid grid-cols-[1fr_80px] gap-3">
            <div>
              <label className="block text-[#6a8a7a] text-xs mb-1.5 uppercase tracking-widest">
                Titre
              </label>
              <input
                type="text"
                name="title"
                defaultValue={item?.title ?? ""}
                required
                placeholder="Nouvelle fonctionnalité"
                className="w-full px-3 py-2 rounded-lg bg-[#0a0f0d] border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#00e5a0]/40"
              />
            </div>
            <div>
              <label className="block text-[#6a8a7a] text-xs mb-1.5 uppercase tracking-widest">
                Icône
              </label>
              <input
                type="text"
                name="icon"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#0a0f0d] border border-white/10 text-white text-sm text-center focus:outline-none focus:border-[#00e5a0]/40"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[#6a8a7a] text-xs mb-1.5 uppercase tracking-widest">
              Description
            </label>
            <textarea
              name="description"
              defaultValue={item?.description ?? ""}
              required
              rows={3}
              placeholder="Description de la fonctionnalité..."
              className="w-full px-3 py-2 rounded-lg bg-[#0a0f0d] border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#00e5a0]/40 resize-none"
            />
          </div>

          {state?.error && (
            <p className="text-red-400 text-sm">{state.error}</p>
          )}

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-xl border border-white/10 text-[#6a8a7a] hover:text-white text-sm transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 px-4 py-2 rounded-xl bg-[#00e5a0] text-black font-semibold text-sm hover:bg-[#00b37d] transition-colors disabled:opacity-50"
            >
              {isPending ? "..." : item ? "Enregistrer" : "Ajouter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function RoadmapAdminClient({ items }: { items: RoadmapItem[] }) {
  const router = useRouter();
  const [editItem, setEditItem] = useState<RoadmapItem | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    if (deleteConfirm === id) {
      startTransition(async () => {
        await deleteRoadmapItem(id);
        setDeleteConfirm(null);
        router.refresh();
      });
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), CONFIRM_TIMEOUT);
    }
  };

  const handleMove = (id: string, direction: "up" | "down") => {
    startTransition(async () => {
      await moveRoadmapItem(id, direction);
      router.refresh();
    });
  };

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-[#6a8a7a] text-sm">{items.length} élément{items.length !== 1 ? "s" : ""}</p>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00e5a0] text-black font-semibold text-sm hover:bg-[#00b37d] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Ajouter
        </button>
      </div>

      {/* List */}
      {items.length === 0 ? (
        <div className="p-12 rounded-xl bg-[#0f1a14] border border-white/10 text-center">
          <p className="text-[#6a8a7a] mb-4">Aucun élément dans la roadmap</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => startTransition(async () => { await seedDefaultRoadmap(); router.refresh(); })}
              disabled={isPending}
              className="px-4 py-2 rounded-lg bg-[#00e5a0] text-black font-semibold text-sm hover:bg-[#00b37d] transition-colors disabled:opacity-50"
            >
              {isPending ? "Import en cours..." : "Importer les données par défaut"}
            </button>
            <button
              onClick={() => setShowAdd(true)}
              className="px-4 py-2 rounded-lg bg-[#0f1a14] border border-white/10 text-[#6a8a7a] hover:text-white text-sm transition-colors"
            >
              Créer manuellement
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((item, i) => (
            <div
              key={item.id}
              className="flex items-start gap-4 p-4 rounded-xl bg-[#0f1a14] border border-white/10 hover:border-white/20 transition-colors"
            >
              {/* Reorder */}
              <div className="flex flex-col gap-0.5 shrink-0 mt-0.5">
                <button
                  onClick={() => handleMove(item.id, "up")}
                  disabled={isPending || i === 0}
                  className="p-1 rounded text-[#6a8a7a] hover:text-white disabled:opacity-20 transition-colors"
                  title="Monter"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <button
                  onClick={() => handleMove(item.id, "down")}
                  disabled={isPending || i === items.length - 1}
                  className="p-1 rounded text-[#6a8a7a] hover:text-white disabled:opacity-20 transition-colors"
                  title="Descendre"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Icon */}
              <span className="text-xl shrink-0 mt-0.5">{item.icon}</span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className={`px-2 py-0.5 rounded-full text-xs border ${statusColor[item.status] ?? statusColor.considering}`}>
                    {statusLabel[item.status] ?? item.status}
                  </span>
                  <span className="text-[#6a8a7a] text-xs">{item.quarter}</span>
                </div>
                <p className="text-white text-sm font-medium">{item.title}</p>
                <p className="text-[#6a8a7a] text-xs mt-0.5 line-clamp-1">{item.description}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => setEditItem(item)}
                  className="p-1.5 rounded-lg text-[#6a8a7a] hover:text-[#00e5a0] hover:bg-[#00e5a0]/10 transition-colors"
                  title="Modifier"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  disabled={isPending}
                  title={deleteConfirm === item.id ? "Confirmer la suppression" : "Supprimer"}
                  className={`p-1.5 rounded-lg transition-colors ${
                    deleteConfirm === item.id
                      ? "text-red-400 bg-red-400/10"
                      : "text-[#6a8a7a] hover:text-red-400 hover:bg-red-400/10"
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

      {/* Modals */}
      {showAdd && <ItemForm onClose={() => setShowAdd(false)} />}
      {editItem && <ItemForm item={editItem} onClose={() => setEditItem(null)} />}
    </div>
  );
}
