"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { noteInstance } from "@/lib/api";
import { useNoteStore } from "@/lib/store/noteStore";
import css from "./NoteForm.module.css";

const NoteForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isHydrated, setIsHydrated] = useState(false);

  const { draft, setDraft, clearDraft } = useNoteStore();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const mutation = useMutation({
    mutationFn: async (newNote: typeof draft) => {
      const { data } = await noteInstance.post("/notes", newNote);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      router.back();
    },
    onError: (error) => {
      console.error("Error saving note:", error);
      alert("Failed to save note. Please try again.");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setDraft({ [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(draft);
  };

  if (!isHydrated) return null;

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.field}>
        <label className={css.label}>Title</label>
        <input
          name="title"
          className={css.input}
          value={draft.title}
          onChange={handleChange}
          required
          placeholder="Enter title..."
        />
      </div>

      <div className={css.field}>
        <label className={css.label}>Content</label>
        <textarea
          name="content"
          className={css.textarea}
          value={draft.content}
          onChange={handleChange}
          required
          placeholder="Write your note here..."
        />
      </div>

      <div className={css.field}>
        <label className={css.label}>Tag</label>
        <select
          name="tag"
          className={css.select}
          value={draft.tag}
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.buttonCancel}
          onClick={() => router.back()}
          disabled={mutation.isPending}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.buttonSubmit}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
