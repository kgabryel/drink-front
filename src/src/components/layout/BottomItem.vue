<template>
  <div class='item'>
    <router-link :to='{ name : href }'>
      <div class='d-inline-block'>
        <v-icon class='white--text'>
          {{ icon }}
        </v-icon>
        <p class='mb-0 white--text c-pointer'>
          {{ name }}
        </p>
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
    name: 'BottomItem',
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
.item {
    display: inline-block;
    text-align: center;
    width: calc(25% - 15px);
}
</style>