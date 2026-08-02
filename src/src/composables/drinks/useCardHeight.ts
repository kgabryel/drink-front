import type { Ref } from 'vue';

import { onMounted, onUnmounted, ref } from 'vue';

export function useCardHeight(card: Ref<HTMLDivElement | null>, ratio: number) {
  // setup
  let observer: ResizeObserver | null = null;

  // state
  const height: Ref<string> = ref('0px');

  // lifecycle
  onMounted(() => {
    if (!card.value) {
      return;
    }

    observer = new ResizeObserver(() => resize());
    observer.observe(card.value);
    resize();
  });

  onUnmounted(() => observer?.disconnect());

  // actions
  function resize(): void {
    if (!card.value) {
      height.value = '0px';

      return;
    }
    height.value = `${card.value.offsetWidth * ratio}px`;
  }

  return { height };
}
