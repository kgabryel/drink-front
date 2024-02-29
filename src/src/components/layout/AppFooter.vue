<template>
  <v-footer
    fixed
    padless>
    <div class='pt-1 pb-1 white--text d-flex w-100 glass-background rounded-0'>
      <BottomItem
        :href='allDrinks'
        icon='fa-list-ol'
        name='Drinki' />
      <BottomItem
        :href='createDrink'
        icon='fa-plus-circle'
        name='Dodaj' />
      <div class='divider' />
      <BottomItem
        :href='ingredients'
        icon='fa-cutlery'
        name='Składniki' />
      <BottomItem
        :href='tags'
        icon='fa-tags'
        name='Tagi' />
    </div>
    <RandomDrinkButton />
  </v-footer>
</template>
<script>
import {names} from '../../router/names';
import BottomItem from './BottomItem';
import RandomDrinkButton from './RandomDrinkButton';

export default {
    name: 'AppFooter',
    components: {BottomItem, RandomDrinkButton},
    data: () => ({
        allDrinks: names.allDrinks,
        createDrink: names.createDrink,
        randomDrink: names.randomDrink,
        ingredients: names.ingredients,
        tags: names.tags
    })
};
</script>
<style scoped>
.divider {
    width: 60px;
}

@media screen and (min-width: 1050px) {
    .v-footer {
        display: none;
    }
}
</style>