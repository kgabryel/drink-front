<script setup lang="ts">
import PublicDrink from '@components/drinks/PublicDrink.vue';
import LoadingSpinner from '@components/layout/LoadingSpinner.vue';
import { useChunkedList } from '@composables/drinks/useChunkedList';
import 'vue-waterfall-plugin-next/dist/style.css';
import waterfallConfig from '@config/waterfall-config';
import { toRef } from 'vue';
import { Waterfall } from 'vue-waterfall-plugin-next';

import type { Drink, FullDrinkResponse } from '@/api/response';

import DrinkPreview from './DrinkPreview.vue';

// interfaces
interface Props {
  drinks: Drink[] | FullDrinkResponse[];
  public?: boolean;
}

// setup
const props: Props = withDefaults(defineProps<Props>(), { public: false });

// composables
const { loaded, ready } = useChunkedList<Drink | FullDrinkResponse>(toRef(props, 'drinks'));
</script>

<template>
  <div>
    <LoadingSpinner v-if="!ready" />
    <Waterfall
      v-show="ready"
      :list="loaded"
      :width="waterfallConfig.width"
      :breakpoints="waterfallConfig.breakpoints"
      :gutter="waterfallConfig.gutter"
      background-color="transparent"
    >
      <template #item="{ item }">
        <slot name="item" :item="item">
          <PublicDrink v-if="public" :drink="item" :full-width="false" />
          <DrinkPreview v-else :drink="item" :full-width="false" />
        </slot>
      </template>
    </Waterfall>
  </div>
</template>
