<template>
  <div v-if='drink !== undefined'>
    <Modify :drink='drink' />
    <AddPhoto :drink='drink' />
    <PhotosList
      :drink-id='drink.id'
      :photos='drink.photos' />
  </div>
</template>
<script>
import Modify from '../../components/drinks/Modify';
import AddPhoto from '../../components/drinks/AddPhoto';
import PhotosList from '../../components/drinks/PhotosList';
import {names} from '../../router/names';
import events from '../../config/events';
import {bus} from '../../main';

export default {
    name: 'Edit',
    components: {PhotosList, AddPhoto, Modify},
    data: () => ({
        drink: undefined
    }),
    mounted() {
        let drink = this.$store.getters.drinkById(parseInt(this.$route.params.id));
        if (drink === undefined) {
            this.$router.push({name: names.notFound});
            return;
        }
        this.drink = drink;
        bus.$on(events.drinkUpdated, (drink) => this.drink = drink);
    }
};
</script>
<style scoped>
</style>