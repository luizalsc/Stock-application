import './App.css'
// import { StockCard } from './data/hooks/components/cards/user-cards'
import { UserForm } from './data/hooks/components/inputs/user-form'
//import { getTickers } from './data/hooks/components/cards/user-cards'
import { Provider } from 'react-redux'
import store from './data/store/store'
import { Home } from './pages/home'


function App() {
  return (
    <>
      <Provider store={store}>
        <Home/>
      </Provider>
    </>
  )
}

export default App
