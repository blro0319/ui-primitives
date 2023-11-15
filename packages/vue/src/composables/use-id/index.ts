import {
  createGlobalState,
  toValue,
  type MaybeRefOrGetter,
} from "@vueuse/core";
import { computed, onMounted, ref } from "vue";

const useIdCounter = createGlobalState(() => {
  const count = ref(0);
  return { count };
});

export function useId(id?: MaybeRefOrGetter<unknown>) {
  const { count } = useIdCounter();

  const generatedId = ref("");
  onMounted(() => {
    generatedId.value = `:blro:${(++count.value).toString(36)}:`;
  });

  return computed(() => {
    const value = toValue(id);
    if (typeof value === "string") return value;
    return generatedId.value;
  });
}
