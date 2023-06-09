import configureStore from 'redux-mock-store'

function createMockStore () {
  const mockStore = configureStore([])
  const store = mockStore({
    userStocks: [
      { cardStocks: { name: 'Test Company', ticker: 'TST', description: 'Lorem Ipsum' }, stocksCLosePrice: { close: 100.00 } },
      { cardStocks: { name: 'Test Company 2', ticker: 'TST2', description: 'Lorem Ipsum 2' }, stocksCLosePrice: { close: 200.00 } }
    ]
  })
  return store
}

export { createMockStore }
