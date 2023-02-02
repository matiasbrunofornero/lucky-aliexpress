# Lucky-AliExpress Automation Framework

## Project Description:
* Project setup with Cypress version 12.5.1.
* Makes use of Custom Commands instead Page Objects.
* Locators are in the `./fixtures` directory.
* Modals locators are in the `./fixtures/modals` directory.
* Tests are in the `./e2e` directory.
* Custom Commands are in the `./support` directory, grouped into directory by functionality.
* Modals custom commands are in the `./support/modals` directory.
* Cypress configuration are in `./cypress.json` file.

## Run tests:
* `npm run open` - Open Cypress UI to select tests to run.
* `npm run headless` - Run tests in headless mode.
* `npm test:firefox` - Run tests throught Mozilla Firefox.
* `npm test:chrome` - Run tests throught Google Chrome.