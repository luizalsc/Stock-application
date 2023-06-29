Cypress.Commands.add('GetMethod', (stockTickers) => {
  cy.request({
    method: 'GET',
    url: `https://api.polygon.io/v3/reference/tickers/${stockTickers}?apiKey=${Cypress.env('REACT_APP_API_KEY')}`
  })
})
