import { notFound } from "next/navigation";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    const note = await fetchNoteById(id);

    return {
      title: `${note.title} | NoteHub`,
      description: note.content.substring(0, 150),
      openGraph: {
        title: note.title,
        description: note.content.substring(0, 150),
        url: `https://08-zustand-tau-two.vercel.app/notes/${id}`,
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            alt: note.title,
          },
        ],
      },
    };
  } catch {
    return {
      title: "Note Not Found | NoteHub",
    };
  }
}

export default async function NotePage({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["note", id],
      queryFn: () => fetchNoteById(id),
    });
  } catch {
    return notFound();
  }

  const state = dehydrate(queryClient);

  const noteData = state.queries.find((q) => q.queryKey[0] === "note")?.state
    .data;
  if (!noteData) return notFound();

  return (
    <HydrationBoundary state={state}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
}
