import { toValue, type MaybeRefOrGetter } from "@vueuse/core";
import { computed, onMounted, ref } from "vue";

export function useId(id?: MaybeRefOrGetter<string | undefined | null>) {
  const generatedId = ref("");
  onMounted(() => {
    generatedId.value = `blro:${Math.random().toString(36).slice(2, 8)}`;
  });
  return computed(() => {
    return toValue(id) || generatedId.value;
  });
}
