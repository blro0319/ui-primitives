export function isBrowser() {
  return typeof window !== "undefined";
}

/**
 * Returns `element.ownerDocument || document`.
 */
export function getDocument(node?: Node | null): Document {
  return node ? node.ownerDocument ?? (node as Document) : document;
}

/**
 * Returns `element.ownerDocument.activeElement`.
 */
export function getActiveElement(
  node?: Node | null,
  activeDescendant = false,
): HTMLElement | null {
  const doc = getDocument(node);
  const { activeElement } = doc;
  // In IE11, activeElement might be an empty object if we're interacting with
  // elements inside of an iframe.
  if (!activeElement?.nodeName) return null;
  if (isFrame(activeElement) && activeElement.contentDocument) {
    return getActiveElement(
      activeElement.contentDocument.body,
      activeDescendant,
    );
  }
  if (activeDescendant) {
    const id = activeElement.getAttribute("aria-activedescendant");
    if (id) {
      const element = doc.getElementById(id);
      if (element) return element;
    }
  }
  return activeElement as HTMLElement | null;
}

export function contains(parent: Node, child: Node): boolean {
  return parent === child || parent.contains(child);
}

/**
 * Checks whether `element` is a frame element.
 */
export function isFrame(element: Element): element is HTMLIFrameElement {
  return element.tagName === "IFRAME";
}

/**
 * Checks whether `element` is a native HTML button element.
 * @example
 * isButton(document.querySelector("button")); // true
 * isButton(document.querySelector("input[type='button']")); // true
 * isButton(document.querySelector("div")); // false
 * isButton(document.querySelector("input[type='text']")); // false
 * isButton(document.querySelector("div[role='button']")); // false
 */
export function isButton(element: { tagName: string; type?: string }) {
  const tagName = element.tagName.toLowerCase();
  if (tagName === "button") return true;
  if (tagName === "input" && element.type) {
    return INPUT_BUTTON_TYPES.includes(element.type);
  }
  return false;
}
const INPUT_BUTTON_TYPES = [
  "button",
  "color",
  "file",
  "image",
  "reset",
  "submit",
];

export function isTextField(element: Element): element is
  | HTMLInputElement
  | HTMLTextAreaElement {
  try {
    const isTextInput = element instanceof HTMLInputElement &&
      element.selectionStart !== null;
    const isTextArea = element.tagName === "TEXTAREA";
    return isTextInput || isTextArea;
  } catch (e) {
    // Safari throws an exception when trying to get `selectionStart` on
    // non-text <input> elements (which, understandably, don't have the text
    // selection API). We catch this via a try/catch block, as opposed to a more
    // explicit check of the element's input types, because of Safari's
    // non-standard behavior. This also means we don't have to worry about the
    // list of input types that support `selectionStart` changing as the HTML
    // spec evolves over time.
    return false;
  }
}

/**
 * Checks if the element is visible or not.
 */
export function isVisible(element: Element) {
  const htmlElement = element as HTMLElement;
  return (
    htmlElement.offsetWidth > 0 ||
    htmlElement.offsetHeight > 0 ||
    element.getClientRects().length > 0
  );
}
