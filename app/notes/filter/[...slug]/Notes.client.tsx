"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { useDebounce } from "@/components/hooks/useDebounce";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import styles from "./NotesPage.module.css";

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", tag, debouncedSearch, currentPage],
    queryFn: () =>
      fetchNotes({ tag, search: debouncedSearch, page: currentPage }),
  });

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

        <Link href="/notes/action/create" className={styles.button}>
          Create note +
        </Link>
      </header>

      {data && data.notes.length > 0 ? (
        <NoteList notes={data.notes} />
      ) : (
        <p className={styles.empty}>No notes found.</p>
      )}
    </div>
  );
}
