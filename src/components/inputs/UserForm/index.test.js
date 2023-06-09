import {
  fireEvent, render, screen, act
} from '@testing-library/react'
import { Provider } from 'react-redux'
import { UserForm } from '.'
import { store } from '../../../data/store/store'
import PropTypes from 'prop-types'
import { getTickerDetails, getTickers } from '../../../data/services/Polygon-API'

jest.mock('../../../data/services/Polygon-API', () => ({
  getTickers: jest.fn(),
  getTickerDetails: jest.fn()
}))

function ReduxProvider ({ children }) {
  return <Provider store={store}>{children}</Provider>
}

it('stock research should be rendered', () => {
  render(<UserForm />, { wrapper: ReduxProvider })
  const inputFieldEl = screen.getByPlaceholderText(/SIGLA/i)
  expect(inputFieldEl).toBeInTheDocument()
})

it('button should be rendered', () => {
  render(<UserForm />, { wrapper: ReduxProvider })
  const submitButton = screen.getByRole('button')
  expect(submitButton).toBeInTheDocument()
})

it('handles form submission correctly when fetch status is OK', async () => {
  getTickers.mockResolvedValueOnce({ status: 'OK', data: [{ symbol: 'AAPL' }] })
  getTickerDetails.mockResolvedValueOnce({ status: 'OK', data: { AAPL: { name: 'Apple Inc.' } } })

  render(<UserForm />, { wrapper: ReduxProvider })

  const inputFieldEl = screen.getByPlaceholderText(/SIGLA/i)
  const submitButton = screen.getByText('Pesquisar')

  // Fill in the input field with test data.
  fireEvent.change(inputFieldEl, { target: { value: 'AAPL' } })

  // Simulate a form submission.
  fireEvent.click(submitButton)

  // Wait for the fetchData function to resolve.
  await act(async () => {
    await Promise.resolve()
  })

  // Check that the getTickers and getTickerDetails functions were called with the correct data.
  expect(getTickers).toHaveBeenCalledWith('AAPL')
  expect(getTickerDetails).toHaveBeenCalledWith('AAPL')
})

it('renders error when fetch status is NOT FOUND', async () => {
  getTickers.mockResolvedValueOnce({ status: 'NOT_FOUND' })

  render(<UserForm />, { wrapper: ReduxProvider })

  const inputFieldEl = screen.getByPlaceholderText(/SIGLA/i)
  const submitButton = screen.getByText('Pesquisar')
  const errorEl = await screen.getByTestId('error')

  // Fill in the input field with test data..
  fireEvent.change(inputFieldEl, { target: { value: 'APL' } })

  // Simulate a form submission.
  fireEvent.click(submitButton)

  // Wait for the fetchData function to resolve.
  await act(async () => {
    await Promise.resolve()
  })

  // Check that the getTickers and getTickerDetails functions were called with the correct data.
  expect(getTickers).toHaveBeenCalledWith('APL')
  expect(errorEl).toBeVisible()
})

ReduxProvider.propTypes = {
  children: PropTypes.node
}
