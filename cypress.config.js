const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    hideXHRInCommandLog: false,
    baseUrl: 'https://best.aliexpress.com/',
    defaultCommandTimeout: 10000,
    screenshotOnRunFailure: true,
    videoUploadOnPasses: true
  },
});