export const metadata = {
  title: "Politique de confidentialité — SquamaTracker",
  description:
    "Politique de confidentialité et traitement des données personnelles de SquamaTracker.",
};

const sections = [
  {
    id: "introduction",
    title: "1. Introduction",
    content: `SquamaTracker (ci-après « nous ») est une application iOS de suivi d'animaux reptiles, accompagnée du présent site vitrine. Nous prenons la protection de vos données personnelles très au sérieux et nous engageons à les traiter conformément au Règlement Général sur la Protection des Données (RGPD) et à la législation française applicable.

Cette politique de confidentialité s'applique au site web squamatracker.app et à ses formulaires.`,
  },
  {
    id: "donnees",
    title: "2. Données collectées",
    content: `Nous collectons uniquement les données que vous nous fournissez volontairement via nos formulaires :

**Formulaire "Proposer une idée"**
- Nom (optionnel)
- Adresse email (optionnel)
- Catégorie de l'idée
- Description de l'idée (obligatoire)

**Formulaire de contact**
- Nom (obligatoire)
- Adresse email (obligatoire)
- Message (obligatoire)

Nous ne collectons aucune donnée sensible (santé, opinions politiques, etc.) et ne procédons à aucun profilage automatisé.`,
  },
  {
    id: "utilisation",
    title: "3. Utilisation des données",
    content: `Les données collectées sont utilisées exclusivement aux fins suivantes :

- **Traitement de votre demande** : répondre à vos messages et questions
- **Amélioration de l'application** : analyser les idées soumises pour prioriser les développements futurs
- **Communication** : vous répondre si vous avez fourni votre email

Nous ne vendons, ne louons et ne partageons jamais vos données avec des tiers à des fins commerciales.`,
  },
  {
    id: "conservation",
    title: "4. Durée de conservation",
    content: `Vos données sont conservées pendant une durée maximale de **2 ans** à compter de leur collecte, sauf demande de suppression de votre part.

Au-delà de cette durée, vos données sont automatiquement supprimées ou anonymisées.`,
  },
  {
    id: "droits",
    title: "5. Vos droits RGPD",
    content: `Conformément au RGPD, vous disposez des droits suivants sur vos données personnelles :

- **Droit d'accès** : obtenir une copie de vos données
- **Droit de rectification** : corriger des données inexactes
- **Droit à l'effacement** : demander la suppression de vos données
- **Droit d'opposition** : vous opposer au traitement de vos données
- **Droit à la portabilité** : recevoir vos données dans un format lisible

Pour exercer ces droits, contactez-nous via le formulaire de contact ou directement par email. Nous traiterons votre demande dans un délai maximum de 30 jours.`,
  },
  {
    id: "cookies",
    title: "6. Cookies et analytics",
    content: `Nous utilisons **PostHog** pour analyser l'utilisation du site de manière anonyme (pages visitées, temps de visite, etc.). Ces données nous aident à améliorer l'expérience utilisateur.

PostHog collecte des données anonymisées via des cookies de session. Aucune donnée personnelle identifiable n'est transmise à PostHog.

Vous pouvez refuser ces cookies analytiques en désactivant JavaScript dans votre navigateur ou en utilisant une extension de blocage des traceurs (ex : uBlock Origin).

Pour en savoir plus sur la politique de confidentialité de PostHog : posthog.com/privacy`,
  },
  {
    id: "hebergement",
    title: "7. Hébergement et sécurité",
    content: `Le site est hébergé sur **Vercel** (USA, avec CDN mondial). Les données sont stockées dans une base de données **Neon** (PostgreSQL, hébergée en Europe).

Nous mettons en œuvre des mesures de sécurité techniques appropriées pour protéger vos données contre tout accès non autorisé, perte ou destruction.`,
  },
  {
    id: "contact",
    title: "8. Contact",
    content: `Pour toute question relative à cette politique de confidentialité ou pour exercer vos droits RGPD, contactez-nous via la page Contact de ce site.

Nous nous engageons à répondre dans un délai de 48 heures ouvrées.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0f0d]">
      {/* Header */}
      <div className="relative py-20 px-4 overflow-hidden border-b border-white/5">
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,229,160,0.04) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-[#00e5a0] text-sm font-medium tracking-widest uppercase mb-3">
            Légal
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Politique de confidentialité
          </h1>
          <p className="text-[#6a8a7a] text-sm">
            Dernière mise à jour : mars 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-16 pb-24">
        {/* Table of contents */}
        <nav className="p-6 rounded-2xl bg-[#0f1a14] border border-white/10 mb-12">
          <p className="text-[#6a8a7a] text-xs font-medium uppercase tracking-widest mb-4">
            Sommaire
          </p>
          <ul className="flex flex-col gap-2">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-[#6a8a7a] text-sm hover:text-[#00e5a0] transition-colors"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sections */}
        <div className="flex flex-col gap-12">
          {sections.map((section) => (
            <section key={section.id} id={section.id}>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-[#00e5a0]">◆</span> {section.title}
              </h2>
              <div className="text-[#6a8a7a] leading-relaxed text-sm space-y-3">
                {section.content.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="whitespace-pre-line">
                    {paragraph
                      .split(/(\*\*[^*]+\*\*)/)
                      .map((part, j) =>
                        part.startsWith("**") && part.endsWith("**") ? (
                          <strong key={j} className="text-white font-medium">
                            {part.slice(2, -2)}
                          </strong>
                        ) : (
                          part
                        )
                      )}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-16 p-6 rounded-2xl bg-[#0f1a14] border border-[#00e5a0]/20 text-center">
          <p className="text-[#6a8a7a] text-sm">
            Des questions sur cette politique ?{" "}
            <a
              href="/contact"
              className="text-[#00e5a0] hover:underline"
            >
              Contactez-nous
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
