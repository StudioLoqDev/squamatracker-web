"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/app", label: "App" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/changelog", label: "Changelog" },
  { href: "/about", label: "À propos" },
  { href: "/ideas", label: "Proposer une idée" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ferme le menu mobile si changement de route
  useEffect(() => setIsOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300",
        scrolled
          ? "bg-[#0f1a14]/95 backdrop-blur-sm border-b border-[#00e5a0]/10"
          : "bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-[#0f1a14] border border-[#00e5a0]/40 flex items-center justify-center group-hover:border-[#00e5a0]/80 transition-colors">
            <span className="text-[#00e5a0] font-bold text-xs tracking-widest">ST</span>
          </div>
          <span className="font-cinzel text-white font-semibold text-sm tracking-widest hidden sm:block">
            SQUAMA <span className="text-[#00e5a0]">TRACKER</span>
          </span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm transition-colors",
                pathname === link.href
                  ? "text-[#00e5a0] font-medium"
                  : "text-[#6a8a7a] hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-3">
          <Button asChild size="sm" className="hidden sm:flex">
            <a
              href={process.env.NEXT_PUBLIC_APPSTORE_URL ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              Télécharger
            </a>
          </Button>

          <button
            className="lg:hidden text-[#6a8a7a] hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <div className="lg:hidden bg-[#0f1a14] border-b border-[#00e5a0]/10">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm transition-colors",
                  pathname === link.href
                    ? "text-[#00e5a0] bg-[#00e5a0]/10 font-medium"
                    : "text-[#6a8a7a] hover:text-white hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 mt-2 border-t border-white/5">
              <Button asChild className="w-full" size="sm">
                <a
                  href={process.env.NEXT_PUBLIC_APPSTORE_URL ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Télécharger sur App Store
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
