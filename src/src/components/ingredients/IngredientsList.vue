<template>
  <div class='content-container px-2 mb-2'>
    <div
      v-if='filteredIngredients.length > 0'
      class='glass-background'
    >
      <IngredientContainer
        v-for='ingredient in filteredIngredients'
        :key='ingredient.id'
        :ingredient='ingredient'
        class='pt-2'
      />
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
import IngredientContainer from './IngredentContainer';
import {bus} from '../../main';
import events from '../../config/events';
import {stringsService} from '../../services/strings.service';

export default {
    name: 'IngredientsList',
    components: {IngredientContainer},
    data: () => ({
        name: '',
        available: null
    }),
    computed: {
        ...mapGetters(['ingredients']),
        filteredIngredients: function () {
            return this.ingredients.filter((element) => {
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
        bus.$on(events.ingredientsSearch, search => {
            this.name = search.name;
            this.available = search.available;
        });
    }
};
</script>
<style scoped>
</style>