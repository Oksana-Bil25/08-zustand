import { Note } from "@/types/note";
import NoteItem from "../NoteItem/NoteItem";
import styles from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
  onDelete: (id: string) => void;
}

export default function NoteList({ notes, onDelete }: NoteListProps) {
  return (
    <div className={styles.list}>
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onDelete={() => onDelete(note.id)}
        />
      ))}
    </div>
  );
}
