"use server";

import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { z } from "zod";
import { requireAdmin } from "@/lib/require-admin";
import { headers } from "next/headers";
import { isRateLimited } from "@/lib/rate-limit";
import { ADMIN_NOTIFICATION_EMAIL } from "@/lib/constants";

const ideaSchema = z.object({
  name: z.string().optional(),
  email: z.union([z.string().email(), z.literal("")]).optional(),
  category: z.string().min(1, "Catégorie requise"),
  message: z.string().min(20, "Le message doit contenir au moins 20 caractères"),
});

export async function submitIdea(formData: FormData) {
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip, "ideas")) {
    return { success: false, error: "Trop de tentatives. Réessayez dans une minute." };
  }

  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    category: formData.get("category") as string,
    message: formData.get("message") as string,
  };

  const result = ideaSchema.safeParse(raw);
  if (!result.success) {
    return {
      success: false,
      error: result.error.issues[0]?.message ?? "Données invalides",
    };
  }

  const data = result.data;

  try {
    await prisma.idea.create({
      data: {
        name: data.name || null,
        email: data.email || null,
        category: data.category,
        message: data.message,
      },
    });

    await sendEmail({
      to: ADMIN_NOTIFICATION_EMAIL,
      subject: `💡 Nouvelle idée SquamaTracker : ${data.category}`,
      text: `Nouvelle idée soumise sur SquamaTracker\n\nDe : ${data.name || "Anonyme"}${data.email ? ` (${data.email})` : ""}\nCatégorie : ${data.category}\n\n${data.message}`,
    });

    return { success: true };
  } catch {
    return { success: false, error: "Erreur lors de l'envoi. Réessayez." };
  }
}

// Admin actions
import { revalidatePath } from "next/cache";

export async function markIdeaRead(id: string) {
  await requireAdmin();
  await prisma.idea.update({ where: { id }, data: { isRead: true } });
  revalidatePath("/admin/ideas");
}

export async function markIdeaUnread(id: string) {
  await requireAdmin();
  await prisma.idea.update({ where: { id }, data: { isRead: false } });
  revalidatePath("/admin/ideas");
}

export async function deleteIdea(id: string) {
  await requireAdmin();
  await prisma.idea.delete({ where: { id } });
  revalidatePath("/admin/ideas");
}
