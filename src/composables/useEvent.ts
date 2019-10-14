import { onMounted, onBeforeUnmount, ref, Ref } from '@vue/composition-api';

export function useEvent<
  K extends keyof HTMLElementEventMap,
  E extends HTMLElement,
>(
  eventName: K,
  eventHandler: (event: HTMLElementEventMap[K]) => void,
  elementRef: Ref<E | Document | null> = ref(document),
): void {
  onMounted(() => {
    if (elementRef.value) {
      elementRef.value.addEventListener(eventName, eventHandler);
    }
  });
  onBeforeUnmount(() => {
    if (elementRef.value) {
      elementRef.value.removeEventListener(eventName, eventHandler);
    }
  });
}