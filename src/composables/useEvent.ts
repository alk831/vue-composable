import { onMounted, onBeforeUnmount, ref, Ref } from '@vue/composition-api';

export function useEvent<K extends keyof DocumentEventMap>(
  eventName: K,
  eventHandler: EventListenerOrEventListenerObject,
  elementRef: Ref<Element> = ref(document),
) {
  onMounted(() => elementRef.value.addEventListener(eventName, eventHandler));
  onBeforeUnmount(() => elementRef.value.removeEventListener(eventName, eventHandler));
}