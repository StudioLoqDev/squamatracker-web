import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getAllContent } from "@/actions/content";
import { ContentClient } from "@/components/admin/ContentClient";

export const metadata = { title: "Contenu — Admin" };

export default async function AdminContentPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const content = await getAllContent();

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Gestion du contenu</h1>
        <p className="text-[#6a8a7a] text-sm mt-1">
          Modifiez les textes affichés sur le site public sans toucher au code.
        </p>
      </div>
      <ContentClient content={content} />
    </div>
  );
}
