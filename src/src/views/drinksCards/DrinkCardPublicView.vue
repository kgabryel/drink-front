<script setup lang="ts">
import type { ComputedRef, Ref } from 'vue';

import DrinksList from '@components/drinks/DrinksList.vue';
import QrCodeModal from '@components/drinksCards/QrCodeModal.vue';
import { useDrinksCardPublicView } from '@composables/drinksCards/useDrinksCardPublicView';
import { computed, onMounted, ref } from 'vue';

// state
const showed: Ref<boolean> = ref(false);

// composables
const { drinks, load, loaded } = useDrinksCardPublicView();

// computed
const url: ComputedRef<string> = computed(() => location.href);

// lifecycle
onMounted(load);
</script>

<template>
  <v-toolbar class="glass-background header">
    <v-spacer />
    <v-btn
      class="glass-background square-button"
      icon
      type="button"
      @click="showed = true"
    >
      <v-icon color="black">mdi-qrcode</v-icon>
    </v-btn>
    <v-spacer />
  </v-toolbar>
  <div class="content">
    <DrinksList
      v-show="loaded"
      :drinks="drinks"
      :public="true"
    />
  </div>
  <QrCodeModal
    v-model="showed"
    :url="url"
  />
</template>

<style scoped>
.header {
  position: fixed;
  z-index: 10;
}

.content {
  margin-top: 80px;
}
</style>
