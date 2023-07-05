import { Calculator } from '.'
import { store } from '../../data/store/store'
import { Provider } from 'react-redux'

export default {
  title: 'Components/Calculator',
  component: Calculator,
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

export const calculatorData = [
  '8 ações da TST',
  '4 ações da THE',
  '4 ações da DED'
]

export const Default = () => <Calculator usersWallet={[]}/>

export const CalculatorAfterChoices = () => <Calculator usersWallet={{ ...calculatorData }}/>
