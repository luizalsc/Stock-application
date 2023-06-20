import configureStore from 'redux-mock-store'

function createMockStore () {
  const mockStore = configureStore([])
  const store = mockStore({
    cardStocks: { results: { name: 'Test Company', ticker: 'TST', description: 'Lorem Ipsum' } },
    stockDetails: { close: 100.00 },
    userStocks: [
      { cardStocks: { name: 'Test Company 2', ticker: 'TST2', description: 'Lorem Ipsum 2' }, stocksCLosePrice: { close: 200.00 } }
    ]
  })
  return store
}

export { createMockStore }
