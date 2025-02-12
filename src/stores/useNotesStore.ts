// stores/useNotesStore.ts
import { defineStore } from "pinia";
import { ref, watch } from "vue";

export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: number;
}

export const useNotesStore = defineStore("notes", () => {
  const notes = ref<Note[]>(JSON.parse(localStorage.getItem("notes") || "[]"));

  watch(notes, (newNotes) => {
    localStorage.setItem("notes", JSON.stringify(newNotes));
  }, { deep: true });

  const addNote = (title: string, content: string, tags: string[]) => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title,
      content,
      tags,
      createdAt: Date.now(),
    };
    notes.value.unshift(newNote);
  };

  const updateNote = (id: string, title: string, content: string, tags: string[]) => {
    const note = notes.value.find(n => n.id === id);
    if (note) {
      note.title = title;
      note.content = content;
      note.tags = Array.isArray(tags) ? tags : tags.split(",").map(tag => tag.trim()); 
    }
  };

  const deleteNote = (id: string) => {
    notes.value = notes.value.filter(n => n.id !== id);
  };

  return {
    notes,
    addNote,
    updateNote,
    deleteNote
  };
});
