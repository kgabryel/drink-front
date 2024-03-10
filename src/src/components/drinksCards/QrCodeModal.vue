<template>
  <v-dialog
    v-model='visible'
    :max-width='400'
  >
    <v-card class='glass-background'>
      <v-card-title>
        <v-spacer />
        <v-btn
          icon
          type='button'
          @click='cancel'
        >
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class='text-center pb-0'>
        <qrcode-vue
          :value='url'
          :size='size'
          level='L'
          class='pb-5'
        />
        <p
          class='c-pointer'
          @click='copy'
        >
          {{ url }}
        </p>
      </v-card-text>
      <v-divider />
    </v-card>
  </v-dialog>
</template>
<script>
import QrcodeVue from 'qrcode.vue';
import events from '../../config/events';
import {bus} from '../../main';
import messages from '../../config/messages';

export default {
    name: 'QrCodeModal',
    components: {QrcodeVue},
    props: {
        showed: {
            type: Boolean,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    data: () => ({
        visible: false,
        size: 300
    }),
    watch: {
        showed: function () {
            this.visible = this.showed;
        },
        visible: function () {
            if (!this.visible) {
                this.$emit(events.cancel);
            }
        }
    },
    methods: {
        cancel: function () {
            this.$emit(events.cancel);
        },
        copy: function () {
            let container = this.$refs.container;
            this.$copyText(this.url, container);
            bus.$emit(events.successMessage, messages.urlCopied);
        }
    }
};
</script>
<style scoped>
</style>