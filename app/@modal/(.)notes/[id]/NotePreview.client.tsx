"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import styles from "./NotePreview.module.css";

interface NotePreviewClientProps {
  id: string;
}

export default function NotePreviewClient({ id }: NotePreviewClientProps) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal onClose={handleClose}>
      <div className={styles.previewContainer}>
        {isLoading && <p>Loading note details...</p>}

        {isError && (
          <div className={styles.error}>
            <p>Failed to load note.</p>
            <button onClick={handleClose}>Close</button>
          </div>
        )}

        {note && (
          <article className={styles.noteContent}>
            <header className={styles.header}>
              <h2 className={styles.title}>{note.title}</h2>
              <span className={styles.tag}>{note.tag}</span>
            </header>

            <div className={styles.body}>
              <p>{note.content}</p>
            </div>

            <footer className={styles.footer}>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={handleClose}
              >
                Close Preview
              </button>
            </footer>
          </article>
        )}
      </div>
    </Modal>
  );
}
