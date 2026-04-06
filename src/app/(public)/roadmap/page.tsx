import type { Metadata } from "next";
import Link from "next/link";
import { getRoadmapItems } from "@/actions/roadmap";

export const metadata: Metadata = {
  title: "Roadmap — SquamaTracker",
  description: "Les prochaines fonctionnalités de SquamaTracker. Votez pour vos idées préférées.",
};

const DEFAULT_ITEMS = [
  { id: "1", status: "done", quarter: "Q4 2025", title: "Lancement iOS", description: "Application disponible sur l'App Store avec les fonctionnalités de base.", icon: "✅", order: 0 },
  { id: "2", status: "done", quarter: "Q1 2026", title: "Encyclopédie des reptiles", description: "200+ fiches espèces avec photos, conseils de soin et conditions optimales.", icon: "✅", order: 1 },
  { id: "3", status: "in-progress", quarter: "Q2 2026", title: "Application Android", description: "SquamaTracker débarque sur Android. Liste d'attente ouverte !", icon: "🚧", order: 2 },
  { id: "4", status: "in-progress", quarter: "Q2 2026", title: "Partage entre propriétaires", description: "Partagez le suivi de vos animaux avec un vétérinaire ou un ami.", icon: "🚧", order: 3 },
  { id: "5", status: "planned", quarter: "Q3 2026", title: "IA — Conseils personnalisés", description: "Suggestions intelligentes basées sur l'historique de vos animaux.", icon: "🔮", order: 4 },
  { id: "6", status: "planned", quarter: "Q3 2026", title: "Marketplace animaux", description: "Achetez et vendez des reptiles en toute sécurité au sein de la communauté.", icon: "🔮", order: 5 },
  { id: "7", status: "planned", quarter: "Q4 2026", title: "Application watchOS", description: "Consultez l'état de vos animaux depuis votre Apple Watch.", icon: "🔮", order: 6 },
  { id: "8", status: "considering", quarter: "2027", title: "Version web", description: "Accédez à SquamaTracker depuis votre navigateur.", icon: "💭", order: 7 },
];

const statusConfig = {
  done: { label: "Terminé", color: "bg-[#00e5a0]/10 text-[#00e5a0] border-[#00e5a0]/20" },
  "in-progress": { label: "En cours", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  planned: { label: "Planifié", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  considering: { label: "En réflexion", color: "bg-white/5 text-[#6a8a7a] border-white/10" },
};

export default async function RoadmapPage() {
  const dbItems = await getRoadmapItems();
  const roadmapItems = dbItems.length > 0 ? dbItems : DEFAULT_ITEMS;

  return (
    <main className="min-h-screen py-24 px-4">
      {/* Header */}
      <div className="max-w-3xl mx-auto mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00e5a0]/30 bg-[#00e5a0]/5 text-[#00e5a0] text-xs font-medium mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00e5a0] animate-pulse" />
          Mise à jour Q1 2026
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Roadmap publique
        </h1>
        <p className="text-[#6a8a7a] text-lg mb-8">
          Ce qui est prévu, ce qui est en cours, ce qui arrive bientôt.
          Transparent et honnête.
        </p>
        <Link
          href="/ideas"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#00e5a0]/30 bg-[#00e5a0]/5 text-[#00e5a0] text-sm font-medium hover:bg-[#00e5a0]/10 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Proposer une fonctionnalité
        </Link>
      </div>

      {/* Legend */}
      <div className="max-w-3xl mx-auto mb-8 flex flex-wrap gap-3">
        {Object.entries(statusConfig).map(([key, cfg]) => (
          <div key={key} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border ${cfg.color}`}>
            {cfg.label}
          </div>
        ))}
      </div>

      {/* Items */}
      <div className="max-w-3xl mx-auto flex flex-col gap-4">
        {roadmapItems.map((item) => {
          const cfg = statusConfig[item.status as keyof typeof statusConfig] ?? statusConfig.considering;
          return (
            <div
              key={item.id}
              className={`bg-[#0f1a14] border border-white/10 rounded-2xl p-6 flex gap-5 hover:border-[#00e5a0]/20 transition-colors ${
                item.status === "done" ? "opacity-70" : ""
              }`}
            >
              <div className="text-2xl shrink-0 mt-0.5">{item.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${cfg.color}`}>
                    {cfg.label}
                  </span>
                  <span className="text-[#6a8a7a] text-xs">{item.quarter}</span>
                </div>
                <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                <p className="text-[#6a8a7a] text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer CTA */}
      <div className="max-w-3xl mx-auto mt-16 text-center">
        <div className="bg-[#0f1a14] border border-[#00e5a0]/20 rounded-2xl p-8">
          <p className="text-white font-semibold mb-2">Vous avez une idée ?</p>
          <p className="text-[#6a8a7a] text-sm mb-6">
            Notre roadmap est influencée par vos retours. Les idées les plus populaires passent en priorité.
          </p>
          <Link
            href="/ideas"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#00e5a0] text-black font-semibold text-sm hover:bg-[#00b37d] transition-colors"
          >
            Proposer une idée
          </Link>
        </div>
      </div>
    </main>
  );
}
