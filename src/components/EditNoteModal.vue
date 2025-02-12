<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from "vue";
import { useNotesStore } from "@/stores/useNotesStore";

const props = defineProps<{ note: { id: number; title: string; content: string; tags: string[] } }>();
const emit = defineEmits(["close"]);
const store = useNotesStore();

const editedNote = ref({ ...props.note });

watch(() => props.note, (newVal) => {
  if (newVal) {
    editedNote.value = { ...newVal };
  }
}, { immediate: true });

const saveChanges = () => {
  store.updateNote(editedNote.value);
  emit("close");
};
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
    <div class="bg-white p-5 rounded-lg shadow-lg w-96">
      <h2 class="text-lg font-bold mb-4">Editar Nota</h2>

      <label class="block mb-2">Título:</label>
      <input v-model="editedNote.title" type="text" class="w-full p-2 border rounded mb-3" />

      <label class="block mb-2">Contenido:</label>
      <textarea v-model="editedNote.content" class="w-full p-2 border rounded mb-3"></textarea>

      <label class="block mb-2">Etiquetas (separadas por coma):</label>
      <input v-model="editedNote.tags" type="text" class="w-full p-2 border rounded mb-3" />

      <div class="flex justify-end mt-3">
        <button @click="emit('close')" class="px-4 py-2 mr-2 bg-gray-500 text-white rounded">Cancelar</button>
        <button @click="saveChanges" class="px-4 py-2 bg-blue-500 text-white rounded">Guardar</button>
      </div>
    </div>
  </div>
</template>
