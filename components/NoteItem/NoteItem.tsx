"use client";

import Link from "next/link";
import { Note } from "@/types/note";
import css from "./NoteItem.module.css";

interface NoteItemProps {
  note: Note;
  onDelete: () => void;
}

export default function NoteItem({ note, onDelete }: NoteItemProps) {
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
            onClick={(e) => {
              e.preventDefault();
              if (confirm("Видалити цю нотатку?")) {
                onDelete();
              }
            }}
            type="button"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
