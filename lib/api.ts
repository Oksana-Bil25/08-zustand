import axios from "axios";
import { Note } from "@/types/note";

export const noteInstance = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
});

noteInstance.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  tag?: string;
  search?: string;
  page?: number;
}

const ALLOWED_TAGS = ["Work", "Personal", "Meeting", "Shopping", "Todo"];

export const fetchNotes = async (
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> => {
  const { tag, search, page = 1 } = params;
  const queryParams: Record<string, string | number> = { page: Number(page) };

  if (tag && tag !== "all") {
    const cleanTag =
      tag.trim().charAt(0).toUpperCase() + tag.trim().slice(1).toLowerCase();
    if (ALLOWED_TAGS.includes(cleanTag)) {
      queryParams.tag = cleanTag;
    }
  }

  if (search && search.trim().length > 0) {
    queryParams.search = search.trim();
  }

  const response = await noteInstance.get<FetchNotesResponse>("/notes", {
    params: queryParams,
  });

  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await noteInstance.get<Note>(`/notes/${id}`);
  return response.data;
};

export const createNote = async (noteData: Partial<Note>): Promise<Note> => {
  const response = await noteInstance.post<Note>("/notes", noteData);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await noteInstance.delete<Note>(`/notes/${id}`);
  return response.data;
};
