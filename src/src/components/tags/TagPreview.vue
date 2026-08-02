<script setup lang="ts">
import type { Tag } from '@models/store/tag';
import type { Ref } from 'vue';

import DeleteModal from '@components/layout/DeleteModal.vue';
import { useTagPreview } from '@composables/tags/useTagPreview';
import { toRef } from 'vue';
import { ref } from 'vue';

import { tagDrinksHref } from '@/utils/route.utils';

// interfaces
interface Events {
  (e: 'startEdit'): void;
}

interface Props {
  tag: Tag;
}

// setup
const props: Props = defineProps<Props>();
const emit: Events = defineEmits<Events>();
defineOptions({ inheritAttrs: false });

// state
const showed: Ref<boolean> = ref(false);

// composables
const { changePublic, remove } = useTagPreview(toRef(() => props.tag));

// actions
function startEdit(): void {
  emit('startEdit');
}

function showDelete(): void {
  showed.value = true;
}
</script>

<template>
  <v-list-item class="w-100" v-bind="$attrs">
    <template #prepend>
      <v-switch :model-value="tag.public" class="mr-4 ml-1" @update:model-value="changePublic" />
    </template>
    <template #title>{{ tag.name }}</template>
    <template #append>
      <v-menu location="bottom">
        <template #activator="{ props: activatorProps }">
          <v-btn icon="mdi-menu" type="button" v-bind="activatorProps" />
        </template>
        <v-list class="px-2 py-2">
          <v-list-item v-if="tag.drinksCount > 0" :href="tagDrinksHref(tag)">
            <template #title>Lista drinków ({{ tag.drinksCount }})</template>
          </v-list-item>
          <v-list-item @click="startEdit">
            <template #title>Edytuj</template>
          </v-list-item>
          <v-list-item @click="showDelete">
            <template #title>Usuń</template>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-list-item>
  <DeleteModal v-model="showed" @remove="remove(tag.id)" />
</template>

<style scoped>
:deep(.v-list-item__overlay) {
  display: none;
}
</style>
