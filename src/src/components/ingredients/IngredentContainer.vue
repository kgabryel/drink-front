<template>
  <div>
    <Edit
      v-if='edit && !oza'
      :ingredient='ingredient'
      @stop-edit='stopEdit'
    />
    <OzaEdit
      v-if='edit && oza'
      :ingredient='ingredient'
      @stop-edit='stopEdit'
    />
    <Preview
      v-if='!edit'
      :ingredient='ingredient'
      @start-edit='startEdit'
    />
  </div>
</template>
<script>
import Edit from './Edit';
import Preview from './Preview';
import OzaEdit from './OzaEdit';

export default {
    name: 'IngredientContainer',
    components: {Edit, Preview, OzaEdit},
    props: {
        ingredient: {
            type: Object,
            required: true
        }
    },
    data: () => ({
        edit: false,
        oza: false
    }),
    methods: {
        stopEdit: function () {
            this.edit = false;
            this.oza = true;
        },
        startEdit: function (data) {
            this.edit = data.edit;
            this.oza = data.oza;
        }
    }
};
</script>
<style scoped>
</style>