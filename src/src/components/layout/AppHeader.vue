<template>
  <div>
    <UpperMenu
      :search-active='searchActive'
      class='menu'
    />
    <div class='actions w-100 glass-background rounded-0'>
      <v-app-bar class='d-flex justify-center'>
        <ActionButton
          :class="{hidden: hidden, 'blue-glass': searchActive}"
          class='mr-3'
          icon='fa-search'
          name='Szukaj'
          @click.native='openSearch'
        />
        <ActionButton
          v-if='addUrl !== ""'
          class='mr-3'
          icon='fa-plus-circle'
          name='Dodaj'
          @click.native='redirectToCreate'
        />
        <ActionButton
          v-if='showAccountBtn'
          icon='mdi-account'
          name='Konto'
          @click.native='redirectToAccount'
        />
      </v-app-bar>
    </div>
  </div>
</template>
<script>
import router from '../../router';
import ActionButton from './ActionButton';
import UpperMenu from './UpperMenu';
import {names} from '../../router/names';
import {bus} from '../../main';
import events from '../../config/events';
import {mapGetters} from 'vuex';

const TAGS = 'tags';
const INGREDIENTS = 'ingredients';
const DRINKS = 'drinks';

export default {
    name: 'AppHeader',
    components: {ActionButton, UpperMenu},
    data: () => ({
        small: false,
        hidden: false,
        searchTarget: '',
        searchActive: false,
        showAccountBtn: true,
        addUrl: ''
    }),
    computed: {
        ...mapGetters(['onlyAvailable'])
    },
    watch: {
        $route(to) {
            this.showAccountBtn = this.$route.name !== names.account;
            this.hidden = to.name === names.createDrink || to.name === names.randomDrink || to.name === names.ingredientDrinks || to.name === names.tagDrinks || to.name === names.editDrink || to.name === names.drink || to.name === names.account || to.name === names.createDrinksCard;
            if (to.name === names.tags) {
                this.searchTarget = TAGS;
            } else if (to.name === names.ingredients) {
                this.searchTarget = INGREDIENTS;
            } else if (to.name === names.allDrinks) {
                this.searchTarget = DRINKS;
            }
            this.searchActive = false;
            this.setAddUrl();
        },
        searchTarget: function () {
            if (this.searchTarget === TAGS) {
                bus.$on(events.tagsSearch, data => this.searchActive = data !== '');
            } else if (this.searchTarget === INGREDIENTS) {
                bus.$on(events.ingredientsSearch, data => this.searchActive = data.name !== '' || data.available !== null);
            } else if (this.searchTarget === DRINKS) {
                bus.$on(events.drinksSearch, data => {
                    this.searchActive = data.name !== '' || data.onlyFavourite || data.onlyAvailable !== this.onlyAvailable || data.tags.length > 0 || data.ingredients.length > 0;
                });
            } else {
                this.searchActive = false;
            }
        }
    },
    mounted() {
        this.showAccountBtn = this.$route.name !== names.account;
        this.hidden = this.$route.name === names.createDrink || this.$route.name === names.randomDrink || this.$route.name === names.ingredientDrinks || this.$route.name === names.tagDrinks || this.$route.name === names.editDrink || this.$route.name === names.drink || this.$route.name === names.account || this.$route.name === names.createDrinksCard;
        if (this.$route.name === names.tags) {
            this.searchTarget = TAGS;
        } else if (this.$route.name === names.ingredients) {
            this.searchTarget = INGREDIENTS;
        } else if (this.$route.name === names.allDrinks) {
            this.searchTarget = DRINKS;
        }
        this.setAddUrl();
    },
    methods: {
        openSearch: () => bus.$emit(events.openSearch),
        redirectToAccount: () => router.push({name: names.account}),
        redirectToCreate: function() {
            router.push({name: this.addUrl});
        },
        setAddUrl: function () {
            if(this.$route.name === names.allDrinks || this.$route.name === names.drink || this.$route.name === names.editDrink) {
                this.addUrl = names.createDrink;
            } else if(this.$route.name === names.allDrinksCards || this.$route.name === names.editDrinksCard) {
                this.addUrl = names.createDrinksCard;
            } else {
                this.addUrl = '';
            }
        }
    }
};
</script>
<style scoped>
.actions {
    justify-content: center;
    position: fixed;
    z-index: 10;
}

.menu {
    display: none;
}

@media screen and (min-width: 1050px) {
    .menu {
        display: block;
    }

    .actions {
        display: none;
    }
}
</style>