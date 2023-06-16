import {
  render, screen, act
} from '@testing-library/react'
import { Provider } from 'react-redux'
import { UserForm } from '.'
import { store } from '../../../data/store/store'
import PropTypes from 'prop-types'
import { getTickerDetails, getTickers } from '../../../data/services/Polygon-API'
import userEvent from '@testing-library/user-event'

const stockTickers = 'AAPL'

jest.mock('../../../data/services/Polygon-API', () => ({
  getTickers: jest.fn(),
  getTickerDetails: jest.fn()
}))

// jest.mock('../../../data/services/Polygon-API')

afterEach(() => {
  getTickers.mockReset()
  getTickerDetails.mockReset()
})

function ReduxProvider ({ children }) {
  return <Provider store={store}>{children}</Provider>
}

it('renders form correctly', () => {
  render(<UserForm />, { wrapper: ReduxProvider })

  const inputFieldElement = screen.getByPlaceholderText(/SIGLA/i)
  const submitButton = screen.getByRole('button')

  expect(inputFieldElement).toBeInTheDocument()
  expect(submitButton).toBeInTheDocument()
})

it('handles form submission correctly when fetch status is OK', async () => {
  getTickers.mockResolvedValueOnce({ status: 'OK', data: [{ symbol: 'AAPL' }] })
  getTickerDetails.mockResolvedValueOnce({ status: 'OK', data: { AAPL: { name: 'Apple Inc.' } } })

  render(<UserForm />, { wrapper: ReduxProvider })

  const inputFieldElement = screen.getByPlaceholderText(/SIGLA/i)
  const submitButton = screen.getByText('Pesquisar')

  act(() => {
    // Fill in the input field with test data.
    userEvent.type(inputFieldElement, 'AAPL')
    // Simulate a form submission.
    userEvent.click(submitButton)
  })

  // Wait for the fetchData function to resolve.
  await act(async () => {
    await Promise.resolve()
  })

  // Check that the getTickers and getTickerDetails functions were called with the correct data.
  expect(getTickers).toHaveBeenCalledWith(stockTickers)
  expect(getTickerDetails).toHaveBeenCalledWith(stockTickers)
})

it('renders error when fetch status is NOT FOUND', async () => {
  getTickers.mockResolvedValueOnce({ status: 'NOT_FOUND' })

  render(<UserForm />, { wrapper: ReduxProvider })

  const inputFieldElement = screen.getByPlaceholderText(/SIGLA/i)
  const submitButton = screen.getByText('Pesquisar')
  const errorElement = await screen.getByTestId('error')

  act(() => {
    // Fill in the input field with test data.
    userEvent.type(inputFieldElement, 'APL')
    // Simulate a form submission.
    userEvent.click(submitButton)
  })

  // Wait for the fetchData function to resolve.
  await act(async () => {
    await Promise.resolve()
  })

  // Check that the getTickers and getTickerDetails functions were called with the correct data.
  expect(getTickers).toHaveBeenCalledWith('APL')
  expect(errorElement).toBeVisible()
})

ReduxProvider.propTypes = {
  children: PropTypes.node
}
