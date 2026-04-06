import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getRoadmapItems } from "@/actions/roadmap";
import { RoadmapAdminClient } from "@/components/admin/RoadmapAdminClient";
import Link from "next/link";

export const metadata = { title: "Roadmap — Admin SquamaTracker" };

export default async function AdminRoadmapPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const items = await getRoadmapItems();

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Roadmap <span className="text-[#00e5a0]">publique</span>
          </h1>
          <p className="text-[#6a8a7a] text-sm mt-1">
            Gérez les éléments affichés sur la page roadmap
          </p>
        </div>
        <Link
          href="/roadmap"
          target="_blank"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-[#6a8a7a] hover:text-white text-sm transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Voir la page
        </Link>
      </div>

      <RoadmapAdminClient items={items} />
    </div>
  );
}
