import { IdeasForm } from "@/components/forms/IdeasForm";

export const metadata = {
  title: "Proposez vos idées — SquamaTracker",
  description:
    "Suggérez de nouvelles fonctionnalités ou des améliorations pour SquamaTracker.",
};

export default function IdeasPage() {
  return (
    <div className="min-h-screen bg-[#0a0f0d]">
      {/* Header */}
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
                id="hex-ideas"
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
            <rect width="100%" height="100%" fill="url(#hex-ideas)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-[#00e5a0] text-sm font-medium tracking-widest uppercase mb-3">
            Communauté
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Proposez vos idées
          </h1>
          <p className="text-[#6a8a7a] text-lg max-w-xl mx-auto">
            Votre retour compte ! Dites-nous comment améliorer SquamaTracker.
            Chaque idée est lue et prise en compte.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-xl mx-auto px-4 pb-24">
        <IdeasForm />
      </div>
    </div>
  );
}
