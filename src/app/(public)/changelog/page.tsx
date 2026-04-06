import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Changelog — SquamaTracker",
  description: "Toutes les nouveautés et mises à jour de SquamaTracker.",
};

const entries = [
  {
    version: "1.3.0",
    date: "Mars 2026",
    type: "feature",
    title: "Encyclopédie des reptiles",
    changes: [
      "Ajout de 200+ fiches espèces avec photos et conseils de soin",
      "Recherche par nom commun et nom latin",
      "Indicateurs de difficulté et conditions optimales",
      "Compatibilité entre espèces",
    ],
  },
  {
    version: "1.2.5",
    date: "Février 2026",
    type: "improvement",
    title: "Améliorations suivi terrarium",
    changes: [
      "Graphiques de température et humidité sur 30 jours",
      "Alertes personnalisables hors plage",
      "Export des données en PDF",
      "Nouveau widget iOS pour température rapide",
    ],
  },
  {
    version: "1.2.0",
    date: "Janvier 2026",
    type: "feature",
    title: "Mode hors-ligne complet",
    changes: [
      "Synchronisation automatique à la reconnexion",
      "Saisie des repas et mues sans connexion internet",
      "Indicateur de statut de synchronisation",
    ],
  },
  {
    version: "1.1.3",
    date: "Décembre 2025",
    type: "fix",
    title: "Corrections et optimisations",
    changes: [
      "Correction du bug d'affichage des dates sur iOS 17",
      "Amélioration des performances de chargement (-40%)",
      "Correction de la notification répétée après mue",
      "Fix du crash sur iPad Mini",
    ],
  },
  {
    version: "1.1.0",
    date: "Novembre 2025",
    type: "feature",
    title: "Rappels intelligents",
    changes: [
      "Notifications adaptatives selon les habitudes",
      "Rappels récurrents configurables par animal",
      "Résumé quotidien optionnel",
      "Intégration Calendrier iOS",
    ],
  },
  {
    version: "1.0.0",
    date: "Octobre 2025",
    type: "feature",
    title: "Lancement initial 🎉",
    changes: [
      "Gestion jusqu'à 3 animaux (version gratuite)",
      "Suivi des repas, mues, bains et terrarium",
      "Historique et statistiques",
      "Design sombre optimisé",
    ],
  },
];

const typeConfig = {
  feature: { label: "Nouveauté", color: "bg-[#00e5a0]/10 text-[#00e5a0] border-[#00e5a0]/20" },
  improvement: { label: "Amélioration", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  fix: { label: "Correction", color: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
};

export default function ChangelogPage() {
  return (
    <main className="min-h-screen py-24 px-4">
      {/* Header */}
      <div className="max-w-3xl mx-auto mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00e5a0]/30 bg-[#00e5a0]/5 text-[#00e5a0] text-xs font-medium mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00e5a0]" />
          Historique des versions
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Changelog
        </h1>
        <p className="text-[#6a8a7a] text-lg">
          Toutes les nouveautés, améliorations et corrections de SquamaTracker.
        </p>
      </div>

      {/* Timeline */}
      <div className="max-w-3xl mx-auto">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-white/5 hidden md:block" />

          <div className="flex flex-col gap-10">
            {entries.map((entry) => {
              const cfg = typeConfig[entry.type as keyof typeof typeConfig];
              return (
                <div key={entry.version} className="md:pl-10 relative">
                  {/* Dot */}
                  <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-[#0f1a14] border border-[#00e5a0]/30 items-center justify-center hidden md:flex">
                    <div className="w-2 h-2 rounded-full bg-[#00e5a0]" />
                  </div>

                  <div className="bg-[#0f1a14] border border-white/10 rounded-2xl p-6 hover:border-[#00e5a0]/20 transition-colors">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="text-[#00e5a0] font-mono font-bold text-sm">
                        v{entry.version}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${cfg.color}`}>
                        {cfg.label}
                      </span>
                      <span className="text-[#6a8a7a] text-xs ml-auto">{entry.date}</span>
                    </div>

                    <h3 className="text-white font-semibold text-lg mb-4">{entry.title}</h3>

                    <ul className="flex flex-col gap-2">
                      {entry.changes.map((change, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[#6a8a7a]">
                          <span className="text-[#00e5a0] mt-0.5 shrink-0">✓</span>
                          {change}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
