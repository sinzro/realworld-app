## [Playwright](https://playwright.dev/)

For **Playwright** tests [POMs](../playwright/tests/support/pageObjects/) and [fixtures](../playwright/tests/support/fixtures/) are used. Docs are [here](https://playwright.dev/docs/pom) and [here](https://playwright.dev/docs/test-fixtures).
Logic is stored in [flow classes](../playwright/tests/support/flows/).

It has a [default config](../playwright/tests/support/other/playwright.default.config.ts) file and an [e2e](../playwright/tests/playwright.e2e.config.ts) one.

It uses an internal web server to start the app, so there's no need of a separate tool like [start-server-and-test](https://www.npmjs.com/package/start-server-and-test);

```ts
    webServer: {
        command: "yarn dev",
        url: "http:/localhost:3000",
        reuseExistingServer: !process.env.CI,
    }
```

### Package.json scripts

```json
        // if you have an ARM64 CPU(Apple M1+ CPU), use this to install the packages
        "yarn-install-arm64": "PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true yarn install"

        // install the browsers
        "prepwtest": "npx playwright install chromium",

        // run playwright tests with e2e config
        "pwtest-set-e2e": "playwright test --config=playwright/tests/playwright.e2e.config.ts",
        "pwtest": "yarn pwtest-set-e2e",

        // run playwright tests and show the html report at the end
        "pwtest-run-show-reporter": "yarn pwtest && yarn pwtest-e2e-show-html-report",
        "pwtest-show-html-reporter": "playwright show-report playwright/tests/reports/html",

        // run tests in debug mode
        "pwtest-debug-tests": "yarn pwtest --debug",

        // start playwright in ui mode
        "pwtest-ui": "yarn pwtest --ui",

```

## [Cypress](https://www.cypress.io/)

For **Cypress** tests, POMs and [commands](https://docs.cypress.io/api/cypress-api/custom-commands#docusaurus_skipToContent_fallback) are used.

It needs a separate tool like [start-server-and-test](https://www.npmjs.com/package/start-server-and-test) to start the app.

### Package.json scripts

```json
        // if you have an ARM64 CPU(Apple M1+ CPU), use this to install the packages
        "yarn-install-arm64": "PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true yarn install"

        // start cypress in ui mode; needs the app to be started
        "cypress:open": "cypress open",

        // run cypress tests in headless mode; needs the app to be started
        "cytest:headless": "yarn cypress:run",

        // start the app via the dev script, wait until it's up, and then run script cytest:headless
        "cytest": "start-server-and-test dev http://localhost:3000 cytest:headless",
```
