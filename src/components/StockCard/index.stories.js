import { StockCard } from '.'
import { Provider } from 'react-redux'
import { store } from '../../data/store/store'

export default {
  title: 'Components/StockCard',
  component: StockCard,
  decorators: [
    (Story) => {
      return (
        <Provider store={store}>{Story()}</Provider>
      )
    }
  ]
}

export const Default = {}
