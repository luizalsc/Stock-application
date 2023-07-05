const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents (on, config) {
      // implement node event listeners here
    }
  },
  env: {
    REACT_APP_API_KEY: 'Di9sCRa_Bj2l8cpNdcSXk4E3rpAp1aFP'
  }
})
