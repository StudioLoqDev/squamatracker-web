import { prisma } from "@/lib/prisma";
import { WaitlistClient } from "@/components/admin/WaitlistClient";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

async function getEntries() {
  try {
    return await prisma.waitlistEntry.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    return [];
  }
}

export default async function WaitlistPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const entries = await getEntries();

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Liste d&apos;attente</h1>
          <p className="text-[#6a8a7a] text-sm mt-1">
            {entries.length} inscription{entries.length > 1 ? "s" : ""} au total
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
          <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      </div>
      <WaitlistClient entries={entries} />
    </div>
  );
}
