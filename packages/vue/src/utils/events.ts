import { contains } from "~/utils";

/**
 * Returns `true` if `event.target` and `event.currentTarget` are the same.
 */
export function isSelfTarget(event: Pick<Event, "target" | "currentTarget">) {
  return event.target === event.currentTarget;
}

/**
 * Checks whether the focus/blur event is happening from/to outside of the
 * container element.
 *
 * @example
 * ```ts
 * const element = document.getElementById("id");
 * element.addEventListener("blur", (event) => {
 *   if (isFocusEventOutside(event)) {
 *     // ...
 *   }
 * });
 * ```
 */
export function isFocusEventOutside(
  event: Pick<FocusEvent, "currentTarget" | "relatedTarget">,
  container?: Element | null,
) {
  const containerElement = container ?? (event.currentTarget as Element);
  const relatedTarget = event.relatedTarget as HTMLElement | null;
  return !relatedTarget || !contains(containerElement, relatedTarget);
}

/**
 * Runs a callback on the next animation frame, but before a certain event.
 */
export function queueBeforeEvent(
  element: Element,
  type: string,
  callback: () => void,
) {
  const callImmediately = () => {
    cancelAnimationFrame(request);
    callback();
  };

  const request = requestAnimationFrame(() => {
    element.removeEventListener(type, callImmediately, true);
    callback();
  });
  element.addEventListener(type, callImmediately, {
    once: true,
    capture: true,
  });

  return request;
}
