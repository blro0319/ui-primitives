import { contains, getActiveElement, isVisible } from "~/utils";

const FOCUSABLE_SELECTOR = [
  'input:not([type="hidden"]):not([disabled])',
  "select:not([disabled])",
  "textarea:not([disabled])",
  "a[href]",
  "button:not([disabled])",
  "[tabindex]",
  "iframe",
  "object",
  "embed",
  "area[href]",
  "audio[controls]",
  "video[controls]",
  '[contenteditable]:not([contenteditable="false"])',
].join(",");

/**
 * Checks whether `element` is focusable or not.
 * @example
 * ```ts
 * isFocusable(document.querySelector("input")); // true
 * isFocusable(document.querySelector("input[tabindex='-1']")); // true
 * isFocusable(document.querySelector("input[hidden]")); // false
 * isFocusable(document.querySelector("input:disabled")); // false
 * ```
 */
export function isFocusable(element: Element): element is HTMLElement {
  if (!element.matches(FOCUSABLE_SELECTOR)) return false;
  if (!isVisible(element)) return false;
  if (element.closest("[inert]")) return false;
  return true;
}

/**
 * Checks if `element` has focus. Elements that are referenced by
 * `aria-activedescendant` are also considered.
 * @example
 * hasFocus(document.getElementById("id"));
 */
export function hasFocus(element: Element) {
  const activeElement = getActiveElement(element);
  if (!activeElement) return false;
  if (activeElement === element) return true;
  const activeDescendant = activeElement.getAttribute("aria-activedescendant");
  if (!activeDescendant) return false;
  return activeDescendant === element.id;
}

/**
 * Checks if `element` has focus within. Elements that are referenced by
 * `aria-activedescendant` are also considered.
 * @example
 * ```ts
 * hasFocusWithin(document.getElementById("id"));
 * ```
 */
export function hasFocusWithin(element: Node | Element) {
  const activeElement = getActiveElement(element);
  if (!activeElement) return false;
  if (contains(element, activeElement)) return true;
  const activeDescendant = activeElement.getAttribute("aria-activedescendant");
  if (!activeDescendant) return false;
  if (!("id" in element)) return false;
  if (activeDescendant === element.id) return true;
  return !!element.querySelector(`#${CSS.escape(activeDescendant)}`);
}

/**
 * Focus on an element only if it's not already focused.
 */
export function focusIfNeeded(element: HTMLElement) {
  if (!hasFocusWithin(element) && isFocusable(element)) element.focus();
}
