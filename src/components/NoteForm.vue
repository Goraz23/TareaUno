<script setup>
import { ref, computed } from "vue";
import { useNotesStore } from "@/stores/useNotesStore";

const addNote = () => {
  if (!newNoteTitle.value || !newNoteContent.value) return;
  store.addNote(
    newNoteTitle.value,
    newNoteContent.value,
    newNoteTags.value.split(",").map((tag) => tag.trim())
  );
  resetForm();
};

const resetForm = () => {
  newNoteTitle.value = "";
  newNoteContent.value = "";
  newNoteTags.value = "";
  editingNote.value = null; 
};

</script>
<template>
  <div class="form-container">
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
      <!-- <TagFilter :tags="[...new Set(store.notes.flatMap(note => note.tags))]" @filter="handleFilter" class="tag-filter" /> -->
    </div>
</template>