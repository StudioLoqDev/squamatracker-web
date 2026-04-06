import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

async function getAppstoreUrl() {
  try {
    const content = await prisma.siteContent.findUnique({
      where: { key: "appstore_url" },
    });
    return content?.value ?? "#";
  } catch {
    return "#";
  }
}

export const metadata = {
  title: "L'application — SquamaTracker",
  description:
    "Découvrez toutes les fonctionnalités de SquamaTracker, l'app iOS de suivi reptile.",
};

const appFeatures = [
  {
    icon: "🏠",
    title: "Tableau de bord",
    description:
      "Vue d'ensemble de tous vos animaux : derniers repas, mues à venir, alertes du jour. Tout ce qui compte en un coup d'œil.",
    details: [
      "Résumé quotidien",
      "Alertes personnalisées",
      "Accès rapide aux animaux",
    ],
  },
  {
    icon: "🍖",
    title: "Suivi repas / mues / bains",
    description:
      "Enregistrez chaque repas (proie, taille, accepté/refusé), chaque mue (complète, difficultés) et chaque bain en quelques secondes.",
    details: [
      "Historique complet",
      "Types de proies",
      "Mues partielles / complètes",
    ],
  },
  {
    icon: "📚",
    title: "Encyclopédie",
    description:
      "Fiches de soins détaillées pour des centaines d'espèces : températures, humidité, alimentation, comportement, reproduction.",
    details: [
      "Centaines d'espèces",
      "Paramètres terrarium",
      "Conseils de soins",
    ],
  },
  {
    icon: "📊",
    title: "Statistiques & graphiques",
    description:
      "Visualisez l'évolution de vos animaux : courbes de poids, fréquence des repas, historique des mues sur des graphiques clairs.",
    details: [
      "Courbes de poids",
      "Fréquences repas",
      "Export CSV",
    ],
  },
  {
    icon: "🧬",
    title: "Module reproduction",
    description:
      "Suivez les accouplements, la gravité, les pontes et les éclosions. Calculez les probabilités de morphs pour chaque couvée.",
    details: [
      "Suivi de gestation",
      "Calculateur de morphs",
      "Journal des éclosions",
    ],
  },
  {
    icon: "🎯",
    title: "Calculateur de proies",
    description:
      "Calculez la taille idéale des proies selon le poids de votre animal. Ne vous trompez plus jamais de taille.",
    details: [
      "Par espèce",
      "Ratio poids/proie",
      "Recommandations",
    ],
  },
];

const freeFeatures = [
  "3 animaux maximum",
  "Suivi repas / mues / bains",
  "Encyclopédie de base",
  "Paramètres terrarium",
];

const premiumFeatures = [
  "Animaux illimités",
  "Suivi repas / mues / bains",
  "Terrarium & paramètres",
  "Encyclopédie complète",
  "Statistiques & graphiques",
  "Module reproduction",
  "Calculateur de proies",
  "Alertes avancées personnalisées",
  "Export des données (CSV)",
  "Accès en avant-première",
];

