<template>
  <v-btn
    class='text-center white--text glass-background'
    type='button'
  >
    <v-icon class='mr-3 icon '>
      {{ icon }}
    </v-icon>
    {{ name }}
  </v-btn>
</template>
<script>
export default {
    name: 'ActionButton',
    props: {
        icon: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    }
};
</script>
<style scoped>
button {
    width: 180px;
}

@media screen and (max-width: 620px) {
    button {
        width: 140px;
    }
}

@media screen and (max-width: 500px) {
    button .icon {
        display: none;
    }

    button {
        width: 120px;
    }
}

@media screen and (max-width: 410px) {
    button .icon {
        display: none;
    }

    button {
        width: 100px;
    }
}
</style>