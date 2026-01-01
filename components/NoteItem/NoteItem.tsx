"use client";

import Link from "next/link";
import { Note } from "@/types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api";
import css from "./NoteItem.module.css";

interface NoteItemProps {
  note: Note;
}

export default function NoteItem({ note }: NoteItemProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: () => {
      alert("Не вдалося видалити нотатку.");
    },
  });

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    if (confirm("Видалити цю нотатку?")) {
      deleteMutation.mutate(note.id);
    }
  };

  return (
    <div className={css.listItem}>
      <div className={css.contentWrapper}>
        <h3 className={css.title}>{note.title}</h3>
        <p className={css.content}>
          {note.content.length > 120
            ? `${note.content.substring(0, 120)}...`
            : note.content}
        </p>
      </div>

      <div className={css.footer}>
        <span className={css.tag}>{note.tag || "Personal"}</span>

        <div className={css.actions}>
          <Link href={`/notes/${note.id}`} className={css.detailsLink}>
            View details
          </Link>

          <button
            className={css.button}
            onClick={handleDelete}
            type="button"
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
