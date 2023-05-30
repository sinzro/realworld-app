# May 2023

**Work Done:**

- **Cypress:**

  - updated version to 12.13
  - added API and end-to-end tests.
  - added page objects and page flows.
  - tests are using POMs.
  - added paths in the tsconfig for the root, cypress and playwright folders.

- **Playwright:**

  - updated version to 1.34.3
  - added API and end-to-end tests.
  - added a new folder structure.
  - added configs for playwright.
  - added page objects, page flows and pw fixtures.
  - added support files (constants, testdata) for tests.
  - tests are using POMs and fixtures.
  - added paths in the tsconfig for the root, cypress and playwright folders.

- **Run Tests:**

- for cypress - yarn cytest
  - the start-server-and-test package is used to start the server, wait until it's up, and then run the tests
  - the server is started via the yarn dev script
  - once the server is up, the tests run in headless mode via script - cytest:headless.
- for pw - yarn pwtest
- the server is started by the pw internal web server via the yarn dev script
- once the server is up, the tests run in headless mode via script pwtest

- **Other:**
  - added a new reset endpoint for the db
  - added new test scripts for both pw and cypress
