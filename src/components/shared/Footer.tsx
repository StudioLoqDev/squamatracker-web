import Link from "next/link";

const footerLinks = [
  { href: "/app", label: "L'App" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/changelog", label: "Changelog" },
  { href: "/about", label: "À propos" },
  { href: "/ideas", label: "Proposer une idée" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Confidentialité" },
];

export function Footer() {
  return (
    <footer className="bg-[#0a0f0d] border-t border-[#00e5a0]/10 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-10">
          {/* Logo + tagline */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#0f1a14] border border-[#00e5a0]/40 flex items-center justify-center">
                <span className="text-[#00e5a0] font-bold text-[9px] tracking-widest">ST</span>
              </div>
              <span className="font-cinzel text-white font-semibold text-sm tracking-widest">
                SQUAMA <span className="text-[#00e5a0]">TRACKER</span>
              </span>
            </div>
            <p className="text-[#6a8a7a] text-xs max-w-[200px] leading-relaxed">
              Le suivi reptile intelligent.<br />
              Disponible sur App Store.
            </p>
            {/* App Store badge */}
            <a
              href={process.env.NEXT_PUBLIC_APPSTORE_URL ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#00e5a0]/30 transition-colors"
            >
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <span className="text-white text-xs font-medium">App Store</span>
            </a>
          </div>

          {/* Liens */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-12 gap-y-3">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#6a8a7a] hover:text-[#00e5a0] transition-colors text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-[#00e5a0]/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#6a8a7a] text-xs">
            © {new Date().getFullYear()} SquamaTracker — Studio DevLoq. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4 text-xs">
            <Link
              href="/privacy"
              className="text-[#6a8a7a] hover:text-[#00e5a0] transition-colors border-b border-[#00e5a0]/25 hover:border-[#00e5a0] pb-px"
            >
              Politique de confidentialité
            </Link>
            <span className="text-[#6a8a7a]">·</span>
            <a
              href="/cgu.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6a8a7a] hover:text-[#00e5a0] transition-colors border-b border-[#00e5a0]/25 hover:border-[#00e5a0] pb-px"
            >
              CGU
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
