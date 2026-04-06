"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/require-admin";
import { headers } from "next/headers";
import { isRateLimited } from "@/lib/rate-limit";

const schema = z.object({
  email: z.string().email("Adresse email invalide"),
});

export async function joinWaitlist(_prev: unknown, formData: FormData) {
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip, "waitlist")) {
    return { error: "Trop de tentatives. Réessayez dans une minute." };
  }

  const result = schema.safeParse({ email: formData.get("email") });
  if (!result.success) {
    return { error: result.error.issues[0]?.message ?? "Email invalide" };
  }

  try {
    await prisma.waitlistEntry.create({ data: { email: result.data.email } });
    revalidatePath("/");
    return { success: true };
  } catch {
    return { error: "Cet email est déjà inscrit sur la liste." };
  }
}

export async function getWaitlistCount(): Promise<number> {
  try {
    return await prisma.waitlistEntry.count();
  } catch (_e) {
    return 0;
  }
}

export async function getWaitlistEntries() {
  await requireAdmin();
  try {
    return await prisma.waitlistEntry.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export async function deleteWaitlistEntry(id: string) {
  await requireAdmin();
  await prisma.waitlistEntry.delete({ where: { id } });
  revalidatePath("/admin/waitlist");
}

export async function exportWaitlistCSV() {
  await requireAdmin();
  try {
    const entries = await prisma.waitlistEntry.findMany({
      orderBy: { createdAt: "asc" },
    });
    const header = "email,date_inscription";
    const rows = entries.map(
      (e) => `${e.email},${new Date(e.createdAt).toISOString()}`
    );
    return { csv: [header, ...rows].join("\n") };
  } catch {
    return { error: "Erreur export" };
  }
}

export async function exportMessagesCSV() {
  await requireAdmin();
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
    const header = "nom,email,message,date,lu";
    const rows = messages.map(
      (m) =>
        `"${m.name}","${m.email}","${m.message.replace(/"/g, '""')}",${new Date(m.createdAt).toISOString()},${m.isRead}`
    );
    return { csv: [header, ...rows].join("\n") };
  } catch {
    return { error: "Erreur export" };
  }
}

export async function exportIdeasCSV() {
  await requireAdmin();
  try {
    const ideas = await prisma.idea.findMany({
      orderBy: { createdAt: "desc" },
    });
    const header = "nom,email,categorie,message,date,lu";
    const rows = ideas.map(
      (i) =>
        `"${i.name ?? ""}","${i.email ?? ""}","${i.category ?? ""}","${i.message.replace(/"/g, '""')}",${new Date(i.createdAt).toISOString()},${i.isRead}`
    );
    return { csv: [header, ...rows].join("\n") };
  } catch {
    return { error: "Erreur export" };
  }
}
