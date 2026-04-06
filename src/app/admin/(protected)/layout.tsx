import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Sidebar } from "@/components/admin/Sidebar";

async function getUnreadCounts() {
  try {
    const [ideas, messages] = await Promise.all([
      prisma.idea.count({ where: { isRead: false } }),
      prisma.contactMessage.count({ where: { isRead: false } }),
    ]);
    return { ideas, messages };
  } catch {
    return { ideas: 0, messages: 0 };
  }
}

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const counts = await getUnreadCounts();

  return (
    <div className="flex min-h-screen bg-[#0a0f0d]">
      <Sidebar ideasCount={counts.ideas} messagesCount={counts.messages} />
      <main className="flex-1 lg:min-h-screen pt-0 lg:pt-0 mt-10 lg:mt-0">
        {children}
      </main>
    </div>
  );
}
