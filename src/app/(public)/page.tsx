import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Testimonials } from "@/components/landing/Testimonials";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { WaitlistSection } from "@/components/landing/WaitlistSection";
import { CtaSection } from "@/components/landing/CtaSection";
import { prisma } from "@/lib/prisma";

async function getSiteContent() {
  try {
    const contents = await prisma.siteContent.findMany();
    return Object.fromEntries(contents.map((c) => [c.key, c.value]));
  } catch {
    return {};
  }
}

async function getWaitlistCount() {
  try {
    return await prisma.waitlistEntry.count();
  } catch {
    return 0;
  }
}

export default async function Home() {
  const [content, waitlistCount] = await Promise.all([
    getSiteContent(),
    getWaitlistCount(),
  ]);

  return (
    <>
      <Hero
        title={content.hero_title}
        subtitle={content.hero_subtitle}
        appstoreUrl={content.appstore_url}
      />
      <Features />
      <Testimonials />
      <Pricing appstoreUrl={content.appstore_url} />
      <FAQ />
      <WaitlistSection count={waitlistCount} />
      <CtaSection appstoreUrl={content.appstore_url} />
    </>
  );
}
