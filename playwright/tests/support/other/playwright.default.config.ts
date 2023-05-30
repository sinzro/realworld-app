import { PlaywrightTestConfig } from "@playwright/test";

import { constants } from "@pw/support/other/constants";

export const defaultConfig: PlaywrightTestConfig = {
  retries: 2,
  reporter: "list",
  // limit the number of workers on CI, use default locally
  workers: process.env.CI ? 4 : 6,

  // run all tests in parallel
  fullyParallel: false,

  // Timeout for each test, includes test, hooks and fixtures
  timeout: 2 * 60 * 1000,
  // timeout for assertion
  expect: { timeout: 10000 },

  webServer: {
    command: "yarn dev",
    url: "http:/localhost:3000",
    reuseExistingServer: !process.env.CI,
  },

  use: {
    headless: true,
    trace: "retain-on-failure",
    video: "retain-on-failure",
    baseURL: constants.baseURL,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    actionTimeout: 5 * 10 * 1000,
    navigationTimeout: 6 * 10 * 1000,
    browserName: "chromium",
  },
};
