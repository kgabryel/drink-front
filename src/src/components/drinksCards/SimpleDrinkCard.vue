<script setup lang="ts">
import AvailableIcon from '@components/layout/AvailableIcon.vue';
import { useDrinkPositions } from '@composables/drinks/useDrinkPositions';
import { toRef } from 'vue';

import type { Drink } from '@/api/response';

import { tagDrinksHref } from '@/utils/route.utils';

// interfaces
type Events = (e: 'remove') => void;

interface Props {
  drink: Drink;
}

// setup
const props: Props = defineProps<Props>();
const emit: Events = defineEmits<Events>();

// composables
const { positions, tags } = useDrinkPositions(toRef(props, 'drink'));

// actions
function selected(): void {
  emit('remove');
}
</script>

<template>
  <div class="px-2 py-2 in-waterfall glass-background--blur-fix">
    <v-card
      class="glass-background"
      @click="selected"
    >
      <v-toolbar>
        <v-toolbar-title>{{ drink.name }}</v-toolbar-title>
      </v-toolbar>
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
