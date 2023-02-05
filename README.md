# Lucky-AliExpress Automation Framework

## Project Description:
* Project setup with Cypress version 12.5.1.
* Makes use of Custom Commands instead Page Objects.
* Makes use of jsonplaceholder.typicode.com as fake API.
* Web files are in the `./fixtures/web` directory.
* API files are in the `./fixtures/api` directory.
* Common files are in the `./fixtures/` directory.
* Tests are in the `./e2e` directory.
* Custom Commands (Web and Mobile) are in the `./support` directory.
* Modals custom commands are in the `./support/modals` directory.
* Cypress configuration is in `./cypress-config.js` file.

## Run tests:
* `npm run open` - Open Cypress UI to select tests to run.
* `npm run headless` - Run tests in headless mode.
* `npm test:firefox` - Run tests throught Mozilla Firefox.
* `npm test:chrome` - Run tests throught Google Chrome.