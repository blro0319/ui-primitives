import { expect, test } from "@playwright/test";

test.describe("Command", () => {
  test.describe.configure({ timeout: 30 * 1000 });
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/command");
  });

  test("click-on-enter prop", async ({ page }) => {
    const native = page.getByTestId("click-on-enter:native");
    await native.focus();
    await page.keyboard.press(" ");
    await expect(native).not.toHaveAttribute("data-clicked", "true");
    await page.keyboard.press("Enter");
    await expect(native).toHaveAttribute("data-clicked", "true");

    const nonNative = page.getByTestId("click-on-enter:non-native");
    await nonNative.focus();
    await page.keyboard.press(" ");
    await expect(nonNative).not.toHaveAttribute("data-clicked", "true");
    await page.keyboard.press("Enter");
    await expect(nonNative).toHaveAttribute("data-clicked", "true");
  });

  test("click-on-space prop", async ({ page }) => {
    const native = page.getByTestId("click-on-space:native");
    await native.focus();
    await page.keyboard.press("Enter");
    await expect(native).not.toHaveAttribute("data-clicked", "true");
    await page.keyboard.press(" ");
    await expect(native).toHaveAttribute("data-clicked", "true");

    const nonNative = page.getByTestId("click-on-space:non-native");
    await nonNative.focus();
    await page.keyboard.press("Enter");
    await expect(nonNative).not.toHaveAttribute("data-clicked", "true");
    await page.keyboard.press(" ");
    await expect(nonNative).toHaveAttribute("data-clicked", "true");
  });
});
