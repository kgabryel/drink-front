<template>
  <router-link to='/random-drink'>
    <v-btn
      class='mx-2 glass-background'
      fab
      rounded
      type='button'>
      <v-icon class='white--text'>
        fa-glass
      </v-icon>
    </v-btn>
  </router-link>
</template>
<script>
export default {
    name: 'RandomDrinkButton'
};
</script>
<style scoped>
button {
    z-index: 10;
    position: fixed;
    bottom: 30px;
    left: calc(50% - 33px);
    border: 3px solid white !important;
    border-radius: 100px;
}
</style>