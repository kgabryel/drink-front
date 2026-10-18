<script setup lang="ts">
// interfaces
interface Props {
  disabled?: boolean;
  color?: string;
  icon: string;
  tooltip: string;
}

// setup
withDefaults(defineProps<Props>(), {
  color: 'black',
  disabled: false,
});

defineOptions({ inheritAttrs: false });
</script>

<template>
  <v-tooltip>
    <template #activator="{ props: activatorProps }">
      <v-btn
        icon
        type="button"
        v-bind="{ ...activatorProps, ...$attrs }"
      >
        <v-icon :color="color">{{ icon }}</v-icon>
      </v-btn>
    </template>
    <span>{{ tooltip }}</span>
  </v-tooltip>
</template>
