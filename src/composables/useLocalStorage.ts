import { reactive, watch } from '@vue/composition-api';

export function useLocalStorage<T extends object>(
  initialValue?: Partial<T>
) {
  const state = reactive<T>({
    ...localStorage,
    ...initialValue,
  });

  watch(state, (nextState, prevState) => {
    const changedEntries = Object
      .entries(nextState)
      .filter(([prop, nextValue]) => nextValue === prevState[prop]);

    changedEntries.forEach(([prop, value]) => 
      localStorage.setItem(prop, JSON.stringify(value))
    );
  });

  return state;
}