<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{ tags: string[] }>();
const emit = defineEmits(["filter"]);

const handleFilter = (tag: string) => {
  emit("filter", tag);
};
</script>

<template>
  <div class="flex gap-2 mb-4 tag-filter">
    <button
      v-for="tag in props.tags"
      :key="tag"
      @click="handleFilter(tag)"
      class="bt-2 lexend"
    >
      {{ tag }}
    </button>
  </div>
</template>

<style>
div .tag-filter{
gap: 2px;
}
.bt-2  {
  padding: 10px;
  background: #BEDBFE;
  border:solid  0px;
  border-radius: 1rem;
  color:#1D40AF;
  margin-right: 5px;
  font-weight: 600;
}
</style>