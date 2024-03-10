<template>
  <div>
    <Create />
    <IngredientsList />
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
import Create from '../../components/ingredients/Create';
import IngredientsList from '../../components/ingredients/IngredientsList';
import Search from '../../components/ingredients/Search';
import {bus} from '../../main';
import events from '../../config/events';
import config from '../../config/config';

export default {
    name: 'All',
    components: {Search, IngredientsList, Create},
    data: () => ({
        dialog: false,
        dialogWidth: config.dialogWidth
    }),
    mounted() {
        bus.$on(events.openSearch, () => this.dialog = true);
        bus.$on(events.closeSearch, () => this.dialog = false);
    }
};
</script>
<style scoped>
.glass-background {
    background-color: rgba(255, 255, 255, .4) !important;
}
</style>