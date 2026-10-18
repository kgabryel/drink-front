<script setup lang="ts">
// interfaces
interface Props {
  icon: string;
  name: string;
}

// setup
defineProps<Props>();
</script>

<template>
  <v-btn
    class="text-center white-text glass-background"
    type="button"
  >
    <v-icon class="mr-3 icon">
      {{ icon }}
    </v-icon>
    {{ name }}
  </v-btn>
</template>

<style scoped>
.v-btn {
  width: 180px;
}

@media screen and (width <= 620px) {
  .v-btn {
    width: 140px;
  }
}

@media screen and (width <= 500px) {
  .v-btn .icon {
    display: none;
  }

  .v-btn {
    width: 120px;
  }
}

@media screen and (width <= 410px) {
  .v-btn .icon {
    display: none;
  }

  .v-btn {
    width: 100px;
  }
}
</style>
