<template>
  <div>
    <masonry-wall
      :column-width='330'
      :items='loaded'
      :padding='16'
    >
      <template #default='{item}'>
        <SimpleDrink
          class='c-pointer'
          :drink='item'
          :full-width='false'
          @remove='selected'
        />
      </template>
    </masonry-wall>
    <div v-waypoint='{ active: true, callback: load }' />
  </div>
</template>
<script>
import DrinksList from '../drinks/DrinksList.vue';
import SimpleDrink from './SimpleDrink.vue';
import events from '../../config/events';

export default {
    name: 'DrinksList',
    components: {SimpleDrink},
    extends: DrinksList,
    methods: {
        selected: function (id) {
            this.$emit(events.remove, id);
        }
    }
};
</script>
<style scoped>
.masonry-wall {
    padding: 0 15px;
}
</style>