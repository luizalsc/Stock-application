import configureStore from 'redux-mock-store'

function createMockStore () {
  const mockStore = configureStore([])
  const store = mockStore({
    cardStocks: { results: { name: 'Test Company', ticker: 'TST', description: 'Lorem Ipsum' } },
    stockDetails: { close: 100.00 },
    userStocks: []
  })
  return store
}

export { createMockStore }
