import {
  PlaywrightTestConfig,
  PlaywrightTestOptions,
  PlaywrightWorkerOptions,
  Project,
} from "@playwright/test";

import { defaultConfig } from "./support/other/playwright.default.config";

// default project using the default config with chrome browser
const chromeProject: Project<PlaywrightTestOptions, PlaywrightWorkerOptions> = {
  name: "chrome",
  use: {
    ...defaultConfig.use,
    browserName: "chromium",
  },
};

// project using the default config with firefox browser
const firefoxProject: Project<PlaywrightTestOptions, PlaywrightWorkerOptions> = {
  name: "firefox",
  use: {
    ...defaultConfig.use,
    browserName: "firefox",
  },
};

// project using the default config with webkit browser
const webkitProject: Project<PlaywrightTestOptions, PlaywrightWorkerOptions> = {
  name: "webkit",
  use: {
    ...defaultConfig.use,
    browserName: "webkit",
  },
};

const config: PlaywrightTestConfig = {
  ...defaultConfig,

  // path the the specs folder
  testDir: "./specs/",

  // overwrites default config, uses two types of reporters
  reporter: [["list"], ["html", { outputFolder: "./reports/html", open: "never" }]],

  // run tests only on chrome
  projects: [chromeProject],
};
export default config;
