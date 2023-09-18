<template>
  <div>
    <masonry-wall
      :column-width='330'
      :items='loaded'
      :padding='16'>
      <template #default='{item}'>
        <Drink
          :drink='item'
          :full-width='false' />
      </template>
    </masonry-wall>
    <div v-waypoint='{ active: true, callback: load }' />
  </div>
</template>
<script>
import MasonryWall from '@yeger/vue2-masonry-wall';
import Drink from './Drink';

export default {
    name: 'DrinksList',
    components: {Drink, MasonryWall},
    props: {
        drinks: {
            type: Array,
            required: true
        }
    },
    data: () => ({
        loaded: [],
        toLoad: []
    }),
    watch: {
        drinks: function () {
            this.loaded = [];
            this.toLoad = [];
            this.toLoad = [...this.drinks];
            if (window.innerWidth < 600) {
                this.loaded.push(...this.toLoad.splice(0, 15));
            } else {
                this.loaded.push(...this.toLoad.splice(0, this.toLoad.length));
            }
        }
    },
    mounted() {
        this.toLoad = [...this.drinks];
        if (window.innerWidth < 600) {
            this.loaded.push(...this.toLoad.splice(0, 15));
        } else {
            this.loaded.push(...this.toLoad.splice(0, this.toLoad.length));
        }
    },
    methods: {
        load: function (e) {
            if (this.toLoad.length === 0) {
                return;
            }
            if (e.going === 'in') {
                let height = this.$el.scrollHeight;
                this.loaded.push(...this.toLoad.splice(0, 15));
                this.$el.scrollTop = height;
            }
        }
    }
};
</script>
<style scoped>
.masonry-wall {
    padding: 0 15px;
}
</style>