<script setup lang="ts">
import { names } from '@/router/names';

// setup
const logout: string = names.logout;
</script>

<template>
  <v-btn block class="text-center glass-background" type="button" :to="{ name: logout }">
    <v-icon class="mr-3 icon">mdi-logout</v-icon>
    Wyloguj
  </v-btn>
</template>
