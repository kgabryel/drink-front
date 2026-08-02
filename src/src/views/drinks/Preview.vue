<template>
  <div class='content-container'>
    <Drink
      v-if='drink !== undefined'
      :drink='drink'
      :preview-available='false'
    />
  </div>
</template>
<script>
import Drink from '../../components/drinks/Drink';
import {names} from '../../router/names';

export default {
    name: 'Preview',
    components: {Drink},
    data: () => ({
        drink: undefined
    }),
    mounted() {
        let drink = this.$store.getters.drinkById(parseInt(this.$route.params.id));
        if (drink === undefined) {
            this.$router.push({name: names.notFound});
        }
        this.drink = drink;
    }

};
</script>
<style scoped>
</style>