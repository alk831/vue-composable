import { inject, InjectionKey, provide } from '@vue/composition-api';

export const GLOBAL_STORAGE: InjectionKey<LocalStorageData> = Symbol('Global LS');

export function useGlobalStorage() {
  provide(GLOBAL_STORAGE, { isLoggedIn: false });
  const data = inject(GLOBAL_STORAGE);
  if (data) {
    data.isLoggedIn;
  }
}

interface LocalStorageData {
  isLoggedIn: boolean
}