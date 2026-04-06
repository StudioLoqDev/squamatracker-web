"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { z } from "zod";

const roadmapItemSchema = z.object({
  status: z.enum(["done", "in-progress", "planned", "considering"]),
  quarter: z.string().max(20),
  title: z.string().min(1).max(100),
  description: z.string().max(500),
  icon: z.string().max(10).default("🔮"),
});

export async function getRoadmapItems() {
  try {
    return await prisma.roadmapItem.findMany({
      orderBy: { order: "asc" },
    });
  } catch {
    return [];
  }
}

export async function createRoadmapItem(_prev: unknown, formData: FormData) {
  await requireAdmin();
  const raw = {
    status: formData.get("status") as string,
    quarter: formData.get("quarter") as string,
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    icon: formData.get("icon") as string,
  };
  const result = roadmapItemSchema.safeParse(raw);
  if (!result.success) {
    return { error: "Données invalides" };
  }
  try {
    const count = await prisma.roadmapItem.count();
    await prisma.roadmapItem.create({
      data: {
        ...result.data,
        order: count,
      },
    });
    revalidatePath("/admin/roadmap");
    revalidatePath("/roadmap");
    return { success: true };
  } catch {
    return { error: "Erreur lors de la création" };
  }
}

export async function updateRoadmapItem(_prev: unknown, formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  const raw = {
    status: formData.get("status") as string,
    quarter: formData.get("quarter") as string,
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    icon: formData.get("icon") as string,
  };
  const result = roadmapItemSchema.safeParse(raw);
  if (!result.success) {
    return { error: "Données invalides" };
  }
  try {
    await prisma.roadmapItem.update({
      where: { id },
      data: result.data,
    });
    revalidatePath("/admin/roadmap");
    revalidatePath("/roadmap");
    return { success: true };
  } catch {
    return { error: "Erreur lors de la mise à jour" };
  }
}

export async function deleteRoadmapItem(id: string) {
  await requireAdmin();
  await prisma.roadmapItem.delete({ where: { id } });
  revalidatePath("/admin/roadmap");
  revalidatePath("/roadmap");
}

export async function moveRoadmapItem(id: string, direction: "up" | "down") {
  await requireAdmin();
  const items = await prisma.roadmapItem.findMany({ orderBy: { order: "asc" } });
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) return;

  const swapIdx = direction === "up" ? idx - 1 : idx + 1;
  if (swapIdx < 0 || swapIdx >= items.length) return;

  await prisma.$transaction([
    prisma.roadmapItem.update({ where: { id: items[idx].id }, data: { order: items[swapIdx].order } }),
    prisma.roadmapItem.update({ where: { id: items[swapIdx].id }, data: { order: items[idx].order } }),
  ]);
  revalidatePath("/admin/roadmap");
  revalidatePath("/roadmap");
}

const DEFAULT_SEED = [
  { status: "done", quarter: "Q4 2025", title: "Lancement iOS", description: "Application disponible sur l'App Store avec les fonctionnalités de base.", icon: "✅", order: 0 },
  { status: "done", quarter: "Q1 2026", title: "Encyclopédie des reptiles", description: "200+ fiches espèces avec photos, conseils de soin et conditions optimales.", icon: "✅", order: 1 },
  { status: "in-progress", quarter: "Q2 2026", title: "Application Android", description: "SquamaTracker débarque sur Android. Liste d'attente ouverte !", icon: "🚧", order: 2 },
  { status: "in-progress", quarter: "Q2 2026", title: "Partage entre propriétaires", description: "Partagez le suivi de vos animaux avec un vétérinaire ou un ami.", icon: "🚧", order: 3 },
  { status: "planned", quarter: "Q3 2026", title: "IA — Conseils personnalisés", description: "Suggestions intelligentes basées sur l'historique de vos animaux.", icon: "🔮", order: 4 },
  { status: "planned", quarter: "Q3 2026", title: "Marketplace animaux", description: "Achetez et vendez des reptiles en toute sécurité au sein de la communauté.", icon: "🔮", order: 5 },
  { status: "planned", quarter: "Q4 2026", title: "Application watchOS", description: "Consultez l'état de vos animaux depuis votre Apple Watch.", icon: "🔮", order: 6 },
  { status: "considering", quarter: "2027", title: "Version web", description: "Accédez à SquamaTracker depuis votre navigateur.", icon: "💭", order: 7 },
];

export async function seedDefaultRoadmap() {
  await requireAdmin();
  try {
    await prisma.roadmapItem.createMany({ data: DEFAULT_SEED });
    revalidatePath("/admin/roadmap");
    revalidatePath("/roadmap");
    return { success: true };
  } catch {
    return { error: "Erreur lors de l'import" };
  }
}
