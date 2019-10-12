import { reactive, watch } from '@vue/composition-api';
import { UnwrapRef, ref } from '@vue/composition-api/dist/reactivity';

export function useFetch<T>(
  input: RequestInfo,
  init?: RequestInit,
  parseMethod: 'json' = 'json',
): UnwrapRef<UseFetchState<T>> & { cancel: any } {
  const inputRef = ref(input);
  const initRef = ref(init);
  const state = reactive<UseFetchState<T>>({
    isLoading: false,
    error: null,
    data: null,
  });
  const abortController = new AbortController();

  async function handleApiCall(input: RequestInfo, init?: RequestInit) {
    try {
      state.isLoading = true;
      
      const { signal } = abortController;
      const response = await fetch(input, { ...init, signal });
      const data = await response[parseMethod]();
  
      state.error = null;
      state.data = data;
    } catch(error) {
      state.error = error;
      state.data = null;
    } finally {
      state.isLoading = false;
    }
  }

  const cancel = watch(
    [inputRef, initRef],
    ([inputRef, initRef], prevInputs, onCleanup) => {
      handleApiCall(inputRef, initRef);
      onCleanup(abortController.abort);
    }
  );

  return { ...state, cancel };
}

interface UseFetchState<T> {
  isLoading: boolean
  error: Error | null
  data:  T | null
}