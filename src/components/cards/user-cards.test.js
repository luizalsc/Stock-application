import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { StocksPortifolio } from './user-cards'
import { deleteSotck } from '../../data/store/actions/remove-stock'
import reducer from '../../data/store/reducers/stock-portifolio'

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

describe('Renders StockCard correctly', () => {
  it('renders default message', () => {
    const store = createMockStore()
    store.getState().userStocks = []
    render(
      <Provider store={store}>
        <StocksPortifolio />
      </Provider>
    )
    const defaultMessage = screen.getByText(/Nenhum produto encontrado/i)
    expect(defaultMessage).toBeInTheDocument()
  })

  it('renders list after receiving stocks information', () => {
    const store = createMockStore()
    render(
      <Provider store={store}>
        <StocksPortifolio />
      </Provider>
    )

    const listItemElements = screen.getAllByRole('heading3')
    const buttonElements = screen.getAllByRole('button')

    expect(listItemElements).toHaveLength(2)
    expect(buttonElements).toHaveLength(2)
  })

  it('dispatch the correct action type when button 1 is clicked', () => {
    const store = createMockStore()
    render(
      <Provider store={store}>
        <StocksPortifolio />
      </Provider>
    )

    const buttonEl1 = screen.getAllByRole('button')[0]
    // Acess the array of actions in this Component
    const actions = store.getActions()
    fireEvent.click(buttonEl1)
    // Verify the action type fired
    expect(actions[0].type).toEqual('ADD_DELETED_STOCK')
    // Index of selected  stock = 0
    expect(actions[0].payload).toEqual(0)
  })

  it('dispatch the correct action type when button 2 is clicked', () => {
    const store = createMockStore()
    render(
      <Provider store={store}>
        <StocksPortifolio />
      </Provider>
    )
    const buttonEl2 = screen.getAllByRole('button')[1]
    // Acess the array of actions in this Component
    const actions = store.getActions()
    fireEvent.click(buttonEl2)
    // Verify the action type fired
    expect(actions[0].type).toEqual('ADD_DELETED_STOCK')
    // Index of selected  stock = 1
    expect(actions[0].payload).toEqual(1)
  })

  it('delete the correct payload when button 1 is clicked', () => {
    const store = createMockStore()

    render(
      <Provider store={store}>
        <StocksPortifolio />
      </Provider>
    )
    const expectedStock = {
      cardStocks: { name: 'Test Company', ticker: 'TST', description: 'Lorem Ipsum' }, stocksCLosePrice: { close: 100.00 }
    }
    const expectedStockIndex = 0

    // Acess the array of actions in this Component
    const actions = store.getActions()
    const expectedDispatch = { payload: expectedStockIndex, type: 'ADD_DELETED_STOCK' }

    store.dispatch(expectedDispatch)

    // Verify the action type fired
    expect(expectedStock).toEqual(store.getState().userStocks[expectedStockIndex])
    expect(actions[0].type).toEqual('ADD_DELETED_STOCK')
    expect(actions[0].payload).toEqual(expectedStockIndex)
  })

  it('delete the correct payload when button 2 is clicked', () => {
    const store = createMockStore()

    render(
      <Provider store={store}>
        <StocksPortifolio />
      </Provider>
    )
    const expectedStock = {
      cardStocks: { name: 'Test Company 2', ticker: 'TST2', description: 'Lorem Ipsum 2' }, stocksCLosePrice: { close: 200.00 }
    }
    const expectedStockIndex = 1

    // Acess the array of actions in this Component
    const actions = store.getActions()
    const expectedDispatch = { payload: expectedStockIndex, type: 'ADD_DELETED_STOCK' }

    store.dispatch(expectedDispatch)

    // Verify the action type fired
    expect(expectedStock).toEqual(store.getState().userStocks[expectedStockIndex])
    expect(actions[0].type).toEqual('ADD_DELETED_STOCK')
    expect(actions[0].payload).toEqual(expectedStockIndex)
  })

  it('remove the correct stock from store when button 1 is clicked', () => {
    const store = createMockStore()
    render(
      <Provider store={store}>
        <StocksPortifolio />
      </Provider>
    )

    const expectedStore = [
      { cardStocks: { name: 'Test Company 2', ticker: 'TST2', description: 'Lorem Ipsum 2' }, stocksCLosePrice: { close: 200.00 } }]

    const buttonEl1 = screen.getAllByRole('button')[0]
    const actions = store.getActions()

    fireEvent.click(buttonEl1)

    expect(reducer(store.getState().userStocks, deleteSotck(actions[0].payload))).not.toEqual(store)
    expect(reducer(store.getState().userStocks, deleteSotck(actions[0].payload))).toEqual(expectedStore)
  })

  it('remove the correct stock from store when button 2 is clicked', () => {
    const store = createMockStore()
    render(
      <Provider store={store}>
        <StocksPortifolio />
      </Provider>
    )

    const expectedStore = [{
      cardStocks: { name: 'Test Company', ticker: 'TST', description: 'Lorem Ipsum' }, stocksCLosePrice: { close: 100.00 }
    }]
    const buttonEl2 = screen.getAllByRole('button')[1]
    const actions = store.getActions()

    fireEvent.click(buttonEl2)

    expect(reducer(store.getState().userStocks, deleteSotck(actions[0].payload))).not.toEqual(store)
    expect(reducer(store.getState().userStocks, deleteSotck(actions[0].payload))).toEqual(expectedStore)
  })
})
// npm test -- src/components/cards/user-cards.test.js
