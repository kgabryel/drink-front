<template>
  <div>
    <DrinksCardsList />
    <v-dialog
      v-model='dialog'
      :max-width='dialogWidth'
    >
      <div class='glass-background pa-2'>
        <Search />
      </div>
    </v-dialog>
  </div>
</template>
<script>
import DrinksCardsList from '../../components/drinksCards/DrinksCardsList.vue';
import Search from '../../components/drinksCards/Search.vue';
import config from '../../config/config';
import {bus} from '../../main';
import events from '../../config/events';

export default {
    name: 'All',
    components: {Search, DrinksCardsList},
    data: () => ({
        dialog: false,
        dialogWidth: config.dialogWidth
    }),
    mounted() {
        bus.$on(events.openSearch, () => this.dialog = true);
        bus.$on(events.closeSearch, () => this.dialog = false);
    }
}
</script>
<style scoped>
.glass-background {
    background-color: rgba(255, 255, 255, .4) !important;
}
</style>