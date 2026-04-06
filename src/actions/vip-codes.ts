"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";

function randomCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

export async function createVipCode(formData: FormData) {
  await requireAdmin();
  const code = (formData.get("code") as string)?.trim().toUpperCase() || randomCode();
  const note = (formData.get("note") as string)?.trim() || null;

  try {
    await prisma.vipCode.create({ data: { code, note } });
    revalidatePath("/admin/vip-codes");
    return { success: true };
  } catch {
    return { success: false, error: "Ce code existe déjà." };
  }
}

export async function generateVipCode() {
  await requireAdmin();
  let code = randomCode();
  let attempts = 0;
  while (attempts < 10) {
    const exists = await prisma.vipCode.findUnique({ where: { code } });
    if (!exists) break;
    code = randomCode();
    attempts++;
  }
  return code;
}

export async function toggleVipCode(id: string, isActive: boolean) {
  await requireAdmin();
  await prisma.vipCode.update({ where: { id }, data: { isActive } });
  revalidatePath("/admin/vip-codes");
}

export async function deleteVipCode(id: string) {
  await requireAdmin();
  await prisma.vipCode.delete({ where: { id } });
  revalidatePath("/admin/vip-codes");
}
