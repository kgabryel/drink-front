<template>
  <DrinksList :drinks='drinks' />
</template>
<script>
import DrinksList from '../../components/drinks/DrinksList';

export default {
    name: 'Drinks',
    components: {DrinksList},
    data: () => ({
        drinks: []
    }),
    mounted() {
        this.drinks = this.$store.getters.drinksForTagId(parseInt(this.$route.params.id));
    }
};
</script>
<style scoped>
</style>