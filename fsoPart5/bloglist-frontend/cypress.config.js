/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: 'http://localhost:3000',
  },
  env: {
    BACKEND: 'http://localhost:2005/api',
  },
})
