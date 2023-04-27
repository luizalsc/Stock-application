import {
  fireEvent, render, screen, waitFor
} from '@testing-library/react'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { PortifolioForm } from './portifolio-form'

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
  it('renders al fields and buttons correctly before user events', () => {
    const store = createMockStore()

    render(
      <Provider store={store}>
        <PortifolioForm />
      </Provider>
    )

    const optionsEl = screen.getAllByRole('option')
    const inputsTypeNumberEl = screen.getAllByRole('spinbutton')
    const addButtonEL = screen.getByRole('reset-add')
    const submitButtonEl = screen.getByRole('submit')

    expect(optionsEl).toHaveLength(3)
    expect(optionsEl[0]).toBeDisabled()
    expect(inputsTypeNumberEl).toHaveLength(2)
    expect(addButtonEL).toBeInTheDocument()
    expect(submitButtonEl).toBeInTheDocument()
  })

  it('select correct option after user event', () => {
    const store = createMockStore()

    render(
      <Provider store={store}>
        <PortifolioForm />
      </Provider>
    )
    const expectedStock = store.getState().userStocks[0]
    const selectEl = screen.getByRole('combobox')
    const optionsEl = screen.getAllByRole('option')
    const expectedValue = `${expectedStock.cardStocks.ticker} ${expectedStock.stocksCLosePrice.close}`

    fireEvent.change(selectEl, { target: { value: expectedValue } })

    expect(optionsEl[0]).toBeDisabled()
    expect(optionsEl[0].selected).toBeFalsy()
    expect(optionsEl[1].selected).toBeTruthy()
    expect(optionsEl[2].selected).toBeFalsy()
  })

  it('change amount input value after user event', () => {
    const store = createMockStore()

    render(
      <Provider store={store}>
        <PortifolioForm />
      </Provider>
    )

    const testValue = '1000'
    const inputsTypeNumberEl = screen.getAllByRole('spinbutton')
    const inputAmountEl = inputsTypeNumberEl[1]

    fireEvent.change(inputAmountEl, { target: { value: testValue } })

    expect(inputAmountEl.value).toBe(testValue)
  })

  it('change percentual value after user event', () => {
    const store = createMockStore()

    render(
      <Provider store={store}>
        <PortifolioForm />
      </Provider>
    )

    const testValue = '10'
    const inputsTypeNumberEl = screen.getAllByRole('spinbutton')
    const inputPercentualEl = inputsTypeNumberEl[0]

    fireEvent.change(inputPercentualEl, { target: { value: testValue } })

    expect(inputPercentualEl.value).toBe(testValue)
  })

  it('submit function is called when button is clicked', () => {
    const store = createMockStore()

    const handleSubmit = jest.fn()

    render(
      <Provider store={store}>
        <PortifolioForm handleSubmit={handleSubmit} />
      </Provider>
    )

    const formEl = screen.getByRole('form')
    formEl.onsubmit = handleSubmit
    const button = screen.getByRole('submit')
    fireEvent.click(button)

    // fireEvent.submit(formEl)

    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })

  it('disable input after reaching to 100% target value', async () => {
    const store = createMockStore()

    render(
      <Provider store={store}>
        <PortifolioForm />
      </Provider>
    )

    const testPercentual = '100'
    const inputsTypeNumberEl = screen.getAllByRole('spinbutton')
    const percentualInputEl = inputsTypeNumberEl[0]
    const addButtonEL = screen.getByRole('reset-add')
    const errorEl = await screen.getByTestId('error')

    fireEvent.change(percentualInputEl, { target: { value: testPercentual } })
    fireEvent.click(addButtonEL)
    fireEvent.change(percentualInputEl, { target: { value: '' } })

    expect(percentualInputEl).toBeDisabled()
    expect(errorEl).toBeTruthy()
  })

  it('disable select input after reaching to 100% target value', async () => {
    const store = createMockStore()

    render(
      <Provider store={store}>
        <PortifolioForm />
      </Provider>
    )

    const testPercentual = '100'
    const selectedStock = store.getState().userStocks[0]
    const expectedStockValue = `${selectedStock.cardStocks.ticker} ${selectedStock.stocksCLosePrice.close}`

    const inputsTypeNumberEl = screen.getAllByRole('spinbutton')
    const percentualInputEl = inputsTypeNumberEl[0]

    const addButtonEL = screen.getByRole('reset-add')
    const errorEl = await screen.getByTestId('error')
    const selectEl = screen.getByRole('combobox')

    fireEvent.change(percentualInputEl, { target: { value: testPercentual } })
    fireEvent.change(selectEl, { target: { value: expectedStockValue } })
    fireEvent.click(addButtonEL)

    fireEvent.change(selectEl, { target: { value: {} } })

    expect(selectEl).toBeDisabled()
    expect(addButtonEL).toBeDisabled()
    expect(errorEl).toBeTruthy()
  })

  it('return select input function after select an already selected stock', async () => {
    const store = createMockStore()

    render(
      <Provider store={store}>
        <PortifolioForm />
      </Provider>
    )

    const testPercentual = '40'
    const selectedStock = store.getState().userStocks[0]
    const expectedStockValue = `${selectedStock.cardStocks.ticker} ${selectedStock.stocksCLosePrice.close}`

    const inputsTypeNumberEl = screen.getAllByRole('spinbutton')
    const percentualInputEl = inputsTypeNumberEl[0]

    const addButtonEL = screen.getByRole('reset-add')
    const selectEl = screen.getByRole('combobox')
    const optionsEl = screen.getAllByRole('option')

    fireEvent.change(percentualInputEl, { target: { value: testPercentual } })
    fireEvent.change(selectEl, { target: { value: expectedStockValue } })
    fireEvent.click(addButtonEL)

    fireEvent.change(selectEl, { target: { value: expectedStockValue } })
    fireEvent.change(percentualInputEl, { target: { value: testPercentual } })
    fireEvent.click(addButtonEL)

    expect(optionsEl[1].selected).toBeFalsy()
  })

  it('renders a valid target value when value is higher than 100%', async () => {
    const store = createMockStore()
    // const alertMock = jest.spyOn(window, 'alert').mockImplementation()
    render(
      <Provider store={store}>
        <PortifolioForm />
      </Provider>
    )

    const testPercentual = '99'
    const testInvalidPercentual = '90'
    const selectedStock = store.getState().userStocks[0]
    const expectedStockValue = `${selectedStock.cardStocks.ticker} ${selectedStock.stocksCLosePrice.close}`

    const inputsTypeNumberEl = screen.getAllByRole('spinbutton')
    const percentualInputEl = inputsTypeNumberEl[0]
    const selectEl = screen.getByRole('combobox')
    const addButtonEL = screen.getByRole('reset-add')

    fireEvent.change(percentualInputEl, { target: { value: testPercentual } })
    fireEvent.change(selectEl, { target: { value: expectedStockValue } })
    fireEvent.click(addButtonEL)

    fireEvent.change(percentualInputEl, { target: { value: testInvalidPercentual } })

    await expect(percentualInputEl.value).toBe('1')
  })
})

// const store = createMockStore()
//     const testAmountValue = 1000
//     const portifolioInfo = {
//       stockInfos: [
//         { ticker: 'AAPL', price: 125 },
//         { ticker: 'AMZN', price: 3456 }
//       ],
//       percentual: [
//         { percentual: 70 },
//         { percentual: 30 }
//       ]
//     }
