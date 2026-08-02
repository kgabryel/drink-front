<template>
  <div class='content-container px-2'>
    <v-btn
      block
      class='text-center glass-background'
      type='button'
      @click='open'
    >
      <v-icon class='mr-3 icon '>
        mdi-upload
      </v-icon>
      Dodaj zdjęcie
    </v-btn>
    <v-dialog
      v-model='showed'
      :max-width='image.src ? 1000 : 500'
    >
      <v-card
        :disabled='loading'
        :loading='loading'
        class='glass-background'
      >
        <v-card-title>
          <p class='mb-0'>
            Dodawanie
          </p>
          <v-spacer />
          <v-btn
            icon
            type='button'
            @click='showed = false'
          >
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
        </v-card-title>
        <div class='pa-3 overflow-hidden'>
          <div>
            <v-row>
              <v-col
                class='py-2 py-md-3'
                cols='12'
                md='6'
              >
                <v-btn
                  block
                  class='mt-0 mt-md-3 upload-button glass-background'
                  elevation='2'
                  large
                  type='button'
                >
                  <input
                    ref='file'
                    accept='image/*'
                    type='file'
                    @change='uploadImage'
                  >
                  <v-icon
                    dark
                    left
                  >
                    mdi-upload
                  </v-icon>
                  Wybierz zdjęcie
                </v-btn>
              </v-col>
              <v-col
                class='py-2 py-md-3'
                cols='12'
                md='6'
              >
                <v-btn
                  :disabled='!cropAvailable'
                  block
                  class='mt-0 mt-md-3 glass-background'
                  elevation='2'
                  large
                  type='button'
                  @click='crop'
                >
                  <v-icon
                    dark
                    left
                  >
                    mdi-content-save
                  </v-icon>
                  Dodaj
                </v-btn>
              </v-col>
            </v-row>
          </div>
          <Cropper
            v-if='image.src'
            ref='cropper'
            :src='image.src'
            :stencil-props='{aspectRatio: 4 / 3}'
            class='cropper my-3'
            @change='change'
          />
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import {Cropper} from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import {actionsNames} from '../../store/actions';
import {bus} from '../../main';
import events from '../../config/events';
import messages from '../../config/messages';

export default {
    name: 'AddPhoto',
    components: {Cropper},
    props: {
        drink: {
            type: Object,
            required: true
        }
    },
    data: () => ({
        showed: false,
        image: {},
        cropAvailable: false,
        img: null,
        callback: null,
        photoData: '',
        loading: false
    }),
    mounted: function () {
        this.reset();
        this.img = new Image();
        this.img.onload = () => this.check();
    },
    unmounted: function () {
        if (this.image.src) {
            URL.revokeObjectURL(this.image.src);
        }
    },
    methods: {
        open: function () {
            this.showed = true;
            if (this.$refs.file) {
                this.$refs.file.value = null;
            }
            this.reset();
        },
        uploadImage: function (event) {
            const {files} = event.target;
            if (files && files[0]) {
                const blob = URL.createObjectURL(files[0]);
                this.img.src = blob;
                this.callback = () => this.set(blob, files);
            }
        },
        crop: function () {
            this.loading = true;
            let data = {
                id: this.drink.id,
                data: this.photoData
            };
            this.$store.dispatch(actionsNames.addPhoto, data)
                .then(() => {
                    bus.$emit(events.successMessage, messages.photoAdded);
                    this.showed = false;
                    this.reset();
                    return true;
                })
                .catch(() => {
                    this.loading = false;
                    return true;
                });
        },
        reset: function () {
            this.loading = false;
            if (this.image.src) {
                URL.revokeObjectURL(this.image.src);
            }
            this.image = {};
            this.cropAvailable = false;
        },
        change: function (data) {
            this.photoData = data.canvas.toDataURL();
            this.cropAvailable = data.coordinates.width >= 600 && data.coordinates.height >= 800;
        },
        set: function (blob, files) {
            this.reset();
            this.image.src = blob;
            this.image.type = files[0].type;
            this.cropAvailable = true;
        },
        check: function () {
            if (this.img.width < 600 || this.img.height < 800) {
                bus.$emit(events.errorMessage, messages.invalidPhotoDimensions);
            } else {
                this.callback();
            }
        }
    }
};
</script>
<style scoped>
.upload-button input[type=file] {
    background: white;
    cursor: inherit;
    display: block;
    filter: alpha(opacity=0);
    font-size: 0;
    height: 44px;
    opacity: 0;
    outline: none;
    position: absolute;
    right: -20px;
    text-align: right;
    top: -12px;
    width: calc(100% + 40px);
}
</style>