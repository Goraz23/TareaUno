<script>
import NoteForm from '@/components/NoteForm.vue';


</script>

<template>
    <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap" rel="stylesheet">
    <div class="container lexend">
  
      <div class="notes-container">
        <h2 class="notes-title">Notas</h2>
        <NoteForm/>
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



<style>
</style>