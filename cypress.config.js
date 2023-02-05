const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    hideXHRInCommandLog: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://best.aliexpress.com/',
    defaultCommandTimeout: 10000
  },
});