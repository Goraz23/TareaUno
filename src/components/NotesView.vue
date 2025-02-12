<script setup lang="ts">
import { ref, computed } from "vue";
import { useNotesStore } from "@/stores/useNotesStore";
import TagFilter from "./TagFilter.vue"
import NoteForm from "./NoteForm.vue";

const store = useNotesStore();
const selectedTag = ref<string | null>(null);
const newNoteTitle = ref("");
const newNoteContent = ref("");
const newNoteTags = ref("");

const editingNote = ref<Note | null>(null); 

const filteredNotes = computed(() => {
  if (!selectedTag.value) return store.notes;
  return store.notes.filter((note) => note.tags.includes(selectedTag.value));
});

const handleFilter = (tag: string) => {
  selectedTag.value = tag;
};

// const addNote = () => {
//   if (!newNoteTitle.value || !newNoteContent.value) return;
//   store.addNote(
//     newNoteTitle.value,
//     newNoteContent.value,
//     newNoteTags.value.split(",").map((tag) => tag.trim())
//   );
//   resetForm();
// };

const resetForm = () => {
  newNoteTitle.value = "";
  newNoteContent.value = "";
  newNoteTags.value = "";
  editingNote.value = null; 
};

// const editNote = (note: Note) => {
//   editingNote.value = note; 
//   newNoteTitle.value = note.title;
//   newNoteContent.value = note.content;
//   newNoteTags.value = note.tags.join(", ");
// };

const saveNote = () => {
  if (!editingNote.value) return;
  store.updateNote(editingNote.value.id, newNoteTitle.value, newNoteContent.value, newNoteTags.value.split(",").map(tag => tag.trim()));
  resetForm();
};

const deleteNote = (id: string) => {
  store.deleteNote(id);
};
</script>

<template>
  <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap" rel="stylesheet">
  <div class="container lexend">
    <!-- <div class="form-container">
      <h2 class="form-title">{{ editingNote ? "Editar Nota" : "Nueva Nota" }}</h2>

      <div class="form-input">
        <label class="label lexend">Título:</label>
        <input v-model="newNoteTitle" type="text" class="input lexend" />
      </div>

      <div class="form-input lexend">
        <label class="label lexend">Descripción:</label>
        <textarea v-model="newNoteContent" class="input lexend"></textarea>
      </div>

      <div class="form-input">
        <label class="label">Etiquetas (separadas por coma):</label>
        <input v-model="newNoteTags" type="text" class="input lexend" />
      </div>

      <button @click="editingNote ? saveNote() : addNote()" class="btn-add">
        {{ editingNote ? "Guardar Cambios" : "Agregar Nota" }}
      </button>
      <br><br>
      <TagFilter :tags="[...new Set(store.notes.flatMap(note => note.tags))]" @filter="handleFilter" class="tag-filter" />
    </div> -->

    <div class="notes-container">
      <h2 class="notes-title">Notas</h2>

      <div v-for="note in filteredNotes" :key="note.id" class="note-card">
        <h3 class="note-title">{{ note.title }}</h3>
        <p><span class="description-title">Descripción:</span> {{ note.content }}</p>

        <div class="tags">
          <span
            v-for="tag in note.tags"
            :key="tag"
            class="tag"
          >
            {{ tag }}
          </span>
        </div>

        <div class="actions">
          <button @click="editNote(note)" class="btn-edit">Editar</button>
          <button @click="deleteNote(note.id)" class="btn-delete">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>


.lexend{
  font-family: "Lexend", serif;
  font-optical-sizing: auto;
  font-weight: 200;
  font-style: normal;
}

.w-600{
  font-weight: 600;
}
.container {
  display: flex;
  height: 100vh;
  padding: 16px;
  background-color: #f1f5f9;
}



.form-container {
  width: 30%;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.form-input {
  margin-bottom: 16px;
}

.label {
  font-weight: bold;
  margin-bottom: 8px;
  display: block;
}

.input {
  width: 95%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.btn-add {
  width: 100%;
  padding: 12px;
  background-color: #1d4ed8;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-add:hover {
  background-color: #2563eb;
}

/* Notas */
.notes-container {
  width: 70%;
  padding-left: 20px;
}

.notes-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.note-card {
  background-color: white;
  padding: 16px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.note-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 8px;
}

.description-title {
  font-weight: bold;
}

.tags {
  margin-top: 8px;
}

.tag {
  background-color: #bfdbfe;
  color: #1e40af;
  padding: 5px 15px;
  border-radius: 24px;
  font-size: 0.875rem;
  margin-right: 8px;
  display: inline-block;
}

.actions {
  margin-top: 16px;
}

.btn-edit {
  padding: 8px 16px;
  background-color: #fbbf24;
  color: white;
  font-size: 0.875rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-right: 8px;
  transition: background-color 0.3s;
}

.btn-edit:hover {
  background-color: #f59e0b;
}

.btn-delete {
  padding: 8px 16px;
  background-color: #ef4444;
  color: white;
  font-size: 0.875rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-delete:hover {
  background-color: #dc2626;
}
</style>
