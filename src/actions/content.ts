"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { z } from "zod";

const validContentKeys = z.enum(["hero_title", "hero_subtitle", "appstore_url", "about_text"]);

export async function getAllContent() {
  const items = await prisma.siteContent.findMany();
  return Object.fromEntries(items.map((c) => [c.key, c.value]));
}

export async function updateSiteContent(key: string, value: string) {
  await requireAdmin();
  const keyValidation = validContentKeys.safeParse(key);
  if (!keyValidation.success) {
    return { error: "Clé invalide" };
  }
  if (value.length > 5000) {
    return { error: "Valeur trop longue (max 5000 caractères)" };
  }
  await prisma.siteContent.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/app");
  revalidatePath("/admin/content");
  return { success: true };
}
