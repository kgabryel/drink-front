<template>
  <div class='glass-background rounded-0 d-flex align-center justify-center'>
    <v-progress-circular
      color='primary'
      indeterminate
    />
  </div>
</template>
<script>
export default {
    name: 'Loader'
};
</script>
<style scoped>
div {
    height: 100vh;
}

.v-progress-circular {
    height: 30vh !important;
    width: 30vh !important;
}
</style>