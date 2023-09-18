<template>
  <div>
    <DrinksList :drinks='filteredDrinks' />
    <v-dialog
      v-model='dialog'
      :max-width='dialogWidth'>
      <div class='glass-background pa-2'>
        <Search />
      </div>
    </v-dialog>
  </div>
</template>
<script>
import DrinksList from '../../components/drinks/DrinksList';
import Search from '../../components/drinks/Search';
import {bus} from '../../main';
import {mapGetters} from 'vuex';
import events from '../../config/events';
import {stringsService} from '../../services/strings.service';
import config from '../../config/config';

export default {
    name: 'All',
    components: {DrinksList, Search},
    data: () => ({
        dialog: false,
        name: '',
        favourite: false,
        available: false,
        tags: [],
        ingredients: [],
        dialogWidth: config.dialogWidth
    }),
    computed: {
        ...mapGetters(['drinks', 'onlyAvailable']),
        filteredDrinks: function () {
            return this.drinks.filter(element => this.check(element));
        },
        tagsId: function () {
            return this.tags.map(tag => this.$store.getters.tagByName(tag).id);
        },
        ingredientsId: function () {
            return this.ingredients.map(ingredient => this.$store.getters.ingredientByName(ingredient).id);
        }
    },
    mounted() {
        this.available = this.onlyAvailable;
        bus.$on(events.openSearch, () => this.dialog = true);
        bus.$on(events.closeSearch, () => this.dialog = false);
        bus.$on(events.drinksSearch, data => {
            this.name = data.name;
            this.favourite = data.onlyFavourite;
            this.available = data.onlyAvailable;
            this.tags = data.tags;
            this.ingredients = data.ingredients;
        });
    },
    methods: {
        check: function (element) {
            if (!this.checkName(element)) {
                return false;
            }
            if (!this.checkFavourite(element)) {
                return false;
            }

            if (!this.checkOnlyAvailable(element)) {
                return false;
            }

            if (!this.checkTags(element)) {
                return false;
            }

            return this.checkIngredients(element);
        },
        checkName: function (element) {
            return stringsService.stringIncludes(element.name, this.name);
        },
        checkFavourite: function (element) {
            if (this.favourite) {
                return element.favourite;
            }
            return true;
        },
        checkOnlyAvailable: function (element) {
            if (this.available) {
                let result = true;
                element.positions.forEach(position => {
                    if (!this.$store.getters.ingredientById(position.ingredientId).available) {
                        result = false;
                    }
                });
                return result;
            }
            return true;
        },
        checkTags: function (element) {
            if (this.tags.length > 0) {
                if (!element.tags.some(tag => this.tagsId.includes(tag))) {
                    return false;
                }
            }
            return true;
        },
        checkIngredients(element) {
            if (this.ingredients.length > 0) {
                let ingredients = [];
                element.positions.forEach(position => ingredients.push(position.ingredientId));
                if (!ingredients.some(ingredient => this.ingredientsId.includes(ingredient))) {
                    return false;
                }
            }
            return true;
        }
    }
};
</script>
<style scoped>
.glass-background {
    background-color: rgba(255, 255, 255, .4) !important;
}
</style>