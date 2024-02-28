import { expect, test } from "@playwright/test";

test.describe("Group", () => {
  test.describe.configure({ timeout: 30 * 1000 });
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/group");
  });

  test("Label hidden from a11y tree", async ({ page }) => {
    const label = page.getByTestId("random:label");
    await expect(label).toHaveAttribute("aria-hidden", "true");
  });

  test("Random id matching", async ({ page }) => {
    const group = page.getByTestId("random:group");
    const label = page.getByTestId("random:label");

    const groupId = await group.getAttribute("aria-labelledby");
    const labelId = await label.getAttribute("id");
    expect(groupId).toBe(labelId);
  });

  test("Specified id matching", async ({ page }) => {
    const group = page.getByTestId("specified:group");
    const label = page.getByTestId("specified:label");

    const groupId = await group.getAttribute("aria-labelledby");
    const labelId = await label.getAttribute("id");
    expect(groupId).toBe(labelId);

    const changeButton = page.getByTestId("specified:change");
    await changeButton.click();

    const newGroupId = await group.getAttribute("aria-labelledby");
    const newLabelId = await label.getAttribute("id");
    expect(newGroupId).toBe(newLabelId);
  });
});
