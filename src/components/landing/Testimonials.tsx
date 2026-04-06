const testimonials = [
  {
    name: "Camille R.",
    role: "Propriétaire de 3 geckos",
    avatar: "CR",
    text: "SquamaTracker a complètement changé ma façon de gérer mes animaux. Je n'oublie plus jamais un repas ou une mue. L'interface est superbe et très intuitive.",
    stars: 5,
  },
  {
    name: "Maxime L.",
    role: "Éleveur amateur de pythons",
    avatar: "ML",
    text: "Enfin une app dédiée aux reptiles ! Je suis tellement content de ne plus utiliser des tablettes Excel compliquées. Le suivi du terrarium est incroyable.",
    stars: 5,
  },
  {
    name: "Sophie D.",
    role: "Propriétaire de 2 pogones",
    avatar: "SD",
    text: "La fonctionnalité encyclopédie est géniale pour les débutants comme moi. Ça m'a aidé à comprendre les besoins de mes bearded dragons dès le départ.",
    stars: 5,
  },
  {
    name: "Thomas B.",
    role: "Passionné de scinques",
    avatar: "TB",
    text: "Je recommande à tous les passionnés. Les rappels automatiques sont parfaits et l'app est vraiment belle. Version premium vaut vraiment le coup !",
    stars: 5,
  },
  {
    name: "Élise M.",
    role: "Propriétaire de 5 reptiles",
    avatar: "EM",
    text: "Gestion de plusieurs animaux en même temps, c'est exactement ce dont j'avais besoin. Les stats par animal sont super utiles pour le suivi de santé.",
    stars: 5,
  },
  {
    name: "Antoine P.",
    role: "Herpétophile expérimenté",
    avatar: "AP",
    text: "Utilisateur depuis le lancement. L'équipe est à l'écoute et les mises à jour sont régulières. Application sérieuse pour des passionnés sérieux.",
    stars: 5,
  },
];

function StarIcon() {
  return (
    <svg className="w-4 h-4 fill-[#00e5a0]" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export function Testimonials() {
  return (
    <section className="py-24 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00e5a0]/30 bg-[#00e5a0]/5 text-[#00e5a0] text-xs font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e5a0]" />
            Ils nous font confiance
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Aimé par les{" "}
            <span className="text-[#00e5a0]">passionnés de reptiles</span>
          </h2>
          <p className="text-[#6a8a7a] text-lg max-w-2xl mx-auto">
            Des milliers de propriétaires utilisent SquamaTracker pour prendre soin de leurs animaux.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`animate-on-scroll delay-${Math.min((i % 3) * 100 + 100, 400)} bg-[#0f1a14] border border-white/10 rounded-2xl p-6 hover:border-[#00e5a0]/20 transition-all duration-300 hover:shadow-lg hover:shadow-[#00e5a0]/5`}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <StarIcon key={j} />
                ))}
              </div>
              {/* Text */}
              <p className="text-[#d0d0d0] text-sm leading-relaxed mb-6">
                &ldquo;{t.text}&rdquo;
              </p>
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#00e5a0]/10 border border-[#00e5a0]/20 flex items-center justify-center text-[#00e5a0] text-xs font-bold">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{t.name}</p>
                  <p className="text-[#6a8a7a] text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto animate-on-scroll">
          {[
            { value: "4.8★", label: "Note App Store" },
            { value: "500+", label: "Utilisateurs actifs" },
            { value: "98%", label: "Satisfaction" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-[#00e5a0] text-2xl font-bold">{s.value}</p>
              <p className="text-[#6a8a7a] text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
