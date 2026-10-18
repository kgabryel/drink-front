<script setup lang="ts">
import type { Ref } from 'vue';

import { useCardHeight } from '@composables/drinks/useCardHeight';
import { useOriginalPhoto } from '@composables/drinks/useOriginalPhoto';
import photoConfig from '@config/photo-config';
import { useTemplateRef } from 'vue';

import type { FullDrinkResponse, Photo } from '@/api/response';

import { routes } from '@/router/routes';

// interfaces
interface Props {
  drink: FullDrinkResponse;
  fullWidth?: boolean;
}

// setup
const props: Props = withDefaults(defineProps<Props>(), { fullWidth: true });

const card: Ref<HTMLDivElement | null> = useTemplateRef<HTMLDivElement>('card');

// composables
const { load } = useOriginalPhoto();
const { height } = useCardHeight(card, photoConfig.publicDrinkRatio);

// actions
function getUrl(photo: Photo): string {
  return routes.getPhoto('medium', props.drink.id, photo.id);
}
</script>

<template>
  <div
    ref="card"
    :class="{ 'in-waterfall': !fullWidth, 'full-width': fullWidth }"
    class="px-2 py-2"
  >
    <v-card :class="{ 'glass-background--light': !fullWidth, 'glass-background': fullWidth }">
      <v-toolbar>
        <v-toolbar-title>{{ drink.name }}</v-toolbar-title>
      </v-toolbar>
      <v-carousel
        v-if="drink.photos.length > 0"
        :height="height"
        :show-arrows="drink.photos.length > 1 ? 'hover' : false"
        hide-delimiters
      >
        <v-carousel-item
          v-for="photo in drink.photos"
          :key="photo.id"
          :src="getUrl(photo)"
          class="c-pointer"
          @click="load(photo, drink.id)"
        />
      </v-carousel>
      <v-card-text class="pt-0">
        <p
          v-if="drink.description"
          class="text-black"
        >
          {{ drink.description }}
        </p>
        <v-chip
          v-for="(tag, index) in drink.tags"
          :key="index"
          class="ma-2 glass-background"
        >
          {{ tag }}
        </v-chip>
        <v-list v-if="drink.positions.length > 0">
          <v-list-item
            v-for="position in drink.positions"
            :key="position.id"
          >
            <template #title>
              {{ position.ingredient }}
            </template>
            <template #subtitle>
              {{ position.amount }}
            </template>
            <template #append>
              <v-tooltip>
                <template #activator="{ props: activatorProps }">
                  <v-icon
                    v-if="position.ingredientDescription"
                    v-bind="activatorProps"
                  >
                    mdi-help-circle
                  </v-icon>
                </template>
                <span>{{ position.ingredientDescription }}</span>
              </v-tooltip>
            </template>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped>
.full-width {
  margin: 0 auto;
  max-width: 800px;
  width: 100%;
}
</style>
