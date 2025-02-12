<script setup lang="ts">
import { ref } from "vue";
import { useNotesStore } from "./stores/useNotesStore";
import NoteForm from "./components/NoteForm.vue";
import NoteList from "./components/NoteList.vue";
import type { Note } from "./stores/useNotesStore";
import NotesView from "./components/NotesView.vue";

const store = useNotesStore();
const notes = store.notes;

const isEditing = ref(false);
const editingNote = ref<Note | null>(null);

const addNote = (data: { title: string; content: string; tags: string[] }) => {
  store.addNote(data.title, data.content, data.tags);
};

const editNote = (note: Note) => {
  isEditing.value = true;
  editingNote.value = note;
};

const updateNote = (data: { title: string; content: string; tags: string[] }) => {
  if (editingNote.value) {
    store.updateNote(editingNote.value.id, data.title, data.content, data.tags);
    isEditing.value = false;
    editingNote.value = null;
  }
};

const deleteNote = (id: string) => {
  store.deleteNote(id);
};
</script>


<template  >
  <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap" rel="stylesheet">
  <div class="container mx-auto p-6 ">
    <h1 class="text-2xl font-bold mb-4 lexend">Notas</h1>
    
    <NotesView />
  </div>
</template>

<style>

.lexend{
  font-family: "Lexend", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}
</style>