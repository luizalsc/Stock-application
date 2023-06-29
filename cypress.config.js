const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents (on, config) {
      // implement node event listeners here
    }
  },
  env: {
    REACT_APP_API_KEY: 'YOUR_KEY'
  }
})
