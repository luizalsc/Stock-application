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

    const formElement = screen.getByRole('form')

    expect(formElement).toBeInTheDocument()
  })

  it('selects the correct option after user selection', () => {
    const store = createMockStore()

    render(
      <Provider store={store}>
        <PortifolioForm />
      </Provider>
    )
    const selectedStock = store.getState().userStocks[0]
    const selectElement = screen.getByRole('combobox')
    const optionElement1 = screen.getByRole('option', { name: /-Selecione-/i })
    const optionElement2 = screen.getByRole('option', { name: /TST -100/i })
    const optionElement3 = screen.getByRole('option', { name: /TST2 -200/i })
    const expectedValue = `${selectedStock.cardStocks.ticker} ${selectedStock.stocksCLosePrice.close}`

    fireEvent.change(selectElement, { target: { value: expectedValue } })

    expect(optionElement1).toBeDisabled()
    expect(optionElement2.selected).toBeTruthy()
    expect(optionElement3.selected).toBeFalsy()
    expect(selectElement.value).toMatch(`${selectedStock.cardStocks.ticker} ${selectedStock.stocksCLosePrice.close}`)
  })

  it('changes amount input value after user typing', () => {
    const store = createMockStore()
    const testValue = '1000'

    render(
      <Provider store={store}>
        <PortifolioForm />
      </Provider>
    )

    const inputAmountElement = screen.getByRole('contribution')

    act(() => {
      userEvent.type(inputAmountElement, testValue)
    })

    expect(inputAmountElement.value).toBe(testValue)
  })

  it('changes percentual value after user typing', () => {
    const store = createMockStore()
    const testValue = '10'

    render(
      <Provider store={store}>
        <PortifolioForm />
      </Provider>
    )

    const inputPercentualElement = screen.getByRole('percentual')

    act(() => {
      userEvent.type(inputPercentualElement, testValue)
    })

    expect(inputPercentualElement.value).toBe(testValue)
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

    const formElement = screen.getByRole('form')
    formElement.onsubmit = handleSubmit
    const inputAmountElement = screen.getByRole('contribution')
    const inputPercentualElement = screen.getByRole('percentual')
    const selectElement = screen.getByRole('combobox')
    const submitButton = screen.getByRole('submit')
    const addButton = screen.getByRole('reset-add')

    act(() => {
      userEvent.selectOptions(
        selectElement,
        expectedValue
      )
      userEvent.type(inputPercentualElement, testPercentualValue)
      userEvent.click(addButton)
      userEvent.type(inputAmountElement, testAmountValue)
      userEvent.click(submitButton)
    })

    expect(handleSubmit).toHaveBeenCalledTimes(1)
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

    const selectElement = screen.getByRole('combobox')
    const inputPercentualElement = screen.getByRole('percentual')
    const addButton = screen.getByRole('reset-add')

    act(() => { userEvent.type(inputPercentualElement, testPercentual) })

    act(() => { userEvent.click(addButton) })

    expect(screen.getByText(/Você já usou todo seu aporte/i)).toBeInTheDocument()

    act(() => { userEvent.type(inputPercentualElement, '10') })

    expect(inputPercentualElement).toBeDisabled()

    act(() => {
      userEvent.selectOptions(
        selectElement,
        expectedValue
      )
    })
    expect(selectElement).toBeDisabled()
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

    const addButton = screen.getByRole('reset-add')
    const selectElement = screen.getByRole('combobox')
    const optionElement2 = screen.getByRole('option', { name: /TST -100/i })

    act(() => {
      userEvent.selectOptions(
        selectElement,
        expectedValue
      )
    })

    expect((selectElement.value)).toMatch(optionElement2.value)

    act(() => {
      userEvent.click(addButton)
    })

    act(() => {
      userEvent.selectOptions(
        selectElement,
        expectedValue
      )
      userEvent.click(addButton)
    })
    expect(selectElement.selected).toBeFalsy()
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

    const inputPercentualElement = screen.getByRole('percentual')
    const selectElement = screen.getByRole('combobox')
    const addButton = screen.getByRole('reset-add')

    act(() => {
      userEvent.type(inputPercentualElement, testPercentual)
      userEvent.selectOptions(
        selectElement,
        expectedStockValue
      )
      userEvent.click(addButton)

      userEvent.type(inputPercentualElement, testInvalidPercentual)
    })

    await expect(inputPercentualElement.value).toBe('1')
    window.alert = jsdomAlert
  })
})
