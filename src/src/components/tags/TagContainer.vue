<template>
  <div class='d-flex'>
    <Edit
      v-if='edit'
      :tag='tag'
      @stop-edit='edit = false' />
    <Preview
      v-else
      :tag='tag'
      @start-edit='edit = true' />
  </div>
</template>
<script>
import Edit from './Edit';
import Preview from './Preview';

export default {
    name: 'TagContainer',
    components: {Edit, Preview},
    props: {
        tag: {
            type: Object,
            required: true
        }
    },
    data: () => ({
        edit: false
    })
};
</script>
<style scoped>
</style>