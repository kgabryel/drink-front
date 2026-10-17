<script setup lang="ts">
import type { Ref } from 'vue';

import { ref } from 'vue';

import type { Tag } from '@/api/response';

import TagEditForm from './TagEditForm.vue';
import TagPreview from './TagPreview.vue';

// interfaces
interface Props {
  tag: Tag;
}

// setup
defineProps<Props>();

// state
const edit: Ref<boolean> = ref(false);

// actions
function startEdit(): void {
  edit.value = true;
}

function stopEdit(): void {
  edit.value = false;
}
</script>

<template>
  <div>
    <TagEditForm v-if="edit" :tag="tag" @stop-edit="stopEdit" />
    <TagPreview v-else :tag="tag" class="pt-0 pb-0" @start-edit="startEdit" />
  </div>
</template>

<style scoped>
div {
  height: 70px;
}
</style>
