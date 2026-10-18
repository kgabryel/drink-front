<script setup lang="ts">
import type { SearchStore } from '@store/search';

import { useAppHeader } from '@composables/layout/useAppHeader';
import { useRouter } from 'vue-router';

import { names } from '@/router/names';
import { useSearchStore } from '@/store';

import ActionButton from './ActionButton.vue';
import UpperMenu from './UpperMenu.vue';

// setup
const router: ReturnType<typeof useRouter> = useRouter();
const searchStore: SearchStore = useSearchStore();

// composables
const { addUrl, isSearchButtonHidden, searchActive, showAccountBtn } = useAppHeader();

// actions
function openSearch(): void {
  searchStore.open();
}

async function redirectToCreate(): Promise<void> {
  await router.push({ name: addUrl.value });
}

async function redirectToAccount(): Promise<void> {
  await router.push({ name: names.account });
}
</script>

<template>
  <UpperMenu
    :search-active="searchActive"
    :add-url="addUrl"
    :search-button-visible="!isSearchButtonHidden"
    class="menu above-content"
  />
  <v-toolbar class="actions glass-background rounded-0 above-content">
    <div class="d-flex justify-center w-100">
      <ActionButton
        :class="{ 'd-none': isSearchButtonHidden, 'blue-glass': searchActive }"
        class="mr-3"
        icon="mdi-magnify"
        name="Szukaj"
        @click="openSearch"
      />
      <ActionButton
        v-if="addUrl !== ''"
        class="mr-3"
        icon="mdi-plus-circle"
        name="Dodaj"
        @click="redirectToCreate"
      />
      <ActionButton
        v-if="showAccountBtn"
        icon="mdi-account"
        name="Konto"
        @click="redirectToAccount"
      />
    </div>
  </v-toolbar>
</template>

<style scoped>
.actions {
  justify-content: center;
  position: fixed;
  top: 0;
}

.menu {
  display: none;
}

@media screen and (width >= 1050px) {
  .menu {
    display: block;
  }

  .actions {
    display: none;
  }
}
</style>
