import type { Note } from "./note";

export interface FetchNotesResponse {
  notes: Note[];
  page: number;
  perPage: number;
  totalNotes: number;
  totalPages: number;
}
