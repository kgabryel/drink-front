<script setup lang="ts">
// interfaces
interface Props {
  vivid: boolean;
  isAvailable: boolean;
}

// setup
defineProps<Props>();
</script>

<template>
  <v-icon
    v-if="isAvailable"
    :class="vivid ? 'available-icon-vivid' : 'available-icon'"
  >
    mdi-check-circle
  </v-icon>
  <v-icon
    v-else
    :class="vivid ? 'unavailable-icon-vivid' : 'unavailable-icon'"
  >
    mdi-close-circle
  </v-icon>
</template>

<style scoped lang="scss">
@use '@/assets/css/variables' as *;

.available-icon {
  color: $available-color;
}

.available-icon-vivid {
  color: $available-color-vivid;
}

.unavailable-icon {
  color: $unavailable-color;
}

.unavailable-icon-vivid {
  color: $unavailable-color-vivid;
}
</style>
