<script setup lang="ts">
import type { ComputedRef } from 'vue';

import AvailableIcon from '@components/layout/AvailableIcon.vue';
import DeleteIcon from '@components/layout/DeleteIcon.vue';
import TooltipIconButton from '@components/layout/TooltipIconButton.vue';
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
        <TooltipIconButton
          icon="mdi-share-variant"
          tooltip="Udostępnij"
          :disabled="!drink.public"
          @click="copyToClipboard(url, messages.copied)"
        />
        <TooltipIconButton
          :icon="!drink.favourite ? 'mdi-star-outline' : 'mdi-star'"
          :color="!drink.favourite ? 'black' : 'amber-darken-2'"
          tooltip="Ulubione"
          @click="updateFavourite"
        />
        <TooltipIconButton
          v-if="previewAvailable"
          icon="mdi-eye"
          tooltip="Podgląd"
          :to="{ name: drinkPreview, params: { id: drink.id } }"
        />
        <DeleteIcon @remove="remove(fullWidth)" />
        <TooltipIconButton
          icon="mdi-pencil"
          tooltip="Edytuj"
          :to="{ name: drinkEdit, params: { id: drink.id } }"
        />
      </v-toolbar>
      <v-carousel
        v-if="drink.photos.length > 0"
        :height="height"
        :show-arrows="drink.photos.length > 1 ? 'hover' : false"
        hide-delimiters
      >
        <CarouselItem
          v-for="photo in drink.photos"
          :key="photo.id"
          :drink-id="drink.id"
          :photo="photo"
        />
      </v-carousel>
      <v-card-text class="pt-0">
        <p
          v-if="drink.description !== null && drink.description !== ''"
          class="text-black"
        >
          {{ drink.description }}
        </p>
        <v-chip
          v-for="(tag, index) in tags"
          :key="index"
          :href="tagDrinksHref(tag)"
          class="ma-2 glass-background"
        >
          {{ tag.name }}
        </v-chip>
        <v-list v-if="positions.length > 0">
          <v-list-item
            v-for="position in positions"
            :key="position.id"
          >
            <template #prepend>
              <AvailableIcon
                :vivid="true"
                :is-available="position.ingredient.available"
              />
            </template>
            <template #title>
              {{ position.ingredient.name }}
            </template>
            <template #subtitle>
              {{ position.amount }}
            </template>
            <template #append>
              <v-tooltip>
                <template #activator="{ props: activatorProps }">
                  <v-icon
                    v-if="position.ingredient.description !== ''"
                    v-bind="activatorProps"
                  >
                    mdi-help-circle
                  </v-icon>
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
