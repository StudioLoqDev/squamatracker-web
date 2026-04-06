"use client";

import { useActionState } from "react";
import { submitContact } from "@/actions/contact";
import { Button } from "@/components/ui/button";

const initialState = { success: false, error: undefined as string | undefined };

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    async (_prev: typeof initialState, formData: FormData) => {
      const result = await submitContact(formData);
      return result as typeof initialState;
    },
    initialState
  );

  if (state.success) {
    return (
      <div className="p-8 rounded-2xl bg-[#0f1a14] border border-[#00e5a0]/40 text-center flex flex-col items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-[#00e5a0]/10 border border-[#00e5a0]/30 flex items-center justify-center text-3xl">
          ✉️
        </div>
        <h2 className="text-xl font-bold text-white">Message envoyé !</h2>
        <p className="text-[#6a8a7a]">
          Merci de nous avoir contactés. Nous vous répondrons dans les plus
          brefs délais, généralement sous 24–48h.
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="flex flex-col gap-5 p-8 rounded-2xl bg-[#0f1a14] border border-white/10"
    >
      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm text-[#6a8a7a]">
          Nom <span className="text-[#00e5a0]">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Votre prénom et nom"
          className="w-full px-4 py-2.5 rounded-xl bg-[#0a0f0d] border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5a0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f0d] focus:border-[#00e5a0]/50 transition-colors"
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm text-[#6a8a7a]">
          Email <span className="text-[#00e5a0]">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="votre@email.com"
          className="w-full px-4 py-2.5 rounded-xl bg-[#0a0f0d] border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5a0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f0d] focus:border-[#00e5a0]/50 transition-colors"
        />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm text-[#6a8a7a]">
          Message <span className="text-[#00e5a0]">*</span>
          <span className="text-xs ml-2">(min. 10 caractères)</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          rows={6}
          placeholder="Décrivez votre question ou problème..."
          className="w-full px-4 py-2.5 rounded-xl bg-[#0a0f0d] border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5a0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f0d] focus:border-[#00e5a0]/50 transition-colors resize-none"
        />
      </div>

      {state.error && (
        <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-2" aria-live="polite">
          {state.error}
        </p>
      )}

      <Button type="submit" size="lg" disabled={isPending} className="w-full mt-1">
        {isPending ? "Envoi en cours..." : "Envoyer le message"}
      </Button>
    </form>
  );
}
