<template>
  <router-link :to='{ name : logout }'>
    <v-btn
      block
      class='text-center glass-background'
      type='button'
    >
      <v-icon class='mr-3 icon '>
        fa-sign-out
      </v-icon>
      Wyloguj
    </v-btn>
  </router-link>
</template>
<script>
import {names} from '../../router/names';

export default {
    name: 'LogoutButton',
    data: () => ({
        logout: names.logout
    })
};
</script>
<style scoped>
</style>