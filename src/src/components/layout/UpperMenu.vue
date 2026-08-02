<script setup lang="ts">
import type { SearchStore } from '@store/search';

import { useRouter } from 'vue-router';

import { names } from '@/router/names';
import { useSearchStore } from '@/store';

import UpperItem from './UpperItem.vue';

// interfaces
interface Props {
  searchActive: boolean;
  addUrl: string;
  searchButtonVisible: boolean;
}

// setup
const props: Props = defineProps<Props>();

const router: ReturnType<typeof useRouter> = useRouter();
const searchStore: SearchStore = useSearchStore();

// state
const allDrinks: string = names.allDrinks;
const allDrinksCards: string = names.allDrinksCards;
const randomDrink: string = names.randomDrink;
const ingredients: string = names.ingredients;
const tags: string = names.tags;
const account: string = names.account;

// actions
function openSearch(): void {
  searchStore.open();
}

async function redirectToCreate(): Promise<void> {
  await router.push({ name: props.addUrl });
}
</script>

<template>
  <v-app-bar class="glass-background menu pr-3 pl-3">
    <div class="d-flex w-50">
      <UpperItem :href="randomDrink" icon="mdi-glass-cocktail" name="Losowy" />
      <UpperItem :href="allDrinks" class="ml-10" icon="mdi-format-list-numbered" name="Drinki" />
      <UpperItem :href="allDrinksCards" class="ml-10" icon="mdi-clipboard-list" name="Karty" />
    </div>
    <v-btn
      v-if="addUrl !== ''"
      class="glass-background square-button mr-3 pl-0 pr-0"
      type="button"
      @click="redirectToCreate"
    >
      <v-icon color="black">mdi-plus-circle</v-icon>
    </v-btn>
    <v-btn
      v-if="searchButtonVisible"
      :class="{ 'blue-glass': searchActive }"
      class="glass-background square-button pl-0 pr-0"
      type="button"
      @click="openSearch"
    >
      <v-icon color="black">mdi-magnify</v-icon>
    </v-btn>
    <div class="d-flex w-50 justify-end">
      <UpperItem :href="ingredients" icon="mdi-liquor" name="Składniki" />
      <UpperItem :href="tags" class="ml-10" icon="mdi-tag-multiple" name="Tagi" />
      <UpperItem :href="account" class="ml-10" icon="mdi-account" name="Konto" />
    </div>
  </v-app-bar>
</template>
