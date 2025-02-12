<script setup lang="ts">
import { ref, computed } from "vue";
import { useNotesStore } from "@/stores/useNotesStore";
import TagFilter from "./TagFilter.vue";
import EditNoteModal from "./EditNoteModal.vue";
import NoteItem from "./NoteItem.vue";

const store = useNotesStore();
const selectedTag = ref<string | null>(null);
const selectedNote = ref(null);
const showEditModal = ref(false);

const filteredNotes = computed(() => {
  if (!selectedTag.value) return store.notes;
  return store.notes.filter((note) => note.tags.includes(selectedTag.value));
});

const handleFilter = (tag: string) => {
  selectedTag.value = tag;
};

const editNote = (note) => {
  selectedNote.value = { ...note };
  showEditModal.value = true;
};

const editingNote = ref<Note | null>(null); 
const editNote = (note: Note) => {
  editingNote.value = note; 
  newNoteTitle.value = note.title;
  newNoteContent.value = note.content;
  newNoteTags.value = note.tags.join(", ");
};
</script>

<template>
  <div>
    <!-- Componente de filtrado -->
    <TagFilter :tags="[...new Set(store.notes.flatMap(note => note.tags))]" @filter="handleFilter" />

    <!-- Lista de notas filtradas -->
    <div v-for="note in filteredNotes" :key="note.id" class="border p-4 mb-2">
      <h3 class="font-bold">{{ note.title }}</h3>
      <p>{{ note.content }}</p>
      <div class="mt-2">
        <span
          v-for="tag in note.tags"
          :key="tag"
          class="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs mr-1"
        >
          {{ tag }}
        </span>
      </div>
      <button @click="editNote(note)" class="mt-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-700">
        Editar
      </button>
    </div>

    <!-- Modal de edición -->
    <EditNoteModal v-if="showEditModal" :note="selectedNote" @close="showEditModal = false" />
  </div>
</template>
