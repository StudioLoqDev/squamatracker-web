import type { Metadata } from "next";
import { Cinzel, Rajdhani } from "next/font/google";
import "./globals.css";
import { PHProvider } from "./providers";
import { CookieBanner } from "@/components/shared/CookieBanner";
import { ScrollAnimationInit } from "@/components/shared/ScrollAnimationInit";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "SquamaTracker — L'app de suivi reptile intelligent",
    template: "%s — SquamaTracker",
  },
  description:
    "Gérez vos reptiles comme un pro. Suivi repas, mues, bains, terrarium, encyclopédie et plus. Disponible sur App Store.",
  keywords: ["reptile", "gecko", "serpent", "lézard", "tortue", "suivi", "app", "terrarium", "squamatracker"],
  openGraph: {
    title: "SquamaTracker — L'app de suivi reptile intelligent",
    description: "Gérez vos reptiles comme un pro. Disponible sur App Store.",
    siteName: "SquamaTracker",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SquamaTracker",
    description: "L'app de suivi reptile pour les passionnés",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${cinzel.variable} ${rajdhani.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0f0d] text-[#c8d8d0]">
        <PHProvider>
          <ScrollAnimationInit />
          {children}
          <CookieBanner />
        </PHProvider>
      </body>
    </html>
  );
}
