import { ref } from '@vue/composition-api';
import { useEvent } from './useEvent';

export function useClickOutside(
  onClickOutside: (event: MouseEvent) => void
) {
  const elementRef = ref<HTMLElement>(null);

  useEvent('click', (event) => {
    if (
      event.target &&
      !elementRef.value?.contains(event.target as any)
    ) {
      onClickOutside(event);
    }
  });

  return elementRef;
}