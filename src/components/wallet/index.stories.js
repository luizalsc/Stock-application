import { Wallet } from '.'
import { store } from '../../data/store/store'
import { Provider } from 'react-redux'

export default {
  title: 'Components/Wallet',
  component: Wallet,
  excludeStories: /.*Data$/,
  decorators: [
    (Story) => {
      return (
        <Provider store={store}>
          <div className="sm:w-1/2 m-auto">
            {Story()}
          </div>
        </Provider>
      )
    }
  ]
}
export const walletData = [
  {
    stockInfos: { price: 50, ticker: 'A' },
    percentual: { percentual: 50 }
  },
  {
    stockInfos: { price: 60, ticker: 'B' },
    percentual: { percentual: 50 }
  }
]
export const Default = () => <Wallet portifolioInfo={{}}/>

export const WithStocks = () => <Wallet portifolioInfo={{ ...walletData }}/>
