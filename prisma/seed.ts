import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Contenu du site par défaut
  const contents = [
    {
      key: "hero_title",
      value: "Le suivi reptile intelligent",
    },
    {
      key: "hero_subtitle",
      value: "Gérez tous vos animaux comme un pro. Repas, mues, bains, terrarium — tout en un.",
    },
    {
      key: "appstore_url",
      value: "https://apps.apple.com/app/squamatracker",
    },
    {
      key: "about_text",
      value: "SquamaTracker est une application iOS créée par des passionnés de reptiles, pour des passionnés de reptiles. Notre mission : simplifier le suivi quotidien de vos animaux.",
    },
  ];

  for (const content of contents) {
    await prisma.siteContent.upsert({
      where: { key: content.key },
      update: { value: content.value },
      create: content,
    });
    console.log(`  ✓ ${content.key}`);
  }

  console.log("✅ Seed terminé !");
}

main()
  .catch((e) => {
    console.error("❌ Erreur seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
