"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Identifiants incorrects. Réessayez.");
    } else {
      router.push("/admin");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0f0d] px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8 gap-3">
          <div className="w-16 h-16 rounded-full bg-[#0f1a14] border border-[#00e5a0]/40 flex items-center justify-center">
            <span className="text-[#00e5a0] font-bold text-sm tracking-widest">ST</span>
          </div>
          <div className="text-center">
            <h1 className="text-xl font-bold text-white tracking-tight">
              SQUAMA <span className="text-[#00e5a0]">TRACKER</span>
            </h1>
            <p className="text-[#6a8a7a] text-xs mt-1">Espace Administration</p>
          </div>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-[#6a8a7a]" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full px-4 py-3 rounded-lg bg-[#0f1a14] border border-[#00e5a0]/20 text-white placeholder-[#6a8a7a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5a0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1a14] focus:border-[#00e5a0]/60 transition-colors"
              placeholder="admin@squamatracker.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-[#6a8a7a]" htmlFor="password">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full px-4 py-3 rounded-lg bg-[#0f1a14] border border-[#00e5a0]/20 text-white placeholder-[#6a8a7a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5a0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1a14] focus:border-[#00e5a0]/60 transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">
              {error}
            </p>
          )}

          <Button type="submit" disabled={loading} className="w-full mt-2" size="lg">
            {loading ? "Connexion..." : "Se connecter"}
          </Button>
        </form>
      </div>
    </div>
  );
}
