import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

async function getStats() {
  try {
    const [unreadIdeas, totalIdeas, unreadMessages, totalMessages, totalWaitlist] =
      await Promise.all([
        prisma.idea.count({ where: { isRead: false } }),
        prisma.idea.count(),
        prisma.contactMessage.count({ where: { isRead: false } }),
        prisma.contactMessage.count(),
        prisma.waitlistEntry.count(),
      ]);
    return { unreadIdeas, totalIdeas, unreadMessages, totalMessages, totalWaitlist };
  } catch {
    return { unreadIdeas: 0, totalIdeas: 0, unreadMessages: 0, totalMessages: 0, totalWaitlist: 0 };
  }
}

export default async function AdminPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const stats = await getStats();

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">
          Dashboard <span className="text-[#00e5a0]">Admin</span>
        </h1>
        <p className="text-[#6a8a7a] text-sm mt-1">
          Connecté en tant que {session.user?.email}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Idées non lues",
            value: stats.unreadIdeas,
            sub: `${stats.totalIdeas} total`,
            href: "/admin/ideas",
            color: stats.unreadIdeas > 0 ? "#00e5a0" : "#6a8a7a",
          },
          {
            label: "Messages non lus",
            value: stats.unreadMessages,
            sub: `${stats.totalMessages} total`,
            href: "/admin/messages",
            color: stats.unreadMessages > 0 ? "#00e5a0" : "#6a8a7a",
          },
          {
            label: "Liste d'attente",
            value: stats.totalWaitlist,
            sub: "inscriptions",
            href: "/admin/waitlist",
            color: "#6a8a7a",
          },
          {
            label: "Contenu du site",
            value: "✏️",
            sub: "Modifier",
            href: "/admin/content",
            color: "#6a8a7a",
          },
        ].map((stat) => (
          <Link
            key={stat.href}
            href={stat.href}
            className="p-5 rounded-xl bg-[#0f1a14] border border-white/10 hover:border-[#00e5a0]/30 transition-colors group"
          >
            <p className="text-3xl font-bold" style={{ color: stat.color }}>
              {stat.value}
            </p>
            <p className="text-white text-sm font-medium mt-1">{stat.label}</p>
            <p className="text-[#6a8a7a] text-xs mt-0.5">{stat.sub}</p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="p-6 rounded-xl bg-[#0f1a14] border border-white/10">
        <h2 className="text-white font-semibold mb-4">Accès rapide</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: "💡", label: "Voir les idées", href: "/admin/ideas" },
            { icon: "✉️", label: "Voir les messages", href: "/admin/messages" },
            { icon: "👥", label: "Liste d'attente", href: "/admin/waitlist" },
            { icon: "✏️", label: "Modifier le contenu", href: "/admin/content" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[#0a0f0d] border border-white/5 hover:border-[#00e5a0]/30 transition-colors text-center"
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-[#6a8a7a] text-xs">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
