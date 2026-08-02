<template>
  <div class='w-100 glass-background menu rounded-0'>
    <v-app-bar>
      <div class='d-flex w-50'>
        <UpperItem
          :href='randomDrink'
          icon='fa-glass'
          name='Losowy'
        />
        <UpperItem
          :href='allDrinks'
          class='ml-10'
          icon='fa-list-ol'
          name='Drinki'
        />
        <UpperItem
          :href='allDrinksCards'
          class='ml-10'
          icon='mdi-clipboard-list'
          name='Karty'
        />
      </div>
      <v-btn
        v-if='addUrl !== ""'
        class='glass-background search-btn mr-3'
        icon
        type='button'
        @click='redirectToCreate'
      >
        <v-icon color='black'>
          fa-plus-circle
        </v-icon>
      </v-btn>
      <v-btn
        v-if='!hidden'
        :class="{'blue-glass': searchActive}"
        class='glass-background search-btn'
        icon
        type='button'
        @click='openSearch'
      >
        <v-icon color='black'>
          fa-search
        </v-icon>
      </v-btn>
      <div class='d-flex w-50 justify-end'>
        <UpperItem
          :href='ingredients'
          icon='fa-cutlery'
          name='Składniki'
        />
        <UpperItem
          :href='tags'
          class='ml-10'
          icon='fa-tags'
          name='Tagi'
        />
        <UpperItem
          :href='account'
          class='ml-10'
          icon='mdi-account'
          name='Konto'
        />
      </div>
    </v-app-bar>
  </div>
</template>
<script>
import {names} from '../../router/names';
import UpperItem from './UpperItem';
import {bus} from '../../main';
import events from '../../config/events';
import router from '../../router';

export default {
    name: 'UpperMenu',
    components: {UpperItem},
    props: {
        searchActive: {
            type: Boolean,
            required: true
        }
    },
    data: () => ({
        allDrinks: names.allDrinks,
        allDrinksCards: names.allDrinksCards,
        randomDrink: names.randomDrink,
        ingredients: names.ingredients,
        tags: names.tags,
        account: names.account,
        hidden: false,
        addUrl: ''
    }),
    watch: {
        $route(to) {
            this.hidden = to.name === names.createDrink || to.name === names.randomDrink || to.name === names.ingredientDrinks || to.name === names.tagDrinks || to.name === names.editDrink || to.name === names.drink || to.name === names.account || to.name === names.createDrinksCard;
            this.setAddUrl();
        }
    },
    mounted() {
        this.hidden = this.$route.name === names.createDrink || this.$route.name === names.randomDrink || this.$route.name === names.ingredientDrinks || this.$route.name === names.tagDrinks || this.$route.name === names.editDrink || this.$route.name === names.drink || this.$route.name === names.account || this.$route.name === names.createDrinksCard;
        this.setAddUrl();
    },
    methods: {
        openSearch: () => bus.$emit(events.openSearch),
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
.menu {
    position: fixed;
    z-index: 10;
}

.search-btn {
    height: 36px !important;
    width: 36px !important;
}
</style>