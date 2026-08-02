<template>
  <EditDrinksCard
    v-if='drinksCard !== undefined'
    :drinks-card='drinksCard'
  />
</template>
<script>
import {default as EditDrinksCard} from '../../components/drinksCards/Edit.vue';
import {names} from '../../router/names';
import {bus} from '../../main';
import events from '../../config/events';

export default {
    name: 'Create',
    components: {EditDrinksCard},
    data: () => ({
        drinksCard: undefined
    }),
    mounted() {
        let drinksCard = this.$store.getters.drinksCardById(parseInt(this.$route.params.id));
        if (drinksCard === undefined) {
            this.$router.push({name: names.notFound});
            return;
        }
        this.drinksCard = drinksCard;
        bus.$on(events.drinksCardUpdated, (drinksCard) => this.drinksCard = drinksCard);
    }
};
</script>
<style scoped>
</style>