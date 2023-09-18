<template>
  <div class='w-100 glass-background menu rounded-0'>
    <v-app-bar>
      <div class='d-flex w-50'>
        <UpperItem
          :href='allDrinks'
          icon='fa-list-ol'
          name='Drinki' />
        <UpperItem
          :href='createDrink'
          class='ml-10'
          icon='fa-plus-circle'
          name='Dodaj' />
        <UpperItem
          :href='randomDrink'
          class='ml-10'
          icon='fa-glass'
          name='Losowy' />
      </div>
      <v-btn
        v-if='!hidden'
        :class="{'blue-glass': searchActive}"
        class='glass-background search-btn'
        icon
        type='button'
        @click='openSearch'>
        <v-icon color='black'>
          fa-search
        </v-icon>
      </v-btn>
      <div class='d-flex w-50 justify-end'>
        <UpperItem
          :href='ingredients'
          icon='fa-cutlery'
          name='Składniki' />
        <UpperItem
          :href='tags'
          class='ml-10'
          icon='fa-tags'
          name='Tagi' />
        <UpperItem
          :href='account'
          class='ml-10'
          icon='mdi-account'
          name='Konto' />
      </div>
    </v-app-bar>
  </div>
</template>
<script>
import {names} from '../../router/names';
import UpperItem from './UpperItem';
import {bus} from '../../main';
import events from '../../config/events';

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
        createDrink: names.createDrink,
        randomDrink: names.randomDrink,
        ingredients: names.ingredients,
        tags: names.tags,
        account: names.account,
        hidden: false
    }),
    watch: {
        $route(to) {
            this.hidden = to.name === names.createDrink || to.name === names.randomDrink || to.name === names.ingredientDrinks || to.name === names.tagDrinks || to.name === names.editDrink || to.name === names.drink || to.name === names.account;
        }
    },
    mounted() {
        this.hidden = this.$route.name === names.createDrink || this.$route.name === names.randomDrink || this.$route.name === names.ingredientDrinks || this.$route.name === names.tagDrinks || this.$route.name === names.editDrink || this.$route.name === names.drink || this.$route.name === names.account;
    },
    methods: {
        openSearch: () => bus.$emit(events.openSearch)
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