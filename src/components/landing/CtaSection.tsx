import { Button } from "@/components/ui/button";

interface CtaSectionProps {
  appstoreUrl?: string;
}

export function CtaSection({ appstoreUrl = "#" }: CtaSectionProps) {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,229,160,0.06) 0%, transparent 70%)",
        }}
      />
      {/* Hexagonal pattern subtil */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" aria-hidden="true">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hex-cta" x="0" y="0" width="56" height="100" patternUnits="userSpaceOnUse" patternTransform="scale(1.5)">
              <polygon points="28,2 54,16 54,44 28,58 2,44 2,16" fill="none" stroke="#00e5a0" strokeWidth="1" />
              <polygon points="28,52 54,66 54,94 28,108 2,94 2,66" fill="none" stroke="#00e5a0" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex-cta)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center gap-6">
        <div className="w-16 h-16 rounded-full bg-[#0f1a14] border border-[#00e5a0]/40 flex items-center justify-center">
          <span className="text-[#00e5a0] font-bold tracking-widest text-sm">ST</span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          Prêt à gérer vos reptiles{" "}
          <span className="text-[#00e5a0]">comme un pro ?</span>
        </h2>

        <p className="text-[#6a8a7a] text-lg max-w-md">
          Rejoignez des milliers de passionnés qui font confiance à SquamaTracker
          pour le suivi de leurs animaux.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild size="lg">
            <a href={appstoreUrl} target="_blank" rel="noopener noreferrer">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Télécharger sur App Store
            </a>
          </Button>
        </div>

        <p className="text-[#6a8a7a] text-xs">
          iOS uniquement · 7 jours d&apos;essai gratuit · Sans engagement
        </p>
      </div>
    </section>
  );
}
