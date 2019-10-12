import { reactive, watch, toRefs } from '@vue/composition-api';

export function useLocalStorage<T extends Object>(
  initialValue?: Partial<T>
) {
  const state = reactive<T>({
    ...initialValue,
    ...localStorage as T,
  });
  const stateRefs = toRefs(state);

  watch(stateRefs, (nextState, prevState) => {
    const changedEntries = Object
      .entries(nextState)
      .filter(([prop, nextValue]) => nextValue === prevState[prop]);

    changedEntries.forEach(([prop, value]) => 
      localStorage.setItem(prop, JSON.stringify(value))
    );
  }, { deep: true });

  return stateRefs;
}