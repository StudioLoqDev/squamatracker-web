"use client";

import { useState } from "react";

const faqs = [
  {
    q: "SquamaTracker est-il vraiment gratuit ?",
    a: "Oui ! La version gratuite vous permet de gérer jusqu'à 3 animaux avec les fonctionnalités de base : suivi des repas, mues, bains et terrarium. La version Premium (9,99€/mois ou 79,99€/an) débloque les animaux illimités, l'encyclopédie, les statistiques, le module reproduction, le calculateur de proies et plus — avec 7 jours d'essai gratuit.",
  },
  {
    q: "Sur quels appareils fonctionne l'application ?",
    a: "SquamaTracker est actuellement disponible sur iPhone et iPad (iOS 16+). Une version Android est en cours de développement — inscrivez-vous sur la liste d'attente pour être informé en premier !",
  },
  {
    q: "Quels reptiles puis-je suivre ?",
    a: "Tous ! Geckos, pythons, boas, lézards barbus, scinques, tortues, caméléons, amphibiens... L'app est conçue pour fonctionner avec n'importe quel animal. Notre encyclopédie couvre plus de 200 espèces (serpents, lézards, tortues, amphibiens).",
  },
  {
    q: "Mes données sont-elles en sécurité ?",
    a: "Absolument. Vos données sont chiffrées et stockées en Europe (RGPD). Nous ne vendons jamais vos informations à des tiers. Vous pouvez exporter ou supprimer vos données à tout moment.",
  },
  {
    q: "Puis-je annuler le Premium à tout moment ?",
    a: "Oui, sans engagement. Vous pouvez annuler votre abonnement à tout moment depuis les Réglages de l'App Store. Vous conservez l'accès Premium jusqu'à la fin de la période payée.",
  },
  {
    q: "Y a-t-il des rappels automatiques ?",
    a: "Oui ! SquamaTracker peut vous envoyer des notifications pour les repas programmés, les bains, les contrôles de terrarium et les mues. Vous configurez les horaires selon votre emploi du temps.",
  },
  {
    q: "Comment fonctionne l'encyclopédie ?",
    a: "L'encyclopédie (Premium) contient des fiches détaillées sur plus de 200 espèces — serpents, lézards, tortues, amphibiens : température, humidité, alimentation, morphes, soins... Parfait pour les débutants et les experts.",
  },
  {
    q: "Comment proposer une nouvelle fonctionnalité ?",
    a: "Nous adorons les retours de notre communauté ! Rendez-vous sur la page \"Proposer une idée\" pour nous envoyer vos suggestions. Les idées les plus votées sont prioritaires dans notre roadmap.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-on-scroll">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00e5a0]/30 bg-[#00e5a0]/5 text-[#00e5a0] text-xs font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e5a0]" />
            Questions fréquentes
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Tout ce que vous voulez{" "}
            <span className="text-[#00e5a0]">savoir</span>
          </h2>
          <p className="text-[#6a8a7a] text-lg">
            Une question ? La réponse est probablement ici.
          </p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-3 animate-on-scroll">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-[#0f1a14] border border-white/10 rounded-2xl overflow-hidden hover:border-[#00e5a0]/20 transition-colors"
            >
              <button
                id={`faq-btn-${i}`}
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span className="text-white font-medium text-sm md:text-base">
                  {faq.q}
                </span>
                <span
                  className={`text-[#00e5a0] shrink-0 transition-transform duration-300 ${
                    open === i ? "rotate-45" : ""
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </span>
              </button>
              <div
                id={`faq-answer-${i}`}
                role="region"
                aria-labelledby={`faq-btn-${i}`}
                className={`overflow-hidden transition-all duration-300 ${
                  open === i ? "max-h-64" : "max-h-0"
                }`}
              >
                <p className="px-6 pb-5 text-[#6a8a7a] text-sm leading-relaxed border-t border-white/5 pt-4">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
