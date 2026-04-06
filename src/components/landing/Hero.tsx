import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HeroProps {
  title?: string;
  subtitle?: string;
  appstoreUrl?: string;
}

export function Hero({
  title = "Le suivi reptile intelligent",
  subtitle = "Gérez tous vos animaux comme un pro. Repas, mues, bains, terrarium — tout en un.",
  appstoreUrl = "#",
}: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Hexagonal background pattern */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.04]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="hexagons"
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
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
        {/* Radial glow center */}
        <div className="absolute inset-0 bg-radial-gradient from-[#00e5a0]/5 via-transparent to-transparent" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(0,229,160,0.06) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center py-24">
        {/* Texte */}
        <div className="flex flex-col gap-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 w-fit px-3 py-1 rounded-full border border-[#00e5a0]/30 bg-[#00e5a0]/5 text-[#00e5a0] text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e5a0] animate-pulse" />
            Disponible sur App Store
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
            {title.split(" ").map((word, i) =>
              word === "intelligent" ? (
                <span key={i} className="text-[#00e5a0]">
                  {word}{" "}
                </span>
              ) : (
                <span key={i}>{word} </span>
              )
            )}
          </h1>

          <p className="text-lg text-[#6a8a7a] leading-relaxed max-w-md">
            {subtitle}
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button asChild size="lg">
              <a href={appstoreUrl} target="_blank" rel="noopener noreferrer">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Télécharger sur App Store
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/app">Voir les fonctionnalités</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="flex gap-8 pt-4">
            {[
              { value: "iOS", label: "Application" },
              { value: "Gratuit", label: "À télécharger" },
              { value: "Premium", label: "Dès 9,99€/mois" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-0.5">
                <span className="text-[#00e5a0] font-bold text-lg">{stat.value}</span>
                <span className="text-[#6a8a7a] text-xs">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mockup téléphone */}
        <div className="relative flex items-center justify-center lg:justify-end">
          <div className="relative">
            {/* Glow derrière le téléphone */}
            <div
              className="absolute inset-0 scale-75 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(0,229,160,0.15) 0%, transparent 70%)",
              }}
            />
            {/* Cadre téléphone */}
            <div className="relative w-[260px] h-[520px] rounded-[40px] border-2 border-[#00e5a0]/30 bg-[#0d0d0d] shadow-2xl overflow-hidden">
              {/* Notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-[#152318] z-10" />
              {/* Écran app simulé */}
              <div className="absolute inset-0 flex flex-col">
                {/* Header app */}
                <div className="bg-[#0f1a14] px-4 pt-12 pb-3 flex items-center justify-between">
                  <span className="text-white text-sm font-semibold">Accueil</span>
                  <div className="w-6 h-6 rounded-full bg-[#00e5a0]/20 flex items-center justify-center">
                    <span className="text-[#00e5a0] text-xs">+</span>
                  </div>
                </div>
                {/* Cards animaux */}
                <div className="flex-1 bg-[#0a0f0d] p-3 flex flex-col gap-2">
                  {[
                    { name: "Saphira", type: "Ball Python", color: "#00e5a0" },
                    { name: "Ember", type: "Crested Gecko", color: "#00b37d" },
                    { name: "Shadow", type: "Blue Tongue Skink", color: "#1e8449" },
                  ].map((animal) => (
                    <div
                      key={animal.name}
                      className="flex items-center gap-3 bg-[#0f1a14] rounded-xl p-3 border border-white/5"
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                        style={{ backgroundColor: `${animal.color}20`, border: `1px solid ${animal.color}40` }}
                      >
                        🦎
                      </div>
                      <div>
                        <p className="text-white text-xs font-medium">{animal.name}</p>
                        <p className="text-[#6a8a7a] text-[10px]">{animal.type}</p>
                      </div>
                      <div className="ml-auto">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#00e5a0]" />
                      </div>
                    </div>
                  ))}
                  {/* Stats mini */}
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    {[
                      { label: "Repas today", val: "2" },
                      { label: "Prochaine mue", val: "5j" },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="bg-[#0f1a14] rounded-xl p-2 border border-[#00e5a0]/10"
                      >
                        <p className="text-[#00e5a0] text-base font-bold">{s.val}</p>
                        <p className="text-[#6a8a7a] text-[9px]">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Tab bar */}
                <div className="bg-[#0f1a14] border-t border-white/5 flex justify-around py-2 px-4">
                  {["🏠", "📊", "🔧", "📈", "⚙️"].map((icon, i) => (
                    <span
                      key={i}
                      className={`text-sm ${i === 0 ? "opacity-100" : "opacity-30"}`}
                    >
                      {icon}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-5 h-8 rounded-full border border-[#00e5a0]/30 flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-[#00e5a0]/60" />
        </div>
      </div>
    </section>
  );
}
