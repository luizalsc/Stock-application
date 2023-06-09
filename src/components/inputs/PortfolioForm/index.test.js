import {
  act,
  fireEvent, render, screen
} from '@testing-library/react'
import { Provider } from 'react-redux'
import { PortifolioForm } from '.'
import { createMockStore } from './testing-utils'
import userEvent from '@testing-library/user-event'

describe('Renders PortflioForm correctly', () => {
  it('renders form correctly before user events', () => {
    const store = createMockStore()

    render(
      <Provider store={store}>
        <PortifolioForm />
      </Provider>
    )

    const formEl = screen.getByRole('form')

    expect(formEl).toBeInTheDocument()
  })

  it('selects the correct option after user selection', () => {
    const store = createMockStore()

    render(
      <Provider store={store}>
        <PortifolioForm />
      </Provider>
    )
    const selectedStock = store.getState().userStocks[0]
    const selectEl = screen.getByRole('combobox')
    const optionEl1 = screen.getByRole('option', { name: /-Selecione-/i })
    const optionEl2 = screen.getByRole('option', { name: /TST -100/i })
    const optionEl3 = screen.getByRole('option', { name: /TST2 -200/i })
    const expectedValue = `${selectedStock.cardStocks.ticker} ${selectedStock.stocksCLosePrice.close}`

    fireEvent.change(selectEl, { target: { value: expectedValue } })

    expect(optionEl1).toBeDisabled()
    expect(optionEl2.selected).toBeTruthy()
    expect(optionEl3.selected).toBeFalsy()
    expect(selectEl.value).toMatch(`${selectedStock.cardStocks.ticker} ${selectedStock.stocksCLosePrice.close}`)
  })

  it('changes amount input value after user typing', () => {
    const store = createMockStore()

    render(
      <Provider store={store}>
        <PortifolioForm />
      </Provider>
    )

    const testValue = '1000'
    const inputAmountEl = screen.getByRole('contribution')

    fireEvent.change(inputAmountEl, { target: { value: testValue } })

    expect(inputAmountEl.value).toBe(testValue)
  })

  it('changes percentual value after user typing', () => {
    const store = createMockStore()

    render(
      <Provider store={store}>
        <PortifolioForm />
      </Provider>
    )

    const testValue = '10'
    const inputPercentualEl = screen.getByRole('percentual')

    fireEvent.change(inputPercentualEl, { target: { value: testValue } })

    expect(inputPercentualEl.value).toBe(testValue)
  })

  it('submits form when submit button is clicked', () => {
    const store = createMockStore()

    const testAmountValue = '1000'
    const testPercentualValue = '100'
    const selectedStock = store.getState().userStocks[0]
    const expectedValue = `${selectedStock.cardStocks.ticker} ${selectedStock.stocksCLosePrice.close}`

    const handleSubmit = jest.fn()

    render(
      <Provider store={store}>
        <PortifolioForm handleSubmit={handleSubmit} />
      </Provider>
    )

    const formEl = screen.getByRole('form')
    formEl.onsubmit = handleSubmit
    const inputAmountEl = screen.getByRole('contribution')
    const inputPercentualEl = screen.getByRole('percentual')
    const selectEl = screen.getByRole('combobox')
    const button = screen.getByRole('submit')
    const addEl = screen.getByRole('reset-add')

    act(() => {
      userEvent.selectOptions(
        selectEl,
        expectedValue
      )
      userEvent.type(inputPercentualEl, testPercentualValue)
      userEvent.click(addEl)
      userEvent.type(inputAmountEl, testAmountValue)
      userEvent.click(button)
    })

    // fireEvent.submit(formEl)

    expect(handleSubmit).toHaveBeenCalledTimes(1)
    // Preciso testar os parâmetros da função portfolioCalculator() dentro do handleSubmit , mas não sei como...
  })

  it('disables inputs after reaching to 100% target value', () => {
    const store = createMockStore()

    const testPercentual = '100'
    const selectedStock = store.getState().userStocks[0]
    const expectedValue = `${selectedStock.cardStocks.ticker} ${selectedStock.stocksCLosePrice.close}`

    render(
      <Provider store={store}>
        <PortifolioForm />
      </Provider>
    )

    const selectEl = screen.getByRole('combobox')
    const inputPercentualEl = screen.getByRole('percentual')
    const addButtonEL = screen.getByRole('reset-add')

    act(() => { userEvent.type(inputPercentualEl, testPercentual) })

    act(() => { userEvent.click(addButtonEL) })

    expect(screen.getByText(/Você já usou todo seu aporte/i)).toBeInTheDocument()

    act(() => { userEvent.type(inputPercentualEl, '10') })

    expect(inputPercentualEl).toBeDisabled()

    act(() => {
      userEvent.selectOptions(
        selectEl,
        expectedValue
      )
    })
    expect(selectEl).toBeDisabled()
  })

  it('stops select input function after selecting an already selected option', async () => {
    const store = createMockStore()

    const jsdomAlert = window.alert
    window.alert = jest.fn()

    const selectedStock = store.getState().userStocks[0]
    const expectedValue = `${selectedStock.cardStocks.ticker} ${selectedStock.stocksCLosePrice.close}`

    render(
      <Provider store={store}>
        <PortifolioForm />
      </Provider>
    )

    const addButtonEL = screen.getByRole('reset-add')
    const selectEl = screen.getByRole('combobox')
    const optionEl2 = screen.getByRole('option', { name: /TST -100/i })

    act(() => {
      userEvent.selectOptions(
        selectEl,
        expectedValue
      )
    })

    expect((selectEl.value)).toMatch(optionEl2.value)

    act(() => {
      userEvent.click(addButtonEL)
    })

    act(() => {
      userEvent.selectOptions(
        selectEl,
        expectedValue
      )
      userEvent.click(addButtonEL)
    })
    expect(selectEl.selected).toBeFalsy()
    window.alert = jsdomAlert
  })

  it('renders a valid target value when value is higher than 100%', async () => {
    const store = createMockStore()
    const jsdomAlert = window.alert
    window.alert = jest.fn()

    const testPercentual = '99'
    const testInvalidPercentual = '90'
    const selectedStock = store.getState().userStocks[0]
    const expectedStockValue = `${selectedStock.cardStocks.ticker} ${selectedStock.stocksCLosePrice.close}`

    render(
      <Provider store={store}>
        <PortifolioForm />
      </Provider>
    )

    const inputPercentualEl = screen.getByRole('percentual')
    const selectEl = screen.getByRole('combobox')
    const addButtonEL = screen.getByRole('reset-add')

    fireEvent.change(inputPercentualEl, { target: { value: testPercentual } })
    fireEvent.change(selectEl, { target: { value: expectedStockValue } })
    fireEvent.click(addButtonEL)

    fireEvent.change(inputPercentualEl, { target: { value: testInvalidPercentual } })

    await expect(inputPercentualEl.value).toBe('1')
    window.alert = jsdomAlert
  })
})
