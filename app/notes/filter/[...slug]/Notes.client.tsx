"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchNotes, deleteNote } from "@/lib/api";
import { useDebounce } from "@/components/hooks/useDebounce";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import styles from "./NotesPage.module.css";

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();
  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", tag, debouncedSearch, currentPage],
    queryFn: () =>
      fetchNotes({ tag, search: debouncedSearch, page: currentPage }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleDelete = (id: string) => {
    if (confirm("Delete this note?")) deleteMutation.mutate(id);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (isLoading) return <div className={styles.app}>Loading...</div>;
  if (isError) return <div className={styles.app}>Error loading notes.</div>;

  return (
    <div className={styles.app}>
      <header className={styles.toolbar}>
        <SearchBox
          value={search}
          onChange={(val) => {
            setSearch(val);
            setCurrentPage(1);
          }}
        />
        <div className={styles.paginationWrapper}>
          {data && data.totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={data.totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
        <button onClick={openModal} className={styles.button}>
          Create note +
        </button>
      </header>

      {data && data.notes.length > 0 ? (
        <NoteList notes={data.notes} onDelete={handleDelete} />
      ) : (
        <p className={styles.empty}>No notes found.</p>
      )}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm
            onClose={closeModal}
            defaultValues={{
              tag:
                tag && tag !== "all"
                  ? tag.charAt(0).toUpperCase() + tag.slice(1)
                  : "Todo",
            }}
          />
        </Modal>
      )}
    </div>
  );
}
