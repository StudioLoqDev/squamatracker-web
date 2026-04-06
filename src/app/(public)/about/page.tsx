import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getAboutText() {
  try {
    const content = await prisma.siteContent.findUnique({
      where: { key: "about_text" },
    });
    return content?.value ?? null;
  } catch {
    return null;
  }
}

export const metadata = {
  title: "Qui sommes-nous ? — SquamaTracker",
  description:
    "Découvrez l'histoire de SquamaTracker et la mission derrière l'app de suivi reptile.",
};

export default async function AboutPage() {
  const aboutText = await getAboutText();

  return (
    <div className="min-h-screen bg-[#0a0f0d]">
      {/* Hero banner */}
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
                id="hex-about"
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
            <rect width="100%" height="100%" fill="url(#hex-about)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-[#00e5a0] text-sm font-medium tracking-widest uppercase mb-3">
            À propos
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Qui sommes-nous ?
          </h1>
          <p className="text-[#6a8a7a] text-lg">
            L&apos;histoire derrière SquamaTracker
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 pb-24">
        {/* Mission card */}
        <div className="p-8 rounded-2xl bg-[#0f1a14] border border-[#00e5a0]/20 mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#00e5a0]/10 border border-[#00e5a0]/30 flex items-center justify-center">
              <span className="text-[#00e5a0] text-lg">🎯</span>
            </div>
            <h2 className="text-white font-bold text-xl">Notre mission</h2>
          </div>
          <p className="text-[#6a8a7a] leading-relaxed text-lg italic">
            &quot;Simplifier la vie des passionnés de reptiles grâce à une app
            intuitive, complète et pensée pour eux.&quot;
          </p>
        </div>

        {/* About text from DB or default */}
        <div className="prose prose-invert max-w-none">
          {aboutText ? (
            <div className="text-[#6a8a7a] leading-relaxed whitespace-pre-wrap">
              {aboutText}
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              {/* Origin story */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-[#00e5a0]">◆</span> L&apos;origine du projet
                </h2>
                <p className="text-[#6a8a7a] leading-relaxed">
                  SquamaTracker est né d&apos;une passion pour les reptiles et
                  d&apos;une frustration : aucune app ne permettait de suivre
                  correctement la santé et les habitudes de nos animaux. Les
                  carnets papier se perdent, les tableaux Excel manquent de
                  praticité — il fallait quelque chose de mieux.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-[#00e5a0]">◆</span> Pour les passionnés, par des passionnés
                </h2>
                <p className="text-[#6a8a7a] leading-relaxed">
                  Développée par un passionné de reptiles, SquamaTracker est
                  conçue avec une compréhension profonde des besoins réels des
                  terrariophiles. Chaque fonctionnalité a été pensée pour
                  répondre aux questions que se posent vraiment les propriétaires
                  au quotidien.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-[#00e5a0]">◆</span> Une app en constante évolution
                </h2>
                <p className="text-[#6a8a7a] leading-relaxed">
                  SquamaTracker évolue grâce à sa communauté. Vos retours,
                  idées et suggestions façonnent directement les futures
                  fonctionnalités. Rejoignez des milliers de passionnés qui font
                  confiance à l&apos;app pour le suivi de leurs animaux.
                </p>
              </section>
            </div>
          )}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mt-12">
          {[
            { value: "iOS", label: "Platform" },
            { value: "100+", label: "Espèces" },
            { value: "∞", label: "Animaux suivis" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-5 rounded-xl bg-[#0f1a14] border border-white/10 text-center"
            >
              <p className="text-[#00e5a0] text-2xl font-bold">{stat.value}</p>
              <p className="text-[#6a8a7a] text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg">
            <Link href="/app">Découvrir l&apos;application</Link>
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link href="/ideas">Proposer une idée</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
