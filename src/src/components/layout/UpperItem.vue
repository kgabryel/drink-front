<template>
  <router-link :to='{ name : href }'>
    <v-btn
      class='text-center glass-background d-inline-block'
      type='button'>
      <v-icon class='mr-3 icon '>
        {{ icon }}
      </v-icon>
      {{ name }}
    </v-btn>
  </router-link>
</template>
<script>
export default {
    name: 'UpperItem',
    props: {
        icon: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        href: {
            type: String,
            required: true
        }
    }
};
</script>
<style scoped>
button {
    width: 200px;
}

@media screen and (max-width: 1520px) {
    button {
        width: 120px;
    }
}

@media screen and (max-width: 1130px) {
    .icon {
        display: none;
    }
}
</style>