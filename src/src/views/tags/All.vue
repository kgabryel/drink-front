<template>
  <div>
    <Create />
    <TagsList />
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
import Create from '../../components/tags/Create';
import TagsList from '../../components/tags/TagsList';
import Search from '../../components/tags/Search';
import {bus} from '../../main';
import events from '../../config/events';
import config from '../../config/config';

export default {
    name: 'All',
    components: {Search, TagsList, Create},
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