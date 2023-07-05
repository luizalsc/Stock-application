import { StocksPortfolio } from '.'
import { store } from '../../data/store/store'
import { Provider } from 'react-redux'

export default {
  title: 'Components/StocksPortfolio',
  component: StocksPortfolio,
  decorators: [
    (Story) => {
      return (
        <Provider store={store}>
          <div className="sm:w-3/4 m-auto">
            {Story()}
          </div>
        </Provider>
      )
    }
  ]
}

export const Default = {}
