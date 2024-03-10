<template>
  <v-carousel-item
    :src='photoData'
    class='c-pointer'
    @click.native='open'
  />
</template>
<script>
import axios from 'axios';
import {routes} from '../../router/routes';
import {bus} from '../../main';
import events from '../../config/events';

export default {
    name: 'CarouselItem',
    props: {
        photo: {
            type: Object,
            required: true
        },
        drinkId: {
            type: Number,
            required: true
        }
    },
    data: () => ({
        photoData: ''
    }),
    mounted() {
        axios.get(routes.getPhoto('medium', this.drinkId, this.photo.id), {responseType: 'arraybuffer'})
            .then(response => this.photoData = `data:${this.photo.type};base64,` + Buffer.from(response.data, 'binary').toString('base64'));
    },
    methods: {
        open: function () {
            bus.$emit(events.showPhoto, this.photo);
        }
    }
};
</script>
<style scoped>
</style>