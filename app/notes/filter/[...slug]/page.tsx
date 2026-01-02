import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tagFromUrl = slug?.[0] || "all";

  const displayTag = tagFromUrl.charAt(0).toUpperCase() + tagFromUrl.slice(1);

  return {
    title: `Notes: ${displayTag} | NoteHub`,
    description: `Browse all notes filtered by category: ${displayTag}`,
    openGraph: {
      title: `Notes: ${displayTag} | NoteHub`,
      description: `Browse all notes filtered by category: ${displayTag}`,
      url: `https://08-zustand-tau-two.vercel.app/notes/filter/${tagFromUrl}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          alt: `NoteHub ${displayTag} Category`,
        },
      ],
    },
  };
}

export default async function FilteredNotesPage({ params }: PageProps) {
  const { slug } = await params;

  const tagFromUrl = slug?.[0];
  const tag = tagFromUrl?.toLowerCase() === "all" ? undefined : tagFromUrl;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", tag, "", 1],
    queryFn: () => fetchNotes({ tag, search: "", page: 1 }),
  });

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient tag={tag} />
      </HydrationBoundary>
    </main>
  );
}
