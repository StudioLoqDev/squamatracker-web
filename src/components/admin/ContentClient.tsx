"use client";

import { useState, useTransition } from "react";
import { updateSiteContent } from "@/actions/content";
import { SAVE_TIMEOUT } from "@/lib/constants";

interface ContentField {
  key: string;
  label: string;
  description: string;
  type: "input" | "textarea";
  defaultValue: string;
}

const contentFields: ContentField[] = [
  {
    key: "hero_title",
    label: "Titre Hero",
    description: "Titre principal affiché sur la page d'accueil",
    type: "input",
    defaultValue: "Le suivi reptile intelligent",
  },
  {
    key: "hero_subtitle",
    label: "Sous-titre Hero",
    description: "Description sous le titre de la landing page",
    type: "textarea",
    defaultValue: "Gérez tous vos animaux comme un pro. Repas, mues, bains, terrarium — tout en un.",
  },
  {
    key: "appstore_url",
    label: "Lien App Store",
    description: "URL du lien de téléchargement App Store",
    type: "input",
    defaultValue: "#",
  },
  {
    key: "about_text",
    label: "Texte À propos",
    description: "Contenu principal de la page /about (HTML accepté)",
    type: "textarea",
    defaultValue: "",
  },
];

export function ContentClient({ content }: { content: Record<string, string> }) {
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(contentFields.map((f) => [f.key, content[f.key] ?? f.defaultValue]))
  );
  const [isPending, startTransition] = useTransition();

  const handleSave = (key: string) => {
    startTransition(async () => {
      await updateSiteContent(key, values[key]);
      setSaved((prev) => ({ ...prev, [key]: true }));
      setTimeout(() => setSaved((prev) => ({ ...prev, [key]: false })), SAVE_TIMEOUT);
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {contentFields.map((field) => (
        <div key={field.key} className="p-6 rounded-xl bg-[#0f1a14] border border-white/10">
          <div className="mb-3">
            <h3 className="text-white font-semibold">{field.label}</h3>
            <p className="text-[#6a8a7a] text-xs mt-0.5">{field.description}</p>
          </div>

          {field.type === "textarea" ? (
            <textarea
              value={values[field.key]}
              onChange={(e) => setValues((prev) => ({ ...prev, [field.key]: e.target.value }))}
              rows={5}
              className="w-full px-4 py-2.5 rounded-xl bg-[#0a0f0d] border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#00e5a0]/50 transition-colors resize-y text-sm font-mono"
            />
          ) : (
            <input
              type="text"
              value={values[field.key]}
              onChange={(e) => setValues((prev) => ({ ...prev, [field.key]: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl bg-[#0a0f0d] border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#00e5a0]/50 transition-colors text-sm"
            />
          )}

          <div className="flex items-center justify-between mt-3">
            <span className="text-[#6a8a7a] text-xs">
              Clé : <code className="text-[#00e5a0]/70 font-mono">{field.key}</code>
            </span>
            <button
              onClick={() => handleSave(field.key)}
              disabled={isPending}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                saved[field.key]
                  ? "bg-[#00e5a0]/20 text-[#00e5a0] border border-[#00e5a0]/40"
                  : "bg-[#00e5a0] text-black hover:bg-[#00b37d]"
              }`}
            >
              {saved[field.key] ? "✓ Sauvegardé" : "Sauvegarder"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
