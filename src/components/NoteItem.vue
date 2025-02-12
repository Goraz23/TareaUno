<template>
  <div class="bg-gray-100 p-4 rounded-lg shadow-md relative">
    <h3 class="font-bold">{{ note.title }}</h3>
    <p>{{ note.content }}</p>
    <div class="flex gap-2 mt-2">
      <span v-for="tag in note.tags" :key="tag" class="bg-blue-200 px-2 py-1 rounded text-sm">
        {{ tag }}
      </span>
    </div>

    <div class="mt-2 flex justify-end gap-2">
      <button @click="emit('edit', note)" class="text-blue-500">Editar</button>
      <button @click="emit('delete', note.id)" class="text-red-500">Eliminar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import type { Note } from "@/stores/useNotesStore";

defineProps<{ note: Note }>();
const emit = defineEmits(["edit", "delete"]);
</script>
