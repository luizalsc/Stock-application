import { render, screen, act } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createMockStore } from './testing-utils.js'
import { StockCard } from './index.js'
import { addStocksToPortifolio } from '../../data/store/actions'
import portfolioReducer from '../../data/store/reducers'
import { userEvent } from '@storybook/testing-library'

describe('Renders StockCard correctly', () => {
  it('renders default message', () => {
    const store = createMockStore()
    store.getState().cardStocks.results = undefined

    render(
      <Provider store={store}>
        <StockCard />
      </Provider>
    )

    const message = screen.getByText(/Pesquise uma sigla de ação/i)
    expect(message).toBeInTheDocument()
  })

  it('renders stock information after fetch', () => {
    const store = createMockStore()

    render(
      <Provider store={store}>
        <StockCard />
      </Provider>
    )

    expect(screen.getByText(/Test Company/i)).toBeInTheDocument()
    expect(screen.getByText(/TST/i)).toBeInTheDocument()
    expect(screen.getByText(/Lorem Ipsum/i)).toBeInTheDocument()
  })

  it('renders button correctly', () => {
    const store = createMockStore()

    render(
      <Provider store={store}>
        <StockCard />
      </Provider>
    )

    const buttonElement = screen.getByRole('button', { name: /Adicionar à minha carteira/i })

    expect(buttonElement).toBeInTheDocument()
  })

  it('dispatches action correctly after button is clicked', () => {
    const store = createMockStore()
    const expectedPayload = { cardStocks: { description: 'Lorem Ipsum', name: 'Test Company', ticker: 'TST' }, stocksCLosePrice: { close: 100 } }

    render(
      <Provider store={store}>
        <StockCard />
      </Provider>
    )

    const buttonElement = screen.getByRole('button', { name: /Adicionar à minha carteira/i })
    // Acess the array of actions in this Component
    const actions = store.getActions()
    act(() => { userEvent.click(buttonElement) })

    // Verify the action type fired
    expect(actions[0].type).toEqual('ADD_STOCK_TO_PORTIFOLIO')
    expect(actions[0].payload).toEqual(expectedPayload)
  })

  it('adds correctly stock to userStocks when action is dispatched', () => {
    const store = createMockStore()
    const initialState = store.getState()
    const expectedStore = {
      cardStocks: { results: { name: 'Test Company', ticker: 'TST', description: 'Lorem Ipsum' } },
      stockDetails: { close: 100.00 },
      userStocks: [{ cardStocks: { description: 'Lorem Ipsum', name: 'Test Company', ticker: 'TST' }, stocksCLosePrice: { close: 100 } }]
    }

    render(
      <Provider store={store}>
        <StockCard />
      </Provider>
    )

    const buttonElement = screen.getByRole('button', { name: /Adicionar à minha carteira/i })
    // Acess the array of actions in this Component
    const actions = store.getActions()

    act(() => { userEvent.click(buttonElement) })
    // Verify the new store state

    expect(portfolioReducer(initialState, addStocksToPortifolio(actions[0].payload))).toEqual(expectedStore)
  })
})

// npm test -- src/components/StockCard/index.test.js
