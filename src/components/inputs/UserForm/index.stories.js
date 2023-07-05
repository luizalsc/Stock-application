import { UserForm } from '.'
import { store } from '../../../data/store/store'
import { Provider } from 'react-redux'

export default {
  title: 'Components/UserForm',
  component: UserForm,
  decorators: [
    (Story) => {
      return (
        <Provider store={store}>
            {Story()}
        </Provider>
      )
    }
  ]
}

export const Default = {}
