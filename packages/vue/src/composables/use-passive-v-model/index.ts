import { ref, nextTick, watch } from "vue";

export function usePassiveVModel<
  Props extends Record<string, any>,
  Key extends keyof Props,
  EventName extends string,
>(
  props: Props,
  key: Key,
  emit: (event: EventName, ...args: any[]) => void,
  defaultValue: NonNullable<Props[Key]>
) {
  const proxy = ref<Props[Key]>(props[key] ?? defaultValue);
  let isUpdating = false;

  watch(
    () => props[key],
    (value) => {
      if (isUpdating) return;
      isUpdating = true;
      proxy.value = value;
      nextTick(() => {
        isUpdating = false;
      });
    }
  );
  watch(proxy, (value) => {
    if (isUpdating || props[key] === value) return;
    emit(`update:${key.toString()}` as EventName, value);
  });

  return proxy;
}
