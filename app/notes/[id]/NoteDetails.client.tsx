"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import css from "./NoteDetails.module.css";

interface NoteDetailsClientProps {
  id: string;
}

export default function NoteDetailsClient({ id }: NoteDetailsClientProps) {
  const router = useRouter();

  const { data: note, isLoading } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <div className={css.container}>Loading...</div>;
  if (!note) return <div className={css.container}>Note not found.</div>;

  return (
    <div className={css.container}>
      <button onClick={() => router.back()} className={css.backBtn}>
        ← Back
      </button>

      <h1 className={css.title}>{note.title}</h1>
      <p className={css.content}>{note.content}</p>
      <div className={css.footer}>
        <span className={css.tag}>Tag: {note.tag}</span>
      </div>
    </div>
  );
}
