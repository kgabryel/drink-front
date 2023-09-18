<template>
  <div class='content-container px-2 mb-2'>
    <div
      v-if='filteredTags.length > 0'
      class='glass-background'>
      <v-list-item-group multiple>
        <TagContainer
          v-for='tag in filteredTags'
          :key='tag.id'
          :tag='tag'
          class='pt-2' />
      </v-list-item-group>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex';
import TagContainer from './TagContainer';
import {bus} from '../../main';
import events from '../../config/events';
import {stringsService} from '../../services/strings.service';

export default {
    name: 'TagsList',
    components: {TagContainer},
    data: () => ({
        searched: ''
    }),
    computed: {
        ...mapGetters(['tags']),
        filteredTags: function () {
            return this.tags.filter(element => stringsService.stringIncludes(element.name, this.searched))
                .sort((a, b) => stringsService.compareString(a.name, b.name));
        }
    },
    mounted() {
        bus.$on(events.tagsSearch, search => this.searched = search);
    }
};
</script>
<style scoped>
</style>