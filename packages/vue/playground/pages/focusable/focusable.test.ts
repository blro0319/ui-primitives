import { expect, test } from "@playwright/test";

test.describe("Focusable", () => {
  test.describe.configure({ timeout: 30 * 1000 });
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/focusable");
  });

  test("focusable prop", async ({ contextOptions, page }) => {
    const native = page.getByTestId("focusable:native");
    await native.focus();
    await expect(native).toBeFocused();

    await native.blur();
    if (contextOptions.hasTouch) {
      await native.tap();
    } else {
      await native.click();
    }
    await expect(native).toBeFocused();

    const nonNative = page.getByTestId("focusable:non-native");
    await nonNative.focus();
    await expect(nonNative).toBeFocused();

    const nativeNotFocusable = page.getByTestId("focusable:native:not-focusable");
    await nativeNotFocusable.focus();
    await expect(nativeNotFocusable).toBeFocused();

    const nonNativeNotFocusable = page.getByTestId("focusable:non-native:not-focusable");
    await nonNativeNotFocusable.focus();
    await expect(nativeNotFocusable).not.toHaveAttribute("tabindex");
    await expect(nonNativeNotFocusable).not.toBeFocused();
  });

  test("focus-visible attribute", async ({ page }) => {
    const basic = page.getByTestId("focus-visible:basic");
    await basic.click();
    await expect(basic).not.toHaveAttribute("data-focus-visible");

    await page.keyboard.down("Shift");
    await page.keyboard.press("Tab");
    await page.keyboard.up("Shift");

    await page.keyboard.press("Tab");
    await expect(basic).toHaveAttribute("data-focus-visible", "true");

    const always = page.getByTestId("focus-visible:always");
    await always.click();
    await expect(always).toHaveAttribute("data-focus-visible", "true");
  });

  test("disabled prop (not accessible)", async ({ page }) => {
    const native = page.getByTestId("disabled:native");
    await expect(native).toBeDisabled();

    const notSupported = page.getByTestId("disabled:not-supported");
    await expect(notSupported).not.toHaveAttribute("disabled");
    await expect(notSupported).toHaveAttribute("aria-disabled", "true");

    const nonNative = page.getByTestId("disabled:non-native");
    await expect(nonNative).not.toHaveAttribute("disabled");
    await expect(nonNative).toHaveAttribute("aria-disabled", "true");

    // const contenteditable = page.getByTestId("disabled:contenteditable");
    // @todo figure out how to test contenteditable

    const notFocusable = page.getByTestId("disabled:not-focusable");
    await expect(notFocusable).not.toBeDisabled();
  });

  test("disabled prop (accessible)", async ({ page }) => {
    const native = page.getByTestId("acc-disabled:native");
    await native.focus();
    await expect(native).toBeFocused();
    await expect(native).toBeDisabled();
    await expect(native).not.toHaveAttribute("disabled");

    const notSupported = page.getByTestId("acc-disabled:not-supported");
    await notSupported.focus();
    await expect(notSupported).toBeFocused();
    await expect(notSupported).toBeDisabled();

    const nonNative = page.getByTestId("acc-disabled:non-native");
    await nonNative.focus();
    await expect(nonNative).toBeFocused();
    await expect(nonNative).not.toHaveAttribute("disabled");
    await expect(nonNative).toHaveAttribute("aria-disabled", "true");

    // const contenteditable = page.getByTestId("acc-disabled:contenteditable");
    // @todo figure out how to test contenteditable

    const notFocusable = page.getByTestId("acc-disabled:not-focusable");
    await expect(notFocusable).not.toHaveAttribute("tabindex");
    await expect(notFocusable).not.toBeDisabled();
  });
});
