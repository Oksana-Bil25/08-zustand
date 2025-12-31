export type NoteTag =
  | "Todo"
  | "Work"
  | "Personal"
  | "Health"
  | "Meeting"
  | "Shopping";

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
  createdAt?: string;
  updatedAt?: string;
  _id?: string;
}

export interface NoteFormData {
  title: string;
  content: string;
  tag: NoteTag;
}
