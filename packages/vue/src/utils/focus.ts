import { contains, getActiveElement, isFrame, isVisible } from "~/utils";

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

function hasNegativeTabIndex(element: Element) {
  const tabindex = parseInt(element.getAttribute("tabindex") || "0", 10);
  return tabindex < 0;
}

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
 * Checks whether `element` is tabbable or not.
 * @example
 * ```ts
 * isTabbable(document.querySelector("input")); // true
 * isTabbable(document.querySelector("input[tabindex='-1']")); // false
 * isTabbable(document.querySelector("input[hidden]")); // false
 * isTabbable(document.querySelector("input:disabled")); // false
 * ```
 */
export function isTabbable(element: Element | HTMLElement | HTMLInputElement):
  element is HTMLElement {
  if (!isFocusable(element)) return false;
  if (hasNegativeTabIndex(element)) return false;
  // If the element is a radio button in a form, we must take roving tabindex
  // into account.
  if (!("form" in element)) return true;
  if (!element.form) return true;
  if (element.checked) return true;
  if (element.type !== "radio") return true;
  // If the radio button is not part of a radio group, it's tabbable.
  const radioGroup = element.form.elements.namedItem(element.name);
  if (!radioGroup) return true;
  if (!("length" in radioGroup)) return true;
  // If we are in a radio group, we must check if the active element is part of
  // the same group, which would make all the other radio buttons in the group
  // non-tabbable.
  const activeElement = getActiveElement(element) as
    | HTMLElement
    | HTMLInputElement
    | null;
  if (!activeElement) return true;
  if (activeElement === element) return true;
  if (!("form" in activeElement)) return true;
  if (activeElement.form !== element.form) return true;
  if (activeElement.name !== element.name) return true;
  return false;
}

/**
 * Returns all the focusable elements in `container`.
 */
export function getAllFocusableIn(
  container: HTMLElement,
  includeContainer = false,
) {
  const elements = Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  );
  if (includeContainer) elements.unshift(container);

  const focusableElements = elements.filter(isFocusable);
  focusableElements.forEach((element, i) => {
    if (isFrame(element) && element.contentDocument) {
      const frameBody = element.contentDocument.body;
      focusableElements.splice(i, 1, ...getAllFocusableIn(frameBody));
    }
  });

  return focusableElements;
}

/**
 * Returns all the tabbable elements in `container`, including the container
 * itself.
 */
export function getAllTabbableIn(
  container: HTMLElement,
  includeContainer = false,
  fallbackToFocusable = false,
) {
  const elements = Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  );
  const tabbableElements = elements.filter(isTabbable);

  if (includeContainer && isTabbable(container)) {
    tabbableElements.unshift(container);
  }

  tabbableElements.forEach((element, i) => {
    if (isFrame(element) && element.contentDocument) {
      const frameBody = element.contentDocument.body;
      const allFrameTabbable = getAllTabbableIn(
        frameBody,
        false,
        fallbackToFocusable,
      );
      tabbableElements.splice(i, 1, ...allFrameTabbable);
    }
  });

  if (!tabbableElements.length && fallbackToFocusable) {
    return elements;
  }
  return tabbableElements;
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
