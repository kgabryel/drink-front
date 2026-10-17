<script setup lang="ts">
import type { ComputedRef } from 'vue';

import DeleteIcon from '@components/layout/DeleteIcon.vue';
import { useCardHeight } from '@composables/drinks/useCardHeight';
import { useDrinkPreview } from '@composables/drinks/useDrinkPreview';
import { useClipboard } from '@composables/useClipboard';
import messages from '@config/messages';
import photoConfig from '@config/photo-config';
import { computed, type Ref, toRef, useTemplateRef } from 'vue';

import type { Drink } from '@/api/response';

import { names } from '@/router/names';
import { base } from '@/router/routes';
import { tagDrinksHref } from '@/utils/route.utils';

import CarouselItem from './CarouselItem.vue';

// interfaces
interface Props {
  drink: Drink;
  fullWidth?: boolean;
  previewAvailable?: boolean;
  ready?: boolean;
}

// setup
const props: Props = withDefaults(defineProps<Props>(), {
  fullWidth: true,
  previewAvailable: true,
  ready: true,
});

const card: Ref<HTMLDivElement | null> = useTemplateRef<HTMLDivElement>('card');

const drinkPreview: string = names.drink;
const drinkEdit: string = names.editDrink;

// composables
const { positions, remove, tags, updateFavourite } = useDrinkPreview(toRef(props, 'drink'));
const { copyToClipboard } = useClipboard();
const { height } = useCardHeight(card, photoConfig.carouselRatio);

// computed
const url: ComputedRef<string> = computed(() => `${base}public/${props.drink.publicId}`);
</script>

<template>
  <div
    ref="card"
    :class="{ 'in-waterfall': !fullWidth, 'w-100': fullWidth, 'glass-background--blur-fix': !fullWidth }"
    class="px-2 py-2"
  >
    <v-card class="glass-background--light">
      <v-toolbar>
        <v-toolbar-title>{{ drink.name }}</v-toolbar-title>
      </v-toolbar>
      <v-toolbar>
        <v-spacer />
        <v-tooltip>
          <template #activator="{ props: activatorProps }">
            <v-btn
              :disabled="!drink.public"
              icon
              type="button"
              v-bind="activatorProps"
              @click="copyToClipboard(url, messages.copied)"
            >
              <v-icon color="black">mdi-share-variant</v-icon>
            </v-btn>
          </template>
          <span>Udostępnij</span>
        </v-tooltip>
        <v-tooltip>
          <template #activator="{ props: activatorProps }">
            <v-btn icon type="button" v-bind="activatorProps" @click="updateFavourite">
              <v-icon v-if="!drink.favourite" color="black">mdi-star-outline</v-icon>
              <v-icon v-else color="amber-darken-2">mdi-star</v-icon>
            </v-btn>
          </template>
          <span>Ulubione</span>
        </v-tooltip>
        <v-tooltip v-if="previewAvailable">
          <template #activator="{ props: activatorProps }">
            <v-btn
              color="black"
              icon
              type="button"
              v-bind="activatorProps"
              :to="{ name: drinkPreview, params: { id: drink.id } }"
            >
              <v-icon>mdi-eye</v-icon>
            </v-btn>
          </template>
          <span>Podgląd</span>
        </v-tooltip>
        <DeleteIcon @remove="remove(fullWidth)" />
        <v-tooltip>
          <template #activator="{ props: activatorProps }">
            <v-btn
              :to="{ name: drinkEdit, params: { id: drink.id } }"
              color="black"
              icon
              type="button"
              v-bind="activatorProps"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </template>
          <span>Edytuj</span>
        </v-tooltip>
      </v-toolbar>
      <v-carousel
        v-if="drink.photos.length > 0"
        :height="height"
        :show-arrows="drink.photos.length > 1 ? 'hover' : false"
        hide-delimiters
      >
        <CarouselItem v-for="photo in drink.photos" :key="photo.id" :drink-id="drink.id" :photo="photo" />
      </v-carousel>
      <v-card-text class="pt-0">
        <p v-if="drink.description !== null && drink.description !== ''" class="text-black">{{ drink.description }}</p>
        <v-chip v-for="(tag, index) in tags" :key="index" :href="tagDrinksHref(tag)" class="ma-2 glass-background">
          {{ tag.name }}
        </v-chip>
        <v-list v-if="positions.length > 0">
          <v-list-item v-for="position in positions" :key="position.id">
            <template #prepend>
              <v-icon v-if="position.ingredient.available" class="available-icon-vivid">mdi-check-circle</v-icon>
              <v-icon v-else class="unavailable-icon-vivid">mdi-close-circle</v-icon>
            </template>
            <template #title>{{ position.ingredient.name }}</template>
            <template #subtitle>{{ position.amount }}</template>
            <template #append>
              <v-tooltip>
                <template #activator="{ props: activatorProps }">
                  <v-icon v-if="position.ingredient.description !== ''" v-bind="activatorProps">mdi-help-circle</v-icon>
                </template>
                <span>{{ position.ingredient.description }}</span>
              </v-tooltip>
            </template>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>
