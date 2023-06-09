import { act, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createMockStore } from './testing-utils'
import { StocksPortfolio } from './index'
import { deleteSotck } from '../../data/store/actions/index'
import reducer from '../../data/store/reducers/stock-portifolio'
import userEvent from '@testing-library/user-event'

describe('Renders StockCard correctly', () => {
  it('renders default message', () => {
    const store = createMockStore()
    store.getState().userStocks = []
    render(
      <Provider store={store}>
        <StocksPortfolio />
      </Provider>
    )
    const defaultMessage = screen.getByText(/Nenhuma ação encontrada/i)
    expect(defaultMessage).toBeInTheDocument()
  })

  it('renders list after receiving stocks information', () => {
    const store = createMockStore()
    render(
      <Provider store={store}>
        <StocksPortfolio />
      </Provider>
    )

    const listEl = screen.getByRole('list')
    const listItemEl = screen.getAllByRole('heading3')

    expect(listEl).toBeInTheDocument()
    expect(listItemEl).toHaveLength(2)
    expect(screen.getByText(/TTT/i)).toBeInTheDocument()
    expect(screen.getByText(/TST2/i)).toBeInTheDocument()
  })

  it('removes the item correctly when button is clicked', async () => {
    const store = createMockStore()

    render(
      <Provider store={store}>
        <StocksPortfolio />
      </Provider>
    )

    const buttonEl1 = screen.getAllByRole('button', { name: /Remover ação/i })[0]

    // Acess the array of actions in this Component
    const actions = store.getActions()

    act(() => { userEvent.click(buttonEl1) })

    // Verify the action type fired
    expect(actions[0].type).toEqual('ADD_DELETED_STOCK')
    // Index of selected  stock = 0
    expect(actions[0].payload).toEqual(0)
    // Verify if the initial state was changed
    expect(reducer(store.getState().userStocks, deleteSotck(actions[0].payload))).toEqual(
      [
        { cardStocks: { name: 'Test Company 2', ticker: 'TST2', description: 'Lorem Ipsum 2' }, stocksCLosePrice: { close: 200.00 } }
      ]
    )
  })
})
