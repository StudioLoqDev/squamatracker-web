"use client";

import { useActionState } from "react";
import { joinWaitlist } from "@/actions/waitlist";

interface WaitlistSectionProps {
  count?: number;
}

export function WaitlistSection({ count = 0 }: WaitlistSectionProps) {
  const [state, action, isPending] = useActionState(joinWaitlist as (prev: unknown, formData: FormData) => Promise<{ success?: boolean; error?: string } | null>, null);

  const displayCount = count + 247; // base offset for social proof

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,229,160,0.06) 0%, transparent 70%)",
          }}
        />
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hex-waitlist" x="0" y="0" width="56" height="100" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
              <polygon points="28,2 54,16 54,44 28,58 2,44 2,16" fill="none" stroke="#00e5a0" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex-waitlist)"/>
        </svg>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Badge */}
        <div className="animate-on-scroll inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00e5a0]/30 bg-[#00e5a0]/5 text-[#00e5a0] text-xs font-medium mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00e5a0] animate-pulse" />
          Bientôt disponible sur Android
        </div>

        <h2 className="animate-on-scroll text-3xl md:text-4xl font-bold text-white mb-4">
          Rejoignez la{" "}
          <span className="text-[#00e5a0]">liste d&apos;attente</span>
        </h2>

        {/* Counter */}
        <div className="animate-on-scroll delay-100 flex items-center justify-center gap-2 mb-4">
          <div className="flex -space-x-2">
            {["CR", "ML", "SD", "TB"].map((a) => (
              <div key={a} className="w-7 h-7 rounded-full bg-[#00e5a0]/10 border-2 border-[#0a0f0d] flex items-center justify-center text-[8px] font-bold text-[#00e5a0]">
                {a}
              </div>
            ))}
          </div>
          <p className="text-[#6a8a7a] text-sm">
            <span className="text-white font-semibold">{displayCount}+ personnes</span> attendent déjà
          </p>
        </div>

        <p className="animate-on-scroll delay-200 text-[#6a8a7a] text-lg mb-10 max-w-lg mx-auto">
          Soyez parmi les premiers à accéder à SquamaTracker sur Android.
          On vous prévient dès la sortie.
        </p>

        {state?.success ? (
          <div className="animate-on-scroll bg-[#00e5a0]/10 border border-[#00e5a0]/30 rounded-2xl p-6" aria-live="polite">
            <div className="text-3xl mb-3">🎉</div>
            <p className="text-[#00e5a0] font-semibold text-lg">Vous êtes inscrit !</p>
            <p className="text-[#6a8a7a] text-sm mt-1">
              On vous préviendra en premier lors du lancement Android.
            </p>
          </div>
        ) : (
          <form action={action} className="animate-on-scroll delay-300 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              name="email"
              placeholder="votre@email.com"
              required
              aria-label="Adresse email"
              className="flex-1 px-4 py-3 rounded-xl bg-[#0f1a14] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5a0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f0d] focus:border-[#00e5a0]/50 transition-colors text-sm"
            />
            <button
              type="submit"
              disabled={isPending}
              className="px-6 py-3 bg-[#00e5a0] text-black font-semibold rounded-xl hover:bg-[#00b37d] transition-colors disabled:opacity-50 text-sm shrink-0 focus-visible:ring-2 focus-visible:ring-[#00e5a0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f0d]"
            >
              {isPending ? "..." : "M'inscrire"}
            </button>
          </form>
        )}

        {state?.error && (
          <p className="mt-3 text-red-400 text-sm" aria-live="polite">{state.error}</p>
        )}

        <p className="animate-on-scroll delay-400 text-[#6a8a7a] text-xs mt-4">
          Pas de spam. Désabonnement en un clic.
        </p>
      </div>
    </section>
  );
}
