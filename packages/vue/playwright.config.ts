import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  fullyParallel: true,
  forbidOnly: false,
  workers: "80%",
  reporter: "list",
  reportSlowTests: null,
  use: {
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chrome",
      use: devices["Desktop Chrome"],
    },
    {
      name: "firefox",
      use: devices["Desktop Firefox"],
    },
    {
      name: "safari",
      use: devices["Desktop Safari"],
    },
    {
      name: "android",
      use: devices["Pixel 5"],
    },
    {
      name: "ios",
      use: devices["iPhone 13 Pro Max"],
    },
  ],
});
