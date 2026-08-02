<template>
  <div class='content-container px-2 mb-2'>
    <div
      v-if='filteredDrinksCards.length > 0'
      class='glass-background'
    >
      <v-list-item-group multiple>
        <DrinksCard
          v-for='drinksCard in filteredDrinksCards'
          :key='drinksCard.id'
          :drinks-card='drinksCard'
          class='pt-2'
        />
      </v-list-item-group>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
import {bus} from '../../main';
import events from '../../config/events';
import {stringsService} from '../../services/strings.service';
import DrinksCard from './DrinksCard';

export default {
    name: 'DrinksCardsList',
    components: {DrinksCard},
    data: () => ({
        name: '',
        available: null
    }),
    computed: {
        ...mapGetters(['drinksCards']),
        filteredDrinksCards: function () {
            return this.drinksCards.filter((element) => {
                if (this.available !== null) {
                    if (element.available !== this.available) {
                        return false;
                    }
                }
                return stringsService.stringIncludes(element.name, this.name);
            }).sort((a, b) => stringsService.compareString(a.name, b.name));
        }
    },
    mounted() {
        bus.$on(events.drinksCardsSearch, search => {
            this.name = search.name;
            this.available = search.available;
        });
    }
};
</script>
<style scoped>
</style>