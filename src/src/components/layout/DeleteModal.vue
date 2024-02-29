<template>
  <v-dialog
    v-model='visible'
    :max-width='500'>
    <v-card class='glass-background'>
      <v-card-title>
        <p class='mb-0'>
          Czy na pewno?
        </p>
        <v-spacer />
        <v-btn
          icon
          type='button'
          @click='cancel()'>
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class='text-center pb-0'>
        <v-icon
          class='rotate'
          color='error'>
          mdi-close
        </v-icon>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-btn
          class='glass-background red-glass action-btn mr-2'
          type='button'
          @click='remove()'>
          Tak
        </v-btn>
        <v-btn
          class='glass-background action-btn ml-2'
          type='button'
          @click='cancel()'>
          Nie
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import events from '../../config/events';

export default {
    name: 'DeleteModal',
    props: {
        showed: {
            type: Boolean,
            required: true
        }
    },
    data: () => ({
        visible: false
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
        remove: function () {
            this.$emit(events.remove);
        },
        cancel: function () {
            this.$emit(events.cancel);
        }
    }
};
</script>
<style scoped>
.rotate {
    animation-duration: 3s;
    animation-name: spin;
    font-size: 100px;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.action-btn {
    width: calc(50% - 8px);
}
</style>