export default async function AppPage() {
  const appstoreUrl = await getAppstoreUrl();

  return (
    <div className="min-h-screen bg-[#0a0f0d]">
      {/* Hero */}
      <div className="relative py-24 px-4 overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,229,160,0.05) 0%, transparent 70%)",
          }}
        />
        <div className="absolute inset-0 z-0 opacity-[0.025]" aria-hidden="true">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="hex-app"
                x="0"
                y="0"
                width="56"
                height="100"
                patternUnits="userSpaceOnUse"
                patternTransform="scale(2)"
              >
                <polygon
                  points="28,2 54,16 54,44 28,58 2,44 2,16"
                  fill="none"
                  stroke="#00e5a0"
                  strokeWidth="1"
                />
                <polygon
                  points="28,52 54,66 54,94 28,108 2,94 2,66"
                  fill="none"
                  stroke="#00e5a0"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hex-app)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-[#00e5a0] text-sm font-medium tracking-widest uppercase mb-3">
            L&apos;application
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Découvrez{" "}
            <span className="text-[#00e5a0]">SquamaTracker</span>
          </h1>
          <p className="text-[#6a8a7a] text-lg max-w-xl mx-auto">
            Tout ce dont vous avez besoin pour prendre soin de vos reptiles,
            dans une seule app iOS.
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <a href={appstoreUrl} target="_blank" rel="noopener noreferrer">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Télécharger sur App Store
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Features détaillées */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">
              Toutes les fonctionnalités
            </h2>
            <p className="text-[#6a8a7a] mt-3">
              Chaque outil pensé pour les vrais besoins des terrariophiles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {appFeatures.map((feature) => (
              <div
                key={feature.title}
                className="group p-6 rounded-2xl bg-[#0f1a14] border border-[#00e5a0]/10 hover:border-[#00e5a0]/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#00e5a0]/10 border border-[#00e5a0]/20 flex items-center justify-center text-2xl shrink-0">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-[#6a8a7a] text-sm leading-relaxed mb-3">
                      {feature.description}
                    </p>
                    <ul className="flex flex-col gap-1">
                      {feature.details.map((detail) => (
                        <li
                          key={detail}
                          className="flex items-center gap-2 text-xs text-[#6a8a7a]"
                        >
                          <span className="text-[#00e5a0]">✓</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparaison Gratuit vs Premium */}
      <section className="py-16 px-4 bg-[#080808]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">
              Gratuit vs Premium
            </h2>
            <p className="text-[#6a8a7a] mt-3">
              Commencez gratuitement, passez Premium quand vous êtes prêt.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left text-[#6a8a7a] text-sm font-medium pb-4 w-1/2">
                    Fonctionnalité
                  </th>
                  <th className="text-center text-white font-bold pb-4 w-1/4">
                    Gratuit
                  </th>
                  <th className="text-center pb-4 w-1/4">
                    <span className="text-[#00e5a0] font-bold">Premium</span>
                    <br />
                    <span className="text-[#6a8a7a] text-xs font-normal">
                      9,99€/mois
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { label: "Nombre d'animaux", free: "3 max", premium: "Illimité" },
                  { label: "Suivi repas / mues / bains", free: true, premium: true },
                  { label: "Paramètres terrarium", free: true, premium: true },
                  { label: "Encyclopédie", free: "Basique", premium: "Complète" },
                  { label: "Statistiques & graphiques", free: false, premium: true },
                  { label: "Module reproduction", free: false, premium: true },
                  { label: "Calculateur de proies", free: false, premium: true },
                  { label: "Alertes personnalisées", free: false, premium: true },
                  { label: "Export CSV", free: false, premium: true },
                  { label: "Accès avant-première", free: false, premium: true },
                ].map((row) => (
                  <tr key={row.label}>
                    <td className="py-3 text-[#6a8a7a] text-sm">{row.label}</td>
                    <td className="py-3 text-center text-sm">
                      {row.free === true ? (
                        <span className="text-[#00e5a0]">✓</span>
                      ) : row.free === false ? (
                        <span className="text-white/20">—</span>
                      ) : (
                        <span className="text-[#6a8a7a] text-xs">{row.free}</span>
                      )}
                    </td>
                    <td className="py-3 text-center text-sm">
                      {row.premium === true ? (
                        <span className="text-[#00e5a0] font-bold">✓</span>
                      ) : row.premium === false ? (
                        <span className="text-white/20">—</span>
                      ) : (
                        <span className="text-[#00e5a0] text-xs font-medium">
                          {row.premium}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 p-4 rounded-xl bg-[#00e5a0]/5 border border-[#00e5a0]/20 text-center">
            <span className="text-sm">🎁</span>
            <span className="text-[#00e5a0] text-sm font-medium ml-2">
              7 jours d&apos;essai Premium gratuit — sans engagement
            </span>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-xl mx-auto flex flex-col items-center gap-6">
          <h2 className="text-3xl font-bold text-white">
            Prêt à gérer vos reptiles{" "}
            <span className="text-[#00e5a0]">comme un pro ?</span>
          </h2>
          <p className="text-[#6a8a7a]">
            Téléchargez SquamaTracker gratuitement sur l&apos;App Store.
          </p>
          <Button asChild size="lg">
            <a href={appstoreUrl} target="_blank" rel="noopener noreferrer">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Télécharger sur App Store
            </a>
          </Button>
          <p className="text-[#6a8a7a] text-xs">
            iOS uniquement · 7 jours d&apos;essai gratuit · Sans engagement
          </p>
        </div>
      </section>
    </div>
  );
}
