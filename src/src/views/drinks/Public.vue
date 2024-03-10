<template>
  <div>
    <Loader v-if='!loaded' />
    <div v-if='loaded'>
      <PublicDrink :drink='drink' />
    </div>
  </div>
</template>
<script>
import Loader from '../../components/drinks/Loader';
import axios from 'axios';
import {routes} from '../../router/routes';
import {names} from '../../router/names';
import PublicDrink from '../../components/drinks/PublicDrink';

export default {
    name: 'Public',
    components: {PublicDrink, Loader},
    data: () => ({
        loaded: false,
        drink: null
    }),
    mounted() {
        let id = this.$route.params.id ?? '';
        axios
            .get(routes.publicDrink(id))
            .then(response => {
                this.drink = response.data;
                this.loaded = true;
            })
            .catch(() => this.$router.push({name: names.notFound}));
    }
};
</script>
<style scoped>
</style>