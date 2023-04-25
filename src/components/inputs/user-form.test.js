import {
  render, screen
} from '@testing-library/react'
import { Provider } from 'react-redux'
import { UserForm } from './user-form'
import { store } from '../../data/store/store'
import PropTypes from 'prop-types'

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

ReduxProvider.propTypes = {
  children: PropTypes.node
}
