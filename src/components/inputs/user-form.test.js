import {
  fireEvent, render, screen, act
} from '@testing-library/react'
import { Provider } from 'react-redux'
import { UserForm } from './user-form'
import { store } from '../../data/store/store'
import PropTypes from 'prop-types'
import { getTickers, getTickerDetails } from '../../data/services/fetch-api'

// Mock the getTickers and getTickerDetails functions to return test data.
jest.mock('../../data/services/fetch-api', () => ({
  getTickers: jest.fn(() => Promise.resolve({ status: 'OK', data: [{ symbol: 'AAPL' }] })),
  getTickerDetails: jest.fn(() => Promise.resolve({ status: 'OK', data: { AAPL: { name: 'Apple Inc.' } } }))
}))

function ReduxProvider ({ children }) {
  return <Provider store={store}>{children}</Provider>
}

it('stock research should be rendered', () => {
  render(<UserForm />, { wrapper: ReduxProvider })
  const stockInputEl = screen.getByPlaceholderText(/aapl/i)
  expect(stockInputEl).toBeInTheDocument()
})

it('button should be rendered', () => {
  render(<UserForm />, { wrapper: ReduxProvider })
  const buttonInputEl = screen.getByRole('button')
  expect(buttonInputEl).toBeInTheDocument()
})

it('handles form submission correctly', async () => {
  // Render the component with the Redux store provider.
  render(<UserForm />, { wrapper: ReduxProvider })

  // Fill in the input field with test data.
  const inputField = screen.getByPlaceholderText('AAPL')
  fireEvent.change(inputField, { target: { value: 'AAPL' } })

  // Simulate a form submission.
  const submitButton = screen.getByText('Pesquisar')
  fireEvent.click(submitButton)

  // Wait for the fetchData function to resolve.
  await act(async () => {
    await Promise.resolve()
  })

  // Check that the getTickers and getTickerDetails functions were called with the correct data.
  expect(getTickers).toHaveBeenCalledWith('AAPL')
  expect(getTickerDetails).toHaveBeenCalledWith('AAPL')
})

ReduxProvider.propTypes = {
  children: PropTypes.node
}
