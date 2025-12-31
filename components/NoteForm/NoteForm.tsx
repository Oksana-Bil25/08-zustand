"use client";

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { noteInstance } from "@/lib/api";
import css from "./NoteForm.module.css";

export interface NoteFormData {
  title: string;
  content: string;
  tag: string;
}

interface NoteFormProps {
  onClose?: () => void;
  defaultValues?: Partial<NoteFormData>;
}

const NoteForm = ({ onClose, defaultValues }: NoteFormProps) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm<NoteFormData>({
    defaultValues: defaultValues || { title: "", content: "", tag: "Todo" },
  });

  const mutation = useMutation({
    mutationFn: async (newNote: NoteFormData) => {
      const { data } = await noteInstance.post("/notes", newNote);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      reset();
      if (onClose) onClose();
    },
    onError: (error) => {
      console.error("Error saving note:", error);
      alert("Failed to save note. Please try again.");
    },
  });

  return (
    <form
      className={css.form}
      onSubmit={handleSubmit((data) => mutation.mutate(data))}
    >
      <div className={css.field}>
        <label className={css.label}>Title</label>
        <input
          className={css.input}
          {...register("title", { required: true })}
        />
      </div>

      <div className={css.field}>
        <label className={css.label}>Content</label>
        <textarea
          className={css.textarea}
          {...register("content", { required: true })}
        />
      </div>

      <div className={css.field}>
        <label className={css.label}>Tag</label>
        <select className={css.select} {...register("tag")}>
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
          onClick={onClose}
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
