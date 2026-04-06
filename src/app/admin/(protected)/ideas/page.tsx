import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { IdeasClient } from "@/components/admin/IdeasClient";

async function getIdeas() {
  try {
    return await prisma.idea.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    return [];
  }
}

export const metadata = { title: "Idées — Admin" };

export default async function AdminIdeasPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const ideas = await getIdeas();
  const unreadCount = ideas.filter((i) => !i.isRead).length;

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-white">Idées soumises</h1>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-[#00e5a0] text-black text-xs font-bold">
              {unreadCount} non lues
            </span>
          )}
        </div>
        <p className="text-[#6a8a7a] text-sm mt-1">
          Idées et suggestions envoyées par les utilisateurs.
        </p>
      </div>
      <IdeasClient ideas={ideas} />
    </div>
  );
}
