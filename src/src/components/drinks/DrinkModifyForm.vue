<script setup lang="ts">
import { useDrinkUpdate } from '@composables/drinks/useDrinkUpdate';
import { toRef } from 'vue';

import type { Drink } from '@/api/response';

import DrinkForm from './DrinkForm.vue';

// interfaces
interface Props {
  drink: Drink;
}

// setup
const props: Props = defineProps<Props>();

// composables
const { update } = useDrinkUpdate(toRef(props, 'drink'));
</script>

<template>
  <DrinkForm
    :drink="drink"
    btn-text="Aktualizuj"
    :submit-action="update"
  />
</template>
