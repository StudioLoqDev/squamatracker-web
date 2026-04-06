import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { MessagesClient } from "@/components/admin/MessagesClient";

async function getMessages() {
  try {
    return await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    return [];
  }
}

export const metadata = { title: "Messages — Admin" };

export default async function AdminMessagesPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const messages = await getMessages();
  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-white">Messages de contact</h1>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-[#00e5a0] text-black text-xs font-bold">
              {unreadCount} non lus
            </span>
          )}
        </div>
        <p className="text-[#6a8a7a] text-sm mt-1">
          Messages reçus via le formulaire de contact.
        </p>
      </div>
      <MessagesClient messages={messages} />
    </div>
  );
}
