<template>
  <div
    v-if='photo.id'
    class='overlay pa-2 d-flex justify-center align-center'
    @click.stop='clear()'>
    <v-img
      :height="'100%'"
      :max-height='photo.height'
      :max-width='photo.width'
      :src='photoData'
      :width="'100%'"
      contain>
      <template #placeholder>
        <v-row
          align='center'
          class='fill-height ma-0'
          justify='center'>
          <v-progress-circular
            :size='100'
            color='white'
            indeterminate />
        </v-row>
      </template>
    </v-img>
  </div>
</template>
<script>
import {bus} from '../../main';
import events from '../../config/events';
import axios from 'axios';
import {routes} from '../../router/routes';

export default {
    name: 'OriginalPhoto',
    data: () => ({
        photoData: '',
        photo: {}
    }),
    mounted() {
        bus.$on(events.showPhoto, photo => {
            this.photo = photo;
            axios.get(routes.getPhoto('original', 11, photo.id), {responseType: 'arraybuffer'})
                .then(response => this.photoData = `data:${photo.type};base64,` + Buffer.from(response.data, 'binary')
                    .toString('base64')
                );
        });
    },
    methods: {
        clear: function () {
            this.photo = {};
            this.photoData = '';
        }
    }
};
</script>
<style scoped>
.overlay {
    background-color: rgba(0, 0, 0, 0.8);
    bottom: 0;
    cursor: pointer;
    left: 0;
    max-height: 100%;
    max-width: 100%;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 1000;
}
</style>