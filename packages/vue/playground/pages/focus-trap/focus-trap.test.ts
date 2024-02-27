import { expect, test } from "@playwright/test";

test.describe("FocusTrap", () => {
  test.describe.configure({ timeout: 300 * 1000 });
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/focus-trap");
  });

  test("Disabled", async ({ page }) => {
    const before = page.getByTestId("before");
    const after = page.getByTestId("after");
    const first = page.getByTestId("first");
    const last = page.getByTestId("last");

    await first.focus();
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await expect(after).toBeFocused();

    await last.focus();
    await page.keyboard.down("Shift");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.up("Shift");
    await expect(before).toBeFocused();
  });

  test("Enabled", async ({ page }) => {
    const first = page.getByTestId("first");
    const last = page.getByTestId("last");

    // Enable trap
    await first.click();

    await first.focus();
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await expect(first).toBeFocused();

    await last.focus();
    await page.keyboard.down("Shift");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.up("Shift");
    await expect(last).toBeFocused();
  });
});
