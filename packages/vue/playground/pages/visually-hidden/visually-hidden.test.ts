import { expect, test } from "@playwright/test";

test.describe("VisuallyHidden", () => {
  test.describe.configure({ timeout: 30 * 1000 });
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/visually-hidden");
  });

  test("render", async ({ page }) => {
    const element = page.getByTestId("undo");
    await expect(element).toHaveText("Undo");
  });
});
