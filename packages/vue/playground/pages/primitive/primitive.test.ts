import { expect, test } from "@playwright/test";

test.describe("Primitive", () => {
  test("as prop", async ({ page }) => {
    test.setTimeout(30 * 1000);

    await page.goto("/primitive");

    await expect(page.getByTestId("as:div").and(page.locator("div")))
      .toBeAttached();

    await expect(page.getByTestId("as:button").and(page.locator("button")))
      .toBeAttached();

    const componentElement = page.getByTestId("as:component");
    await expect(componentElement).toHaveCSS("background-color", "rgb(0, 0, 0)");
    await expect(componentElement).toHaveCSS("color", "rgb(255, 255, 255)");
  });

  test("as-child prop", async ({ page }) => {
    test.setTimeout(30 * 1000);

    await page.goto("/primitive");

    await expect(page.getByTestId("as-child:button").and(page.locator("button")))
      .toBeAttached();

    // Merged classes
    await expect(page.getByTestId("as-child:classes"))
      .toHaveClass("foo bar");

    // Merged styles
    const stylesElement = page.getByTestId("as-child:styles");
    await expect(stylesElement).toHaveCSS("background-color", "rgb(0, 0, 0)");
    await expect(stylesElement).toHaveCSS("color", "rgb(255, 255, 255)");

    await expect(page.getByTestId("as-child:nested").and(page.locator("div")))
      .toBeAttached();

    // Render first child only
    const multipleChildElement = page.getByTestId("as-child:multiple");
    await expect(multipleChildElement.and(page.locator("i"))).toBeAttached();
    await expect(multipleChildElement.and(page.locator("div"))).not.toBeAttached();
  });
});
