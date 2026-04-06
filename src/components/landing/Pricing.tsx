import { Button } from "@/components/ui/button";

const freeFeatures = [
  "3 animaux maximum",
  "Suivi repas / mues / bains",
  "Terrarium & paramètres",
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

interface PricingProps {
  appstoreUrl?: string;
}

export function Pricing({ appstoreUrl = "#" }: PricingProps) {
  return (
    <section className="py-24 px-4 bg-[#0a0f0d]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#00e5a0] text-sm font-medium tracking-widest uppercase mb-3">
            Tarifs
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Commencez gratuitement
          </h2>
          <p className="text-[#6a8a7a] mt-4">
            7 jours d&apos;essai gratuit sur le plan Premium. Sans engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Plan Gratuit */}
          <div className="flex flex-col p-6 rounded-2xl bg-[#0f1a14] border border-white/10">
            <div className="mb-6">
              <h3 className="text-white font-bold text-xl mb-1">Gratuit</h3>
              <p className="text-[#6a8a7a] text-sm">Pour découvrir l&apos;app</p>
              <div className="mt-4">
                <span className="text-4xl font-bold text-white">0€</span>
                <span className="text-[#6a8a7a] text-sm ml-2">pour toujours</span>
              </div>
            </div>

            <ul className="flex flex-col gap-3 mb-8 flex-1">
              {freeFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-[#6a8a7a]">
                  <span className="text-[#00e5a0] text-xs">✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            <Button variant="outline" asChild className="w-full">
              <a href={appstoreUrl} target="_blank" rel="noopener noreferrer">
                Télécharger gratuitement
              </a>
            </Button>
          </div>

          {/* Plan Premium */}
          <div className="relative flex flex-col p-6 rounded-2xl bg-[#0f1a14] border-2 border-[#00e5a0]/50 shadow-[0_0_40px_rgba(0,229,160,0.08)]">
            {/* Badge populaire */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="px-4 py-1 rounded-full bg-[#00e5a0] text-black text-xs font-bold">
                ⭐ Populaire
              </span>
            </div>

            <div className="mb-6">
              <h3 className="text-white font-bold text-xl mb-1">Premium</h3>
              <p className="text-[#6a8a7a] text-sm">Pour les passionnés</p>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-4xl font-bold text-white">9,99€</span>
                <span className="text-[#6a8a7a] text-sm">/mois</span>
              </div>
              <p className="text-[#00e5a0] text-xs mt-1">
                ou 79,99€/an · Économisez 33%
              </p>
              {/* Badge essai */}
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00e5a0]/10 border border-[#00e5a0]/30">
                <span className="text-sm">🎁</span>
                <span className="text-[#00e5a0] text-xs font-medium">7 jours gratuits</span>
              </div>
            </div>

            <ul className="flex flex-col gap-2.5 mb-8 flex-1">
              {premiumFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-white">
                  <span className="text-[#00e5a0] text-xs font-bold">✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            <Button asChild className="w-full" size="lg">
              <a href={appstoreUrl} target="_blank" rel="noopener noreferrer">
                Essayer 7 jours gratuit
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
