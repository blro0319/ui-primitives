import { isBrowser } from "~/utils";

export function isApple() {
  return isBrowser() && /mac|iphone|ipad|ipod/i.test(navigator.platform);
}

export function isSafari() {
  return isBrowser() && isApple() && /apple/i.test(navigator.vendor);
}
