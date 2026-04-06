"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-[#0f1a14] border border-white/10 rounded-2xl p-4 md:p-5 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-white text-sm font-medium mb-1">
            Nous utilisons des cookies
          </p>
          <p className="text-[#6a8a7a] text-xs leading-relaxed">
            SquamaTracker utilise des cookies analytiques (PostHog) pour améliorer votre expérience.
            Aucune donnée personnelle n&apos;est vendue.{" "}
            <Link href="/privacy" className="text-[#00e5a0] hover:underline">
              En savoir plus
            </Link>
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-sm text-[#6a8a7a] hover:text-white border border-white/10 rounded-xl hover:border-white/20 transition-colors"
          >
            Refuser
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-sm font-medium bg-[#00e5a0] text-black rounded-xl hover:bg-[#00b37d] transition-colors"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
