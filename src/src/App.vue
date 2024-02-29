<template>
  <div id='app'>
    <v-app>
      <router-view />
      <AlertContainer />
    </v-app>
  </div>
</template>
<script>
import AlertContainer from './components/alerts/AlertContainer.vue';

export default {
    components: {AlertContainer}
};
</script>
<style scoped>
</style>