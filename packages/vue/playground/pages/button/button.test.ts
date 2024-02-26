import { expect, test } from "@playwright/test";

test.describe("Button", () => {
  test.describe.configure({ timeout: 30 * 1000 });
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/button");
  });

  test("basic", async ({ page }) => {
    const native = page.getByTestId("native");
    await expect(native).toHaveAttribute("type", "button");

    const anchor = page.getByTestId("anchor");
    await expect(anchor).not.toHaveAttribute("role");
    await expect(anchor).not.toHaveAttribute("button");

    const nonNative = page.getByTestId("non-native");
    await expect(nonNative).toHaveAttribute("role", "button");
  });
});
