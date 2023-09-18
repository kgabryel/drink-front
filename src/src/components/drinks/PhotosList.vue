<template>
  <div class='content-container px-2 mt-2'>
    <draggable
      v-model='photosList'
      handle='.handle'
      @end='drag = false'
      @start='drag = true'>
      <div
        v-for='photo in photosList'
        :key='photo.id'
        class='glass-background my-2 pa-2 d-flex justify-space-between'>
        <Thumbnail
          :drink-id='drinkId'
          :photo='photo'
          class='handle c-move' />
        <div class='d-flex flex-column justify-center'>
          <v-tooltip bottom>
            <template #activator='{ on, attrs }'>
              <v-btn
                color='black'
                icon
                type='button'
                v-bind='attrs'
                @click='show(photo)'
                v-on='on'>
                <v-icon>
                  mdi-eye
                </v-icon>
              </v-btn>
            </template>
            <span>
              Podgląd
            </span>
          </v-tooltip>
          <DeleteIcon @remove='remove(photo)' />
        </div>
      </div>
    </draggable>
  </div>
</template>
<script>
import draggable from 'vuedraggable';
import Thumbnail from './Thumbnail';
import {actionsNames} from '../../store/actions';
import {bus} from '../../main';
import events from '../../config/events';
import messages from '../../config/messages';
import DeleteIcon from '../layout/DeleteIcon';

export default {
    name: 'PhotosList',
    components: {DeleteIcon, Thumbnail, draggable},
    props: {
        photos: {
            type: Array,
            required: true
        },
        drinkId: {
            type: Number,
            required: true
        }
    },
    data: () => ({
        drag: false,
        photosList: [],
        currentState: []
    }),
    watch: {
        photos: function () {
            this.photosList = this.photos;
        },
        drag: function () {
            if (this.drag) {
                this.currentState = this.photosList;
            } else {
                if (this.currentState !== this.photosList) {
                    this.reorder();
                }
            }
        }
    },
    mounted() {
        this.photosList = this.photos;
    },
    methods: {
        reorder: function () {
            let order = [];
            this.photosList.forEach((photo, index) => order.push({id: photo.id, index: index + 1}));
            this.$store.dispatch(actionsNames.photosReorder, {id: this.drinkId, data: order})
                .then(() => {
                    bus.$emit(events.successMessage, messages.photosReorder);
                    return true;
                })
                .catch(() => true);
        },
        show: function (photo) {
            bus.$emit(events.showPhoto, photo);
        },
        remove: function (photo) {
            this.$store.dispatch(actionsNames.deletePhoto, {drinkId: this.drinkId, photoId: photo.id})
                .then(() => {
                    bus.$emit(events.successMessage, messages.photoDeleted);
                    return true;
                })
                .catch(() => true);
        }
    }
};
</script>
<style scoped>
.c-move {
    cursor: move;
}
</style>