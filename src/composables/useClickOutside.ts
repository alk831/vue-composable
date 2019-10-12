import { onMounted } from '@vue/composition-api';
import { useEvent } from './useEvent';

export function useClickOutside(callback: () => {}) {
  useEvent('click', (event) => {});
}