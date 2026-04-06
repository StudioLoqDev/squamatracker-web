"use server";

import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { z } from "zod";
import { requireAdmin } from "@/lib/require-admin";
import { headers } from "next/headers";
import { isRateLimited } from "@/lib/rate-limit";
import { ADMIN_NOTIFICATION_EMAIL } from "@/lib/constants";

const contactSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

export async function submitContact(formData: FormData) {
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip, "contact")) {
    return { success: false, error: "Trop de tentatives. Réessayez dans une minute." };
  }

  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    message: formData.get("message") as string,
  };

  const result = contactSchema.safeParse(raw);
  if (!result.success) {
    return {
      success: false,
      error: result.error.issues[0]?.message ?? "Données invalides",
    };
  }

  const data = result.data;

  try {
    await prisma.contactMessage.create({ data });

    await sendEmail({
      to: ADMIN_NOTIFICATION_EMAIL,
      subject: `📩 Nouveau message de ${data.name} — SquamaTracker`,
      text: `Nouveau message reçu sur SquamaTracker\n\nDe : ${data.name}\nEmail : ${data.email}\n\n${data.message}\n\n---\nRépondre à : ${data.email}`,
    });

    return { success: true };
  } catch {
    return { success: false, error: "Erreur lors de l'envoi. Réessayez." };
  }
}

// Admin actions
import { revalidatePath } from "next/cache";

export async function markMessageRead(id: string) {
  await requireAdmin();
  await prisma.contactMessage.update({ where: { id }, data: { isRead: true } });
  revalidatePath("/admin/messages");
}

export async function markMessageUnread(id: string) {
  await requireAdmin();
  await prisma.contactMessage.update({ where: { id }, data: { isRead: false } });
  revalidatePath("/admin/messages");
}

export async function deleteMessage(id: string) {
  await requireAdmin();
  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/admin/messages");
}
