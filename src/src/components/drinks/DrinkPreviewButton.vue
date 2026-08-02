<script setup lang="ts">
import type { Drink } from '@models/store/drink';

import { names } from '@/router/names';

// interfaces
interface Props {
  drink: Drink;
}

// setup
defineProps<Props>();

const drinkRoute: string = names.drink;
</script>

<template>
  <div class="content-container px-2">
    <v-btn
      block
      class="text-center glass-background"
      type="button"
      :to="{ name: drinkRoute, params: { id: drink.id } }"
    >
      Podgląd
    </v-btn>
  </div>
</template>
