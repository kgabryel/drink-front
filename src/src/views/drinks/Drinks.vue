<template>
  <div>
    <router-view />
    <OriginalPhoto />
  </div>
</template>
<script>
import OriginalPhoto from '../../components/drinks/OriginalPhoto';

export default {
    name: 'Drinks',
    components: {OriginalPhoto}
};
</script>
<style scoped>
</style>