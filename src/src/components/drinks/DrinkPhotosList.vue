<script setup lang="ts">
import DeleteIcon from '@components/layout/DeleteIcon.vue';
import TooltipIconButton from '@components/layout/TooltipIconButton.vue';
import { useOriginalPhoto } from '@composables/drinks/useOriginalPhoto';
import { usePhotosReorder } from '@composables/drinksCards/usePhotosReorder';
import { toRef } from 'vue';
import draggable from 'vuedraggable';

import type { Photo } from '@/api/response';

import DrinkThumbnail from './DrinkThumbnail.vue';

// interfaces
interface Props {
  drinkId: number;
  photos: Photo[];
}

// setup
const props: Props = defineProps<Props>();

// composables
const { photosList, remove, startDrag, stopDrag } = usePhotosReorder(toRef(props, 'photos'), props.drinkId);
const { load } = useOriginalPhoto();
</script>

<template>
  <div class="content-container px-2 mt-2">
    <draggable
      v-model="photosList"
      handle=".handle"
      item-key="id"
      @end="stopDrag"
      @start="startDrag"
    >
      <template #item="{ element: photo }">
        <div
          :key="photo.id"
          class="glass-background my-2 pa-2 d-flex justify-space-between"
        >
          <DrinkThumbnail
            :drink-id="drinkId"
            :photo="photo"
            class="handle c-move"
          />
          <div class="d-flex flex-column justify-center">
            <TooltipIconButton
              icon="mdi-eye"
              tooltip="Podgląd"
              @click="load(photo, drinkId)"
            />
            <DeleteIcon @remove="remove(photo)" />
          </div>
        </div>
      </template>
    </draggable>
  </div>
</template>

<style scoped>
.c-move {
  cursor: move;
}
</style>
