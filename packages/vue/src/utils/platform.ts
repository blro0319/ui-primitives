import { isBrowser } from "~/utils";

export function isApple() {
  if (!isBrowser()) return false;
  if (/mac|iphone|ipad|ipod/i.test(navigator.platform)) return true;
  // If run tests on Windows, we need to check the vendor
  if (/apple/i.test(navigator.vendor)) return true;
  return false;
}

export function isSafari() {
  return isBrowser() && isApple() && /apple/i.test(navigator.vendor);
}

export function isFirefox() {
  return isBrowser() && /firefox\//i.test(navigator.userAgent);
}
