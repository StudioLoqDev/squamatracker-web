const features = [
  {
    icon: "🦎",
    title: "Suivi de vos animaux",
    description:
      "Gérez jusqu'à 3 animaux gratuitement, illimités en Premium. Serpents, lézards, tortues, amphibiens — tous dans une seule app.",
  },
  {
    icon: "🍖",
    title: "Suivi repas / mues / bains",
    description:
      "Enregistrez chaque repas, mue et bain en quelques secondes. Ne ratez plus jamais un événement.",
  },
  {
    icon: "🌡️",
    title: "Terrarium & paramètres",
    description:
      "Configurez les paramètres de chaque terrarium : température, humidité, éclairage et plus.",
  },
  {
    icon: "📚",
    title: "Encyclopédie complète",
    description:
      "Fiches espèces & morphes pour serpents, lézards, tortues et amphibiens. Filtrez par catégorie et niveau.",
  },
  {
    icon: "📊",
    title: "Statistiques & graphiques",
    description:
      "Visualisez l'historique de vos animaux avec des graphiques clairs et des rapports détaillés.",
  },
  {
    icon: "🧬",
    title: "Module reproduction",
    description:
      "Suivez les cycles, accouplements, pontes et éclosions. Calculez les probabilités de morphs.",
  },
];

export function Features() {
  return (
    <section className="py-24 px-4 bg-[#0a0f0d]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#00e5a0] text-sm font-medium tracking-widest uppercase mb-3">
            Fonctionnalités
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Tout ce dont vous avez besoin
          </h2>
          <p className="text-[#6a8a7a] mt-4 max-w-xl mx-auto">
            SquamaTracker regroupe tous les outils essentiels pour prendre soin
            de vos reptiles au quotidien.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-2xl bg-[#0f1a14] border border-[#00e5a0]/10 hover:border-[#00e5a0]/30 transition-all duration-300 hover:bg-[#0f1a14]/80"
            >
              {/* Glow hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: "radial-gradient(circle at top left, rgba(0,229,160,0.04), transparent 60%)" }}
              />
              <div className="relative z-10">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-[#6a8a7a] text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Extra features list */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {[
            "Calculateur de proies",
            "Alertes avancées",
            "VetBot (Chat IA)",
            "Module urgences",
            "Export CSV",
            "Accès avant-première",
          ].map((feat) => (
            <span
              key={feat}
              className="px-4 py-2 rounded-full text-sm border border-[#00e5a0]/20 text-[#6a8a7a] bg-[#0f1a14]"
            >
              ✓ {feat}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
